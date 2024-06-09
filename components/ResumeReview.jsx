import React, { useState } from 'react';

const ResumeReview = () => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzBRnny_qNITq1-RDvcTLFiEclq0Wqy2qxTbDHREpApT2rIXfoNsPIWeI5HzLAlpTLMvg/exec';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        formData.append('SheetName', 'Resume');
        try {
            await fetch(scriptURL, { method: 'POST', body: formData });
            setMessage('Your Response has been recorded successfully!');
            setTimeout(() => {
                setMessage('');
            }, 4000);
            e.target.reset();
        } catch (error) {
            console.error('Error!', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <form name="submit-to-google-sheet" className="contact-us-form" data-form onSubmit={handleSubmit}>
                <input type="text" placeholder="Your Name" className="form-control" name="Name" required />
                <input type="text" placeholder="Your Email" className="form-control" name="Email" required />
                <label>Please don't forget to give us pdf edit/comment access</label>   
                <input type="url" placeholder="Paste your PDF link here..." className="form-control" name="PDFLink" required />
                <button className="submit-button" type="submit" disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload'}
                </button>
                <span id="message" className="success-message">{message}</span>

            </form>
           
        </div>
    )
}

export default ResumeReview