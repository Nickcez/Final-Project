import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import { ListProvider } from './components/ListContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ListProvider>
    <App />
    </ListProvider>
  </React.StrictMode>,
)