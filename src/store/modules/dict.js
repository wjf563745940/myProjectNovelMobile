import * as actions from './dict/actions'
import mutations from './dict/mutation'
import getters from './dict/getters'
let state = {
		dict:{sexDict:{list:[{itemKey:0,itemValue:'男',isactive:false},{itemKey:1,itemValue:'女',isactive:false}],activeItem:''},
		selectTypeDict:{list:[{itemKey:0,itemValue:'进行中',isactive:false},{itemKey:1,itemValue:'全部',isactive:false}],activeItem:''},
		utilItems:{list:[{itemKey:0,itemValue:'下载',isactive:false},{itemKey:1,itemValue:'加入书架',isactive:false},{itemKey:2,itemValue:'催同步',isactive:false}],activeItem:''},
		jcTypeDict:{list:[{itemKey:0,itemValue:'体罚',isactive:false},{itemKey:1,itemValue:'金钱',isactive:false}],activeItem:''},
		zhouqiDict:{list:[{itemKey:0,itemValue:'天',isactive:false},{itemKey:1,itemValue:'周',isactive:false},{itemKey:2,itemValue:'月',isactive:false},{itemKey:3,itemValue:'年',isactive:false}],activeItem:''},
			areaDict:{list:[{itemKey:0,itemValue:'国内',isactive:false},{itemKey:1,itemValue:'国外',isactive:false},{itemKey:2,itemValue:'其他',isactive:false}],activeItem:''}
				},
		active:'areaDict'
};
export default {
   state,
    getters,
    actions,
     mutations
}