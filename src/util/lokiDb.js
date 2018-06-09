
var lokiUtil={
			initDB: initDB,
            createCollection: createCollection,
            addData:addData,
            findData:findData,
            findSelData:findSelData,
            findAllData:findAllData,
            test:test,
            addTest:addTest,
            getTest:getTest

}
function test(){
	 var idbAdapter = new lokiIndexedAdapter('finance');
	 	 var cdbAdapter = new lokiCordovaFSAdapter('finance'); 
 var db = new loki("test.db", { 
  adapter: cdbAdapter,
  autoload: true,
  autoloadCallback : databaseInitialize,
  autosave: true, 
  autosaveInterval: 4000
});
 console.log("databaseInitialize before",db.getCollection("menu"))
function databaseInitialize() {
	 console.log("databaseInitialize after",db.getCollection("menu"))
  var entries = db.getCollection("menu");
  if (entries === null) {
    entries = db.addCollection("menu");
  }

  // kick off any program logic or start listening to external events
  runProgramLogic();
}
function runProgramLogic() {
  var entryCount = db.getCollection("menu").count();
console.log(entryCount)
}
  

  // Load database
  // var idbAdapter = new LokiIndexedAdapter('finance');
  // var db = new loki('test', { adapter: idbAdapter });
  // db.loadDatabase({}, function(result) {
  //   console.log('done');
  // });

  return db;
}
function addTest(db,colName,data){
	function databaseInitialize() {
  var entries = db.getCollection(colName);
  if (entries === null) {
    entries = db.addCollection(colName);
  }

  // kick off any program logic or start listening to external events
  runProgramLogic(entries);
}
function runProgramLogic(entries) {
  var entryCount = db.getCollection(colName).count();
console.log(entryCount)

  entries.insert(data);
  db.saveDatabase();  // could pass callback if needed for async complete
}
	databaseInitialize();
}
function getTest(db,col,par){
	if(par){
	return	db.getCollection(col).find(par);
	}else{
	return	db.getCollection(col).find();
	}
	
	// Get database list
  var idbAdapter = new LokiIndexedAdapter('finance');
   var cdbAdapter = new lokiCordovaFSAdapter('finance'); 
  cdbAdapter.getDatabaseList(function(result) {
    // result is array of string names for that appcontext ('finance')
    result.forEach(function(str) {
      console.log(str);
    });
  });
}

function initDB () {
	fsiAdapter.getDatabaseList(function(result) {
  // result is array of string names for that appcontext ('finance')
  result.forEach(function(str) {
    console.log("now Adapter has",str);

  });
});

	 var db= new loki('test111',{
                        adapter: fsiAdapter
                    });
 db.loadDatabase(function(result) {
  console.log('done');
});
	window.db=db;
  return db;	 
	
}
function createCollection(db,name){

	var children = db.addCollection(name)
	return children;
}
function addData(db,collection,data){
	collection.insert(data);
	collection.insert({name:'Sleipnir123', legs: 8});
	db.saveDatabase();
}
function findData(collection,par){
	var result=collection.find( par );
	console.log(result);
	return result;
}
function findSelData(collection,fun){
	var results = collection.where(fun);
	return results;
}
function findAllData(){

}
export default lokiUtil