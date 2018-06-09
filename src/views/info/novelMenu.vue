

<template>
	 <div class="_full_router component-chat-detail ">
		<div class="_full_inner">
			 <header class="app-header">
			<indexHeader></indexHeader>
			</header>
			<div class="app-content">
			<mt-loadmore :bottomAllLoaded="isbottomAllLoaded" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			  <ul class="menu-list">
			    <li v-for="(item, index) in list" @click="infoDetail(index)" :id="item.chapter_id"><input type="hidden" :value="item.chapter_id" />{{ item.name }}</li>
			  </ul>
			</mt-loadmore>
		</div>
		</div>

	</div>	

</template>
	<script>
	import axios from 'axios'
	import indexHeader from 'components/index-header2.vue'
	import {mapGetters,mapActions} from 'vuex'
	import webSql from 'util/webSql'
	import indexedDb from 'util/indexedDb'
	import pounchDbUtil from 'util/pounchDbUtil'
		export default{
			name:"novelMenu",
			data () {
		return {
			liheigth:36,
			list:[],
			isbottomAllLoaded:false,
			offset:0,
			offsetNum:100,
			keyPath:'chapter_id',
			myDb:{},
			}
		},
		computed:{
			osname:function(){
					return  "chapter"+this.$route.query.novelId
				},	
				...mapGetters({
				  "getVersion":"getVersion",
				  })
		},
			components: {
  			indexHeader
        
   			 },
   			 mounted: function () {//页面加载完成
   	
				  },
   			  created:function(){
   			  		 let that=this;
   			  			that.initDbDataPouchD();
			    },
			    methods:{
			    	initDbDataPouchD:function(){
			    		let that=this;
			    		this.myDb=pounchDbUtil.initDB("novelChapter");
			    		pounchDbUtil.getById(that.myDb,"chapter"+that.$route.query.novelId).then(function(data){
			    			that.list=data.data;
						   that.$nextTick(function(){//数据加载完成
					    	 var srcolltop=(parseInt(that.$route.query.chapterId)-1)*that.liheigth;
										  $("#"+that.$route.query.chapterId).addClass("red");
										//   //$(".mint-loadmore-content").css("transform", "translate3d(0px, -"+srcolltop+"px, 0px)")
							$(".app-content").scrollTop(srcolltop)
					    	})
			    		}).catch(function(data){
			    				if(data.name==="not_found"){
			    					 axios.get(global.URL_PREFIX+'/getChapters?novelId='+that.$route.query.novelId+"&offset="+that.offset)
									  .then(function (response) {
									  		that.list=response.data.results;
										   that.$nextTick(function(){//数据加载完成
									    	 var srcolltop=(parseInt(that.$route.query.chapterId)-1)*that.liheigth;
														  $("#"+that.$route.query.chapterId).addClass("red");
														//   //$(".mint-loadmore-content").css("transform", "translate3d(0px, -"+srcolltop+"px, 0px)")
											$(".app-content").scrollTop(srcolltop)
									    	})
									  }).catch(function(err){
									        console.log(err);
									    })
			    				}
			    		})
			    	},
			    	initDbData:function(){
			    		let that=this;
			    		 indexedDb.initDb("novel",that.getVersion+1,function(v){//opensuccess里嵌套open不行
  							  that.setDbVersion(v);
  							var request=indexedDb.openDb("novel",that.osname,that.getVersion+1,that.keyPath,that.myDb,function(){
					       			that.initData();
									that.setDbVersion(that.getVersion+1); 
  										   
					       });//打开本地数据库//让ob跟书id绑定
					      	 

  						},function(){
  							that.initData();
  							that.setDbVersion(that.getVersion+1); 
  							
  							  // that.setDbVersion(that.getVersion+1); 
  						},that.osname,that.keyPath,that.myDb)
			    	},
			    	initData:function(){
			    		let that=this;
					indexedDb.fetchStoreByCursor(that.myDb.db,"chapter"+that.$route.query.novelId,function(data){
						that.myDb.db.close();
						if(data.length===0){
							 axios.get(global.URL_PREFIX+'/getChapters?novelId='+that.$route.query.novelId+"&offset="+that.offset)
							  .then(function (response) {
							  		that.list=response.data.results;
								   that.$nextTick(function(){//数据加载完成
							    	 var srcolltop=(parseInt(that.$route.query.chapterId)-1)*that.liheigth;
												  $("#"+that.$route.query.chapterId).addClass("red");
												//   //$(".mint-loadmore-content").css("transform", "translate3d(0px, -"+srcolltop+"px, 0px)")
									$(".app-content").scrollTop(srcolltop)
							    	})
							  }).catch(function(err){
							        console.log(err);
							    })
						}else{
									that.list=data;
								   that.$nextTick(function(){//数据加载完成
							    	 var srcolltop=(parseInt(that.$route.query.chapterId)-1)*that.liheigth;
												  $("#"+that.$route.query.chapterId).addClass("red");
												//   //$(".mint-loadmore-content").css("transform", "translate3d(0px, -"+srcolltop+"px, 0px)")
									$(".app-content").scrollTop(srcolltop)
							    	})
						}
					})

			    	},
			    	infoDetail:function(index){
						this.$router.push("/novelList/detail?novelId="+this.$route.query.novelId+"&novelChapterId="+this.list[index].chapter_id)
					},
			    		loadTop:function(){
						// 	console.log("loadTop");
						// 	 //...// 加载更多数据
						// 	 let that=this;
					 // axios.get(global.URL_PREFIX+'/getChapters?novelId='+this.$route.query.novelId+"&offset="+that.offset)
					 //  .then(function (response) {
					 //  that.list=response.data.results
					 //  }).catch(function(err){
					 //        console.log(err);
					 //    })
  				// 		this.$refs.loadmore.onTopLoaded();
			    		},
			    		loadBottom:function(){
			    			console.log("loadBottom")
			   //  			 let that=this;
			   //  			 that.offset=that.offset+that.offsetNum;
					 // axios.get(global.URL_PREFIX+'/getChapters?novelId='+this.$route.query.novelId+"&offset="+that.offset)
					 //  .then(function (response) {
					 //  that.list=response.data.results
					 //  }).catch(function(err){
					 //        console.log(err);
					 //    })
			    		},
			    		allLoaded:function(){

			    		},
			    		bottomAllLoaded:function(){
			    		},
			    		...mapActions({
				        "setDbVersion":"setDbVersion"
				    })

			    }
		}
	</script>
	<style scoped>
		.app-content{
			overflow-y: auto;
			padding-left:  12px;
			padding-right: 12px;
		}
		.menu-list li{
			border-bottom: 1px solid #eee;
			height: 36px;
			line-height: 36px;
		}
		.red{
			color:#26a2ff;
		}
	</style>