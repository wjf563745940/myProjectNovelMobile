const routes = [
//信息列表
{
  path: '/novelList',
  name: 'novelList',
  component: resolve => {
    require(['views/info/novelList.vue'], resolve)
  },
    children: [
      {path: 'detail',component: resolve=>{
        require(['views/info/infoDetail.vue'],resolve)
      }}
    ]
},
{
  path: '/novelListLocal',
  name: 'novelListLocal',
  component: resolve => {
    require(['views/info/novelListLocal.vue'], resolve)
  },
    children: [
      {path: 'detail',component: resolve=>{
        require(['views/info/infoDetail.vue'],resolve)
      }}
    ]
},
{
    path:'/novelMenu',
    name:'novelMenu',
    component:resolve=>{
      require(['views/info/novelMenu.vue'],resolve);
    }
},
{
    path:'/novelMenuDownload',
    name:'novelMenuDownload',
    component:resolve=>{
      require(['views/info/novelMenuDownload.vue'],resolve);
    }
},
{
  path: '/',
  name: 'index',
  redirect:'/novelList'
},
//设置列表
{
  path: '/novelFind',
  name: 'novelFind',
  component: resolve => {
    require(['views/setting/novelFind.vue'], resolve)
  },
    children: [
        {
          path:'deviceApi',name:'deviceApi',
          component:resolve=>{
            require(['views/setting/deviceApi'],resolve);
          },
          children:[
            {
              path:'openPhone',
              component:resolve=>{
                require(['views/setting/deviceApi/openPhone'],resolve);
              }
            }
          ]
        },
        {path: 'addUser',name:'addUser',
        component: resolve=>{
          require(['views/setting/addUser.vue'],resolve)
        },
        children:[{
          path:'addUserUpdate',
          component:resolve=>{
            require(['views/setting/setUser/addUserUpdate.vue'],resolve);
          }
        }]
      },
      {path: 'addTel',name:'addTel',
        component: resolve=>{
          require(['views/setting/setTel/addTel.vue'],resolve)
        }
      },
       {path: 'addJCType',name:'addJCType',
        component: resolve=>{
          require(['views/setting/setJCType/addJCType.vue'],resolve)
        }
      }

      
      ]
},
{
  path:'/classify',
  name:'classify',
  component:resolve=>{
    require(['views/classify/classify'],resolve);
  }
},
{
  path:'/kLine',
  name:'kLine',
  component:resolve=>{
    require(['views/other/kLine'],resolve);
  }
},
{
  path:'/find',
  name:'find',
  component:resolve=>{
    require(['views/find/find'],resolve);
  }
},
{
  path:'/personal',
  name:'personal',
    component:resolve=>{
    require(['views/personal/personal'],resolve);
  }
},
{
  path:'/search',
  name:'search',
    component:resolve=>{
    require(['views/search/search'],resolve);
  }
}
]
export default routes
