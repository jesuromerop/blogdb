import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Blog from './components/Blog';
import Post from './components/Post';
import Profile from './components/Profile';
import PostView from './components/PostView';
import PostEdit from './components/PostEdit';
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/blog' element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            } />
            <Route path='/post' element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            } />
            <Route path='/profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path='/postview/:id' element={
              <ProtectedRoute>
                <PostView />
              </ProtectedRoute>
            } />
            <Route path='/editpost/:id' element={
              <ProtectedRoute>
                <PostEdit />
              </ProtectedRoute>
            } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
