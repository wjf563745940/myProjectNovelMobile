<template>
  <div id="app">
  <myToast v-bind:toastShow="toastShow" v-bind:message="toastMessage"></myToast>
  

  <header class="app-header" style="display:none;" v-show="appload">
        <div class="_effect" >
             <index-header @leftbtn="" style="overflow:visible;"></index-header> 
        </div>
    </header>
     <section class="app-content" style="display:none;" v-show="appload">
    <router-view></router-view>
    </section>
     <div class="app-footer _line-fine"  >
        <div class="_effect " style="background:#777;">
        <indexNav></indexNav>
        </div>
    </div> 
  </div>
</template>

<script> 
  import {mapGetters,mapActions} from 'vuex'
import indexHeader from 'components/index-header.vue'
import indexNav from 'components/index-nav.vue'
import myToast from 'components/myToast.vue'
import slidemenu from 'components/slidemenu.vue'
import indexedDb from 'util/indexedDb'
export default {
  name: 'app',
  data(){
    return {
      appload:true,
      

    }
  },
  created:function(){
    console.log(this.getVersion);
    var that=this;
    // indexedDb.initDb("novel",this.getVersion,function(v){
    //     that.setDbVersion(v);
        
    // })
  },
  computed:{
  ...mapGetters({
  "toastShow":"toastShow",
  "getVersion":"getVersion",

  "toastMessage":"toastMessage",
  })
  },
  methods:{
    "slideMenuShow":function(){

    },
    ...mapActions({
        "setDbVersion":"setDbVersion"
    })
  },
  components: {
  indexHeader,
        indexNav,
        myToast,
       slidemenu
    }
}
</script>

<style lang="scss">

@import 'assets/css/index.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 /* text-align: center;*/
  color: #2c3e50;
}
</style>
