/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';




// ContactList Component
const ContactList = () => {
 const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contacts from the server
    axios.get('/contacts') // Replace with your actual endpoint
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
      });
  }, []);
  if (!contacts || contacts.length === 0) {
    return <p>No contacts available.</p>;
  }

  const renderValue = (value) => (value ? value : 'N/A'); // Helper to render "N/A" for null/undefined values

  return (
    <div>
      <h2>Contact List</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={styles.th}>First Name</th>
            <th style={styles.th}>Last Name</th>
            <th style={styles.th}>Cell Phone</th>
            <th style={styles.th}>Home Phone</th>
            <th style={styles.th}>Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td style={styles.td}>{renderValue(contact.name?.first)}</td>
              <td style={styles.td}>{renderValue(contact.name?.last)}</td>
              <td style={styles.td}>{renderValue(contact.phone?.cell)}</td>
              <td style={styles.td}>{renderValue(contact.phone?.home)}</td>
              <td style={styles.td}>{renderValue(contact.email)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// CSS Styles for the table
const styles = {
  th: {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
  },
  td: {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
  },
};

export default ContactList;
