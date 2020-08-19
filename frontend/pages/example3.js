import React from 'react';
import {useDwarfData} from '../components/dwarf_context'
import {withDwarf} from '../components/dwarf'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  boringButton: {
    marginRight: 10,
  },
}));


var MainPage = props => {
  const classes = useStyles();
  const dwarfData = useDwarfData();

  return (
    <div className={classes.main}>
      <Button
        className={classes.boringButton}
        variant="contained"
        color="primary"
        onClick={() => dwarfData.setThemeMode(!dwarfData.themeMode)}
      >
        Toggle Theme
      </Button>
    </div>
  );
};

export default withDwarf("example3")(MainPage);