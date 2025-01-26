'use client'
/*
https://ikeb108.github.io/sam_browser_test_bare_next_js/out/
*/

import { useState, useEffect } from 'react';

const testDatabaseVersion = 2
const fileDatabaseVersion = 1
const programVersion = 10
const useBasePath = process.env.NEXT_PUBLIC_USEBASEPATH==="true"
const basePrefix = useBasePath ? "/sam_browser_test_bare_next_js/out" : ""
console.log(
  "Base prefix: " + (basePrefix.length > 0 ? basePrefix : "empty")
)

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
          setStatusMessage("All files extracted. " + newExtractedFiles.length + " files:\n" +  listOfExtractedFilesAsString(newExtractedFiles) )
        },
        function (error){
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
    for(let i = 0; i < extractedFilesArray.length; i ++){
      extractedFilesString += extractedFilesArray[i].name + "\n"
      if(i > 10){
        extractedFilesString += "And " + (extractedFilesArray.length - 10) + " more files."
        break
      }
    }
    return extractedFilesString
  }
  
  return (
    <div>
      <h1>Untar & IDB Test v{programVersion}</h1>
      
      <p style={{whiteSpace: 'pre-line'}}>
      {`Testing instructions:
      1. Open console in case errors appear.
      *** Click Clear IDB and refresh the page if you ever need to restart these steps.
      2. Click "Test Javascript" to see if JS and Untar are working.
      3. Click "Set IDB currentTime".
      4. Refresh the page.
      5. Click "Get IDB currentTime". It should alert you with a number rather than undefined.
      6. Click choose file and select the provided tar file.
      7. Click Untar. It should say "Untarring" at the bottom.
      8. Wait for it to say "All files extracted".
      9. Click Store Files in IDB With Web Worker.
      10. Wait for it to say "All files stored".
      11. Refresh the page.
      12. Click Get Files in IDB With Web Worker. It should display the number of files stored in IDB.
      13. Click the box at the bottom repeatedly. It should cycle through images of worksheets.
      14. Let me know if any of these steps were slow, especially "Get Files in IDB With Web Worker".`}
      </p>
      <TestJavascriptButton /> <br />
      <TestSetIDBButton /> <br />
      <TestGetIDBButton /> <br />
      <br />
      <input type="file" onChange={onFileInputChange} />
      <br />
      <br />
      <button onClick={onUntarClick}>Untar</button><br />
      <br />
      {/* <StoreFilesInIDBButton filesToStore={allExtractedFiles} /> <br /> */}
      <StoreFilesInIDBWithWebWorkerButton filesToStore={allExtractedFiles} statusMessageSetter={setStatusMessage} /><br />
      <GetFilesFromIDBWithWebWorkerButton statusMessageSetter={setStatusMessage} allExtractedFilesSetter={setAllExtractedFiles} /><br />
      <ClearIDBButton /><br />
      <StatusParagraph statusMessage={statusMessage} />
      <ImageDisplay allExtractedFiles={allExtractedFiles} />
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
  /*
  Note to self: immediately tell the user that the web worker has started.
  If the button is clicked mid-process, it should kill the original process and start a new one.
  Include a message: PLease wait / don't close the page.
  */
  let filesToStore = props.filesToStore;
  let setStatusMessage = props.statusMessageSetter;
  const storeFilesInIDBWithWebWorker = function(){
    console.log("Clicked for web worker. Base Prefix: " + (basePrefix.length > 0 ? basePrefix : "empty"))
    let workerPath = basePrefix + "/worker_for_store_files_in_idb.js"
    const worker = new Worker(workerPath)
    worker.onmessage = function(event){
      if(event.data.type == "status_update_from_web_worker"){
        setStatusMessage(event.data.content)
      }
    }
    worker.postMessage({filesToStore, fileDatabaseVersion})
    
  }
  return (
    <button onClick={storeFilesInIDBWithWebWorker}>Store Files in IDB With Web Worker</button>
  )
}

function GetFilesFromIDBWithWebWorkerButton(props){
  /*
  Note to self: immediately tell the user that the web worker has started.
  If the button is clicked mid-process, it should kill the original process and start a new one.
  Include a message: PLease wait / don't close the page.
  */
  let setStatusMessage = props.statusMessageSetter
  let setAllExtractedFiles = props.allExtractedFilesSetter
  const getFilesFromIDBWithWebWorker = function(){
    let workerPath = basePrefix + "/worker_for_get_files_from_idb.js"
    const worker = new Worker(workerPath)
    worker.onmessage = function(event){
      if(event.data.type == "status_update_from_web_worker"){
        setStatusMessage(event.data.content)
      } else if(event.data.type == "files_from_idb"){
        setAllExtractedFiles(event.data.content)
      }
    }
    worker.postMessage({fileDatabaseVersion})
  }
  return (
    <button onClick={getFilesFromIDBWithWebWorker}>Get Files from IDB With Web Worker</button>
  )
}


function ImageDisplay(props){
  //When clicked, image should cycle through all images stored in IDB
  let allExtractedFiles = props.allExtractedFiles
  
  const [sourceURL, setSourceURL] = useState(null)
  const [indexOfCurrentImage, setIndexOfCurrentImage] = useState(-1)
  const getFileFromFileDatabase = function(){
    // let request = indexedDB.open("fileDatabase", fileDatabaseVersion)
    
    // request.onsuccess = function(event){
    //   let db = event.target.result
    //   let transaction = db.transaction("allFiles", "readwrite")
    //   let objectStore = transaction.objectStore("allFiles")
    //   let allFiles = objectStore.getAll()
      
    //   allFiles.onsuccess = function(event){
    //     let files = event.target.result
    //     setIndexOfCurrentImage( (indexOfCurrentImage + 1) % files.length )
    //     let oldBlob = files[indexOfCurrentImage]
    //     let newBlob = new Blob([oldBlob], { type: "image/webp" })
        
    //     console.log({filesDotLength: files.length, indexOfCurrentImage, newBlob})
    //     let fileURL = URL.createObjectURL(newBlob)
    //     setSourceURL(fileURL)
    //   }
    let newIndexOfCurrentImage = (indexOfCurrentImage + 1) % allExtractedFiles.length
    setIndexOfCurrentImage( newIndexOfCurrentImage )
    let blob = allExtractedFiles[newIndexOfCurrentImage].blob
    let fileURL = URL.createObjectURL(blob)
    setSourceURL(fileURL)
  }
  
  return (
    <img onClick={getFileFromFileDatabase} width={100} height={100} src={sourceURL}></img>
  )
}

function ClearIDBButton(){
  const clearIDB = function(){
    let request = indexedDB.open("fileDatabase", fileDatabaseVersion)
    request.onsuccess = function(event){
      let db = event.target.result
      let transaction = db.transaction("allFiles", "readwrite")
      let objectStore = transaction.objectStore("allFiles")
      objectStore.clear()
      alert("IDB cleared")
    }
  }
  return (
    <button onClick={clearIDB}>Clear IDB</button>
  )
}


export default HomePage