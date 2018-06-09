<template>
<transition name="jb">
	<div v-show="visible" :value="value.isShow" class="my-selectbox-bg"> 	
	<div class="my-selectbox">
				<ul class="wechat-list">
					<li class="item _line-fine" v-for="(item ,index) in infoLists">
						<div v-bind:index="index" class="info2">
						<div class="desc" @click="selectBox(item.itemKey)">
							<span >{{item.itemValue}}</span>
							<input v-if="radioShOW" @click.stop="selectBox(item.itemKey)" class="float-r" v-bind:value="item.itemKey" type="radio" name="item" v-bind:checked="item.isactive" />
						</div>
					</div>
					</li>
				</ul>
				
	</div>
	<div class="mask" @click="hide"></div>
	</div>
	</transition>
</template>
<script> 
import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				sexLists:[],
				visible:false
			}
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
			selectBox:function(index){
				this.select_item(index);
				var user=this.getItem;
				console.log(user);
				this.$emit("selectIndex",user);
				this.visible=false;
			},
			hide:function(){
				this.visible=false;
			},
			...mapActions({
				"select_dict":"select_dict",
				"select_item":"select_item"
			})
		},
		props:{
			dictId:{type: String,
	           	default:''},
           	value:{
           		type:Object,
				default:function() {
				return {
					isShow:false
				};
				}
			},
			radioShOW:{
				TYPE:Boolean,
				default:true
			}
		},
		computed:{
		infoLists:function(){
		return this.getDict;
		},
		...mapGetters({
		"getSexDict":"getSexDict",
		"getDict":"getDict",
		"getItem":"getItem"
		})
		},
		created:function(){
			this.select_dict(this.dictId);
		}
	}
	</script>
<style scope>
.wechat-list{
	list-style: none;
}
  .wechat-list li{
  	border-bottom: 1px solid #fff;
  	}  
  	.wechat-list li:last-child{
  			border-bottom: none;
  	}
.mask{
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.1);
	position: fixed;
	z-index: 11;
	left: 0;
	top: 0;
}
.desc input{
	margin-top: 10px;
}
	.my-selectbox{
		width: 120px;
		position: absolute;
		top:0;
		right: 0;
		z-index: 99;
		padding: 12px 20px;
    	font-size: 12px;
    	transition: .3s opacity ease;
    	margin-left: 5%;
    	text-align: left;
    	background: #111;
    border: 1px solid #111;
    color:#fff;
    box-shadow: 2px 2px 6px rgba(1,1,1,0.6);
	}
	.my-selectbox .wechat-list .item{
		height: 44px;
		line-height: 44px;
		text-indent: 12px;
	}
		.jb-enter {
	    opacity:0;
	}
	.jb-leave-active {
	     opacity:0;
	}
		.my-selectbox-bg{
	position: fixed;
height: 100%;
top: 44px;
right:6px;
z-index: 3;
	}
	</style>