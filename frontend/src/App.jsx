import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Internships from './pages/Internships';
import SignIn from './pages/SignIn'; // Ensure this import is correct
import Profile from './pages/Profile'; // Ensure this import is correct

function App() {
  return (
    <Box minH="100vh">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/signin" element={<SignIn />} /> {/* Ensure this route is correct */}
        <Route path="/profile" element={<Profile />} /> {/* Ensure this route is correct */}
      </Routes>
    </Box>
  );
}

export default App;