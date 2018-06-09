<template>
	 <div class="_full_router component-chat-detail ">
		<div class="_full_inner">
			 <header class="app-header">
			<indexHeader ></indexHeader>
			</header>

	
			<div class="app-content">
					<div class="group-buttons" v-show="false">
					<mt-button type="primary" size="small" v-if="showprebtn" @click="preChapterStepPouchDb">上一章</mt-button>
					<mt-button type="primary" size="small" @click="showMenu">目录</mt-button>
					<mt-button type="primary" size="small" @click="nextChapterSetpPouchDb">下一章</mt-button>
				</div>
				<p class="novel-content"  v-html="novelConetnt" @click="showwork" v-bind:style="{ background:backgroundStyle,color: fontColor, fontSize: fontSize + 'px' }" :class="fontStyle">
					{{novelConetnt}}
				</p>	
			<div class="group-buttons" v-show="false">
					<mt-button type="primary" size="small" v-show="showprebtn" @click="preChapterStepPouchDb">上一章</mt-button>
					<mt-button type="primary" size="small"  @click="showMenu">目录</mt-button>
					<mt-button type="primary" size="small" @click="nextChapterSetpPouchDb">下一章</mt-button>
				</div>
			</div>
		</div>
		 <!-- router -->
		
		 <transition name="slide-bottom"><div class="contain-work group-buttons" v-show="workShow">
		 	{{rangeValue}}
		 	<mt-range 
			  v-model="rangeValue"
			  :min="1"
			  :max="rangeMax"
			  :step="1"
			  :bar-height="10" @click="showChapterDetail">
			</mt-range>
		 	<mt-button type="primary" size="small" v-if="showprebtn" @click="preChapterStepPouchDb">上一章</mt-button>
					<mt-button type="primary" size="small" @click="showMenu">目录</mt-button>
					<mt-button type="primary" size="small" @click="nextChapterSetpPouchDb">下一章</mt-button>
					<mt-button type="primary" size="small" @click="cuigeng">催更</mt-button>
					<mt-button type="primary" size="small" @click="setStyle">设置</mt-button>
				</div></transition>
				 <transition name="slide-bottom"><div class="contain-work set-work group-buttons" v-show="setShow">
				 	<div class="set-contain-flex">
				 		<div>
				 			<button type="button" class="flex-1" @click="fontSizeSub">A-</button> <div class="flex-1">{{fontSize}} </div><button class="flex-1" type="button" @click="fontSizeAdd">A+</button><button class="flex-1" type="button">选择字体</button>
				 		</div>
				 		<div>
				 			<div class="flex-1" v-for="(item ,index) in fontStyles" @click="changeFontStyle(item)"><button type="button">{{item.name}}</button></div>
				 			
				 			<div class="flex-1"><button type="button">自定义</button></div>
				 		</div>
				 		<div>
				 			<div class="flex-1" v-for="(item,index) in backgroundStyles" @click="changeBackground(item)"><button type="button">{{item.name}}</button></div>
				 			
				 		</div>
				 	</div>
		 </div></transition>
				<div class="chapter-detail" v-show="chapterDetailShow">
						<p>正文{{chapterTitle}}</p>
						<p>{{rangeValue}}/{{rangeMax}}   ({{rangechapter}}%)</p>

				</div>
		<novelMenu @upDateChapter="upDateChapter" :novelChapterId="currtChater" v-model="selectShow2"></novelMenu>

        <router-view ></router-view>
	</div>	

