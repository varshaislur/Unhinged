
import './App.css';
import { Outlet, Navigate, Route , Routes, userLocation, useLocation } from 'react-router-dom';
import { Login,Register,Home,Profile,ResetPassword } from './pages/index.js';
import { useSelector } from 'react-redux';

function Layout(){
 
  const {user} = useSelector((state)=> state.user);
  console.log(user)
  // const user =null;

  const location =useLocation();
 
  return user?.token ? (
    <Outlet/>
  ):(
    <Navigate to='/login' state={{ from : location }} replace />
  )
}
function App() {
  // const user = useSelector((state)=> state.user);
  // console.log(user)
  const {theme}= useSelector((state)=>state.theme)
  console.log(theme)
  return (
    <div data-theme={theme} className="w-full min-h-[100vh]">
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:id?' element={<Profile />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
      
      
    </div>
  );
}

export default App;
