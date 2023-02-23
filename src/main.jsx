import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './Root'

import '@fontsource/rubik/latin.css'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
