import * as actions from './indexeddb/actions'
import mutations from './indexeddb/mutation'
import getters from './indexeddb/getters'
let state = {dbversion:1};
export default {
   state,
    getters,
    actions,
     mutations
}