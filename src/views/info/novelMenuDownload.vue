

<template>
	 <div class="_full_router component-chat-detail ">
		<div class="_full_inner">
			 <header class="app-header">
			<indexHeader  v-bind:back-text="topModel.backText"
			v-bind:cur-text='topModel.curText' 			
			></indexHeader>
			</header>
			<div class="app-content">
			<mt-checklist
			  title="下载列表"
			  alignt="left"
			  v-model="value"
			  :options="options">
			</mt-checklist>
			<div class="btn-fixed-bottom"><mt-button :disabled="!isActiveSelect" :class="{active: isActiveSelect }" @click="novelDownload" size="large" type="default">{{downname}}</mt-button></div>
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
	import { MessageBox , Toast} from 'mint-ui';
		export default{
			name:"novelMenu",
			data () {
		return {
			topModel:{
	   			 	curText:"下载",
	   			 	backText:"列表"
	   			 	},
			list:[],
			myDb:{},
			dbname:'novel',
			keyPaths:["chapter_id","novel_chapter_id"],
			keyPath:"chapter_id",
			isbottomAllLoaded:false,
			offset:0,
			offsetNum:100,
			downNum:100,
			value:[],
			osnovel:"novels",
			options : [
					  // {
					  //   label: '被禁用',
					  //   value: '值F',
					  //   disabled: false
					  // }
					]
			}
		},
		computed:{
			osname:function(){
					return  "chapter"+this.$route.query.novelId
				},
				downname:function(){
					return this.value.length===0?"请选择":"下载"
				},
				isActiveSelect:function(){
					return this.value.length!==0
				},
				osnames:function(){
					var chapter="chapter"+this.$route.query.novelId
					var content="novel_content"+this.$route.query.novelId
					return  [chapter,content]
				},
				...mapGetters({
				  "getVersion":"getVersion",
				  })
		},
			components: {
  			indexHeader
        
   			 },
   			  created:function(){
   			   		 let that=this;
   			  // indexedDb.initDb(that.dbname,that.getVersion+1,function(v){
   			  // 	that.setDbVersion(v);
   			  // 	 indexedDb.openDb(that.dbname,that.osnames,that.getVersion+1,that.keyPaths,that.myDb,function(){
   			  // 		 	that.initDbData();
   			  // 		 	that.setDbVersion(that.getVersion+1);
   			  // 		 	that.myDb.db.close();
   			  		 		
   			  // 		 });//打开本地数据库//让ob跟书id绑定
						
   			  // 			},function(){
  						// 	that.initDbData();
  						// 	that.setDbVersion(that.getVersion+1);
  							
  						// },that.osnames,that.keyPaths,that.myDb)
  						 this.myDb=pounchDbUtil.initDB("novelChapter");
  						 that.initPounchDbData();
   			  		
			    },
			    methods:{
			    	initPounchDbData:function(){
			    		let that=this;
			    		pounchDbUtil.getById(that.myDb,"chapter"+that.$route.query.novelId).then(function(data){
			    			console.log(data)
			    			if(data.error && data.reason==="missing"){
			    				var getNovelChapter=that.getNovelChapter();
   			  		 				getNovelChapter.then(function(response){
   			  		 					var res=[]
   			  		 					console.log(response)
   			  		 					 response.data.results.forEach(function(item,index){
   			  		 					 	item.downstatue=false
										  		res.push(item)
										  	});
   			  		 					//pounchDbUtil.mulPutDatas(that.myDb,["novel_id","chapter_id"],res,["novel_id","chapter_id"]);
   			  		 					// that.myDb.close()
   			  		 				})
   			  		 			}else{//如果有
   			  		 				var opts =[];
   			  		 				 var downstatus=0;
   			  		 				 data.data.forEach(function(item,index){
									  	index+=1;
									  	if(item.downstatue){
									  		downstatus++;
									  	}
									  	if((index)%that.downNum==0){
									  		let obj={label:"第"+(index-that.downNum+1)+"章~第"+index+"章",value:{start:index-that.downNum+1,end:index}}
									  		console.log(downstatus)
									  		if((downstatus)%that.downNum==0 && downstatus!=0){
									  				obj.disabled=true;
									  		}
									  		opts.push(obj);
									  		downstatus=0;
									  	}else if(index==data.length){
									  		var offset=data.length%that.downNum;
									  		let obj={label:"第"+(index-offset+1)+"章~第"+index+"章",value:{start:index-that.downNum+1,end:index}};
									  		if((downstatus)=== offset){
									  				obj.disabled=true;
									  		}
									  		opts.push(obj);
									  		downstatus=0;
									  	}
									  	});
   			  		 				// that.myDb.db.close();
   			  		 				 that.options=opts;
   			  		 			}
			    		}).catch(function(data){
			    				console.log(data)
			    				if(data.error && data.reason==="missing"){
			    				var getNovelChapter=that.getNovelChapter();
   			  		 				getNovelChapter.then(function(response){
   			  		 					var res=[]
   			  		 					console.log(response)
   			  		 					 response.data.results.forEach(function(item,index){
   			  		 					 	item.downstatue=false
										  		res.push(item)
										  	});
   			  		 					 	pounchDbUtil.putData(that.myDb,"chapter"+that.$route.query.novelId,{data:res});

   			  		 					//pounchDbUtil.mulPutDatas(that.myDb,["novel_id","chapter_id"],res,["novel_id","chapter_id"]);
   			  		 					// that.myDb.close();
   			  		 				})
   			  		 			}else{//如果有

   			  		 			}
			    		})
			    	},
			    	initDbData:function(){
			    		var that=this;
			    		indexedDb.fetchStoreByCursor(that.myDb.db,"chapter"+that.$route.query.novelId,function(data){
   			  		 			if(data.length===0){
   			  		 				var getNovelChapter=that.getNovelChapter();
   			  		 				getNovelChapter.then(function(response){
   			  		 					var res=[]
   			  		 					console.log(response)
   			  		 					 response.data.results.forEach(function(item,index){
   			  		 					 	item.downstatue=false
										  		res.push(item)
										  	});
   			  		 					 indexedDb.addData(that.myDb.db,"chapter"+that.$route.query.novelId,res);
   			  		 					 that.myDb.db.close();
   			  		 				})
   			  		 			}else{
   			  		 				 var opts =[];
   			  		 				 var downstatus=0;
   			  		 				 data.forEach(function(item,index){
									  	index+=1;
									  	if(item.downstatue){
									  		downstatus++;
									  	}
									  	if((index)%that.downNum==0){
									  		let obj={label:"第"+(index-that.downNum+1)+"章~第"+index+"章",value:{start:index-that.downNum+1,end:index}}
									  		console.log(downstatus)
									  		if((downstatus)%that.downNum==0 && downstatus!=0){
									  				obj.disabled=true;
									  		}
									  		opts.push(obj);
									  		downstatus=0;
									  	}else if(index==data.length){
									  		var offset=data.length%that.downNum;
									  		let obj={label:"第"+(index-offset+1)+"章~第"+index+"章",value:{start:index-that.downNum+1,end:index}};
									  		if((downstatus)=== offset){
									  				obj.disabled=true;
									  		}
									  		opts.push(obj);
									  		downstatus=0;
									  	}
									  	});
   			  		 				 that.myDb.db.close();
   			  		 				 that.options=opts;
   			  		 			}
   			  		 		})
			    	},
			    	getNovel:function(index){
						let that=this;
						let novel=that.infoLists[index];
						let novelId=novel.id;
						indexedDb.getDataByIndex(that.myDb.db,that.osname,novelId,that.keyPath,function(data){
							if(data){
								that.myDb.db.close();
								that.$router.push("/novelList/detail?novelId="+novelId+"&novelChapterId="+data.currentChapter);
							}else{
								novel.currentChapter=1;
								  indexedDb.addData(that.myDb.db,that.osname,[novel]);
								  that.myDb.db.close();
								  that.$router.push("/novelList/detail?novelId="+novelId+"&novelChapterId=1");
							}
								
						})
					},
			    	getNovelChapter:function(){
			    		var that=this;
			    		return axios.get(global.URL_PREFIX+'/getChapters?novelId='+this.$route.query.novelId+"&offset="+that.offset)
					  .then(function (response) {
					    //that.list=response.data.res
					 var opts =[];
					  response.data.results.forEach(function(item,index){
					  	index+=1;
					  	if((index)%that.downNum==0){
					  		console.log("mydb",that.myDb)

					  		opts.push({label:"第"+(index-that.downNum+1)+"章~第"+index+"章",value:{start:index-that.downNum+1,end:index}})
					  	}else if(index==response.data.results.length){
					  		var offset=response.data.results.length%that.downNum
					  		opts.push({label:"第"+(index-offset+1)+"章~第"+index+"章",value:{start:index-that.downNum+1,end:index}})
					  	}
					  	});
					  that.options=opts;
					  return response;
					  })
			    	},
			    	infoDetail:function(index){

						this.$router.push("/novelList/detail?novelId="+this.$route.query.novelId+"&novelChapterId="+this.list[index].chapter_id)
					},
			    		loadTop:function(){
							console.log("loadTop");
							 //...// 加载更多数据
							 let that=this;
					 axios.get(global.URL_PREFIX+'/getChapters?novelId='+this.$route.query.novelId+"&offset="+that.offset)
					  .then(function (response) {
					  var opts =[];
					  response.data.results.forEach(function(item,index){
					  	index+=1;
					  	if((index)%that.downNum==0){
					  		opts.push({label:"第"+(index-that.downNum+1)+"章~第"+index+"章",value:{start:index-that.downNum+1,end:index}})
					  	}else if(index==response.data.results.length){
					  		var offset=response.data.results.length%that.downNum
					  		opts.push({label:"第"+(index-offset+1)+"章~第"+index+"章",value:{start:index-that.downNum+1,end:index}})
					  	}
					  	});
					  that.options=opts;
					  }).catch(function(err){
					        console.log(err);
					    })
  						this.$refs.loadmore.onTopLoaded();
			    		},
			    		loadBottom:function(){
			    			console.log("loadBottom")
			    			
			    		},
			    		allLoaded:function(){

			    		},
			    		bottomAllLoaded:function(){
			    		},
			    		novelDownload:function(){
			    			let that=this;
			    			var datain="";
			    			that.value.forEach(function(item,index){
			    				for(var i=item.start;i<=item.end;i++){
			    					if(datain===""){
			    						datain+=i+"";
			    					}else{
			    						datain+=","+i;
			    					}
			    				}
			    			})
			    			that.download(datain);
			    			//axios.get('/api/getChapters?novelId='+this.$route.query.novelId+"&start="+that.offset)
			    		},
			    		download:function(value){
			    			let that=this;
			    			let novelId=that.$route.query.novelId;
			    		
							let instance = Toast('数据正在同步，请勿关闭此界面');
			    			axios.get(global.URL_PREFIX+'/downloadNovelContentById?novelId='+this.$route.query.novelId+"&in="+value).then(function(data){
			    				console.log(data);
			    				//this.myDb
			    			let contentmyDb=pounchDbUtil.initDB("novelContent");
			    			pounchDbUtil.mulPutDatas(contentmyDb,["novel_id","novel_chapter_id"],data.data.results,["novel_id","novel_chapter_id"]);//存储文章内容
			    			pounchDbUtil.getById(that.myDb,"chapter"+that.$route.query.novelId).then(function(doc){//更新詹杰
			    				if(doc.data){
			    					let downChapter=value.split(",");
			    					doc.data.forEach(function(item,index){
			    						if(downChapter.indexOf(item.chapter_id+"")!==-1){
			    							item.downstatue=true;
			    						}
			    					})
			    					pounchDbUtil.putData(that.myDb,"chapter"+that.$route.query.novelId,doc);
			    					let novelDb=pounchDbUtil.initDB("novel");
			  						pounchDbUtil.getById(novelDb,"novel"+novelId).then(function(doc){
			  								if(!doc.currentChapter)
			  								doc.currentChapter=1;
											doc.downstatue=true;
			  								pounchDbUtil.putData(novelDb,"novel"+novelId,doc);
			  								that.value.forEach(function(item){
			  									var j=0;
			  									for(var i=j;i<that.options.length;i++){
			  										if(that.options[i].value===item){
			  											//that.options[i].disabled=true;
			  											var newitem=that.options[i];
			  											newitem.disabled=true;
			  											that.options.splice(that.options[i], 1, newitem)
			  											j=i+1;
			  											break;
			  										}
			  									}
			  								})
			  								instance.close();
			  								MessageBox.confirm('数据同步成功，是否浏览此书?').then(action => {

			  								});
			  						}).catch(function(data){
			  							if(data.name==="not_found"){
			  								var novel={novel_id:novelId};
			  								novel.currentChapter=1;
											novel.downstatue=false;
			  								pounchDbUtil.putData(novelDb,"novel"+novelId,novel);
			  							}
			  						})
			    					//pounchDbUtil.putData(that.myDb,"chapter"+that.$route.query.novelId)//
			    				}
			    			})
			    	// 			indexedDb.initDb(that.dbname,that.getVersion+1,function(v){
   			  // 					that.setDbVersion(v);//失败处理
   			  // 	 				indexedDb.openDb(that.dbname,that.osname,that.getVersion+1,that.keyPath,that.myDb,function(){
   			  // 		 				indexedDb.addData(that.myDb.db,"novel_content"+data.data.results[0].novel_id,data.data.results);
			    	// 				data.data.results.forEach(function(item,index){
			    	// 					indexedDb.updateDataByKey(that.myDb.db,that.osname,item.novel_chapter_id,"downstatue",true);

			    	// 				})
			    	// 				indexedDb.updateDataByKey(that.myDb.db,that.osnovel,parseInt(that.$route.query.novelId),"downstatue",true);
   			  // 		 				that.setDbVersion(that.getVersion+1);
   			  // 		 				that.myDb.db.close();
   			  		 		
   			  // 					 });//打开本地数据库//让ob跟书id绑定
						
   			 	// 			 },function(){
  						// 	indexedDb.addData(that.myDb.db,"novel_content"+data.data.results[0].novel_id,data.data.results);
			    	// 				data.data.results.forEach(function(item,index){
			    	// 					indexedDb.updateDataByKey(that.myDb.db,that.osname,item.novel_chapter_id,"downstatue",true);
			    						
			    	// 				})
			    	// 				indexedDb.updateDataByKey(that.myDb.db,that.osnovel,parseInt(that.$route.query.novelId),"downstatue",true);
  						// 	that.setDbVersion(that.getVersion+1);
  						// 	that.myDb.db.close();
  						// },that.osname,that.keyPath,that.myDb)



					            });

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
		}
		.btn-fixed-bottom{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
		}
		.btn-fixed-bottom .active{
			background: #26a2ff;
			color:#fff;
		}
	</style>