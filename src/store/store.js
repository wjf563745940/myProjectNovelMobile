import Vue from 'vue'
import Vuex from 'vuex'
//基本通用
//import base from './modules/base2'
import user from './modules/user'
import toast from './modules/toast'
import dialog from './modules/dialog'
import dict from './modules/dict'
import novel from './modules/novel'
import indexeddb from './modules/indexeddb'
Vue.use(Vuex)
console.log('vuex -store2 loaded')
export default new Vuex.Store({
    modules:{
        user,
        toast,
        dialog,
        dict,
        novel,
        indexeddb

    },
        strict: 'debug',
})