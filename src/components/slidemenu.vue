<template>
  <transition name="slide-menu">
  <div class="slidemenu" v-show="visible" :value="value.isShow"  @click="hide" >
  	<div class="slidemenu-conent" @click.stop="test">

   	
    <button type="button" @click.stop="initLoclData">数据</button>
    <button type="button" @click.stop="initcolLoclData">col数据</button>
    <button type="button" @click.stop="addLoclData">添加本地数据</button>
    <button type="button" @click.stop="getLoclData">获取本地数据</button>
    <button type="button" @click.stop="test">连接数据库</button>
    <input v-model="menuName" type="text" placeholder="添加的菜单名" />
    <button type="button" @click.stop="addmenu">添加菜单</button>
    <button type="button" @click.stop="gettest">获取菜单</button>
    <input type="text" placeholder="pdname"  v-model="pdname"/>
    <button type="button" @click.stop="getpouchdb">获取pouchdb and clear</button>
    <div class="menu-list"><mt-cell v-for="(item,index) in menuList" :title="item.name" >{{item.name}}</mt-cell></div>
   </div>
  </div>
  </transition>
</template>

<script>
import lokiDb from 'util/lokiDb'
import pounchDbUtil from 'util/pounchDbUtil'
export default {
  name: 'slidemenu',
  data () {
    return {
      isShow2:true,
      visible:false,
      myDb:'',
      col:'',
      menuName:'',
      menuList:[],
      pdname:'',
      pddata:'',
    }
  },
  props:{
      value:{
        type:Object,
        default:function() {
        return {
          isShow:false
        };
        }
      }
    },
  computed:{

  },
  created:function(){
   
  },
  watch:{
       value(val) {
            this.visible = val.isShow;
          },
           visible(val) {
            this.value.isShow=true;
          }
    },
  methods:{
  getpouchdb:function(){
        this.pddata=pounchDbUtil.initDB(this.pdname);
        pounchDbUtil.deletedb(this.pddata);
  },
    hide:function(){
     // this.isShow=false;
     this.visible=false;
    },
    test:function(){
      //alert('test')
    },
    initLoclData:function(){
       //this.myDb= lokiDb.initDB();
 
    },
    initcolLoclData:function(){
          this.col= lokiDb.createCollection(this.myDb,"test");
    },
    addLoclData:function(){
    
    
    
      lokiDb.addData(this.myDb,this.col,{name:'Sleipnir', legs: 8})
     // lokiDb.findData(children,{name:'Sleipnir'});
     var r=lokiDb.findSelData(this.col,function(obj){
      return obj.legs>1;
     })
     console.log(r)

    },
    getLoclData:function(){
      //console.log(this.myDb.)
       var r=lokiDb.findSelData(this.col,function(obj){
      return obj.legs>1;
     })
     console.log(r)
    },
    test:function(){
     //this.myDb= lokiDb.test();
    },
    addmenu:function(){
      lokiDb.addTest(this.myDb,"menu",{name:this.menuName});
    },
    gettest:function(){
    var menuname=  lokiDb.getTest(this.myDb,"menu");
    this.menuList=menuname
    console.log(menuname);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slidemenu{
/*	height: 100%;
	width: 100%;
	position: fixed;
	top: 0;
  left:0;
	background-color: rgba(0,0,0,.3);
	z-index: 998;
  transition: 3s all ease;*/
  position: fixed;
      width: 100%;
      height: 100%;
      z-index: 999;
      left: 0;
      top: 0;
        background-color: rgba(0,0,0,.3); 
    transition: .8s all ease;
}
.slidemenu-conent{
	height: 100%;
	width: 80%;
	background: #fff;
}
.menu-list{
  color: #111;
}

</style>
