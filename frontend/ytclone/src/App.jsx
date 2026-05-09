import {Routes,Route} from "react-router-dom"
import Pagelayout from "./components/Page_layout"
import { Navigate } from "react-router-dom"
import Home from "./pages/home"
import VideoPlayer from "./pages/videoPlayer"
import Login from "./pages/login"
import Register from "./pages/register"
import AuthProvider from "./context/authProvider"
import VideoUpload from "./pages/videoUpload"
import ActiveStreams from "./pages/activeStreams"
import StreamPlayer from "./pages/streamPlayer"
import CreateStreams from "./pages/createStream"

function App() {


  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Pagelayout/>}>  
      <Route index element={<Navigate to="home" replace />}></Route>
      <Route path="home" element={<Home/>}/>
      <Route path="VidPlayer/:vId" element={<VideoPlayer/>}/>
      <Route path="upload/Video" element={<VideoUpload/>}/>
      <Route path="streams/active" element={<ActiveStreams/>}/>
      <Route path="streams/watch/:streamKey" element={<StreamPlayer/>}/>
      <Route path="streams/create" element={<CreateStreams/>}/>



      <Route path="auth/login" element={<Login />}></Route>
      <Route path="auth/register" element={<Register />}></Route>

      </Route>

    </Routes>
    </AuthProvider>
  )
}

export default App
