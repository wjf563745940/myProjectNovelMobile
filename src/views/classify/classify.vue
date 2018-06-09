<template>
	<div class="contain-classify">
		<div class="contatin-flex">
			<div class="flex-item item-classify-name">
				<ul class="">
					<li v-for="(item,index ) in classify" class="classify-li" @click="changeClass(item.type)"  v-bind:class="{ active: isActiveType==item.type}" >{{item.name}}</li>
				</ul>
			</div>
			<div class="flex-item-1">
				<div class="item-classify-content">
					<ul>
						<li class="item-classify-content-li" v-for="(item,index ) in classifyBoard" >{{item.name}}</li> 
					</ul>
				</div>
			</div>
		</div>	
	</div>
</template>
<script >
	export default{
		name:"classify",
		data(){
			return {classify:[{name:"男版",type:1},{name:"女版",type:2}],
			classifyBoards:[{name:"玄幻",type:1},{name:"奇幻",type:1},{name:"武侠",type:1},{name:"言情",type:2}],
			isActiveType:1,
			}
		},
		computed:{
			classifyBoard:function(){
				return this.classifyBoards.filter((item,i)=>{
					return item.type===this.isActiveType;
				});
				 
		}
	},
	methods:{
		changeClass:function changeClass(type){
			this.isActiveType=type;
		}
	}
}

</script>
<style scoped>
.contain-classify{
	height: 100%;
}
	.contatin-flex{
		 display: -webkit-flex; /* Safari */
  			display: flex;
  			flex-direction:row ;
  			height: 100%;
	}
	.item-classify-name{ 
		background: #faf7f0;
	 }
	.classify-li{
		width:5rem;
		text-align: center;
		height: 5rem;
		line-height: 5rem;
		border-bottom: 1px solid #f1f1f1;

	}
	.classify-li.active{
		border-left: 2px solid #fe0303;
		background: #fff;
	}
	.contatin-flex .flex-item-1 {
  flex-grow: 1; /* default 0 */
}
.item-classify-content-li{
	list-style-type: none;
	width: 7.5rem;
	float: left;
	text-align: center;
	height: 4rem;
	line-height: 4rem;
}
</style>			