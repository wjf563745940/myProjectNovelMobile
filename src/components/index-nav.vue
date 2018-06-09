	<template>
		<nav class="nav" style="background:#999;">
        <dl v-for="item in index_nav" >
        <router-link :to="item.path">
            <dt class="iconfont" >
                <!-- <i v-if="item.hint.count" v-text="item.hint | get_prompt " :class="'_news-'+item.hint.type"></i> -->
            </dt>
            <dd v-text="item.text"></dd>
            </router-link>
        </dl>
    </nav>
	</template>	
<script>
export default{
	
	data:function(){
	return {
			"index_nav":[{text:"书架", path: {
                            path: '/novelList'
                        	}
                        },
                        {text:"本地" ,path: {//联网后下载的内容地区
                            path: '/novelListLocal'
                                        }
                    	},
                         {text:"分类" ,path: {//分类查询
                            path: '/classify'
                                        }
                        },
                         {text:"发现" ,path: {//联网后下载的内容地区
                            path: '/find'
                                        }
                        },
                         {text:"我的" ,path: {//联网后下载的内容地区
                            path: '/personal'
                                        }
                        },
                        ]
	}
	}
}

</script>
    <style scoped>
            .nav a{
                    text-decoration-line: none;
                    color:#333;
            }

           .nav a.router-link-active{
            color: #26aded;
           }
    </style>