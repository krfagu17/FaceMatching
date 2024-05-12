import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const handleMatchFaces = async () => {
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image1', image1);
      formData.append('image2', image2);

      const response = await axios.post('https://face-matching.vercel.app//api/face-match', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data.result);
      console.log(response)
    } catch (error) {
      console.error(error);
      setResult('Error matching faces');
    }
    setLoading(false);
  };

  return (
    <div className="mainContainer">

    <div className='main'>
      <div className="img1">

      {image1 && <img src={URL.createObjectURL(image1)} alt="Uploaded Image 1" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
      <input type="file" onChange={(e) => handleImageChange(e, setImage1)} />
      </div>
      
      <div className="img2">

      {image2 && <img src={URL.createObjectURL(image2)} alt="Uploaded Image 2" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
      <input type="file" onChange={(e) => handleImageChange(e, setImage2)} />
      </div>
    </div>

      <button className='btn' onClick={handleMatchFaces}>Match Faces</button>
      {loading && <div className='loader'></div>}

      {result !== null && <div className='result'>Similarity: {result}</div>}
    </div>
  );
}

export default App;
