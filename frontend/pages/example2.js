import React from 'react';
import {withDwarf} from '../components/dwarf'
import {useFancyAppBar} from '../components/app_bar'

import { makeStyles } from '@material-ui/core/styles';
import StorageIcon from '@material-ui/icons/Storage';
import ExploreIcon from '@material-ui/icons/Explore';


const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  boringButton: {
    marginRight: 10,
  },
}));


var MainPage = (props) => {
  const classes = useStyles();
  const fancyAppBar = useFancyAppBar();

  React.useEffect(() => {
    fancyAppBar.setDrawerItems(() => (pages, appBarOptions) => {
      const l = fancyAppBar.drawerItems(pages, appBarOptions)
      l.push({
        type: 'divider'
      },
      {
        type: 'list',
        data: [
          {
            f_name: "WUWU",
            name: "wuwu",
            icon: StorageIcon,
            onClick: () => {},
          },
          {
            f_name: "PIPI",
            name: "pipi",
            icon: StorageIcon,
            onClick: () => {},
          },
        ],
      })

      return l
    })
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    fancyAppBar.setToolbarItems(() => (appBarOptions) => [
      {
        type: 'button',
        f_name: "Expand",
        name: "expand",
        icon: StorageIcon,
        onClick: () => {
          fancyAppBar.setExpanded(!fancyAppBar.expanded)
        },
      },
      {
        type: 'list',
        f_name: "Open Menu",
        name: "open_menu",
        icon: ExploreIcon,
        data: [
          {
            f_name: "WIWI Eintrag",
            name: "wiwi",
            icon: StorageIcon,
            onClick: () => {},
          },
          {
            f_name: "PUPU Austrag",
            name: "pupu",
            icon: ExploreIcon,
            onClick: () => {},
          },
        ],
      },
    ])
    // eslint-disable-next-line
  }, [fancyAppBar.expanded]);

  return (
    <div className={classes.main}>
      Nur eine unwichtige Seite ohne Funktion.
    </div>
  );
};

export default withDwarf("example2")(MainPage);
