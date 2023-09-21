import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { Mycontextprovider } from './contextapi/Mycontext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider >
      <Mycontextprovider>
        <Router>
          <App />
        </Router>
      </Mycontextprovider>
    </ChakraProvider>
  </React.StrictMode>,
)
