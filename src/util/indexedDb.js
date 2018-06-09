var indexedDb={
			openDb:function(name,osname,version,keyPath,myDb,fn){
            
                    var version=version || 1;
            var request=window.top.indexedDB.open(name,version);
             console.log("openDb state========",request.readyState)
            request.onupgradeneeded=function(e){
                 var db=e.target.result;
                 if(  Object.prototype.toString.call(osname)==='[object Array]'){
                        osname.forEach(function(item,i){
                             if(!db.objectStoreNames.contains(item)){
                                    var store=db.createObjectStore(item,{keyPath:keyPath[i]});
                                    store.createIndex(keyPath[i],keyPath[i],{unique:true}); 
                                }
                        })
                 }else{
                    if(!db.objectStoreNames.contains(osname)){
                        var store=db.createObjectStore(osname,{keyPath:keyPath});
                        store.createIndex(keyPath,keyPath,{unique:true}); 
                    }
                 }
                
                console.log('DB version changed to '+version);
            };
            request.onerror=function(e){
                console.log(e.currentTarget.error.message);
            };
            request.onsuccess=function(e){
               myDb.db=e.target.result;
               fn();
            };
            return request;


				  
             // setTimeout(function(){
             //        fn();//强制执行回调
             //    },1000)
        },
        initDb:function(name,version,fn,successfn,osname,keyPath,myDb){
           var request=window.top.indexedDB.open(name,version);
           console.log("initDb state========",request.readyState)
             request.onerror=function(e){
                console.log(e.currentTarget.error.message);
               var currentv=e.currentTarget.error.message.match(/existing version \((\d+)\)/)[1];
               console.log(currentv)
                fn(parseInt(currentv))
            };
            request.onsuccess=function(e){
               // myDb.db=e.target.result;
               console.log(e.target.result.version);
               //e.target.result.close();
              // fn(parseInt(e.target.result.version))
              myDb.db=e.target.result;
              successfn();
            };
             request.onupgradeneeded=function(e){
                 var db=e.target.result;
                if(  Object.prototype.toString.call(osname)==='[object Array]'){
                        osname.forEach(function(item,i){
                             if(!db.objectStoreNames.contains(item)){
                                    var store=db.createObjectStore(item,{keyPath:keyPath[i]});
                                    store.createIndex(keyPath[i],keyPath[i],{unique:true}); 
                                }
                        })
                 }else{
                    if(!db.objectStoreNames.contains(osname)){
                        var store=db.createObjectStore(osname,{keyPath:keyPath});
                        store.createIndex(keyPath,keyPath,{unique:true}); 
                    }
                 }
                console.log('DB version changed to '+e.target.result.version);
            };
            
        },
        createOS:function(db,name,indexName){
        	// if(!db.objectStoreNames.contains(name)){
         //            var store=db.createObjectStore(name,{autoIncrement:true});
         //            store.createIndex(indexName,indexName,{unique:true}); 
         //        }
        },
        closeDB:function(db){
            db.close();
        },
       deleteDB:function (name){
            window.indexedDB.deleteDatabase(name);
        },
        addData:function (db,storeName,data){
            var transaction=db.transaction(storeName,'readwrite'); 
            var store=transaction.objectStore(storeName); 
            console.log(data.length)
            for(var i=0;i<data.length;i++){
                store.add(data[i]);
            }
        },
        getDataByKey:function (db,storeName,value){
            var transaction=db.transaction(storeName,'readwrite'); 
            var store=transaction.objectStore(storeName); 
            var request=store.get(value); 
            request.onsuccess=function(e){ 
                var student=e.target.result;  
            };
		},
		updateDataByKey:function (db,storeName,value,key,keyvalue){
            var transaction=db.transaction(storeName,'readwrite'); 
            var store=transaction.objectStore(storeName); 
            var request=store.get(value); 
            request.onsuccess=function(e){ 
                var student=e.target.result; 
                console.log(student)
                student[key]=keyvalue;
                store.put(student); 
            };
		},
        updateDataAll:function(db,storeName,data){
            this.clearObjectStore(db,storename);
            this.addData(db,storeName,data)

        },
		deleteDataByKey:function (db,storeName,value){
            var transaction=db.transaction(storeName,'readwrite'); 
            var store=transaction.objectStore(storeName); 
            store.delete(value);

        },
        deleteDb:function(db){
            if(db.objectStoreNames.contains('students')){ 
                    db.deleteObjectStore('students'); 
				} 
        },
        clearObjectStore:function (db,storeName){
            var transaction=db.transaction(storeName,'readwrite'); 
            var store=transaction.objectStore(storeName); 
            store.clear();
		},
		getDataByIndex:function (db,storeName,value){
            var transaction=db.transaction(storeName);
            var store=transaction.objectStore(storeName);
            var index = store.index(keyPath);
            index.get(value).onsuccess=function(e){
                var student=e.target.result;
                console.log(student.id);
            }
        },
        getMultipleData:function (db,storeName,valuestart,valueend,keyPath,fn){
            var transaction=db.transaction(storeName);
            var store=transaction.objectStore(storeName);
            var index = store.index(keyPath);
            var request=index.openCursor(IDBKeyRange.bound(valuestart,valueend,false,false))//IDBKeyRange.bound('B','F',false,true)//IDBKeyRange.only(parseInt(value))
            request.onsuccess=function(e){
                console.log(e)
                var cursor=e.target.result;
                if(cursor){
                    var student=cursor.value;
                    console.log(student.id);
                    cursor.continue();
                }else{
                    console.log("未找到");
                }
            }
        },
         getDataByIndex:function (db,storeName,value,keyPath,fn){//根据索引获取
             var transaction=db.transaction(storeName);
             var store=transaction.objectStore(storeName);
             var index = store.index(keyPath);
             index.get(parseInt(value)).onsuccess=function(e){
                 var novelcontent=e.target.result;
                 if(novelcontent){
                    fn(novelcontent);
                }else{
                    fn(); 
                }        
             }
         },
         fetchStoreByCursor:function (db,storeName,fn){
            var transaction=db.transaction(storeName);
            var store=transaction.objectStore(storeName);
            var request=store.openCursor();
            let results=[];
            request.onsuccess=function(e){
                var cursor=e.target.result;
                
                if(cursor){
                    var currentStudent=cursor.value;
                        results.push(currentStudent);
                    cursor.continue();
                }else{
                    fn(results);
                }
            };
        }

};
export default indexedDb