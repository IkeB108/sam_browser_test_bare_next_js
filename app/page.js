//    https://ikeb108.github.io/sam_browser_test_bare_next_js/out/
'use client'

import { useState, useEffect } from 'react';

const testDatabaseVersion = 2

function HomePage() {
  const [file, setFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState("No untar library loaded.")
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
          setAllExtractedFiles(extractedFiles)
          console.log(extractedFiles)
          setStatusMessage(extractedFiles.length + " files extracted:\n" +  listOfExtractedFilesAsString(extractedFiles) )
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
      <h1>Untar & IDB Test</h1>
      <input type="file" onChange={onFileInputChange} />
      <br />
      <br />
      <button onClick={onUntarClick}>Untar</button>
      <br />
      <TestJavascriptButton /> <br />
      <TestGetIDBButton /> <br />
      <TestSetIDBButton /> <br />
      <StatusParagraph statusMessage={statusMessage} />
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

export default HomePage
