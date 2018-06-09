	<template>
		<div class="_cover-top">
			 <div class="top-back"  >
            <span class="iconfont icon-tips-jia" @click="getSlide">个人信息</span>
        </div>
			<div class="header-other">
				<button type="button" @click="goSearch">搜索</button>
				 <span class="iconfont icon-tips-jia" @click="getSexs"></span>
				 <div  class="select-type"><selectBox2 v-bind:dict-id="dictId" v-model="selectShow"  @selectIndex="getSelectSex"></selectBox2></div>
			</div>
			<div class="center">
				 {{menu_active.text}}
		
			</div>
				<!--  <transition name="slide-right"> -->
			 	 <slidemenu  class="cover-transition"  v-model="selectShow2"></slidemenu>   
			 	<!-- </transition> -->
	</div>
	</template>
	<script>
	import selectBox2 from 'components/selectBox2.vue'
	import slidemenu from 'components/slidemenu.vue'
		export default{
			data(){
				return {
					dictId:'selectTypeDict',
					menu_active:{text:"列表"},
					selectShow:{isShow:false},
					selectShow2:{isShow:false},
					ok:false
				}
			},
			components: {
  			selectBox2,
  			slidemenu
   			 },
   			 methods:{
   			 	getSelectSex:function(user){
   			 		this.selectShow=false;
   			 	},
   			 	getSexs:function(){
   			 		this.dictId="selectTypeDict";
   			 		console.log(this.selectShow)
   			 		this.selectShow={isShow:true}
   			 	},
   			 	getSlide:function(){
   			 		this.selectShow2={isShow:true};
   			 		
   			 	},
   			 	goSearch:function(){
   			 		this.$router.push("/search");
   			 	}
   			 }
		}
	</script>
	<style type="text/css" media="screen">
		.select-type{

			position: absolute;

		}
		.test{
			position: fixed;
			width: 60%;
			height: 100%;
			z-index: 999;
			left: 0;
			top: 0;
			background: #fff;
			opacity: 1;
    transition: 3s all ease;

		}
	</style>