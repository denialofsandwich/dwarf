import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import {DwarfContext, ThemeContext} from '../components/dwarf_context'
import {FancyAppBar} from '../components/app_bar'
import {useComplexState} from '../components/complex_state'
import Config from '../lib/config';
import API from '../lib/api';
import { register, unregister } from 'next-offline/runtime'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// TODO: eslint printet keine Fehlermeldungen

// TODO: Testen ob ich das dev_ präfix in den Containern weglassen kann
// TODO: Fix: Content Security Policy: Die Einstellungen der Seite haben das Laden einer Ressource auf https://4.dev.farene.de/service-worker.js festgestellt ("worker-src"). Ein CSP-Bericht wird gesendet.
//    - Evtl. habe ich das schon gefixt
// TODO: NPM Container sauberer bauen
//    - So, dass nicht 20 Volumes gebraucht werden
//    - Und package-lock.json sinnvoll verwendet wird
// TODO: Beispielseiten schreiben
//    - Casual API requests + Database
//    -   Evtl ein kleines Tagebuchbeispiel
//    - WebSockets
//    - Persistant states (URL & localStorage)
//    - Background worker
//    - PWA Showcase
//      - Push Notification
//      - Share Actions
//      - Shortcuts
//    - About Page
//    - Sidebar fancy machen (mit Baumstruktur)

// TODO: Anpassungen um einfacher rebasen zu können
//    - Beispielconfigs erstellen, .gitignore anpassen
//    - build_new_project.sh (Für Leute die die Vorlage nutzen wollen um was eigenes zu starten)
//    - build_example_project.sh (Baut alles um die Beispielseite starten zu können)

// TODO: Doku schreiben (Die Hauptquelle für die Funktionsweise sollen aber die Beispielseiten sein)
//    - Update piplock: auf backend_core schalten: pipenv lock
//    - Update npm lock: auf frontend schalten: npm outdated
// TODO: Zusätzliche Beispielseiten
//    - Diagramme
//    - QR Code scannen
//    - Kamera, Ton, irgendwas damit

// TODO: useComplexState Repo erstellen für React Router und NextJS
// TODO: next-favicons Repo erstellen
// TODO: useWebsockets Repo erstellen

const lightTheme = createMuiTheme(Config.lightTheme);
const darkTheme = createMuiTheme(Config.darkTheme);


function MainL2(props) {
  const { enqueueSnackbar } = useSnackbar();

  // Session handling
  //##########################################
  const refreshLoginData = () => {
    setDwarfData({...dwarfData,
      sessionData: null,
      loggedin: false,
      asked: false,
    })

    API().get(`general/user/`).then(r => {
      setDwarfData({...dwarfData,
        sessionData: r.data,
        loggedin: true,
        asked: true,
      })
    }).catch(e => {
      var loggedin = false
      if (e.response) {
        if(e.response.status === 401) {
        } else {
          console.error(e.response);
          enqueueSnackbar("Unknown Error from Backend.", {variant: 'error'})
        }
      } else if (e.request) {
        console.error(e.request);
        enqueueSnackbar("Unknown Error while contacting Backend.", {variant: 'error'})
      } else {
        console.error(e);
        enqueueSnackbar("Unhandled Exception! (" +e.name +") See logs for more details.", {variant: 'error'})
      }
      setDwarfData({...dwarfData,
        loggedin: loggedin,
        asked: true,
      })
    })
  };


  const [dwarfData, setDwarfData] = React.useState({
    refreshSession: refreshLoginData,
    sessionData: null,
    loggedin: false,
    asked: false,
    themeMode: props.themeMode,
    setThemeMode: props.setThemeMode,
  });

  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      register()
    } else {
      unregister()

      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
    }

    refreshLoginData()
  }, []);
  React.useEffect(() => setDwarfData({...dwarfData,
    themeMode: props.themeMode,
    setThemeMode: props.setThemeMode
  }),
    // eslint-disable-next-line
    [props.themeMode, props.setThemeMode]
  );

  return (
    <DwarfContext.Provider value={dwarfData}>
      <CssBaseline />
      <FancyAppBar>
        <props.Component {...props.pageProps}/>
      </FancyAppBar>
    </DwarfContext.Provider>
  )
}


function MainL1(props) {
  const [themeMode, setThemeMode] = useComplexState({
    default: Config.darkDefault,
    mode: 'persist',
    name: 'theme',
    delay: 250,
  });

  return (
    <ThemeContext.Provider value={themeMode}>
      <MuiThemeProvider theme={themeMode ? darkTheme : lightTheme}>
        <SnackbarProvider maxSnack={5}>
          <MainL2
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            Component={props.Component}
            pageProps={props.pageProps}
          />
        </SnackbarProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}


export default MainL1;
