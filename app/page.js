'use client'

import { useState, useEffect } from 'react';

function HomePage() {
  const [file, setFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState("No untar library loaded.")
  const [allExtractedFiles, setAllExtractedFiles] = useState(null)
  
  const checkThatUntarIsLoaded = setInterval(() => {
    if(typeof untar === "function"){
      clearInterval(checkThatUntarIsLoaded)
      setStatusMessage("Untar library is loaded.")
    }
  }, 200)
  
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

export default HomePage
