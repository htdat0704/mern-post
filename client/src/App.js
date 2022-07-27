import './App.css';
import { Route, Routes} from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './components/views/Auth'
import Dashboard from './components/views/Dashboard';
import MyPost from './components/views/MyPost';
import Protected from './components/routing/ProtectedRout'
import {useContext} from 'react'
import {AuthContext} from './context/Auth/AuthContext'
import SinglePost from './components/views/SinglePost';


function App() {

  const {state: { isAuthenticated }} = useContext(AuthContext);

  return (
    <div className="App">
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/login' element={<Auth authRoute='login' />} />
          <Route exact path='/register' element={ <Auth authRoute='register' />} />
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route
            path="/mypost"
            element={
            <Protected user={isAuthenticated}  >
                <MyPost />
            </Protected>
          }
          />
          <Route path="/post/:slug" element= {<SinglePost route='post'/>} />
          <Route path="/update/:slug" element= {<SinglePost route='update'/>} />
        </Routes>
    </div>
  );
}

export default App;