</template>
	<script>
	import axios from 'axios'
	import {mapGetters,mapActions} from 'vuex'
	import indexHeader from 'components/index-header2.vue'
	import novelMenu from 'components/novelMenu'
	import indexedDb from 'util/indexedDb'
	import pounchDbUtil from 'util/pounchDbUtil'
	import { MessageBox , Toast,Range} from 'mint-ui';
		Vue.component(Range.name, Range);
		export default{
			name:"infodetail",
			data () {
		return {
			chapterDetailShow:false,
			chapterTitle:'',
			rangeValue:1,
			rangeMax:100,
			dbname:'novel',
			novelConetnt:'',
			currtChater:1,
			myDb:{},
			myNovelDb:{},
			keyPath:"novel_chapter_id",
			osnovel:"novels",
			selectShow2:{isShow:false},
			workShow:false,
			setShow:false,
			myChapterDb:'',
			chapterList:[],
			fontColor:"#333",
			fontSize:"18",
			backgroundStyle:'#fff',
			fontStyle:"fontStleNomal",
			fontStyles:[{name:'正常',value:"fontStleNomal"},{name:'宽松',value:"fontStleSong"},{name:'密集',value:"fontStleMi"}],
			backgroundStyles:[{name:'白色',value:'#fff'},{name:'浅黄',value:'#ffe9b6'}]
			}
		},
		watch:{
			rangeValue(val){
				let that=this;
				if(!this.chapterDetailShow) this.chapterDetailShow=true;
				this.chapterTitle=this.chapterList[val-1].name;
				// setTimeout(function(){
				// 	if(that.rangeValue===val){
				// 		alert("ting le")
				// 	}
				// },1500)
			}
		},
		computed:{
				rangechapter:function(){
					return (this.rangeValue/this.rangeMax*100).toFixed(2);
				},
				showprebtn:function(){
					return !(this.currtChater==1)
				},
				osnames:function(){
					var novel="novels"
					var content= "novel_content"+this.$route.query.novelId
					return [novel,content];
				},
				osname:function(){
					return "novel_content"+this.$route.query.novelId;
				},
				...mapGetters({
				  "getVersion":"getVersion",
				  })
			},
			components: {
  			indexHeader,
       		 novelMenu
   			 },
   			 mounted:function(){
   			 	var that=this;
   			  	
   			 		    
   			 },
   			  created:function(){
   			  	var that=this;

  						// that.currtChater=that.$route.query.novelChapterId;
  						// indexedDb.initDb("novel",that.getVersion+1,function(v){//opensuccess里嵌套open不行
  						// 	  that.setDbVersion(v);
  						// 	var request=indexedDb.openDb("novel",that.osname,that.getVersion+1,that.keyPath,that.myDb,function(){
					   //     			that.initDbdata();
								// 	that.setDbVersion(that.getVersion+1); 	   
					   //     });//打开本地数据库//让ob跟书id绑定
					      	 

  						// },function(){
  						// 	that.initDbdata();
  						// 	that.setDbVersion(that.getVersion+1); 

  						// },that.osname,that.keyPath,that.myDb)
  						this.initchapterListDbDataPouchD();
  						 this.myNovelDb=pounchDbUtil.initDB("novel");
			  						pounchDbUtil.getById(this.myNovelDb,"novel"+that.$route.query.novelId).then(function(doc){
			  							console.log(doc);
			  								if(!that.$route.query.novelChapterId){
			  									 that.currtChater=parseInt(doc.currentChapter);
			  									 
			  									}else{
			  										 that.currtChater=parseInt(that.$route.query.novelChapterId);
			  										 doc.currentChapter=parseInt(that.$route.query.novelChapterId);
			  										pounchDbUtil.putData(that.myNovelDb,"novel"+that.$route.query.novelId,doc)
			  									}
			  									 that.myDb=pounchDbUtil.initDB("novelContent");
					  						
											 that.initPounchDbData();	
			  								
			  						}).catch(function(data){
			  							console.log(data ,94)
			  							if(data.name==="not_found"){
			  								 axios.get(global.URL_PREFIX+'?id='+that.$route.query.novelId).then(function(data){
			  								 	console.log(data.data.results[0])
			  								 	 that.currtChater=1;
			  								 	 var doc=data.data.results[0];
			  								 	 doc.currentChapter=1;
			  								 	pounchDbUtil.putData(that.myNovelDb,"novel"+that.$route.query.novelId,doc);
			  								 	that.myDb=pounchDbUtil.initDB("novelContent");
					  						
											 that.initPounchDbData();
			  								 })
			  						// 		var novel={novel_id:novelId};
			  						// 		novel.currentChapter=1;
											// novel.downstatue=false;
			  						// 		pounchDbUtil.putData(novelDb,"novel"+novelId,novel);
			  							}
			  						})	
  					         
 		
			    },
			    methods:{
			    	changeFontStyle:function(item){
			    		this.fontStyle=item.value;
			    	},
			    	changeBackground:function(item){
			    		this.backgroundStyle=item.value;
			    	},
			    	fontSizeAdd:function(){
			    		this.fontSize++;
			    	},
			    	fontSizeSub:function(){
			    		if(this.fontSize>12)this.fontSize--;
			    	},
			    	initchapterListDbDataPouchD:function(){
			    		let that=this;
			    		this.myChapterDb=pounchDbUtil.initDB("novelChapter");
			    		pounchDbUtil.getById(that.myChapterDb,"chapter"+that.$route.query.novelId).then(function(data){
			    			that.chapterList=data.data;
			    			that.rangeMax=that.chapterList.length;
						  
			    		}).catch(function(data){
			    				if(data.name==="not_found"){
			    					 axios.get(global.URL_PREFIX+'/getChapters?novelId='+that.$route.query.novelId+"&offset="+that.offset)
									  .then(function (response) {
									  		that.chapterList=response.data.results;
									  		that.rangeMax=that.chapterList.length;
										
									  }).catch(function(err){
									        console.log(err);
									    })
			    				}
			    		})
			    	},
			    	showChapterDetail:function(){
			    		
			    		if(!chapterDetailShow) chapterDetailShow=true;
			    	},
			    	cuigeng:function(){
			    		Toast({
						  message: '暂未实现此功能，请联系管理员！！',
						  position: 'bottom',
						  duration: 3000
						});
			    	},
			    	setStyle:function(){
			    		this.setShow=true;
			    	},
			    	showwork:function(e){
			    		this.setShow=false;
			    		this.chapterDetailShow=false;
			    		var $appcontent=$(".component-chat-detail .app-content")
			    		var scrolltopnow=$appcontent.scrollTop();
			    		if(e.pageY<$("body").height()/3){
			    			$appcontent.scrollTop(scrolltopnow-$("body").height()/3*2)
			    		}else if(e.pageY>$("body").height()/3*2){
			    			$appcontent.scrollTop(scrolltopnow+$("body").height()/3*2)
			    		}else{
			    			this.workShow=!this.workShow;
			    		}
			    	},
			    	upDateChapter:function(chapterId){
			    		var that=this;
			  						pounchDbUtil.getById(this.myNovelDb,"novel"+that.$route.query.novelId).then(function(doc){
			  							console.log(doc);
			  							
			  										 that.currtChater=parseInt(chapterId);
			  										 doc.currentChapter=parseInt(chapterId);
			  										pounchDbUtil.putData(that.myNovelDb,"novel"+that.$route.query.novelId,doc)
			  						
			  									 that.myDb=pounchDbUtil.initDB("novelContent");
					  						
											 that.initPounchDbData();	
			  								
			  						})
			    	},
			    	initPounchDbData:function(){
			    		 	let that=this;
			    		pounchDbUtil.getById( that.myDb,"novel_id"+that.$route.query.novelId+"novel_chapter_id"+that.currtChater).then(function(data){
			    				console.log("indodetail",data)
			    			that.novelConetnt=data.content
			    		}).catch(function(data){
			    			console.log("indodetail",data)
			    			if(data.name==="not_found"){
			    				axios.get(global.URL_PREFIX+'/novelContentById?novelId='+that.$route.query.novelId+"&novelChapterId="+that.currtChater)
										  .then(function (response) {
										  	 that.novelConetnt=response.data.results.content
										  }).catch(function(err){
										        console.log(err);
										    })
			    			}
			    		})
			    	},
			    	initDbdata:function(){
			    		var that=this;
			    		that.updateWathced();
			    		indexedDb.getDataByIndex(that.myDb.db,that.osname,that.currtChater,that.keyPath,function(data){
			    			that.myDb.db.close();
						  				if( data && data.content){
						  					that.novelConetnt=data.content
						  				}else{
						  					axios.get(global.URL_PREFIX+'/novelContentById?novelId='+that.$route.query.novelId+"&novelChapterId="+that.currtChater)
										  .then(function (response) {
										  	 that.novelConetnt=response.data.results.content
										  }).catch(function(err){
										        console.log(err);
										    })
						  				}
						  				
						  	})
			    	},
			    	updateWathced:function(){
			    		let that=this;
			    		indexedDb.updateDataByKey(that.myDb.db,that.osnovel,parseInt(that.$route.query.novelId),"currentChapter",that.currtChater);
			    	},
			    	updateWathcedPouchDb:function(){
			    		let that=this;
			    		pounchDbUtil.updateData(that.myNovelDb,"novel"+that.$route.query.novelId,{currentChapter:that.currtChater});
			    	//	pounchDbUtil.updateData(that.myDb,"novel"+that.$route.query.novelId,{currentChapter:that.currtChater})
			    	},
			    	nextChapter:function(){
			    		let that=this;
			    		that.currtChater=parseInt(that.currtChater)+1;
			    		indexedDb.initDb(that.dbname,that.getVersion,function(v){//opensuccess里嵌套open不行
  							  that.setDbVersion(v);
  							var request=indexedDb.openDb(that.dbname,that.osname,that.getVersion+1,that.keyPath,that.myDb,function(){
					       		//	that.initDbdata();
					       		that.nextChapterSetp();
  							//that.myDb.db.close();			   
					       });//打开本地数据库//让ob跟书id绑定
					      	 

  						},function(){
  							//that.initDbdata();
  								that.nextChapterSetp();

  							//that.myDb.db.close();
  							  // that.setDbVersion(that.getVersion+1); 
  						},that.osname,that.keyPath,that.myDb);	
			    		
			    	},
			    	nextChapterSetpPouchDb:function(){
			    		let that=this;
			    		that.currtChater=parseInt(that.currtChater)+1;
			    		that.updateWathcedPouchDb();
			    		that.getNovelContentPouchDb();
			    	},
			    	nextChapterSetp:function(){
			    		let that=this;
			    		that.updateWathced();
			    		indexedDb.getDataByIndex(that.myDb.db,that.osname,that.currtChater,that.keyPath,function(data){
			    			that.myDb.db.close();
						  				if(data && data.content){
						  					that.novelConetnt=data.content
						  				}else{
						  					axios.get(global.URL_PREFIX+'/novelContentById?novelId='+that.$route.query.novelId+"&novelChapterId="+that.currtChater)
										  .then(function (response) {
										  	 that.novelConetnt=response.data.results.content
										  }).catch(function(err){
										        console.log(err);
										    })
						  				}
						  				
						  	}) 
			    	},
			    	preChapter:function(){
			    		let that=this;
			    		that.currtChater=parseInt(that.currtChater)-1;
			    		indexedDb.initDb(that.dbname,that.getVersion,function(v){//opensuccess里嵌套open不行
  							  that.setDbVersion(v);
  							var request=indexedDb.openDb(that.dbname,that.osname,that.getVersion+1,that.keyPath,that.myDb,function(){
					       		//	that.initDbdata();
					       		that.preChapterStep();
  							//that.myDb.db.close();			   
					       });//打开本地数据库//让ob跟书id绑定
					      	 

  						},function(){
  							//that.initDbdata();
  								that.preChapterStep();

  							//that.myDb.db.close();
  							  // that.setDbVersion(that.getVersion+1); 
  						},that.osname,that.keyPath,that.myDb);	
			    	},
			    	preChapterStepPouchDb:function(){
			    		let that=this;
			    		that.currtChater=parseInt(that.currtChater)-1;
			    		that.updateWathcedPouchDb();
			    		that.getNovelContentPouchDb();

			    	},
			    	preChapterStep:function(){
			    		let that=this;
			    		that.updateWathced();
			    		indexedDb.getDataByIndex(that.myDb.db,that.osname,that.currtChater,that.keyPath,function(data){
			    			that.myDb.db.close();
						  				if(data && data.content){
						  					that.novelConetnt=data.content
						  				}else{
						  					 axios.get(global.URL_PREFIX+'/novelContentById?novelId='+that.$route.query.novelId+"&novelChapterId="+that.currtChater)
											  .then(function (response) {
											  that.novelConetnt=response.data.results.content
											  }).catch(function(err){
											        console.log(err);
						  				})
									}
						
			    	})
			    	},
			    	getMenu:function(){
			    		var that=this;
			    		this.$router.push("/novelMenu?novelId="+this.$route.query.novelId+"&chapterId="+that.currtChater)
			    	},
			    	showMenu:function(){
			    		this.selectShow2={isShow:true};
			    	},
			    	getNovelContentPouchDb:function(){
			    		let that=this;
			    		pounchDbUtil.getById( that.myDb,"novel_id"+that.$route.query.novelId+"novel_chapter_id"+that.currtChater).then(function(data){
			    				console.log("indodetail",data)
			    			that.novelConetnt=data.content
			    			that.$nextTick(function(){
										  	$(".app-content").scrollTop(0)	
										  	}) 
			    		}).catch(function(data){
			    			console.log("indodetail",data)
			    			if(data.name==="not_found"){
			    				axios.get(global.URL_PREFIX+'/novelContentById?novelId='+that.$route.query.novelId+"&novelChapterId="+that.currtChater)
										  .then(function (response) {
										  	 that.novelConetnt=response.data.results.content
										  	that.$nextTick(function(){
										  	$(".app-content").scrollTop(0)	
										  	}) 
										  }).catch(function(err){
										        console.log(err);
										    })
			    			}
			    		})
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
		.group-buttons{
			text-align: center;
		}
		.novel-content{
			padding: 12px;
		}
		.contain-work{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100px;
			background: rgba(0,0,0,0.8);
			z-index: 11;
			 transition: .4s all ease;
		}
		.set-work{
			height: 120px;
			background: rgb(11,11,11);
			z-index: 9999;
		}
		.chapter-detail{
			position: fixed;
			bottom: 120px;
			left: 10%;
			width: 80%;
			background: rgba(0,0,0,.8);
			z-index: 9998;
			color: #fff;
			border-radius: 5px;
			padding: 6px;
			font-size: 12px;
		}
		.set-contain-flex > div{
			color: #aaa;
			display: flex;
			margin: 12px;

		}
		.set-contain-flex > div button{
			background: none;
			border: 1px solid #999;
			color: #666;
		}
		.flex-1{
			flex-grow: 1;
		}
		.fontStleNomal{
			line-height: 150%;
			letter-spacing: 2px;
		}
		.fontStleSong{
			line-height: 200%;
			letter-spacing: 8px;
		}
		.fontStleMi{
			line-height: 110%;
			letter-spacing: 0px;
		}
	</style>