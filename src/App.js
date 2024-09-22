import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    setResponseData(null);

    try {
      const jsonInput = JSON.parse(inputData);
      const response = await axios.post('http://localhost:3000/bfhl', jsonInput);
      setResponseData(response.data);
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Server error: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check if the server is running.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error: ' + err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">BFHL Frontend</h1>
      <textarea 
        className="w-full p-2 border rounded mb-4"
        rows="5"
        value={inputData} 
        onChange={handleInputChange} 
        placeholder="Enter JSON here"
      ></textarea>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      {responseData && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Response:</h3>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;