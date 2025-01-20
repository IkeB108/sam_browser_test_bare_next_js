'use client'
/*
https://ikeb108.github.io/sam_browser_test_bare_next_js/out/
*/

const useBasePath = process.env.USEBASEPATH==="true"
const basePrefix = useBasePath ? "/sam_browser_test_bare_next_js/out" : ""

import { useState, useEffect } from 'react';

const testDatabaseVersion = 2
const fileDatabaseVersion = 1

function HomePage() {
  const [file, setFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Waiting for file input.")
  const [allExtractedFiles, setAllExtractedFiles] = useState(null)
  
  const onUntarClick = () => {  
    //Check if file is selected
    if(file === null){
      alert("Please select a file first.")
      return
    }
    
    setStatusMessage("Untarring...")
    const reader = new FileReader()
    reader.onload = function(event){
      untar(reader.result).then(
        function (extractedFiles){
          let newExtractedFiles = []
          for(let i in extractedFiles){
            let oldBlob = extractedFiles[i].blob
            let newBlob = new Blob([oldBlob], { type: 'image/webp' })
            let newExtractedFile = {
              'name': extractedFiles[i].name,
              'blob': newBlob,
              'size': extractedFiles[i].size
            }
            newExtractedFiles.push(newExtractedFile)
          }
          setAllExtractedFiles(newExtractedFiles)
          console.log(newExtractedFiles)
          setStatusMessage(newExtractedFiles.length + " files extracted:\n" +  listOfExtractedFilesAsString(newExtractedFiles) )
        },
        function (error){
          console.log("error handler")
          setStatusMessage("Error: " + reader.error.message)
        }
      )
    }
    reader.onerror = function(event){
      setStatusMessage("Error: " + reader.error.message)
    }
    
    reader.readAsArrayBuffer(file)
    
  }
  
  const onFileInputChange = (e) => {
    //Alert user if it's not a tar file
    const selectedFile = e.target.files[0]
    if(selectedFile.type !== "application/x-tar"){
      alert("Please select a tar file")
      return
    } else {
      setFile(selectedFile)
    }
  }
  
  const listOfExtractedFilesAsString = function(extractedFilesArray){
    let extractedFilesString = ""
    extractedFilesArray.forEach( (file) => {
      extractedFilesString += file.name + "\n"
    })
    return extractedFilesString
  }
  
  return (
    <div>
      <h1>Untar & IDB Test v3</h1>
      <input type="file" onChange={onFileInputChange} />
      <br />
      <br />
      <button onClick={onUntarClick}>Untar</button>
      <br />
      <TestJavascriptButton /> <br />
      <TestGetIDBButton /> <br />
      <TestSetIDBButton /> <br />
      <StoreFilesInIDBButton filesToStore={allExtractedFiles} /> <br />
      <StoreFilesInIDBWithWebWorkerButton filesToStore={allExtractedFiles} /><br />
      <StatusParagraph statusMessage={statusMessage} />
      <ImageDisplay />
    </div>
  )
}

function StatusParagraph({ statusMessage }){
  //Create a p element with jsx whose text content can be changed with a function
  return (
    <p id="statusParagraph" style={{whiteSpace: 'pre-wrap'}}>{statusMessage}</p>
  )
}

function TestJavascriptButton(){
  
  const onTestJavascriptClick = function(){
    let alertMessage=  "Javascript is working!"
    if(typeof untar === "function")alertMessage += " Untar is loaded!"
    alert(alertMessage)
    
  }
  return (
    <button onClick={onTestJavascriptClick}>Test Javascript</button>
  )
}

function TestSetIDBButton(){
  const onTestSetIDBClick = function(){
    //Set IDB key-value pair "currentTime" to current time in ms
    let request = indexedDB.open("testDatabase", testDatabaseVersion) 
    
    request.onupgradeneeded = function(event){
      let db = event.target.result
      db.createObjectStore("testStore")
      console.log("created object store testStore")
    }
    request.onsuccess = function(event){
      let db = event.target.result
      let transaction = db.transaction("testStore", "readwrite")
      let objectStore = transaction.objectStore("testStore")
      let now = Date.now()
      objectStore.put( now, "currentTime")
      transaction.oncomplete = function(){
        alert("IDB currentTime set to " + now)
      }
    }
  }
  return (
    <button onClick={onTestSetIDBClick}>Set IDB currentTime</button>
  )
}

function TestGetIDBButton(){
  const onTestGetIDBClick = async function(){
    //Set IDB key-value pair "currentTime" to current time in ms
    let request = indexedDB.open("testDatabase", testDatabaseVersion) 
    request.onsuccess = function(event){
      let db = event.target.result
      let transaction = db.transaction(["testStore"], "readwrite")
      let objectStore = transaction.objectStore("testStore")
      
      //alert objectStore.get("currentTime") when it loads asynchronously
      objectStore.get("currentTime").onsuccess = function(event){
        alert("IDB currentTime is " + event.target.result)
      }
    }
  }
  return (
    <button onClick={onTestGetIDBClick}>Get IDB currentTime</button>
  )
}

function StoreFilesInIDBButton(props){
  const filesToStore = props.filesToStore
  const storeFilesInIDB = function(files){
    let request = indexedDB.open("fileDatabase", fileDatabaseVersion) 
    request.onupgradeneeded = function(event){
      let db = event.target.result
      db.createObjectStore("allFiles")
      console.log("Created allFiles object store")
    }
    request.onsuccess = function(event){
      let db = event.target.result
      let transaction = db.transaction("allFiles", "readwrite")
      let objectStore = transaction.objectStore("allFiles")
      for(let i in filesToStore){
        objectStore.put(filesToStore[i].blob, filesToStore[i].name)
      }
      
      // filesToStore.forEach( (file) => {
      //   objectStore.put( file, file.name)
      // })
      transaction.oncomplete = function(){
        alert(filesToStore.length + " files stored in IDB")
      }
    }
  }
  
  return (
    <button onClick={storeFilesInIDB}>Store Files in IDB</button>
  )
  
}

function StoreFilesInIDBWithWebWorkerButton(props){
  let filesToStore = props.filesToStore;
  const storeFilesInIDBWithWebWorker = function(){
    const worker = new Worker(basePrefix + "/worker_for_store_files_in_idb.js")
    worker.onmessage = function(event){
      console.log(event.data)
    }
    worker.postMessage("park name?")
    
  }
  return (
    <button onClick={storeFilesInIDBWithWebWorker}>Store Files in IDB With Web Worker</button>
  )
}


function ImageDisplay(props){
  //When clicked, image should cycle through all images stored in IDB
  const [sourceURL, setSourceURL] = useState(null)
  const [indexOfCurrentImage, setIndexOfCurrentImage] = useState(-1)
  const getFileFromFileDatabase = function(){
    let request = indexedDB.open("fileDatabase", fileDatabaseVersion)
    
    request.onsuccess = function(event){
      let db = event.target.result
      let transaction = db.transaction("allFiles", "readwrite")
      let objectStore = transaction.objectStore("allFiles")
      let allFiles = objectStore.getAll()
      
      allFiles.onsuccess = function(event){
        let files = event.target.result
        setIndexOfCurrentImage( (indexOfCurrentImage + 1) % files.length )
        let oldBlob = files[indexOfCurrentImage]
        let newBlob = new Blob([oldBlob], { type: "image/webp" })
        
        console.log({filesDotLength: files.length, indexOfCurrentImage, newBlob})
        let fileURL = URL.createObjectURL(newBlob)
        setSourceURL(fileURL)
      }
      
    }
  }
  
  return (
    <img onClick={getFileFromFileDatabase} width={100} height={100} src={sourceURL}></img>
  )
}


export default HomePage