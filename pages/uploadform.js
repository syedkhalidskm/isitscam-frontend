import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [scamProb, setScamProb] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post('http://127.0.0.1:8000/detect-scam/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setScamProb(response.data.scam_prob);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Check Scam</button>
            </form>

            {scamProb && (
                <div>
                    <h2>Scam Probability: {scamProb}</h2>
                </div>
            )}
        </div>
    );
};

export default UploadForm;
