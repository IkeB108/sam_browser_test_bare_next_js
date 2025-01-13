'use client';
import { useState } from 'react';
import tar from 'tar-stream';

export default function Home() {
  const [files, setFiles] = useState([]);

  // Function to handle file input change
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);

      if (file.name.endsWith('.tar')) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const buffer = new Uint8Array(e.target.result);
          const extract = tar.extract();

          extract.on('entry', (header, stream, next) => {
            let chunks = [];
            stream.on('data', (chunk) => {
              chunks.push(chunk);
            });
            stream.on('end', () => {
              const fileContent = Buffer.concat(chunks).toString();
              console.log(`Extracted file: ${header.name}`);
              setFiles(prevFiles => [...prevFiles, { name: header.name, size: header.size, content: fileContent }]);
              next();
            });
            stream.resume();
          });

          extract.on('finish', () => {
            console.log('All files extracted');
          });

          extract.end(buffer);
        };
        reader.readAsArrayBuffer(file);
      } else {
        console.log("Please select a tar file.");
      }
    }
  };

  return (
    <div>
      <h1>Blank NextJS App</h1>
      <input type="file" id="fileInput" onChange={handleFileChange} />
      <div>
        {files.map((file, index) => (
          <div key={index}>
            <h3>{file.name} ({file.size} bytes)</h3>
            <pre>{file.content}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}