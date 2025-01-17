import React,{useEffect} from 'react';
import Login from './components/Login'
function App() {
  useEffect(() => {
    document.body.className ="bg-gradient-to-r from-sky-500 to-indigo-500"; 
  }, []);
  return (
 <>
   <Login />
 </>
  );
}

export default App;
