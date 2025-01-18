import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Internships from './pages/Internships';
import SignIn from './pages/SignIn'; // Ensure this import is correct
import Profile from './pages/Profile'; // Ensure this import is correct
import SingleInternship from './pages/SingleInternship';
import Modules from './pages/Modules';

function App() {
  return (
    <Box minH="100vh">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/internships" element={<Internships/>}/>
        <Route path="/internships/:id" element={<SingleInternship/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/modules" element={<Modules/>}/>
      </Routes>
    </Box>
  );
}

export default App;