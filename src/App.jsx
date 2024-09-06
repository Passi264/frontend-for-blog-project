import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { CreateBlog } from '../pages/CreateBlog';
import { Home } from '../pages/Home';
import { Landing } from '../pages/Landing';
import { Profile } from '../pages/Profile';
import { ReadBlog } from '../pages/ReadBlog';
import { Navbar } from '../components/Navbar';
import { Layout } from '../components/Layout';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  // Handle session storage if needed
  // useEffect(() => {
  //   let token = sessionStorage.getItem("User")
  //   if (token) {
  //     axios.defaults.headers.common["authorization"] = `Bearer ${token}`
  //   }
  // }, []);

  return (
    <>
      <Router>
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





// import './App.css'
// import {HashRouter as Router, Routes, Route } from 'react-router-dom'
// import { About } from '../pages/About'
// import { Contact } from '../pages/Contact'
// import { CreateBlog } from '../pages/CreateBlog'
// import { Home } from '../pages/Home'
// import { Landing } from '../pages/Landing'
// import { Profile } from '../pages/Profile'
// import { ReadBlog } from '../pages/ReadBlog'
// import { Navbar } from '../components/Navbar'
// import { Layout } from '../components/Layout'
// import { useEffect } from 'react'
// import axios from 'axios'
// function App(){
//   // useEffect(()=>{
//   //   let token = sessionStorage.getItem("User")
//   //   console.log(token)
//   //   if (token){
//   //     axios.defaults.headers.common["authorization"] = `Bearer ${token}`
//   //   }
    
//   // },[])
  
                 
// return (
//   <>
//   <Router>
//       <Routes>
//         <Route path="/" element={<Landing/>}/>
//         <Route element={<Layout/>}>
//           <Route path="/About" element={<About/>}/>
//           <Route path="/Contact" element={<Contact/>}/>
//           <Route path="/CreateBlog" element={<CreateBlog/>}/>
//           <Route path="/Home" element={<Home/>}/>
//           <Route path="/Profile" element={<Profile/>}/>
//           <Route path="/ReadBlog/:id" element={<ReadBlog/>}/>
//         </Route>
//       </Routes>
//   </Router>
//   </>
// )
// }
  
// export default App
