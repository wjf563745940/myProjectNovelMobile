import * as types from '../../mutation-types'
console.log(types.ADD_USER)
export default {
	// [types.ADD_USER] (state, { message }) {
 //    addMessage(state, message)
 //  },
 	// "ADD_USER":function(state){
 	// 	addMessage(state)
 	// }
	// types["ADD_USER"]:function(){

	// }
  [types.ADD_USER] (state, { message }) {
    addMessage(state, message)
  },
  [types.SELECT_USER_SEX] (state, message) {
   for(var obj of state.users){
    if(obj && obj.id!=''){

    }else{
      createUser(state);
      user.sex=message;
    }
   }
  }
}
function createUser(state){
  var user={id:state.genterId,name:"qgm",sex:'男'};
  state.genterId++;
  state.users.push(user)
  return user;
}
function addMessage (state, message) {
  console.log('addmessage')
  // // add a `isRead` field before adding the message
  // message.isRead = message.threadID === state.currentThreadID
  // // add it to the thread it belongs to
  // const thread = state.threads[message.threadID]
  // if (!thread.messages.some(id => id === message.id)) {
  //   thread.messages.push(message.id)
  //   thread.lastMessage = message
  // }
  // // add it to the messages map
  // Vue.set(state.messages, message.id, message)
}


