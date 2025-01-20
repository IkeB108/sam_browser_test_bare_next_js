const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

self.onmessage = async function(event){
  let filesToStore = event.data.filesToStore
  let fileDatabaseVersion = event.data.fileDatabaseVersion
  
  let request = indexedDB.open("fileDatabase", fileDatabaseVersion) 
  request.onupgradeneeded = function(event){
    let db = event.target.result
    db.createObjectStore("allFiles")
  }
  request.onsuccess = async function(event){
    let db = event.target.result
    let transaction = db.transaction("allFiles", "readwrite")
    let objectStore = transaction.objectStore("allFiles")
    objectStore.clear()
    console.log("objectStore cleared")
    for(let i in filesToStore){
      objectStore.put(filesToStore[i].blob, filesToStore[i].name)
      self.postMessage({
        "type": "status_update_from_web_worker",
        "content": "Loading file #" + i
      })
    }
    transaction.oncomplete = function(){
      self.postMessage({
        "type": "status_update_from_web_worker",
        "content": "All files loaded: " + filesToStore.length + " files"
      })
    }
  }
}