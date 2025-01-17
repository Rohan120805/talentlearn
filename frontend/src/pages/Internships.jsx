import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Card, CardHeader, CardBody, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get('/auth/profile');
        if (!response.data) {
          navigate('/signin');
        } else {
          const internshipsResponse = await axios.get('/internships');
          setInternships(internshipsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching internships:', error);
        navigate('/signin');
      }
    };

    fetchInternships();
  }, [navigate]);

  return (
    <Box p={4}>
      <Heading mb={4}>Internships</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {internships.map((internship) => (
          <Card key={internship._id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <CardHeader>
              <Heading size="md">{internship.title}</Heading>
              <Text fontSize="sm" color="gray.500">at {internship.companyName}</Text>
            </CardHeader>
            <CardBody>
              <Text>{internship.description}</Text>
              <Text mt={2} fontWeight="bold">Skills Required:</Text>
              <Text>{internship.skillsRequired.join(', ')}</Text>
              <Text mt={2} fontWeight="bold">Location:</Text>
              <Text>{internship.location}</Text>
              <Text mt={2} fontWeight="bold">Deadline:</Text>
              <Text>{new Date(internship.deadline).toLocaleDateString()}</Text>
              <Button color="teal.500"><a href={internship.link} target="_blank" rel="noopener noreferrer">Apply</a></Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Internships;