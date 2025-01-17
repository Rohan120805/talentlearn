import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

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

  if (!user) {
    return <Box p={4}>Loading...</Box>;
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Profile</Heading>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Skills: {user.skills.join(', ')}</Text>
    </Box>
  );
};

export default Profile;