import { Routes, Route, useLocation } from "react-router-dom";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { CreateBlog } from "../pages/CreateBlog";
import { Home } from "../pages/Home";
import { Landing } from "../pages/Landing";
import { Profile } from "../pages/Profile";
import { ReadBlog } from "../pages/ReadBlog";
import { Layout } from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataContext from "./DataContext";

function App() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  function Fliker() {
    const { runFliker } = useContext(DataContext);
    const location = useLocation();

    useEffect(() => {
      runFliker();
    }, [location]);

    return null;
  }

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Set the initial width
    handleResize();

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let token = sessionStorage.getItem("User");
    if (token) {
      token = token.replace(/^"|"$/g, ""); // Remove surrounding double quotes if they exist

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

  if (windowWidth < 1024) {
    return (
      <div
        style={{
          color: "black",
          flex: 1,
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
          height: "100vh",
        }}
      >
        This app is only available on desktop.
      </div>
    );
  }

  return (
    <>
      <Fliker />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/CreateBlog" element={<CreateBlog />} />
          <Route path="/login" element={<Landing />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/ReadBlog/:id" element={<ReadBlog />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
