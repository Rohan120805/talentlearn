import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Input, Button, VStack } from '@chakra-ui/react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newSkill, setNewSkill] = useState('');

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

  const handleAddSkill = async () => {
    if (newSkill.trim() === '') return;

    try {
      const updatedUser = { ...user, skills: [...user.skills, newSkill] };
      await axios.put('/auth/profile', updatedUser);
      setUser(updatedUser);
      setNewSkill('');
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  if (!user) {
    return <Box p={4}>Loading...</Box>;
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Profile</Heading>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Skills: {user.skills.join(', ')}</Text>
      <VStack mt={4} spacing={4}>
        <Input
          placeholder="Add a new skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <Button onClick={handleAddSkill} colorScheme="teal">
          Add Skill
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile;