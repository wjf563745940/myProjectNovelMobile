var webSql = {
   	createTable:function () {
			    			var that=this;
            var db = that.getCurrentDb();//初始化数据库
            if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("create table if not exists novel_content(content text null, novel_chapter_id text null,novel_id text null)", [], function (trans, result) {
                }, function (trans, message) {//消息的回调函数alert(message);});
            });
        })},
            getCurrentDb:function () {
            //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
            //如果数据库不存在那么创建之
            var db = openDatabase("myDb", "1.0", "it's to save demo data!", 1024 * 1024); 
            return db;
        },
        showAllTheData:function(){
        	var that=this;
        	 var db = that.getCurrentDb();
            db.transaction(function (trans) {
                trans.executeSql("select * from novel_content", [], function (ts, data) {
                    if (data) {
                        // for (var i = 0; i < data.rows.length; i++) {
                        //     console.log(data.rows.item(i));//获取某行数据的json对象
                        // }
                    }
                }, function (ts, message) {console.log(message);var tst = message;});
            });
        }
}
export default webSql