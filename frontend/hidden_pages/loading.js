import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
  loadingRoot: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Loading(props) {
  const classes = useStyles();

  return (
    <div className={classes.loadingRoot}>
      <CircularProgress disableShrink/>
    </div>
  );
}

export default Loading;