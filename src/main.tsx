import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router'

import App from './App'

import '@/styles/globals.css'

const rootElement = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
