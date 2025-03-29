import React from 'react';
import { Box, Heading, Text, VStack, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const bgGradient = useColorModeValue(
    'linear(to-r, teal.400, blue.500)',
    'linear(to-r, teal.600, blue.700)'
  );
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box>
      <Box
        bgGradient={bgGradient}
        py={20}
        px={4}
        textAlign="center"
        color="white"
      >
        <Heading 
          as="h1" 
          size="2xl" 
          mb={4}
          bgGradient="linear(to-r, white, gray.100)"
          bgClip="text"
        >
          Welcome to Talent Learn
        </Heading>
        <Text fontSize="xl" maxW="2xl" mx="auto" opacity={0.9}>
          Discover opportunities and enhance your skills with our curated internships and learning modules
        </Text>
      </Box>

      <VStack spacing={8} py={16} px={4} maxW="6xl" mx="auto">
        <Flex 
          direction={{ base: 'column', lg: 'row' }} 
          align="stretch" 
          justify="space-between" 
          w="100%" 
          gap={8}
        >
          <Box 
            p={8} 
            bg={cardBg}
            borderRadius="xl"
            flex="1" 
            shadow="xl"
            transition="transform 0.3s"
            _hover={{ transform: 'translateY(-5px)' }}
          >
            <Heading size="lg" mb={4} color="teal.500">Internships</Heading>
            <Text fontSize="lg" color={textColor} mb={6}>
              Access curated internship opportunities from top companies. Find the perfect match for your skills and career goals.
            </Text>
            <Button
              as={Link}
              to="/internships"
              size="lg"
              colorScheme="teal"
              w="full"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Explore Internships
            </Button>
          </Box>

          <Box 
            p={8} 
            bg={cardBg}
            borderRadius="xl"
            flex="1" 
            shadow="xl"
            transition="transform 0.3s"
            _hover={{ transform: 'translateY(-5px)' }}
          >
            <Heading size="lg" mb={4} color="blue.500">Learning Modules</Heading>
            <Text fontSize="lg" color={textColor} mb={6}>
              Level up your skills with our comprehensive learning modules. Get industry-ready with practical knowledge and hands-on experience.
            </Text>
            <Button
              as={Link}
              to="/modules"
              size="lg"
              colorScheme="blue"
              w="full"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Start Learning
            </Button>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default HomePage;