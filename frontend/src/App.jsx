import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './layouts/Navbar'
import SignIn from './pages/signin/SignIn'
import SignUp from './pages/singup/SignUp'
import CreateProject from './pages/project/CreateProject'
import Project from './pages/project/Project'
import Projects from './pages/project/Projects'
import Profile from './pages/profile/Profile'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import Footer from './layouts/Footer'
import UpdateProject from './pages/project/UpdateProject'
import PageNotFound from './utility/PageNotFound'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects">
          <Route path="" element={<Projects />} />
          <Route path="new" element={<CreateProject />} />
          <Route path=":id" element={<Project />} />
          <Route path=":id/update" element={<UpdateProject />} />
        </Route>
        <Route path="/profile">
          <Route path=":id" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
