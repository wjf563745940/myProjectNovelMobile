<template>
	<div>
		<div class="_full_inner _scroll _effect component-chat" >
		<ul class="wechat-list">
			<li class="item _line-fine chat-item-transition" v-for="(item ,index) in infoLists">
				<router-link :to="item.path">
				<div v-bind:index="index" class="info">
				<div class="desc">
					<span>{{item.title}}</span>
					<div class="float-r desc-momeny">{{item.totalMomeny}}</div>
				</div>
			</div>
			</router-link>
			</li>
		</ul>
		</div>
		<!-- children router-->
		 <transition name="slide-right">
		<router-view class="cover-transition"></router-view>
		</transition>
	</div>	
</template>
	<script>
	export default{
	name:'ruleList',
	data () {
		return {
			infoLists:[
			{title:'添加契约',"totalMomeny":"1000" ,path:'/settingList/addUser'},
			{title:'添加用户',"totalMomeny":"1000",path:'/settingList/addUser'},
			{title:'添加奖惩类型',"totalMomeny":"1000",path:'/settingList/addJCType'},
			{title:'添加模板',"totalMomeny":"1000",path:'/settingList/addTel'},
			{title:'设备接口',"totalMomeny":"1000",path:'/settingList/deviceApi'},
			{title:'闹钟 微信图片',"totalMomeny":"1000",path:'/settingList/deviceApi'}
			]
		}
	}
}
	</script>