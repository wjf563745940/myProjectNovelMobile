const LATENCY = 16
export function addUser (user,cb) {
  setTimeout(() => {
  	console.log("add user");
    cb(user)
  }, LATENCY)
}
export const updateUser=function(user,cb){
	setTimeout(() => {
  	console.log("update user");
    cb(user)
  }, LATENCY)
}