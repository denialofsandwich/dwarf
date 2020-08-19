import {withDwarf} from '../components/dwarf'
import Example1 from '../pages/example1'
import Redirect from '../components/redirect'

export default withDwarf("example1", false)(Example1, () => <Redirect href="/login"/>);