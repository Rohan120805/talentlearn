import React from 'react';
import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box p={4} textAlign="center">
      <Heading mb={4}>Welcome to Talent Learn</Heading>
      <VStack spacing={4}>
        <Text fontSize="lg">
          Talent Learn is your one-stop platform for all internship opportunities available in the market.
        </Text>
        <Text fontSize="lg">
          Enjoy free access to industry-level learning materials and enhance your skills.
        </Text>
        <Button as={Link} to="/internships" colorScheme="teal" size="lg">
          Explore Internships
        </Button>
        <Button as={Link} to="/modules" colorScheme="teal" size="lg">
          Start Learning
        </Button>
      </VStack>
    </Box>
  );
};

export default HomePage;