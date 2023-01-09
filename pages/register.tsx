import { useEffect, useState } from 'react';
import { Home } from '../containers/Home';
import { Register } from '../containers/Register'

export default function RegisterUser() {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    if(window !== undefined){
      const token = localStorage.getItem('accessToken');
      if(token){
        setAccessToken(token);
      }
    }
  }, []);

  return !accessToken ? <Register setToken={setAccessToken}/> : <Home setToken={setAccessToken}/>;
}