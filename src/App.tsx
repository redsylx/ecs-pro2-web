import { useState, useEffect } from 'react'
import { Auth0Provider } from '@auth0/auth0-react';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    )
  );
};

const GetTokenButton = () => {
  const { getAccessTokenSilently } = useAuth0();

  const handleGetToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log('JWT Token:', token);
      // You can now use this token to make authenticated API calls
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  return <button onClick={handleGetToken}>Get Token</button>;
};

function App() {
  const [count, setCount] = useState(0)
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      if (!isLoading && isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          console.log('JWT Token:', token);
        } catch (error) {
          console.error('Error getting token:', error);
        }
      }
    };
    getToken();
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);
  
  const auth0 = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  } 

  return (
    <Auth0Provider
      domain={auth0.domain}
      clientId={auth0.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <LoginButton/>
      <LogoutButton/>
      <Profile/>
      <GetTokenButton/>
    </Auth0Provider>
  )
}

export default App
