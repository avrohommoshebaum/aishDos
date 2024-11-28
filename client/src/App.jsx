import SendTextMessage from './components/SendTextMessage'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import axios from 'axios';
import ContactList from './components/ContactList';
import Login from './components/Login'; 

axios.defaults.baseURL = 'http://localhost:3000/api/'
axios.defaults.withCredentials = true

function App() {
  return (
    <div className='page-content'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/contacts" element={<><ContactList /><SendTextMessage /></>}/>
      </Routes>
    </div>
  );
}

export default App
