var pounchDbUtil={
			initDB: initDB,
           // getAllBirthdays: getAllBirthdays,
            addData: addData,
            putData:putData,
            getById:getById,
            mulPutDatas:mulPutDatas,
updateData:updateData,
reomveData:reomveDoc,
deletedb:deletedb

           // updateBirthday: updateBirthday,
          //  deleteBirthday: deleteBirthday
}
 function initDB(dbname) {
            // Creates the database or opens if it already exists
            var dbnames=dbname?dbname:"novel";
            var db = new PouchDB(dbnames);
            console.log("init pounchdb")
            return db;
        };
        function addData(db,data) {
            return  db.post(data);
        };
        function getById(db,id){
          return db.get(id);
        }
        function putData(db,id,data){
          //  if(data){
               data['_id']=id;
            return db.put(data); 
           // }
            
        }
        function mulPutDatas(db,keys,datas,prefix){
           // data['_id']=prefix?prefix:''+datas[key];
           
        var keysflag=false;
        if( Object.prototype.toString.call(keys)==='[object Array]'){
            
            keysflag=true;
        }
         var iddatas=  datas.map(function(item){
            var idstr="";
            if(keysflag){
                keys.forEach(function(it,index){
                    idstr+=(prefix?prefix[index]:'')+item[it]
                 })
            }else{
                idstr=(prefix?prefix:'')+item[keys];
                
            }
            item._id=idstr;
             return item
        })
         console.log(iddatas)
            return db.bulkDocs(iddatas); 
        }
        
        function updateData(db,id,data ){
            db.get(id).then(function(doc) {
            doc= Object.assign(doc,data);
             return db.put(doc);
            }).catch(function (err) {
              console.log(err);
            });
        }
        function   reomveDoc(db,Doc){
          db.remove(Doc);
        }
        function deletedb(db){
          db.destroy().then(function (response) {
            // success
            console.log(response)
          }).catch(function (err) {
            console.log(err);
          });
        }
        export default pounchDbUtil