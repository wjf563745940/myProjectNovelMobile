<template>
	<div class="">
		<div class="slider">
			登录
		</div>
		<div class="flex-chonse">
			<div class="flex-item-1">
				<p>充值</p>
			</div>
			<div class="flex-item-1">
				<p>资产</p>
			</div>
			<div class="flex-item-1">
				<p>包月</p>
			</div>
		</div>
		
	</div>
</template>
<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
</script>		
<style scoped>
	.slider{
		height: 10rem;
	}
	.slider .slide1{
		background: #0089dc;
	}
	.slider .slide2{
		background:#ffd705;
		}
		.slider .slide3{
		background:#ffd705;
		}
		.slider .slide{
			line-height: 10rem;
			text-align: center;
			font-size: 6rem;
		}
		.flex-chonse{
			display: -webkit-flex; /* Safari */
  			display: flex;
  			flex-direction:row ;
		}
		.flex-item-1{
			flex-grow: 1;
		}
		.flex-item-1 p{
			text-align: center;
		}
</style>