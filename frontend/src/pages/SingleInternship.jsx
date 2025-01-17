import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, HStack, Tag, TagLabel } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SingleInternship = () => {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInternship = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/internships/${id}`);
        setInternship(response.data);

        const userResponse = await axios.get('/auth/profile');
        setUser(userResponse.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id]);

  if (loading) {
    return <Box p={4}>Loading...</Box>;
  }

  if (error) {
    return <Box p={4}>{error}</Box>;
  }

  if (!internship || !user) {
    return <Box p={4}>No data available</Box>;
  }

  const userSkills = new Set(user.skills || []);
  const missingSkills = (internship.skillsRequired || []).filter(skill => !userSkills.has(skill));
  const hasAllSkills = missingSkills.length === 0;

  return (
    <Box p={4}>
      <Heading mb={4}>{internship.title}</Heading>
      <Text fontSize="lg" color="gray.500">at {internship.companyName}</Text>
      <Text mt={4}>{internship.description}</Text>
      <Text mt={4} fontWeight="bold">Skills Required:</Text>
      <HStack wrap="wrap" spacing={2} mt={2}>
        {(internship.skillsRequired || []).map((skill, index) => (
          <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
            <TagLabel>{skill}</TagLabel>
          </Tag>
        ))}
      </HStack>
      <Text mt={4} fontWeight="bold">Location:</Text>
      <Text>{internship.location}</Text>
      <Text mt={4} fontWeight="bold">Deadline:</Text>
      <Text>{new Date(internship.deadline).toLocaleDateString()}</Text>
      <Text mt={4} fontWeight="bold">Your Skills:</Text>
      <HStack wrap="wrap" spacing={2} mt={2}>
        {(user.skills || []).map((skill, index) => (
          <Tag key={index} size="lg" colorScheme="blue" borderRadius="full">
            <TagLabel>{skill}</TagLabel>
          </Tag>
        ))}
      </HStack>
      {hasAllSkills ? (
        <Text mt={4} color="green.500">You have all the required skills. Feel free to apply if you are pleased with the opportunity!</Text>
      ) : (
        <Text mt={4} color="red.500">You are missing the following skills: {missingSkills.join(', ')}. Consider learning them to be a better fit for this opportunity.</Text>
      )}
      <HStack mt={4} justifyContent="space-between">
        <Button mt={4} color="teal.500">
          <a href={internship.link} target="_blank" rel="noopener noreferrer">Apply</a>
        </Button>
        <Button mt={4} colorScheme="blue" onClick={() => navigate('/internships')}>
          Back to Internships
        </Button>
      </HStack>
    </Box>
  );
};

export default SingleInternship;