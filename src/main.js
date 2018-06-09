// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import Axios from './util/myaxios'
import VueRouter from 'vue-router'
import routerMap from './router'
import store from './store/store'
import util from './assets/js/util'
import mockUser from './mock/user'
import mockJCType from './mock/JCType'
import axios from 'axios'
import axiosUtil from './api'
import zepto from 'webpack-zepto'
import pouchdb from 'pouchdb'

// import VueECharts from 'vue-echarts/components/ECharts.vue'
// import loki from './lib/lokijs/src/lokijs.js'
  // require('./lib/lokijs/src/lokijs.js')
  // require('./lib/lokijs/src/loki-indexed-adapter.js')
//util.initRem(document,window);
const DEBUG_MODE = true
global.URL_PREFIX = DEBUG_MODE ? ' /api' :'http://192.168.51.199:7001';// ' http://192.168.1.100:7001'; //
Vue.use(VueRouter)
Vue.use(MintUI)
const router = new VueRouter({
  routes: routerMap
})
// Vue.component('chart', VueECharts)
Vue.config.productionTip = false
var pp = {
  "App": App
}
//Vue.prototype.$http = Axios;//this.$http.api
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created:function(){
    //console.log(mockUser)
    //mockUser.addUser();
     //mockJCType.init();
  //       axios.get('http://addUser.cn')
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
  },
  template: '<App/>',
  components: { "App":pp.App }
})
// (function (doc, win) {
// var docEl = doc.documentElement,
// resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
// recalc = function () {
// var clientWidth = docEl.clientWidth;
// if (!clientWidth) return;
// docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
// };
// if (!doc.addEventListener) return;
// win.addEventListener(resizeEvt, recalc, false);
// doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
//         new Vue({
//   el: '#app',
//   router,
//   store,
//   template: '<App/>',
//   components: { "App":pp.App }
// })
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
window.onerror = function(msg, url, line) {  
   var idx = url.lastIndexOf("/");  
   if(idx > -1) {  
    url = url.substring(idx+1);  
   }  
   alert("ERROR in " + url + " (line #" + line + "): " + msg);  
   return false;  
}; 
window.router = router
window.Vue = Vue
window.$ = zepto
window.axiosUtil=axiosUtil
window.PouchDB = pouchdb
//window.fsnAdapter = new LokiNativescriptAdapter({"prefix": "lokin"});
window.fscAdapter = new LokiCordovaFSAdapter("lokic");
window.fsiAdapter  = new LokiIndexedAdapter("lokii");
window.lokiIndexedAdapter =LokiIndexedAdapter;
window.lokiCordovaFSAdapter =LokiCordovaFSAdapter;

//window.loki=loki;
