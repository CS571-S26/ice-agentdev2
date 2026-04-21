/**
 * Application entry point. Mounts the root TextApp component and pulls in
 * global styles (Bootstrap + project CSS).
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import TextApp from './components/TextApp.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TextApp />
)
