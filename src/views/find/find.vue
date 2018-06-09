<template>
	<div class="contain-find">
		<div class="slider">
			<mt-swipe :auto="0">
			  <mt-swipe-item class="slide slide1 ">广告1</mt-swipe-item>
			  <mt-swipe-item class="slide slide2 ">广告2</mt-swipe-item>
			  <mt-swipe-item class="slide slide3 ">广告3</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="flex-chonse-contain">
		<div  class="flex-chonse">
			<div class="flex-item-1">
				<p>排行</p>
			</div>
			<div class="flex-item-1">
				<p>分类</p>
			</div>
			<div class="flex-item-1">
				<p>奇闻</p>
			</div>
			<div class="flex-item-1">
				<p>推送</p>
			</div>
		</div>
		</div>
		<div class="load-more">
		<ul v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" class="wechat-list">
			<li class="item _line-fine chat-item-transition" v-for="(item ,index) in infoLists">
				<div v-bind:index="index" class="info" v-on:click="infoDetail(index)">
				<div class="desc">
					<span>{{item.name}}</span>
					
				</div>
				<div class="time">{{item.createdAt}}</div>
			</div>
			</li>
		</ul>
		<p class="page-infinite-loading" v-show="loading"><span><div class="mint-spinner-fading-circle circle-color-76" style=" display:none;width: 28px; height: 28px;"><div class="mint-spinner-fading-circle-circle is-circle2"></div><div class="mint-spinner-fading-circle-circle is-circle3"></div><div class="mint-spinner-fading-circle-circle is-circle4"></div><div class="mint-spinner-fading-circle-circle is-circle5"></div><div class="mint-spinner-fading-circle-circle is-circle6"></div><div class="mint-spinner-fading-circle-circle is-circle7"></div><div class="mint-spinner-fading-circle-circle is-circle8"></div><div class="mint-spinner-fading-circle-circle is-circle9"></div><div class="mint-spinner-fading-circle-circle is-circle10"></div><div class="mint-spinner-fading-circle-circle is-circle11"></div><div class="mint-spinner-fading-circle-circle is-circle12"></div><div class="mint-spinner-fading-circle-circle is-circle13"></div></div></span>
      加载中...
    </p>
		</div>
		
	</div>
</template>
<script>
import Vue from 'vue'
import { Swipe, SwipeItem,InfiniteScroll } from 'mint-ui';
import axios from 'axios'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(InfiniteScroll);
export default{
	name:"find",
	data(){
		return {
			infoLists:[],
			loading:false
		}
	},
	created:function(){	 
      let that=this;
		 axios.get(global.URL_PREFIX+'?statusType=2')
		  .then(function (response) {
		  that.infoLists=response.data.results
		  that.setNovel(that.infoLists)
		  }).catch(function(err){
		        console.log(err);
		    })
    },
    methods:{
    	loadMore() {
  this.loading = false;
  setTimeout(() => {
    let last = this.infoLists[this.infoLists.length - 1];
    for (let i = 1; i <= 10; i++) {
      this.infoLists.push({name:"test"});
    }
    this.loading = false;
  }, 1000);
}
    }
}
</script>		
<style scoped>
.contain-find{
	height: 100%;
	display: -webkit-flex; /* Safari */
  			display: flex;
  			flex-direction:column; 
  			
}
.load-more{
	flex: 1;
	overflow: scroll;
}
	.slider{
		

		height: 10rem;
	}
	.flex-chonse-contain{
			/*flex-grow:1;*/
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

		.page-infinite-loading {
    text-align: center;
    height: 50px;
    line-height: 50px;
}
</style>