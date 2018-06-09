	<template>
	<div class="contian-list">
		<div class="_full_inner _scroll _effect component-chat" >
		<ul class="wechat-list">
			<li class="item _line-fine chat-item-transition" v-for="(item ,index) in infoLists">
				<div v-bind:index="index" class="info" v-on:click="infoDetail(index)">
				<div class="desc">
					<p>{{item.name}}</p>
					<button type="button" v-bind:index="index"  @click.stop.prevent="downloadnovel(index)">下载</button>
				</div>
				<!-- <div class="time">{{item.createdAt}}</div> -->
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
			//{name:'锻炼',"totalMomeny":"1000"},{name:'锻炼',"totalMomeny":"1000"}
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
	 	//var db=pounchDbUtil.initDB("novel");	 
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
		downloadnovel:function(index){
					let that = this;
						let novelId=this.infoLists[index].id;
						let novel=this.infoLists[index]
  						// indexedDb.initDb("novel",that.getVersion+1,function(v){//opensuccess里嵌套open不行
  						// 	  that.setDbVersion(v);
  						// 	var request=indexedDb.openDb("novel",that.osname,that.getVersion+1,that.keyPath,that.myDb,function(){
					   //     			that.getNovel(index);
								// 	that.setDbVersion(that.getVersion+1); 
		   
					   //     });//打开本地数据库//让ob跟书id绑定
					      	 

  						// },function(){
  						// 	that.getNovel(index);
  						// 	that.setDbVersion(that.getVersion+1); 
  						// },that.osname,that.keyPath,that.myDb)	
  						 that.myDb=pounchDbUtil.initDB("novel");
  						pounchDbUtil.getById(this.myDb,"novel"+novelId).then(function(data){
  							that.$router.push("/novelMenuDownload?novelId="+that.infoLists[index].id);
  						}).catch(function(data){
  							console.log(data)
  							if(data.name==="not_found"){
  								novel.currentChapter=1;
								novel.downstatue=false;
  								pounchDbUtil.putData(that.myDb,"novel"+novelId,novel);
  							that.$router.push("/novelMenuDownload?novelId="+that.infoLists[index].id);
  							}
  						})
			    	
			    	
		},
	
		infoDetail:function(index){
			let that = this;
						let novelId=this.infoLists[index].id;
						let novel=this.infoLists[index]
  						// indexedDb.initDb("novel",that.getVersion+1,function(v){//opensuccess里嵌套open不行
  						// 	  that.setDbVersion(v);
  						// 	var request=indexedDb.openDb("novel",that.osname,that.getVersion+1,that.keyPath,that.myDb,function(){
					   //     			that.getNovel(index);
								// 	that.setDbVersion(that.getVersion+1); 
		   
					   //     });//打开本地数据库//让ob跟书id绑定
					      	 

  						// },function(){
  						// 	that.getNovel(index);
  						// 	that.setDbVersion(that.getVersion+1); 
  						// },that.osname,that.keyPath,that.myDb)	
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
					novel.downstatue=false;
					  indexedDb.addData(that.myDb.db,that.osname,[novel]);
					  that.myDb.db.close();
					  that.$router.push("/novelList/detail?novelId="+novelId+"&novelChapterId=1");
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
	<style scoped>
	.contian-list{
		height: 100%;
	}
	.desc {
		width: 100px;
		margin:0 auto;
		text-align: center;
	}
	.desc p{
		height: 38px;
		line-height: 38px;
	}
	.desc  button{
	float: none;
		border: 1px;
		background: #26a2ff;
		color: #fff;
		padding: 6 12px;

	}
	.time{
		font-size: 12px;
		margin-top: 6px;
		color: #999;
	}
	.wechat-list{
		display: flex;
		flex-wrap: wrap;
	}
	.component-chat .wechat-list .item{
		width: 50%;
	}
	._line-fine:not(:first-child)::before{
		height: 0px;
	}
	.component-chat .wechat-list .item:last-child:after{
		height: 0px;
	}
	.wechat-list .info .desc{
		text-align:center;
	}
</style>