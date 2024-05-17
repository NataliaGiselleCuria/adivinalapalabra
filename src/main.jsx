import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import DataProvider from './context/DataProvider';
import LocalStorageProvider from './context/LocalStorageProvider.jsx';
import FunctionGameProvider from './context/FunctionGameProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <LocalStorageProvider>
        <FunctionGameProvider>
         <App />
        </FunctionGameProvider>
      </LocalStorageProvider>
    </DataProvider>
  </React.StrictMode>,
)
