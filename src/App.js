import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AuthPage from "./pages/AuthPage/AuthPage";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditProfile from "./pages/EditProfile/EditProfile";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import View from "./pages/View";
import { getUser } from "./utilities/users-service";
import { wakeServer } from "./utilities/wake-server";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(getUser());

  // Start waking the sleeping API while the user is still reading the page.
  useEffect(() => {
    wakeServer();
  }, []);

  return (
    <div className="App">
      {user ? (
        <Router>
          <Navbar setUser={setUser}/>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </Router>
      ) : (
        <AuthPage setUser={setUser}/>
      )}
    </div>
  );
}

export default App;
