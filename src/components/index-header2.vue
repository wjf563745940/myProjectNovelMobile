	<template>
		<div class="_cover-top">
		<div class="top-back" v-on:click="back" >
            <div class="_ellipsis iconfont icon-return-arrow v-link-active" >{{backText}}</div>
        </div>
        	<div class="header-other">
        	<button type="button" @click="goSearch">搜索</button>
				 <span class="iconfont icon-tips-jia" @click="getSexs"></span>
				 <div class="select-type"><selectBox2 :radioShOW="false" v-bind:dict-id="dictId" v-model="selectShow"  @selectIndex="getSelectSex"></selectBox2></div>
			</div>
		<div class="center">
			 {{curText}}
		</div>
	</div>
	</template>
	<script>
	import selectBox2 from 'components/selectBox2.vue'
		export default{
		props:{
			backText:{
				 type: String,
           		  default:'返回'
			},
			curText:{
				 type: String,
           		 default: '详情'
			},
			curText2:{
				 type: String,
           		 default: '返回'
			},
			
		},
			data(){
				return {
					menu_active:{text:"列表"},
					dictId:'utilItems',
					selectShow:{isShow:false},
				}
			},
			components:{
				selectBox2
			},
			methods:{
				back:function(){
					this.$router.go(-1);
				},
				getSelectSex:function(modal){
				console.log(modal);
   			 		//this.selectShow=false;
   			 		if(modal.itemKey===2){
   			 		alert("催更")
   			 		}
   			 	},
   			 	getSexs:function(){
   			 		this.dictId="utilItems";
   			 		//console.log(this.selectShow)
   			 		this.selectShow={isShow:true}
   			 	},
   			 	goSearch:function(){
   			 		this.$router.push("/search");
   			 	}
			}
		}
	</script>
	<style scope>
		.select-type{

			position: absolute;

		}
	</style>