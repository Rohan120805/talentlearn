import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Container,
  useColorModeValue,
  Icon,
  Divider,
  Card,
  CardHeader,
  CardBody
} from '@chakra-ui/react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Enhanced color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('teal.600', 'teal.300');
  const gradientBg = useColorModeValue(
    'linear(to-r, teal.400, blue.500)',
    'linear(to-r, teal.500, blue.600)'
  );

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
      const updatedUser = { ...user, skills: [...(user.skills || []), newSkill] };
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
    return (
      <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
        <Container maxW="7xl" py={12}>
          <Card bg={cardBg} shadow="xl" borderRadius="xl">
            <CardBody p={8}>
              <Text>Loading...</Text>
            </CardBody>
          </Card>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
        <Container maxW="7xl" py={12}>
          <Card bg={cardBg} shadow="xl" borderRadius="xl">
            <CardBody p={8}>
              <Text color="red.500">{error}</Text>
            </CardBody>
          </Card>
        </Container>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
        <Container maxW="7xl" py={12}>
          <Card bg={cardBg} shadow="xl" borderRadius="xl">
            <CardBody p={8}>
              <Text>No user data available</Text>
            </CardBody>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
      <Container maxW="7xl" py={12}>
        <VStack spacing={12} align="stretch">
          <Box textAlign="center">
            <Icon as={FaUser} w={12} h={12} color="teal.400" mb={4} />
            <Heading 
              size="2xl"
              bgGradient={gradientBg}
              bgClip="text"
              letterSpacing="tight"
              mb={4}
            >
              Your Profile
            </Heading>
            <Text
              fontSize="xl"
              color={useColorModeValue('gray.600', 'gray.400')}
              maxW="2xl"
              mx="auto"
            >
              Manage your profile and skills
            </Text>
            <Divider my={8} />
          </Box>

          <Card 
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="xl"
            overflow="hidden"
            shadow="xl"
          >
            <CardHeader p={6}>
              <Heading size="lg" color={headingColor}>Personal Information</Heading>
            </CardHeader>
            <CardBody p={6} pt={0}>
              <VStack align="stretch" spacing={6}>
                <Box>
                  <Text fontWeight="bold" mb={2} color={useColorModeValue('gray.600', 'gray.400')}>
                    Name
                  </Text>
                  <Text fontSize="lg">{user.name}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={2} color={useColorModeValue('gray.600', 'gray.400')}>
                    Email
                  </Text>
                  <Text fontSize="lg">{user.email}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={4} color={useColorModeValue('gray.600', 'gray.400')}>
                    Skills
                  </Text>
                  <HStack wrap="wrap" spacing={2} mb={6}>
                    {(user.skills || []).map((skill, index) => (
                      <Tag 
                        key={index} 
                        size="lg" 
                        colorScheme="teal" 
                        borderRadius="full"
                        px={4}
                        py={2}
                      >
                        <TagLabel>{skill}</TagLabel>
                        <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
                      </Tag>
                    ))}
                  </HStack>
                  <VStack spacing={4}>
                    <Input
                      placeholder="Add a new skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      size="lg"
                      borderRadius="lg"
                      borderColor={borderColor}
                      _hover={{
                        borderColor: 'teal.300'
                      }}
                      _focus={{
                        borderColor: 'teal.500',
                        boxShadow: '0 0 0 1px teal.500'
                      }}
                    />
                    <Button 
                      onClick={handleAddSkill} 
                      colorScheme="teal"
                      size="lg"
                      w="full"
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg'
                      }}
                    >
                      Add Skill
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default Profile;