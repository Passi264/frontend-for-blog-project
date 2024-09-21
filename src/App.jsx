
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { CreateBlog } from '../pages/CreateBlog';
import { Home } from '../pages/Home';
import { Landing } from '../pages/Landing';
import { Profile } from '../pages/Profile';
import { ReadBlog } from '../pages/ReadBlog';
import { Layout } from '../components/Layout';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import DataContext from './dataContext';

function App() {

  function Fliker(){

    const {runFliker} = useContext(DataContext)
    const location = useLocation()
    
    useEffect(()=>{
      runFliker()
    }, [location])

    return(
      null
    )
  }

  useEffect(() => {
    let token = sessionStorage.getItem("User")
    if (token) {
      token = token.replace(/^"|"$/g, '');  // Remove surrounding double quotes if they exist
  
      axios.interceptors.request.use(
        (config) => {
          config.headers["Authorization"] = `Bearer ${token}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  }, []);

  return (
    <>
      <Router>
        <Fliker />
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route element={<Layout/>}>
            <Route path="/About" element={<About/>} />
            <Route path="/Contact" element={<Contact/>} />
            <Route path="/CreateBlog" element={<CreateBlog/>} />
            <Route path="/Home" element={<Home/>} />
            <Route path="/Profile" element={<Profile/>} />
            <Route path="/ReadBlog/:id" element={<ReadBlog/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;




