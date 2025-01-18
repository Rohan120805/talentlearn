import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, HStack, Tag, TagLabel } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SingleModule = () => {
    const { id } = useParams();
    const [module, setModule] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchModule = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/modules/${id}`);
            setModule(response.data);
    
            const userResponse = await axios.get('/auth/profile');
            setUser(userResponse.data);
        } catch (error) {
            setError('Error fetching data');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
        };
    
        fetchModule();
    }, [id]);
    
    if (loading) {
        return <Box p={4}>Loading...</Box>;
    }
    
    if (error) {
        return <Box p={4}>{error}</Box>;
    }
    
    if (!module || !user) {
        return <Box p={4}>No data available</Box>;
    }
    
    const userSkills = new Set(user.skills || []);
    const missingSkills = (module.skillsAcquired || []).filter(skill => !userSkills.has(skill));
    const hasAllSkills = missingSkills.length === 0;
    
    return (
        <Box p={4}>
            <Heading mb={4}>{module.title}</Heading>
            <Text fontSize="lg" color="gray.500">by {module.author}</Text>
            <Text mt={4}>{module.description}</Text>
            <Text mt={4} fontWeight="bold">Skills you gain after completion of this course:</Text>
            <HStack wrap="wrap" spacing={2} mt={2}>
                {(module.skillsAcquired || []).map((skill, index) => (
                <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
                    <TagLabel>{skill}</TagLabel>
                </Tag>
                ))}
            </HStack>
            {hasAllSkills ? (
                    <Text mt={4} color="green.500">You already have all the skills which are acquired after completing this module.</Text>
                  ) : (
                    <>
                      <Text mt={4} color="red.500">You are missing the following skills:</Text>
                      <HStack wrap="wrap" spacing={2} mt={2}>
                          {(missingSkills || []).map((skill, index) => (
                          <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
                              <TagLabel>{skill}</TagLabel>
                          </Tag>
                          ))}
                      </HStack>
                      <Text mt={4} color="red.500">You will gain them after completing this module</Text>
                    </>
                  )}
        </Box>
    );
}

export default SingleModule;