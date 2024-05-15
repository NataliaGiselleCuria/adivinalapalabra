import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import DataProvider from './context/DataProvider';
import LocalStorageProvider from './context/LocalStorageProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <LocalStorageProvider>
        <App />
      </LocalStorageProvider>
    </DataProvider>
  </React.StrictMode>,
)
