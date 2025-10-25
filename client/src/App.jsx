import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/header/Header';
import Home from "./pages/home/Home";
import Login from './pages/forms/Login';
import Register from './pages/forms/Register';
import Posts from './pages/posts/Posts';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreatePost from './pages/create-post/CreatePost';
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import { ToastContainer } from "react-toastify";
import Category from './pages/category/Category';
import Profile from "./pages/profile/Profile";

function App() {

  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />

        
        <Route path="posts">
          <Route index element={<Posts />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="details/:id" element={<PostDetails />} />
          <Route path="categories/:category" element={<Category />} />
        </Route>


        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<h1>NOT found!</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
