/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const SendTextMessage = () => {
  const [messageBody, setMessageBody] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageBody) {
      setStatus('Please enter a message.');
      return;
    }

    setLoading(true);
    setStatus(''); // Clear previous status messages

    try {
      // Make POST request to your server
      await axios.post('/sms/send-test-message', { messageBody });
      setStatus('Message sent successfully to all contacts!');
    } catch (error) {
      console.error('Error sending messages:', error);
      setStatus('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Send Text Message</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          placeholder="Enter your message here..."
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
          style={styles.textarea}
          rows="5"
        ></textarea>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    textAlign: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  textarea: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    resize: 'none',
  },
  button: {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
  status: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#555',
  },
};

export default SendTextMessage;
