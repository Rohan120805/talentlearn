import React from 'react';
import { Box, Heading, Text, VStack, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box p={4} textAlign="center">
      <Heading mb={4}>Welcome to Talent Learn</Heading>
      <VStack spacing={8}>
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" w="100%">
          <Box p={4} bg="teal.500" borderRadius="md" flex="1" m={2}>
            <Heading size="md" mb={2}>Internships</Heading>
            <Text fontSize="lg">
              Talent Learn is your one-stop platform for all internship opportunities available in the market.
            </Text>
            <Button as={Link} to="/internships" colorScheme="teal" size="lg" mt={4}>
              Explore Internships
            </Button>
          </Box>
          <Box p={4} bg="teal.500" borderRadius="md" flex="1" m={2}>
            <Heading size="md" mb={2}>Modules</Heading>
            <Text fontSize="lg">
              Enjoy free access to industry-level learning paths and materials to enhance and upgrade your skills.
            </Text>
            <Button as={Link} to="/modules" colorScheme="teal" size="lg" mt={4}>
              Start Learning
            </Button>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default HomePage;