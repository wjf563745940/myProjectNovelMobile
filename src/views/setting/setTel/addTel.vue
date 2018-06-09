<template>
	 <div class="_full_router component-chat-detail component-chat ">
		<div class="_full_inner">
			 <header class="app-header">
			<indexHeader  v-bind:back-text="topModel.backText"
			v-bind:cur-text='topModel.curText' 			
			></indexHeader>
			</header>
			<div class="app-content">
				<ul class="wechat-list">
					<li class="item _line-fine chat-item-transition" v-for="(item ,index) in infoLists">
						<router-link :to="item.path">
						<div v-bind:index="index" class="info">
						<div class="desc">
							<span>{{item.title}}</span>
							<div class="float-r desc-momeny iconfont icon-return-arrow">{{item.value}}</div>
						</div>
					</div>
					</router-link>
					</li>
				</ul>
				<ul class="wechat-list">
					<li class="item _line-fine chat-item-transition" v-for="(item ,index) in infoLists2">
						<div v-bind:index="index" class="info" @click="getSexs(item)">
						<div class="desc">
							<span>{{item.title}}</span>
							<div class="float-r desc-momeny iconfont icon-return-arrow">{{item.value}}</div>
						</div>
					</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- children router-->
		 <transition name="slide-right">
		<router-view class="cover-transition"></router-view>
		</transition>
		<selectBox v-bind:dict-id="dictId" :selectBoxId="selectBoxId"  v-if="selectShow" @selectIndex="getSelectSex"></selectBox>
	</div>	

</template>
	<script>
	import {mapGetters,mapActions} from 'vuex'
	import indexHeader from 'components/index-header2.vue'
		import selectBox from 'components/selectBox.vue'
		export default{
			name:"adduser",
			components: {
  			indexHeader,
  			selectBox
   			 },
   			 data(){
   			 	return {
   			 	selectShow:false,
   			 	dictId:"areaDict",
   			 	selectBoxId:'',
   			 	infoLists:[
				{title:'模板名',value:"" ,path:'/settingList/addUser/addUserUpdate'},
				],
				infoLists2:[
				{index:"0",title:'契约周期类型',"value":"",dictId:"zhouqiDict"},
				{index:"1",title:'奖罚类型',"value":"",dictId:"jcTypeDict"},
				],
   			 	topModel:{
	   			 	curText:"添加模板",
	   			 	backText:"设置"
	   			 	},
	   			 	
	   			 	}
   			 },
   			 methods:{
   			 	getSelectSex:function(user){
   			 		let index=0;
   			 		for(let i=0;i<this.infoLists2.length;i++){
   			 			if(this.infoLists2[i].index===user.selectBoxId){
   			 				index=i;
   			 				break;
   			 			}
   			 		}
   			 		this.infoLists2[index].value=user.itemValue;
   			 		this.selectShow=false;
   			 	},
   			 	getSexs:function(item){
   			 		console.log(item)
   			 		this.dictId=item.dictId;
   			 		this.selectBoxId=item.index;
   			 		this.selectShow=true;
   			 	}
   			 }
		}
	</script>