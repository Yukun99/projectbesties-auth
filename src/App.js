import logo from './logo.svg';
import './App.css';
import * as qs from 'qs';
import {
  useLocation,
} from 'react-router-dom';
import {useEffect, useState} from 'react';
import * as Realm from 'realm-web';

function App() {
  // await app.emailPasswordAuth.confirmUser(token, tokenId);
  const location = useLocation();
  const [token, setToken] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [pathname, setPathname] = useState('');
  const id = 'projectbesties-login-znmgf';
  const config = {
    id,
  };
  const app = new Realm.App(config);
  useEffect(() => {
    if (location) {
      setPathname(location.pathname);
      if (pathname === 'confirm') {
        setToken(qs.parse(location.search, {ignoreQueryPrefix: true}).token);
        setTokenId(qs.parse(location.search, {ignoreQueryPrefix: true}).tokenId);
      }
      if (pathname === 'reset') {

      }
    }
  });

  useEffect(() => {
    if (token !== '' && tokenId !== '') {
      app.emailPasswordAuth.confirmUser(token, tokenId).then(r => {});
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          You are currently on the {pathname} screen.
        </p>
      </header>
    </div>
  );
}

export default App;
