import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import Footer from './footer/footer.tsx'
import NavigationBar from './navigation-bar/NavigationBar.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <NavigationBar />
    <App />
    <Footer />
  </BrowserRouter>,
)
