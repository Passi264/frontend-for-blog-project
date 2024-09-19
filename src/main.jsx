import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.js'
import { DataProvider } from './dataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <DataProvider>
        <App />
      </DataProvider>
    </ChakraProvider>
  </StrictMode>
)
