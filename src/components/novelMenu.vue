

<template>
 <transition name="slide-menu">
	 <div class="_full_router component-chat-detail contain-novelmenu "  v-show="visible" :novelChapterIds="novelChapterId" :value="value.isShow" @click="hide" >
		<div class="_full_inner">
		<!-- 	 <header class="app-header">
			<indexHeader></indexHeader>
			</header> -->
			<div class="app-content-novelmenu">
			<mt-loadmore :bottomAllLoaded="isbottomAllLoaded" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">{{novelChapterId}}
			  <ul class="menu-list">
			    <li v-for="(item, index) in list" @click="infoDetail(index)" :id="item.chapter_id"><input type="hidden" :value="item.chapter_id" />{{ item.name }}</li>
			  </ul>
			</mt-loadmore>
		</div>
		</div>

	</div>	
	</transition>
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
			visible:false,
			}
		},
		 props:{
      value:{
        type:Object,
        default:function() {
        return {
          isShow:false
        };
        }
      },
      novelChapterId:{
      	type:Number,
      	default:1,
      },
    },
    watch:{
       value(val) {
            this.visible = val.isShow;
            if( this.visible){
            	let that=this;
          //	that.$nextTick(function(){//数据加载完成
          	setTimeout(function(){
          		var srcolltop=(parseInt(that.novelChapterId)-1)*that.liheigth;
	    	 $(".app-content-novelmenu .menu-list li").removeClass("red");
			$("#"+that.novelChapterId).addClass("red");
			//$(".app-content-novelmenu").scrollTop(srcolltop)
			$(".contain-novelmenu ._full_inner").scrollTop(srcolltop)
          	},100)
	    	 
	    //	})
            }
          },
           visible(val) {
            this.value.isShow=true;
          },
          novelChapterId(val){
   //        	let that=this;
   //        	that.$nextTick(function(){//数据加载完成
	  //   	 var srcolltop=(parseInt(val)-1)*that.liheigth;
	  //   	 $(".app-content-novelmenu .menu-list li").removeClass("red");
			// 			  $("#"+val).addClass("red");
			// 			//   //$(".mint-loadmore-content").css("transform", "translate3d(0px, -"+srcolltop+"px, 0px)")
			// $(".app-content-novelmenu").scrollTop(srcolltop)
	  //   	})
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
			    	 hide:function(){
				     this.visible=false;
				    },
			    	initDbDataPouchD:function(){
			    		let that=this;
			    		this.myDb=pounchDbUtil.initDB("novelChapter");
			    		pounchDbUtil.getById(that.myDb,"chapter"+that.$route.query.novelId).then(function(data){
			    			that.list=data.data;
						   that.$nextTick(function(){//数据加载完成
						   	var chapterId=that.$route.query.chapterId?that.$route.query.chapterId:that.novelChapterId;
					    	 var srcolltop=(parseInt(chapterId)-1)*that.liheigth;
										  $("#"+chapterId).addClass("red");
										//   //$(".mint-loadmore-content").css("transform", "translate3d(0px, -"+srcolltop+"px, 0px)")
							//$(".app-content").scrollTop(srcolltop)
							$(".contain-novelmenu ._full_inner").scrollTop(srcolltop)
					    	})
			    		}).catch(function(data){
			    				if(data.name==="not_found"){
			    					 axios.get(global.URL_PREFIX+'/getChapters?novelId='+that.$route.query.novelId+"&offset="+that.offset)
									  .then(function (response) {
									  		that.list=response.data.results;
										   that.$nextTick(function(){//数据加载完成
										   		var chapterId=that.$route.query.chapterId?that.$route.query.chapterId:that.novelChapterId;
									    	 var srcolltop=(parseInt(chapterId)-1)*that.liheigth;
														  $("#"+chapterId).addClass("red");
														//   //$(".mint-loadmore-content").css("transform", "translate3d(0px, -"+srcolltop+"px, 0px)")
											//$(".app-content").scrollTop(srcolltop);
											$(".contain-novelmenu ._full_inner").scrollTop(srcolltop)
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
									$(".app-content-novelmenu").scrollTop(srcolltop)
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
									$(".app-content-novelmenu").scrollTop(srcolltop)
							    	})
						}
					})

			    	},
			    	infoDetail:function(index){
						//this.$router.push("/novelList/detail?novelId="+this.$route.query.novelId+"&novelChapterId="+this.list[index].chapter_id)
						this.$emit("upDateChapter",this.list[index].chapter_id)
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
	.contain-novelmenu {
		position: fixed;
      width: 100%;
      height: 100%;
      z-index: 999;
      left: 0;
      top: 0;
        background-color: rgba(0,0,0,.3); 
    transition: .8s all ease;
	}
	     ._full_inner{
	     	width: 80%;
	     	background: #fff;
	     	}    
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