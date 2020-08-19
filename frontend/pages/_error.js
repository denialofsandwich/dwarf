import {withDwarf} from '../components/dwarf'
import ErrorPage from '../hidden_pages/error';

function Error(props) {
  return <ErrorPage code={404} />
}

export default withDwarf("_error")(Error);