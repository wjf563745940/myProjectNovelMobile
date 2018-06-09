<template>
<transition name="jb">	
	<div class="my-dialog" v-if="dialogShow">
		<h3>提示</h3>	
	<span>{{message}}</span>
	<div class="dialog-btns">
		<button type="button" v-on:click="cancel">取消</button>
		<button type="button" v-on:click="ok">确认</button>
	</div>
	</div>
	</transition>
</template>
<script> 
	export default{
		props:{
			dialogShow:{
				 type: Boolean,
           		  default:false
			},
			message:{
				type: String,
           		 default: '消息'
			}
			
		},
		methods:{
			cancel:function(){
				console.log("sumbitCancel")
				this.$emit("submitCancel");
			},
			ok:function(){
				this.$emit("submitOk");
			}
		}
		
	}
	</script>
<style>
	.my-dialog{
		background-color: #fff;
	
		width: 90%;
		position: fixed;
		top: 50%;
		/*left: 50%;*/
		z-index: 99;
		padding: 4px 10px;
    	font-size: 12px;
    	transition: .3s opacity ease;
    	margin-left: 5%;
    	text-align: left;
    	background: #fff;
    border: 1px solid #111;
	}
	.dialog-btns{
	}
	.dialog-btns button{
		/*width: */
	}
	</style>