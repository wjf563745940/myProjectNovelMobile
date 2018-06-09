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
					 <button style="font-size:23px;" @click="capturePhoto();">拍摄照片</button> <br>
   <img style="display:none;width:240px;height:320px;" id="smallImage" src="" />
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
   			 	topModel:{
	   			 	curText:"用户名",
	   			 	backText:"添加用户"
	   			 	},
	   			 	
	   			 	}
   			 },
   			computed:{
   			 	...mapGetters({
   			 	  "dialogShow":"dialogShow"
   			 	})
   			},
   			 methods:{
   			 	submitOk:function(){
   			 		this.alert_dialog_hide();
   			 		this.add_user(this.userName,function(){console.log("回调")})
   			 	},
   			 	submitCancel2:function(){
   			 		this.alert_dialog_hide();
   			 	},
   			 	capturePhoto:function(){
   			 		//拍照并获取Base64编码的图像（quality : 存储图像的质量，范围是[0,100]）
                navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                	allowEdit: true,
                                            destinationType: destinationType.DATA_URL }
                                            );
   			 	},
   			 	...mapActions({
  				"add_user":"add_user",
  				"alert_dialog":"alert_dialog",
  				"alert_dialog_hide":"alert_dialog_hide"
				})
   			 }
		}
		var destinationType;
             
            document.addEventListener("deviceready",onDeviceReady,false);
             
            //Cordova加载完成会触发
            function onDeviceReady() {
                destinationType=navigator.camera.DestinationType;
            }
         
            //拍照
            function capturePhoto() {
                //拍照并获取Base64编码的图像（quality : 存储图像的质量，范围是[0,100]）
                navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                	allowEdit: true,
                                            destinationType: destinationType.DATA_URL }
                                            );
            }
         
            //拍照成功
            function onPhotoDataSuccess(imageData) {
                console.log(imageData);
                var smallImage = document.getElementById('smallImage');
                smallImage.style.display = 'block';
                smallImage.src = "data:image/jpeg;base64," + imageData;
            }
 
            //拍照失败
            function onFail(message) {
                alert('拍照失败: ' + message);
            }
	</script>