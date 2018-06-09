 export default{
 	 getItem :  function(state){
 	 	return getItems(state.dict[state.active].list);
 	 } ,
 	 getDict:function(state){
 	 	return  state.dict[state.active].list
 	 },
 	 getSexDict:function(state,id,z){
 	 	console.log(id)
 	 	return state.dict.sexDict.list;
 	 }
 }
 function getItems(list){
 	var item;
 	for (var obj of list){
 		if(obj.isactive){
 			item=obj;
 			break;
 		}
 	}
 	return item;
 }