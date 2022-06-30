import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './global.css'
import { BrowserRouter as Router } from "react-router-dom";
import { ResultContextProvider} from './contexts/ResultContextProvider'

createRoot(document.getElementById('root')).render(
    <ResultContextProvider>
     <Router>
      <App />  
    </Router>   
    </ResultContextProvider>
)