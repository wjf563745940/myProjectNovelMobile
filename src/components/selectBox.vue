<template>
<transition name="jb">
	<div v-if="" class="my-selectbox-bg">	
	<div class="my-selectbox">
		<h3>性别</h3>
				<ul class="wechat-list">
					<li class="item _line-fine" v-for="(item ,index) in infoLists">
						<div v-bind:index="index" class="info2">
						<div class="desc">
							<span>{{item.itemValue}}</span>
							<input @click="selectBox(item.itemKey)" class="float-r" v-bind:value="item.itemKey" type="radio" name="item" v-bind:checked="item.isactive" />
						</div>
					</div>
					</li>
				</ul>
				
	</div>
	<div class="mask" @click="hide()"></div>
	</div>
	</transition>
</template>
<script> 
import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				sexLists:[]
			}
		},
		methods:{
			selectBox:function(index){
				this.select_item(index);
				var user=this.getItem;
				user.selectBoxId=this.selectBoxId;
				this.$emit("selectIndex",user);
			},
			hide:function(){
				
			},
			...mapActions({
				"select_dict":"select_dict",
				"select_item":"select_item"
			})
		},
		props:{
		dictId:{type: String,
           	default:''},
           	selectBoxId:{
           		type:String,
           		default:''
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
<style>
.mask{
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.45);
	position: fixed;
	z-index: 11;
	left: 0;
	top: 0;
}
.desc input{
	margin-top: 10px;
}
	.my-selectbox{
		width: 90%;
		position: fixed;
		top: 30%;
		left: 0;
		z-index: 99;
		padding: 12px 20px;
    	font-size: 12px;
    	transition: .3s opacity ease;
    	margin-left: 5%;
    	text-align: left;
    	background: #fafafa;
    border: 1px solid #eee;
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
top: 0;
z-index: 3;
	}

	</style>