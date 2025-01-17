import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, Heading, Spacer, useColorMode } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/auth/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await axios.get('/auth/logout');
    setUser(null);
    navigate('/signin');
  };

  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="lg" color="white">
          Talent Learn
        </Heading>
        <Spacer />
        <Flex alignItems="center">
          <Button as={Link} to="/" variant="ghost" color="white" mr={4}>
            Home
          </Button>
          {user ? (
            <>
              <Button as={Link} to="/internships" variant="ghost" color="white" mr={4}>
                Internships
              </Button>
              <Button as={Link} to="/profile" variant="ghost" color="white" mr={4}>
                Profile
              </Button>
              <Button onClick={handleLogout} variant="ghost" color="white">
                Logout
              </Button>
            </>
          ) : (
            <Button as={Link} to="/signin" variant="ghost" color="white">
              Sign In
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;