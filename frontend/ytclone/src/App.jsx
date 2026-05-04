import {Routes,Route} from "react-router-dom"
import Pagelayout from "./components/Page_layout"
import { Navigate } from "react-router-dom"
import Home from "./pages/home"

function App() {


  return (
    <Routes>
      <Route path="/" element={<Pagelayout/>}>  
      <Route index element={<Navigate to="home" replace />}></Route>
      <Route path="home" element={<Home/>}/>


      </Route>

    </Routes>
  )
}

export default App
