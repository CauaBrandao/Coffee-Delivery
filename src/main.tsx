import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { CartProvider } from '@/contexts/CartContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ToastProvider } from '@/contexts/ToastContext'
import App from './App'
import '@/styles/global.css'

const Router = window.location.protocol === 'file:' ? HashRouter : BrowserRouter

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <CartProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </CartProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
)
