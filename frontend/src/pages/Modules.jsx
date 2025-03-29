import React, {useEffect, useState} from 'react';
import {Box, SimpleGrid, Card, CardHeader, CardBody, Heading, Text, Button, HStack, Tag, TagLabel} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Modules = () => {
  const [modules, setModules] = useState([]); // Initialize as empty array
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get('/auth/profile');
        if (!response.data) {
          navigate('/signin');
          return;
        }
        
        const modulesResponse = await axios.get('/modules');
        if (Array.isArray(modulesResponse.data)) { // Add check for array
          setModules(modulesResponse.data);
        } else {
          console.error('Modules data is not an array:', modulesResponse.data);
          setModules([]); // Fallback to empty array
        }
      } catch (error) {
        console.error('Error fetching modules:', error);
        navigate('/signin');
      }
    };

    fetchModules();
  }, [navigate]);

  return (
    <Box p={4}>
      <Heading mb={4}>Courses</Heading>
      {modules.length === 0 ? (
        <Text>No modules available</Text>
      ) : (
        <SimpleGrid columns={{base:1, md:2, lg:3}} spacing={4}>
          {modules.map((module) => (
            <Card key={module._id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <CardHeader>
                <Heading size="md">{module.title}</Heading>
                <Text fontSize="sm" color="gray.500">by {module.author}</Text>
              </CardHeader>
              <CardBody>
                <Text>{module.description}</Text>
                <Text mt={2} fontWeight="bold">Skills you gain after completion of this course:</Text>
                <HStack wrap="wrap" spacing={2} mt={2}>
                  {(module.skillsAcquired || []).map((skill, index) => (
                    <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
                      <TagLabel>{skill}</TagLabel>
                    </Tag>
                  ))}
                </HStack>
                <HStack mt={4} justifyContent="space-between">
                  <Button colorScheme="blue" onClick={() => navigate(`/modules/${module._id}`)}>
                    Start Learning
                  </Button>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Modules;