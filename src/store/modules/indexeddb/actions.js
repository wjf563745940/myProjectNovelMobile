import * as types from '../../mutation-types'
export const setDbVersion=function({commit},message){
commit(types.DBVERSION,message)
}