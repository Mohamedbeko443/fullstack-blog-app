import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
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
import UsersTable from './pages/admin/UsersTable';
import PostsTable from './pages/admin/PostsTable';
import CategoriesTable from './pages/admin/CategoriesTable';
import CommentsTable from './pages/admin/CommentsTable';
import ForgotPassword from './pages/forms/ForgotPassword';
import ResetPassword from './pages/forms/ResetPassword';
import NotFound from './pages/not-found/NotFound';
import { useSelector } from "react-redux";




function App() {
  const { user } = useSelector(store => store.auth)

  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to={'/'} replace />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to={'/'} replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        <Route path="/profile/:id" element={<Profile />} />


        <Route path="posts">
          <Route index element={<Posts />} />
          <Route path="create-post" element={user ? <CreatePost /> : <Navigate to={'/'} replace />} />
          <Route path="details/:id" element={<PostDetails />} />
          <Route path="categories/:category" element={<Category />} />
        </Route>

        <Route path="admin-dashboard" >
          <Route index element={user?.isAdmin ? <AdminDashboard /> : <Navigate to={'/'} replace />} />
          <Route path="users-table" element={user?.isAdmin ? <UsersTable /> : <Navigate to={'/'} replace />} />
          <Route path="posts-table" element={user?.isAdmin ? <PostsTable /> : <Navigate to={'/'} replace />} />
          <Route path="categories-table" element={user?.isAdmin ? <CategoriesTable /> : <Navigate to={'/'} replace />} />
          <Route path="comments-table" element={user?.isAdmin ? <CommentsTable /> : <Navigate to={'/'} replace />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App