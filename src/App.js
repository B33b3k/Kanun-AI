import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Upload, 
  FileText, 
  Send, 
  FileCheck, 
  FileX,
  MessageSquare,
  RefreshCw 
} from 'lucide-react';

const generateId = () => `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const KanunAI = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [conversations, setConversations] = useState({});
  const [collectionName, setCollectionName] = useState('legal_docs'); // Default collection name

  // Document Upload Handler
  const handleDocumentUpload = async (event) => {
    const files = event.target.files;
    if (!files) return;

    const newDocuments = Array.from(files).map(file => ({
      id: generateId(),
      title: file.name,
      file,
      status: 'pending',
      uploadedAt: new Date(),
      conversations: []
    }));

    setDocuments(prev => [...prev, ...newDocuments]);

    // Process each document
    for (const doc of newDocuments) {
      try {
        // First, store embeddings
        const testRequest = {
          act_name: doc.title,
          collection_name: collectionName,
          context_documents: [doc.title] // You might want to modify this based on your needs
        };

        //base url



        const response = await fetch('http://127.0.0.1:8000/api/v1/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testRequest)
        });

        if (!response.ok) {
          throw new Error('Failed to process document');
        }

        // Update document status
        setDocuments(prev => 
          prev.map(d => 
            d.id === doc.id ? { ...d, status: 'completed' } : d
          )
        );

        // Create initial conversation
        const initialConversationId = generateId();
        setConversations(prev => ({
          ...prev,
          [doc.id]: [
            {
              id: initialConversationId,
              title: `Chat about ${doc.title}`,
              messages: [
                {
                  id: generateId(),
                  isAI: true,
                  content: `Document "${doc.title}" has been processed. What would you like to know?`,
                  timestamp: new Date()
                }
              ]
            }
          ]
        }));

        setSelectedDocument(doc.id);
      } catch (error) {
        console.error('Error processing document:', error);
        setDocuments(prev => 
          prev.map(d => 
            d.id === doc.id ? { ...d, status: 'error' } : d
          )
        );
      }
    }
  };

  const handleCreateNewConversation = (documentId) => {
    const newConversationId = generateId();
    const newConversation = {
      id: newConversationId,
      title: `New Chat ${documents.find(d => d.id === documentId)?.title || ''}`,
      messages: [
        {
          id: generateId(),
          isAI: true,
          content: "Start a new conversation about this document.",
          timestamp: new Date()
        }
      ]
    };

    setConversations(prev => ({
      ...prev,
      [documentId]: [
        ...(prev[documentId] || []),
        newConversation
      ]
    }));

    setSelectedDocument(documentId);
  };

  const handleSendMessage = async (documentId, conversationId, content) => {
    console.log('Sending message:', content);
    const document = documents.find(d => d.id === documentId);
    if (!document) return;

    // Add user message
    const updatedConversations = { ...conversations };
    const documentConversations = updatedConversations[documentId] || [];
    const targetConversation = documentConversations.find(c => c.id === conversationId);
    
    if (!targetConversation) return;

    const userMessage = {
      id: generateId(),
      isAI: false,
      content,
      timestamp: new Date()
    };

    targetConversation.messages.push(userMessage);
    setConversations(updatedConversations);

    try {
      // Query the API
      const queryRequest = {
        question: content,
        act_name: document.title,
        collection_name: collectionName,
        context_documents: [document.title]
      };
    
      const response = await fetch('http://127.0.0.1:8000/api/v1/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryRequest)
      });
    
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
    
      const data = await response.json();
    
      // Prepare AI response based on data structure
      let aiMessageContent;
    
      if (Array.isArray(data.answer)) {
        // Format the array of objects
        aiMessageContent = data.answer
          .map(item => `Section ${item.section_num}: ${item.content || 'No content available'}`)
          .join('\n');
      } else if (typeof data.answer === 'string') {
        aiMessageContent = data.answer; // Fallback for plain string responses
      } else {
        aiMessageContent = 'Received an unrecognized response format.';
      }
    
      // Add AI response
      const aiMessage = {
        id: generateId(),
        isAI: true,
        content: aiMessageContent,
        timestamp: new Date()
      };
    
      targetConversation.messages.push(aiMessage);
      setConversations({ ...updatedConversations });
    } catch (error) {
      console.error('Error querying API:', error);
      const errorMessage = {
        id: generateId(),
        isAI: true,
        content: "Sorry, I encountered an error processing your request.",
        timestamp: new Date()
      };
      targetConversation.messages.push(errorMessage);
      setConversations({ ...updatedConversations });
    }
    
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        documents={documents}
        selectedDocument={selectedDocument}
        conversations={conversations}
        onDocumentUpload={handleDocumentUpload}
        onSelectDocument={setSelectedDocument}
        onCreateNewConversation={handleCreateNewConversation}
      />
      <ChatArea 
        documents={documents}
        selectedDocument={selectedDocument}
        conversations={conversations}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

// Sidebar and ChatArea components remain the same as in your original code
// ...

// Sidebar Component
const Sidebar = ({ 
  documents, 
  selectedDocument, 
  conversations, 
  onDocumentUpload, 
  onSelectDocument,
  onCreateNewConversation 
}) => {
  const fileInputRef = useRef(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FileText className="text-yellow-500" />;
      case 'processing': return <RefreshCw className="text-blue-500 animate-spin" />;
      case 'completed': return <FileCheck className="text-green-500" />;
      case 'error': return <FileX className="text-red-500" />;
    }
  };

  return (
    <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Legal Document AI</h1>
        
        <div className="mb-6">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={onDocumentUpload}
            multiple 
            accept=".pdf,.doc,.docx" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upload Documents
          </button>
        </div>

        <div className="space-y-4">
          {documents.map(doc => (
            <div key={doc.id} className="bg-gray-50 rounded-lg">
              <div 
                className={`flex items-center justify-between p-3 cursor-pointer ${
                  selectedDocument === doc.id ? 'bg-blue-100' : ''
                }`}
                onClick={() => onSelectDocument(doc.id)}
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(doc.status)}
                  <span className="text-sm truncate max-w-[200px]">{doc.title}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreateNewConversation(doc.id);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              {/* Conversations for this document */}
              {conversations[doc.id]?.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`pl-6 pr-3 py-2 text-sm flex items-center justify-between hover:bg-blue-50 ${
                    selectedDocument === doc.id ? '' : 'hidden'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <MessageSquare size={16} className="text-gray-500" />
                    <span>{conversation.title}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Chat Area Component
const ChatArea = ({ 
  documents, 
  selectedDocument, 
  conversations, 
  onSendMessage 
}) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const currentDocument = documents.find(d => d.id === selectedDocument);
  const currentConversations = conversations[selectedDocument] || [];
  const currentConversation = currentConversations[currentConversations.length - 1];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && currentDocument && currentConversation) {
      onSendMessage(selectedDocument, currentConversation.id, message);
      setMessage('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentConversation?.messages]);

  if (!currentDocument) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Select or upload a document to start</p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b p-4 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800">{currentDocument.title}</h2>
        <p className="text-sm text-gray-500">
          {currentConversation?.title || 'Current Conversation'}
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50">
        {currentConversation?.messages?.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'}`}
          >
            <div 
              className={`max-w-2xl p-4 rounded-lg shadow-sm ${
                msg.isAI 
                  ? 'bg-blue-100 text-blue-900' 
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {/* AI Messages with Section Content */}
              {msg.isAI && Array.isArray(msg.content) ? (
                <div className="space-y-4">
                  {msg.content.map((section, index) => (
                    <div key={index} className="border-b pb-2">
                      <h4 className="text-sm font-bold text-blue-800">
                        Section {section.section_num}
                      </h4>
                      <p className="text-sm text-gray-700">
                        {section.content || 'No content available'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm">{msg.content}</p>
              )}
              {/* Optional References */}
              {msg.references && (
                <div className="mt-2 border-t pt-2 text-xs">
                  <h4 className="font-semibold">References:</h4>
                  {msg.references.map((ref, index) => (
                    <p key={index} className="text-blue-600 underline">
                      {ref}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex gap-3">
        <input 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about this document..."
          className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Send />
        </button>
      </form>
    </div>
  );
};

  
  export default KanunAI;
  
