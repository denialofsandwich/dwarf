import React from 'react';
import classNames from 'classnames';
import Config from '../lib/config';
import API from '../lib/api';
import {useDwarfData} from '../components/dwarf_context'
import {useFancyAppBar} from '../components/app_bar'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSnackbar } from 'notistack';
import {withDwarf} from '../components/dwarf'

import TrianglesBackground from '../components/svg/triangles_background'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  bgImage: {   
    position: 'fixed',
    zIndex: -500,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(),
  },
  text_field: {
      marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  buttonProgress: {
    marginTop: -4,
  },
  hide: {
    display: 'none',
  },
  bgLink: {
    textDecoration: 'none',
    color: 'white',
  },
  linkSection: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
}));

function LoginPage(props) {
  const theme = useTheme();
  const classes = useStyles();
  const dwarfData = useDwarfData();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  useFancyAppBar("login", "Login", false);
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const smUp = useMediaQuery(useTheme().breakpoints.up('sm'));

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    var formData = {
      username: username,
      password: password,
    };

    API().post(`auth/`, formData)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        setLoading(false);
        
        enqueueSnackbar("Erfolgreich eingeloggt.", {variant: 'success'})
        dwarfData.refreshSession()
        
        var {href, ...query} = router.query
        router.push({
          pathname: href || "/",
          query: query
        });
      })
      .catch(error => {
        setLoading(false);
        enqueueSnackbar('Login fehlgeschlagen: '+error, {variant: 'error'})
      });
  }
  
  return (
    <main className={classes.main}>
      <TrianglesBackground
        className={classes.bgImage}
        scale={smUp?0.38:0.34}
        backgroundcolor={theme.palette.type==='dark'?theme.palette.background.paper:theme.palette.primary.main}
        contrast={theme.palette.type==='dark'?0.09:0.15}
      />
      <div style={{paddingTop: 64}}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {Config.appName}
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              required
              fullWidth
              className={classes.text_field}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              fullWidth
              className={classes.text_field}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
            >
              Sign in
            </Button>
            <LinearProgress className={classNames(classes.buttonProgress, {
                [classes.hide]: !loading,
              })}
            />
          </form>
        </Paper>
      </div>
      <div className={classes.linkSection}>
        <Typography variant='subtitle1'>
          <Link href="/about">
            <a className={classes.bgLink}>About</a>
          </Link>
        </Typography>
      </div>
    </main>
  );
}

export default withDwarf("login")(LoginPage);