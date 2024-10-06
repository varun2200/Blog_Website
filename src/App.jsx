import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authservice from './appwrite/auth';
import { login, logout } from './store/authslice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(()=>{
    authservice.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}));
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false));
  },[])

  return !loading ? (
    <div className='min-h-screen app-wrapper bg-blue-100 '> 
      
        <Header />
        <main className='content'>
        <Outlet />
        </main>
        <Footer />
      
    </div>

  ) : null
}

export default App
