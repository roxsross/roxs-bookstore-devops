import { Box } from "@chakra-ui/react"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer";


const App = () => {
  return (
    <Box minH={"100vh"}>
      <NavBar />
      <Routes>
          <Route path="/" element={< HomePage />}/>
          <Route path="/create" element={< CreatePage />}/>
      </Routes>
      <Footer />
    </Box>
    
   
  )
}

export default App