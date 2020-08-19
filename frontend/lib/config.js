import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack';
import {useDwarfData} from '../components/dwarf_context'
import {pageInfo} from '../lib/pages';

import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import ThemeColorIcon from '@material-ui/icons/BrightnessMedium';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';

const appName = process.env.appName; // next.config.js > module.exports > env
const darkDefault = true;

const lightTheme = {
  palette: {
    primary: {
      main: green['A700'],
    },
    secondary: {
      main: orange[600],
    },
  },
  typography: {
    useNextVariants: true,
  },
};

const darkTheme = {
  props: {
    MuiAppBar: {
      color: "default",
    },
    MuiChip: {
      variant: "outlined",
    },
  },
  overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundColor: '#373740',
      },
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: green['A700'],
    },
    secondary: {
      main: orange[400],
    },
    background: {
      paper: "#373740",
      default: "#33333d",
    },
  },
  typography: {
    useNextVariants: true,
  },
};

const appBarhideOnScroll = true;
const appBarHidden = true;
const drawerWidth = 240;

const appBarExpandSmall = 'sm';
const appBarExpandLarge = 'lg';

const useDrawerItemsDefault = (pages, appBarOptions) => {
  const dwarfData = useDwarfData();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return [
    {
      type: 'list',
      data: pages.map((item, i) => {
        return {
          name: item,
          f_name: pageInfo[item].title,
          icon: pageInfo[item].icon,
          onClick: () => {
            appBarOptions.setOpen(false);
            router.push('/' +item);
          },
        }
      }),
    },
    {
      type: 'divider'
    },
    {
      type: 'list',
      data: [
        {
          f_name: "Thema wechseln",
          name: "switch_theme",
          icon: ThemeColorIcon,
          onClick: () => {
            dwarfData.setThemeMode(!dwarfData.themeMode)
          },
        },
        {
          f_name: "Ausloggen",
          name: "logout",
          icon: LogoutIcon,
          onClick: () => {
            appBarOptions.setOpen(false);
            localStorage.removeItem('token');
            router.push('/login');
            enqueueSnackbar("Erfolgreich ausgeloggt.", {variant: 'success'});
          },
        },
      ],
    },
  ];
};

const useToolbarItemsDefault = () => [];

export default {
  appName,
  appBarExpandLarge,
  appBarExpandSmall,
  appBarHidden,
  appBarhideOnScroll,
  darkDefault,
  darkTheme,
  drawerWidth,
  lightTheme,
  useDrawerItemsDefault,
  useToolbarItemsDefault,
};
