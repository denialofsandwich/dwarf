import {useDwarfData} from './dwarf_context'
import {useFancyAppBar} from '../components/app_bar'
import {useComplexState} from '../components/complex_state'
import {pageInfo} from '../lib/pages';
import Config from '../lib/config';
import LoadingPage from '../hidden_pages/loading';
import ErrorPage from '../hidden_pages/error';


const isPermitted = (neededPermissions, permissions) => {
  var is_permitted = true;
  neededPermissions.forEach(item => {
    if (!permissions.includes(item)) {
      is_permitted = false;
      return;
    }
  })

  return is_permitted;
}


export const usePermittedVisiblePages = () => {
  const dwarfData = useDwarfData();
  const permissions = dwarfData.sessionData ? dwarfData.sessionData.permissions || [] : []

  return React.useMemo(() => 
    Object.keys(pageInfo).filter(id => 
      pageInfo[id].visible && (
        dwarfData.loggedin ||
        pageInfo[id].neededPermissions === null
      ) && 
      isPermitted(pageInfo[id].neededPermissions || [], permissions)
    ), [permissions, dwarfData.loggedin]);
}


export const withDwarf = (id, pageInit=true) => (
  Component,
  ErrorComponent=ErrorPage,
) => {

  const RetComponent = props => {
    const dwarfData = useDwarfData();

    if(pageInit) {
      const appBar = useFancyAppBar();
      
      React.useEffect(() => {
        appBar.setPageKey(id);
        appBar.setTitle(pageInfo[id].title);
        appBar.setHidden(!pageInfo[id].visible);
        document.title = Config.appName +' - ' +pageInfo[id].title;
    
        return () => {
          appBar.setPageKey(null);
          appBar.setTitle(Config.appName);
          appBar.setHidden(0);
          document.title = Config.appName;
          
          appBar.setDrawerItems(null)
          appBar.setToolbarItems(null)
          appBar.setDrawerContent(null)
          appBar.setToolbarContent(null)
        }
        // eslint-disable-next-line
      }, [])
    }

    if (pageInfo[id].neededPermissions === null) {
      return <Component {...props}/>
    }

    return (
      dwarfData.asked ?
      dwarfData.loggedin ?
      isPermitted(pageInfo[id].neededPermissions, dwarfData.sessionData.permissions) ?
        <Component {...props}/> : <ErrorComponent {...props} code={403}/> : <ErrorComponent {...props} code={401}/> : <LoadingPage {...props} />
    )
  }

  return RetComponent
}