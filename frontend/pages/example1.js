import React from 'react';
import {useDwarfData} from '../components/dwarf_context'
import {withDwarf} from '../components/dwarf'
import {useFancyAppBar} from '../components/app_bar'
import {useComplexState} from '../components/complex_state'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
  const dwarfData = useDwarfData();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [text, setText] = useComplexState({
    default: "",
    mode: 'url',
    name: 'text',
    delay: 100,
  });
  const appBar = useFancyAppBar();

  const handleLogout = () => {
    localStorage.removeItem('token')
    enqueueSnackbar("Erfolgreich ausgeloggt.", {variant: 'success'})
    router.push("/login")
  }

  return (
    <div className={classes.main}>
      <Button
        className={classes.boringButton}
        variant="contained"
        color="primary"
        onClick={() => handleLogout()}
      >
        Logout
      </Button>
      <Button
        className={classes.boringButton}
        variant="contained"
        color="primary"
        onClick={() => {
          console.log(dwarfData.themeMode)
          dwarfData.setThemeMode(!dwarfData.themeMode)
        }}
      >
        Toggle Theme
      </Button>
      <Button
        className={classes.boringButton}
        variant="contained"
        color="primary"
        onClick={() => document.title = "Frabbel"}
      >
        Frabbel
      </Button>
      <br/>
      <div style={{paddingTop: 16}}/>
      <TextField
        variant="outlined"
        value={text}
        onChange={e => setText((e.target.value))}
        label="Textfeld"
      />
    </div>
  );
};

export default withDwarf("example1")(MainPage);