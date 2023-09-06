import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import { ListProvider } from './components/ListContext.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from './components/UserProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-13c224lx0jf45yui.us.auth0.com"
      clientId="coi74UcxeEzRqsMNCw302v472q0CKLHy"
      authorizationParams = {{
        redirect_uri: window.location.origin,
      }}
    >
    <UserProvider>
    <ListProvider>
    <App />
    </ListProvider>
    </UserProvider>
    </Auth0Provider>
  </React.StrictMode>,
)