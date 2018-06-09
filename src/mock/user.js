import Mock from 'mockjs'
export default{
	addUser:function(){
		 Mock.mock('http://addUser.cn', {
    'name'     : '[@name](/user/name)()',
    'age|1-100': 100,
    'color'    : '[@color](/user/color)'
      });
	}
}