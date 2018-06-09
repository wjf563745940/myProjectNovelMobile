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
			</div>
		</div>
		<!-- children router-->
		 <transition name="slide-right">
		<router-view class="cover-transition"></router-view>
		</transition>
		<selectBox v-bind:dict-id="dictId" v-if="selectShow" @selectIndex="getSelectSex"></selectBox>
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
   			 	infoLists:[
				{title:'拍照',value:"" ,path:'/settingList/deviceApi/openPhone'},
				],
   			 	topModel:{
	   			 	curText:"deviceApi",
	   			 	backText:"设置"
	   			 	},
	   			 	
	   			 	}
   			 }
		}
	</script>