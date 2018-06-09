<template>
 <transition name="slide-right">
	<div class="  contain-search">
		<div class="search-header">
			<div class="search-header-btn"> <button type="button" @click="back">返回</button></div>
			<div class="search-header-int"><input  type='text'v-model="input5" placeholder="请输入搜索关键字" /></div>
			<div class="search-header-btn"><button type="button" @click="searchNovelByName">搜索</button></div>
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
		 <input type="hidden" name="url" vlaue="novelurl">
		 <div class="grid-content bg-purple-dark">{{novelmessage}}<span>{{novelstatus}}</span></div>
		<button type="button" v-if="isShownovelBtn"  @click="addNovel">申请收录</button>
	</div>
</transition>
</template>
<script>
import Vue from 'vue'
import { Search } from 'mint-ui';

Vue.component(Search.name, Search);
export default {
	name:'search',
	data(){
		return {
			input5:'',
			result:[],
			 novelstatus:'',
      novelurl:'',
      novelmessage:'',
      isShownovelBtn:false,
		}
	},
	watch:{
		svalue:function(a,b){
				console.log(a,b,this.value)
		}
	},
	methods:{
		back:function(){
			this.$router.go(-1);
		},
		 searchNovelByName:function(){
		
      var that=this;
      if(this.input5!==""){
       axiosUtil.getNovelByName('name='+this.input5)
          .then(function (response) {
              let data=response.data.results.data
             if(data.errorCode==1){
              that.novelurl='';
              that.isShownovelBtn=false;
              that.novelmessage=data.message;
              that.novelstatus="";

            }else if(data.message.statusType){
              that.novelmessage=data.message.name;
              that.novelurl=data.message.href;
              that.novelstatus=data.message.statusName;
            }else{
               that.novelmessage=data.message.name;
              that.novelurl=data.message.href;
              that.isShownovelBtn=true;
              that.novelstatus="";
            }
          

          }).catch(function(err){
                console.log(err);
            })
      }else{
         this.$message({
          message: '请输入小说名称！',
          type: 'warning',
          duration:1500
        });
      }
    },
    addNovel:function(){
      var that=this;
      axiosUtil.addNovel('name='+that.novelmessage+'&novelurl='+encodeURI(that.novelurl))
          .then(function (response) {
              let data=response.data
              console.log(data)
            if(data.errorCode==1){
               alert( data.message)

            }else{
               alert( data.message)
       
            }    

          }).catch(function(err){
                console.log(err);
            })
    },
	}
}

</script>		
<style scoped>
.contain-search{
	    position: fixed;
    height: 100%;
    width: 100%;
    background: #fff;
    top:0;
    z-index: 5555;
     transition: .8s all ease;
}
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
		.page-right-to-left{
  		position: fixed;
      width: 100%;
      height: 100%;
      z-index: 999;
      left: 0;
      top: 0;
; 
    transition: .8s all ease;
}

.search-header{
	display: -webkit-flex; /* Safari */
  			display: flex;
  			flex-direction:row ;
  			background: #333;
  			height: 48px;
}
.search-header .search-header-btn{
	width: 60px;
	margin-top: 10px;
	
}
.search-header .search-header-btn button{
	width: 100%;
	height: 28px;
	line-height: 28px;
	color: #fff;
	font-size: 12px;
	border: none;
	text-align: center;
	background: rgba(0,0,0,0);
}
.search-header .search-header-int{
	flex-grow: 1;
}
.search-header .search-header-int input{
	width: 100%;
	height: 28px;
	margin-top: 10px;
}
</style>