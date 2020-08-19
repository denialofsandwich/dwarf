import StorageIcon from '@material-ui/icons/Storage';
import AndroidIcon from '@material-ui/icons/Android';
import ExploreIcon from '@material-ui/icons/Explore';

export const pageInfo = {
  'index': {
    title: "Beispielseite 1",
    visible: false,
    neededPermissions: [],
  },
  '_error': {
    title: "Fehler",
    visible: false,
    neededPermissions: null,
  },
  'login': {
    title: "Login",
    visible: false,
    neededPermissions: null,
  },
  'example1': {
    title: "Beispielseite 1",
    icon: StorageIcon,
    visible: true,
    neededPermissions: [],
  },
  'example2': {
    title: "Beispielseite 2",
    icon: AndroidIcon,
    visible: true,
    neededPermissions: null,
  },
  'example3': {
    title: "Beispielseite 3",
    icon: ExploreIcon,
    visible: true,
    neededPermissions: [
      "view_user",
    ],
  },
};