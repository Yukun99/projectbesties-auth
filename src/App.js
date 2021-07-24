import './App.css';
import * as qs from 'qs';
import {
  useLocation,
} from 'react-router-dom';
import {useEffect, useState} from 'react';
import * as Realm from 'realm-web';
import logo from './assets/icon.png';
import title from './assets/title.png';

function App() {
  const location = useLocation();
  const [token, setToken] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [pathname, setPathname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState(undefined);
  const disabled = password !== confirmPassword || password === '' || password.length < 7 || password.length > 128 || token === '' || tokenId === '' || !token || !tokenId;
  const id = 'projectbesties-login-znmgf';
  const config = {
    id,
  };
  const app = new Realm.App(config);
  useEffect(() => {
    if (location) {
      setPathname(location.pathname);
      if (pathname === '/confirm' || pathname === '/reset') {
        setToken(qs.parse(location.search, {ignoreQueryPrefix: true}).token);
        setTokenId(qs.parse(location.search, {ignoreQueryPrefix: true}).tokenId);
      }
    }
  }, [location, pathname]);

  useEffect(() => {
    if (token && tokenId) {
      if (token !== '' && tokenId !== '') {
        if (pathname === '/confirm') {
          app.emailPasswordAuth.confirmUser(token, tokenId).then(r => {
            console.log(r);
          });
        }
      }
    }
  });

  useEffect(() => {

  })

  async function resetPassword(password, token, tokenId) {
    setStatus('uploading');
    await app.emailPasswordAuth.resetPassword(token, tokenId, password)
      .catch(err => {
        console.log(err);
        if (err.statusCode === 400) {
          setStatus('invalid_token');
        } else {
          setStatus('error');
        }
      })
      .then(() => {
        setStatus('complete');
      });
  }

  if (pathname === '/confirm') {
    return (
      <div className="App">
        <header className="App-header">
          <img src={title} className="App-title" alt="title" />
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Your account has been confirmed!
          </p>
          <p>
            Open the app to start your Project Besties journey!
          </p>
        </header>
      </div>
    );
  }

  if (pathname === '/reset') {
    if (status) {
      if (status === 'uploading') {
        return (
          <div className="App">
            <header className="App-header">
              <img src={title} className="App-title" alt="title" />
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Setting new password...
              </p>
            </header>
          </div>
        );
      }
      if (status === 'invalid_token') {
        return (
          <div className="App">
            <header className="App-header">
              <img src={title} className="App-title" alt="title" />
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Invalid token link, please try requesting for another email in the app.
              </p>
            </header>
          </div>
        );
      }
      if (status === 'complete') {
        return (
          <div className="App">
            <header className="App-header">
              <img src={title} className="App-title" alt="title" />
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Password successfully changed! Please login to the app again.
              </p>
            </header>
          </div>
        );
      }
      if (status === 'error') {
        return (
          <div className="App">
            <header className="App-header">
              <img src={title} className="App-title" alt="title" />
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Unknown error, please contact system administrators.
              </p>
            </header>
          </div>
        );
      }
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={title} className="App-title" alt="title" />
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Please enter new password below and click Submit to reset your password!
          </p>
          <div className="App-reset">
            <div className="App-formContainer">
              <label className="App-form">
                Password: <input type="password" value={password} onChange={data => setPassword(data.target.value)}
                                 className="App-formInput" />
              </label>
            </div>
            <div className="App-formContainer">
              <label className="App-form">
                Confirm Password: <input type="password" value={confirmPassword}
                                         onChange={data => setConfirmPassword(data.target.value)}
                                         className="App-formInput" />
              </label>
            </div>
            <p></p>
            <div>
              <button onClick={() => resetPassword(password, token, tokenId)}
                      disabled={disabled} className="App-button">Submit
              </button>
            </div>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={title} className="App-title" alt="title" />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to project besties! Please download our app <a
          href={'https://drive.google.com/file/d/1WI8WXYMqAsltma3AW_7lp92a2Bj0C_yk/view?usp=sharing'}>here!</a>
        </p>
      </header>
    </div>
  );
}

export default App;
