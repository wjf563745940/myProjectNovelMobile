import Mock from 'mockjs'
var Random = Mock.Random
Random.extend({
    jclx: function(date) {
        var jclxs = ['金钱','体罚','跪搓衣板','按摩']
        return this.pick(jclxs)
    }
})
export default{
	addjctype:function(){
		Random.title(5)
		 Mock.mock('http://addjctype.cn', {
   		 'name'     : Random.cfirst()+Random.cname(),
   		 'jcname':'@jclx',	
			'title':'@title(5)',
   		 'list|1-10': [{
            'id|+1': 1
        }]
      });
	},
	init:function(){
		console.log(this,"0000000")
		for(var key in this){
			console.log(key,"------------------")
			if(key!=='init'){
				if( typeof this[key] ==='function')
				this[key]();
			}
		}
		//this.addjctype();
	}
}