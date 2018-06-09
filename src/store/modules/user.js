import {
    ADD_USER
} from '../mutation-types'
import * as actions from './user/actions'
import mutations from './user/mutation'
//import getters from './user/getters'
let state = {users:[{id:'',name:"",sex:''}],genterId:0};
export default {
   state,
   // getters,
    actions,
     mutations
}