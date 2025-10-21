import { BrowserRouter , Routes , Route} from "react-router-dom"
import Header from './components/header/Header';
import Home from "./pages/home/Home";
import Login from './pages/forms/Login';
import Register from './pages/forms/Register';
import Posts from './pages/posts/Posts';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreatePost from './pages/create-post/CreatePost';
import Footer from "./components/footer/Footer";

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/posts/create-post" element={<CreatePost/>} />
        <Route path="/dashboard" element={<AdminDashboard/>} />
        <Route path="*" element={<h1>NOT found!</h1>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
