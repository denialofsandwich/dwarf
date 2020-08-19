import React from 'react';
import Config from '../lib/config';
import {usePermittedVisiblePages} from './dwarf'
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AndroidIcon from '@material-ui/icons/Android';


const useStyles = makeStyles(theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawer: {
    width: Config.drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
  },
  drawerOpen: {
    width: Config.drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: 0,
  },
  appBarOpenLarge: {
      marginLeft: Config.drawerWidth,
      width: `calc(100% - ${Config.drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '8px',
    paddingLeft: '15px',
    width: Config.drawerWidth,
    ...theme.mixins.toolbar,
  },
  spacer: {
    marginRight: 'auto',
  },
  content: {
    flexGrow: 1,
    
    transition: theme.transitions.create(['padding'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mainContentShift: {
    paddingLeft: theme.spacing(9),
  },
  contentShift: {
    paddingLeft: Config.drawerWidth,
    transition: theme.transitions.create(['padding'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  selectedPage: {
    backgroundColor: theme.palette.action.selected,
  },
  flexRow: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexSpacer: {
    marginRight: 'auto',
  },
  tbButtonArea: {
    marginRight: -12,
  },
}));

const FancyAppBarContext = React.createContext(null);

function HideOnScroll(props) {
  const scrolled = useScrollTrigger();

  return (
    <Slide
      appear={false}
      direction={props.direction}
      in={props.active?!scrolled: true}
    >
      {props.children}
    </Slide>
  );
}

HideOnScroll.defaultProps = {
  active: true,
  direction: 'down',
}

function IconButtonMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const Icon = props.icon;
  
  return (<>
    <Tooltip title={props.title}>
      <IconButton
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <Icon />
      </IconButton>
    </Tooltip>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      {props.itemList.map((v, i) => (
        <MenuItem
          key={i}
          onClick={() => {
            setAnchorEl(null);
            v.onClick();
          }}
        >
          {v.f_name}
        </MenuItem>
      ))}
    </Menu>
  </>);
}

function DefaultToolbarContent(props) {
  const classes = useStyles();

  return (
    <Toolbar className={classes.flexRow}>
      <IconButton
        className={classNames(classes.menuButton, {
          [classes.hide]: props._ab.expand > 0,
        })}
        color="inherit"
        aria-label="Menu"
        onClick={() => props._ab.setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <IconButton
        className={classNames(classes.menuButton, {
          [classes.hide]: props._ab.expanded || props._ab.expand === 0,
        })}
        color="inherit"
        aria-label="Menu"
        onClick={() => props._ab.setExpanded(true)}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        color="inherit"
      >
        {props.title}
      </Typography>
      <div className={classes.flexSpacer} />
      <div className={classes.tbButtonArea}>
        {props.toolbarItems(props._ab).map((v, i) => {
          const Icon = v.icon;
          if (v.type === 'button') {
            return (
              <Tooltip key={i} title={v.f_name}>
                <IconButton
                  aria-label={v.f_name}
                  onClick={v.onClick}
                >
                  <Icon />
                </IconButton>
              </Tooltip>
            );
          } else {
            return (
              <IconButtonMenu
                key={i}
                itemList={v.data}
                icon={v.icon}
                title={v.f_name}
              />
            );
          }
        })}
      </div>
    </Toolbar>
  );
}

function DefaultDrawerContent(props) {
  const classes = useStyles();
  const permittedVisiblePages = usePermittedVisiblePages();
  
  return (
    <div>
      {props.drawerItems(permittedVisiblePages, props._ab).map((item, index) => {
        
        if (item.type === 'divider') {
          return (<Divider key={index}/>);
        }
        else {
          return (
            <List key={index}>
              {item.data.map((subitem, subindex) => {
                const f_name = subitem.f_name || "Unknown Page";
                const Icon = subitem.icon || AndroidIcon;
                return (
                  <ListItem
                    button
                    key={subindex}
                    onClick={subitem.onClick}
                    className={classNames({
                      [classes.selectedPage]: props.pageKey === subitem.name,
                    })}
                  >
                    <ListItemIcon><Icon/></ListItemIcon>
                    <ListItemText primary={f_name} />
                  </ListItem>
                );
              }
              )}
            </List>
          );
        }
      }
      )}
    </div>
  )
}


function useFancyAppBar() {
  const ctx = React.useContext(FancyAppBarContext);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(ctx);
  }

  return ctx
}


function FancyAppBar(props) {
  const classes = useStyles();
  const theme = useTheme();

  // Swipable Drawer
  const [open, setOpen] = React.useState(false);

  // Static Drawer
  const [expanded, setExpanded] = React.useState(false);
  const configExpandedSmall = useMediaQuery(theme.breakpoints.up(Config.appBarExpandSmall));
  const configExpandedLarge = useMediaQuery(theme.breakpoints.up(Config.appBarExpandLarge));
  const expand = Number(props.expand || configExpandedLarge*2 || configExpandedSmall);
  const isExpanded = (expand===2 || expanded) && expand !== 0;

  const [hidden, setHidden] = React.useState(Config.appBarHidden);
  const realHidden = props.hidden || hidden;

  const [pageKey, setPageKey] = React.useState(null);
  const realPageKey = props.pageKey || pageKey;

  const [title, setTitle] = React.useState(Config.appName);
  const realTitle = props.title || title;

  // Config.useDrawerItemsDefault
  const [drawerItems, setDrawerItems] = React.useState(null);
  const [toolbarItems, setToolbarItems] = React.useState(null);
  const realDrawerItems = props.drawerItems || drawerItems || Config.useDrawerItemsDefault;
  const realToolbarItems = props.toolbarItems || toolbarItems || Config.useToolbarItemsDefault;

  const [drawerContent, setDrawerContent] = React.useState(null);
  const [toolbarContent, setToolbarContent] = React.useState(null);
  const DrawerContent = props.drawerContent || drawerContent || DefaultDrawerContent;
  const ToolbarContent = props.toolbarContent || toolbarContent || DefaultToolbarContent;

  const abObj = {
    open: open,
    setOpen: setOpen,
    expanded: isExpanded,
    setExpanded: setExpanded,
    expand: expand,
    hidden: hidden,
    setHidden: setHidden,
    pageKey: pageKey,
    setPageKey: setPageKey,
    title: title,
    setTitle: setTitle,

    drawerItems: realDrawerItems,
    setDrawerItems: setDrawerItems,
    toolbarItems: realToolbarItems,
    setToolbarItems: setToolbarItems,
    drawerContent: DrawerContent,
    setDrawerContent: setDrawerContent,
    toolbarContent: ToolbarContent,
    setToolbarContent: setToolbarContent,
  };

  return (
    <FancyAppBarContext.Provider value={abObj}>
      {!realHidden?(<>
        <HideOnScroll active={expand === 0 && (props.hideOnScroll || Config.appBarhideOnScroll)}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarOpenLarge]: isExpanded,
              [classes.hide]: realHidden,
            })}
          >
            <ToolbarContent
              {...props}
              _ab={abObj}
              toolbarItems={realToolbarItems}
              title={realTitle}
              pageKey={realPageKey}
            />
          </AppBar>
        </HideOnScroll>
        <Toolbar />
        <nav>
          <SwipeableDrawer
            className={classNames({
              [classes.hide]: realHidden || expand > 0,
            })}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
          >
              <div className={classes.toolbar}>
                <Typography variant="h6" color='inherit'>{props.appName}</Typography>
                <div className={classes.spacer}/>
                <IconButton onClick={() => setOpen(false)}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <DrawerContent
                {...props}
                _ab={abObj}
                drawerItems={realDrawerItems}
                pageKey={realPageKey}
              />
          </SwipeableDrawer>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: isExpanded,
              [classes.drawerClose]: !isExpanded,
              [classes.hide]: props.hidden || expand === 0,
            })}
            classes={{
              paper: classNames(classes.drawer, {
                [classes.drawerOpen]: isExpanded,
                [classes.drawerClose]: !isExpanded,
              }),
            }}
            open={isExpanded}
          >
            <div className={classes.toolbar}>
              <Typography variant="h6" color='inherit'>{props.appName}</Typography>
              <div className={classes.spacer}/>
              <IconButton
                onClick={() => setExpanded(false)}
                className={classNames({
                  [classes.hide]: configExpandedLarge,
                })}
              >
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <DrawerContent
              {...props}
              _ab={abObj}
              drawerItems={realDrawerItems}
              pageKey={realPageKey}
            />
          </Drawer>
        </nav>
      </>): null}
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: isExpanded && !realHidden,
          [classes.mainContentShift]: !realHidden && expand > 0
        })}
      >
        {props.children}
      </main>
    </FancyAppBarContext.Provider>
  )
}

FancyAppBar.defaultProps = {
  appName: Config.appName,
  title: null,
  hideOnScroll: null,
  hidden: null,
  drawerContent: null,
  toolbarContent: null,
  drawerItems: null,
  toolbarItems: null,
  expand: null,
  pageKey: null,
}

export {FancyAppBar, useFancyAppBar};