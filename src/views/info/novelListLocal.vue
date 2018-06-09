	<template>
	<div>
		<div class="_full_inner _scroll _effect component-chat" >
		<ul class="wechat-list">
			<li class="item _line-fine chat-item-transition" v-for="(item ,index) in infoLists">
				<div v-bind:index="index" class="info" v-on:click="infoDetail(index)">
				<div class="desc">
					<span>{{item.name}}</span>
					<button v-show="false" type="button" v-bind:index="index"  @click.stop.prevent="downloadnovel(index)">下载</button>
				</div>
			</div>
			</li>
		</ul>
		
		</div>
		<!-- children router-->
		 <transition name="slide-right">
		<router-view class="cover-transition"></router-view>
		</transition>
    </div>
	</template>
	<script>
	import axios from 'axios'
	import {mapGetters,mapActions} from 'vuex'
	import indexedDb from 'util/indexedDb'
	
	import pounchDbUtil from 'util/pounchDbUtil'
	export default{
	name:'ruleList',
	data () {
		return {
			infoLists:[
			],
			keyPath:"id",
			myDb:{},
			osname:"novels"

		}
	},
	computed:{
		...mapGetters({
				  "getVersion":"getVersion",
				  })
	},
	 created:function(){
      let that=this;
  						// indexedDb.initDb("novel",that.getVersion+1,function(v){//opensuccess里嵌套open不行
  						// 	  that.setDbVersion(v);
  						// 	var request=indexedDb.openDb("novel",that.osname,that.getVersion+1,that.keyPath,that.myDb,function(){
  						// 			that.getAllNovel();
								// 	that.setDbVersion(that.getVersion+1); 
  						// 	//that.myDb.db.close();			   
					   //     });//打开本地数据库//让ob跟书id绑定
					      	 

  						// },function(){
  						// 	that.getAllNovel();
  						// 	that.setDbVersion(that.getVersion+1); 
  						// 	//that.myDb.db.close();
  						// 	   that.setDbVersion(that.getVersion+1); 
  						// },that.osname,that.keyPath,that.myDb)	
  						that.myDb=pounchDbUtil.initDB("novel");
  						that.getPounchDbNovel();

    },
	methods:{
		getPounchDbNovel:function(){
			let that=this;
			that.myDb.allDocs({
			  include_docs: true,
			  attachments: true
			}).then(function(data){
				console.log(data)
				if(data.rows.length!==0){
					var newdata=data.rows.filter(function(item,index){
						if(item.doc.downstatue){
							return item;
						}
							
						})
						newdata=newdata.map(function(item,index){
								return item.doc;
						})
					that.infoLists=newdata;
				}

			})
		},
		getAllNovel:function(){
			let that=this;
			console.log("data",that.infoLists)
			indexedDb.fetchStoreByCursor(that.myDb.db,that.osname,function(data){
						that.myDb.db.close();
						console.log("data",data)
						if(data.length===0){
							
						}else{
							var newdata=data.filter(function(item,index){
								return item.downstatue
							})
							that.infoLists=newdata;
						}
					})
		},
		downloadnovel:function(index){
			    	this.$router.push("/novelMenuDownload?novelId="+this.infoLists[index].id);
			    	
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
		infoDetail:function(index){
			// let that = this;
			// 			let novelId=this.infoLists[index].id;
  	// 					indexedDb.initDb("novel",that.getVersion+1,function(v){//opensuccess里嵌套open不行
  	// 						  that.setDbVersion(v);
  	// 						var request=indexedDb.openDb("novel",that.osname,that.getVersion+1,that.keyPath,that.myDb,function(){
			// 		       			that.getNovel(index);
			// 						that.setDbVersion(that.getVersion+1); 
  	// 						//that.myDb.db.close();			   
			// 		       });//打开本地数据库//让ob跟书id绑定
					      	 

  	// 					},function(){
  	// 						that.getNovel(index);
  	// 						that.setDbVersion(that.getVersion+1); 
  	// 						//that.myDb.db.close();
  	// 						  // that.setDbVersion(that.getVersion+1); 
  	// 					},that.osname,that.keyPath,that.myDb)	
  						let that = this;
						let novelId=this.infoLists[index].id;
						let novel=this.infoLists[index];
						this.myDb=pounchDbUtil.initDB("novel");
  						pounchDbUtil.getById(this.myDb,"novel"+novelId).then(function(data){
  							that.$router.push("/novelList/detail?novelId="+novelId);
  						}).catch(function(data){
  							console.log(data)
  							if(data.name==="not_found"){
  								novel.currentChapter=1;
								novel.downstatue=false;
  								pounchDbUtil.putData(that.myDb,"novel"+novelId,novel);
  								that.$router.push("/novelList/detail?novelId="+novelId);
  							}
  						})


			
		},
		...mapActions({
				"setNovel":"setNovel",
				   "setDbVersion":"setDbVersion"
			})
	}
}
	</script>
	<style scope>
	.desc  button{
		float: right;
		border: 1px;
		background: #26a2ff;
		color: #fff;
		padding: 6 12px;
	}
</style>