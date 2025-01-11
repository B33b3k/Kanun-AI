import React from 'react'
import { useState } from 'react';
import AvailableFiles from '../components/AvailableFiles';
import ChatInterface from '../components/ChatInterface';

const ChatPage = () => {
    const [selectedFile, setSelectedFile] = useState("");
    const [showFileList, setShowFileList] = useState(true);

    const handleFileClick = (fileName) => {
        setSelectedFile(fileName);
        setShowFileList(false);
    }

    const handleSelectAnother = () => {
        setSelectedFile("");
        setShowFileList(true);
    };

    const handleCloseFileList = () => {
        setShowFileList(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
        {showFileList ? (
            <div className='container mx-auto flex justify-center items-center pt-10'>
                <AvailableFiles onFileSelect={handleFileClick} onClose={handleCloseFileList}/>
            </div>
        ) : (
            <>
                <div className="bg-blue-600 p-4">
                    <div className="max-w-4xl mx-auto flex justify-between items-center">
                        <h1 className="text-xl font-bold text-white">
                            Selected File: {selectedFile}
                        </h1>
                        <button
                            onClick={handleSelectAnother}
                            className="px-4 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100 transition duration-300"
                        >
                            Select Another Act
                        </button>
                    </div>
                </div>
                <div className="flex-1 p-4">
                    <ChatInterface selectedFile={selectedFile} />
                </div>
            </>
        )}
    </div>
    )
}

export default ChatPage