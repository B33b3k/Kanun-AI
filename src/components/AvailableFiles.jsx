import React from 'react'
import { useState , useEffect } from 'react';

const AvailableFiles = ({ onFileSelect , onClose}) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
      }, []);

    const fetchFiles= async() =>{
        try{
            const response = await fetch("http://127.0.0.1:8000/api/v1/available-files")
            const data = await response.json()
            setFiles(data);
        }catch(error){
            console.log("Error fetchin files")
        }
    }

  return (
    <div className="w-full max-w-2xl h-[600px] bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 bg-blue-600 flex gap-30">
        <h1 className="text-2xl font-bold text-white text-center">
          Select file to use as a reference
        </h1>
        <button
            onClick={onClose}
            className="text-white pl-60 hover:text-gray-300 text-2xl font-bold"
          >
            X
          </button>
      </div>
      <div className="p-6 h-[450px] overflow-y-auto">
        <ul className="space-y-4">
          {files.map((file, index) => (
            <li
              key={index}
              className="p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => onFileSelect(file.file_name)}
                className="text-blue-600 hover:underline font-semibold text-lg"
              >
                {file.file_name}
              </button>
              <p className="text-gray-600 mt-2">{file.file_description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AvailableFiles