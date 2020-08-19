import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: 10,
    paddingLeft: 10,
  },
}));

const code2name = {
  401: {
    title: "Unauthorized",
    description: "Du bist nicht eingeloggt.",
  },
  403: {
    title: "Forbidden",
    description: "Du besitzt nicht die benötigten Rechte zur Anzeige dieser Seite.",
  },
  404: {
    title: "Not Found",
    description: "Seite nicht gefunden.",
  },
};

function MainPage(props) {
  const classes = useStyles();
  const router = useRouter();

  var title = "Unknown Error";
  var description = "Ups. Dieser Fehler ist uns unbekannt.";

  if (props.code in code2name) {
    title = code2name[props.code].title;
    description = code2name[props.code].description;
  }

  return (
    <div className={classes.main}>
      <Typography variant="h4" gutterBottom>
        {title} ({props.code})
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {description}
      </Typography>
      {props.code === 401 ? (
        <Button
          className={classes.boringButton}
          variant="contained"
          color="primary"
          onClick={() => router.push({
            pathname: "/login",
            query: {...router.query, href: router.pathname}
          })}
        >
          Login
        </Button>
      ) : null}
    </div>
  );
}

export default MainPage;