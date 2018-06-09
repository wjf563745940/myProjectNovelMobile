<template>
<transition name="jb">	
	<div class="my-toast" v-if="toastShow">
		{{message}}
	</div>
	</transition>
</template>
<script> 
	export default{
		props:{
			toastShow:{
				 type: Boolean,
           		  default:false
			},
			message:{
				type: String,
           		 default: '消息'
			}
			
		},
		watch:{
				toastShow:function(){
					console.log('toast');
					var that=this;
					if(that.toastShow){
						setTimeout(function(){
						that.$store.commit("ALERT_TOAST_HIDE");
					},1200);
					}
					
				}
			}
		
	}
	</script>
<style>
	.my-toast{
		background-color: rgba(0,0,0,.6);
		color:#FFF;
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 99;
		padding: 4px 10px;
    	font-size: 12px;
    	transition: .3s opacity ease;
	}
		.jb-enter {
	    opacity:0;
	}
	.jb-leave-active {
	     opacity:0;
	}
	</style>