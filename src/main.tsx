import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {CssBaseline} from "@mui/material";
import { store } from './app/store'
import { Provider } from 'react-redux'
import 'bear-react-carousel/dist/index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <CssBaseline />
            <App />
        </Provider>
    </StrictMode>,
)
