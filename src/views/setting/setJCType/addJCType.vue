<template>
	 <div class="_full_router component-chat-detail component-chat ">
		<div class="_full_inner">
			 <header class="app-header" >
			<indexHeader  v-bind:back-text="topModel.backText"
			v-bind:cur-text='topModel.curText' 			
			></indexHeader>
			</header>
			<div class="app-content">
				<div class="content-container update-content">
					<input type="text" placeholder="请输入奖罚名称" v-model="userName"/>
					<p class="lit-title">注意:奖罚名称至少是2个英文字符或者是一个中文字符</p>
					<button type="button" class="app-btn" v-bind:disabled="isEquals" v-on:click="saveUserName" >保存</button>
				</div>
			</div>
		</div>
		<myDialog v-bind:dialogShow="dialogShow" @submitCancel="submitCancel2" v-on:submitOk="submitOk"></myDialog>
	</div>	

</template>
	<script>
	import myDialog from 'components/myDialog.vue'
	import {mapGetters,mapActions} from 'vuex'
	import indexHeader from 'components/index-header2.vue'
import axios from 'axios'
		export default{
			name:"adduser",
			components: {
  			indexHeader,
  			 myDialog
   			 },
   			 data(){
   			 	return {
   			 	userName:"",
   			 	userNameNow:"",
   			 	infoLists:[
				{title:'用户名',"value":"" ,path:'/settingList/addUser'},
				],
   			 	topModel:{
	   			 	curText:"添加奖惩类型",
	   			 	backText:"设置"
	   			 	},
	   			 	
	   			 	}
   			 },
         created:function(){

         },
   			computed:{
   			isEquals:function(){
   			 		return this.userName==this.userNameNow;
   			 	},
   			 	...mapGetters({
   			 	  "dialogShow":"dialogShow"
   			 	})
   			},
   			 methods:{
   			 	submitOk:function(){
            let that=this;
              axios.get('http://addjctype.cn')
  .then(function (response) {
    console.log(response.data.jcname);
      that.alert_dialog_hide();
            that.add_user(that.userName,function(){console.log("回调")})
  })
  .catch(function (error) {
    console.log(error);
  });
   			 	
   			 	},
   			 	submitCancel2:function(){
   			 		this.alert_dialog_hide();
   			 	},
   			 	saveUserName:function(){
   			 	//go api
   			 	//this.add_user(this.userName,function(){console.log("回调")})
   			 		console.log("save1");
   			 		this.alert_dialog("que ren");
   			 	},
   			 	...mapActions({
  				"add_user":"add_user",
  				"alert_dialog":"alert_dialog",
  				"alert_dialog_hide":"alert_dialog_hide"
				})
   			 },
   			 mounted:function(){
   			 	this.$on('sumbitCancel',function(data){
   			 		console.log(data);
   			 	})
   			 }
		}
	</script>