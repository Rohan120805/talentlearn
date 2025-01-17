import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Input, Button, VStack, HStack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/auth/profile', { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      setError('Error fetching user');
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location]);

  const handleAddSkill = async () => {
    if (newSkill.trim() === '') return;

    try {
      const updatedUser = { ...user, skills: [...user.skills, newSkill] };
      await axios.put('/auth/profile', updatedUser, { withCredentials: true });
      setUser(updatedUser);
      setNewSkill('');
    } catch (error) {
      setError('Error adding skill');
      console.error('Error adding skill:', error);
    }
  };

  const handleRemoveSkill = async (skillToRemove) => {
    try {
      const updatedUser = { ...user, skills: user.skills.filter(skill => skill !== skillToRemove) };
      await axios.put('/auth/profile', updatedUser, { withCredentials: true });
      setUser(updatedUser);
    } catch (error) {
      setError('Error removing skill');
      console.error('Error removing skill:', error);
    }
  };

  if (loading) {
    return <Box p={4}>Loading...</Box>;
  }

  if (error) {
    return <Box p={4}>{error}</Box>;
  }

  if (!user) {
    return <Box p={4}>No user data available</Box>;
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Profile</Heading>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Skills:</Text>
      <HStack wrap="wrap" spacing={2} mt={2}>
        {(user.skills || []).map((skill, index) => (
          <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
            <TagLabel>{skill}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
          </Tag>
        ))}
      </HStack>
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