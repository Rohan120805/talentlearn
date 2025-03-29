import React, {useEffect, useState} from 'react';
import {
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Button,
  HStack,
  Tag,
  TagLabel,
  Container,
  VStack,
  useColorModeValue,
  Skeleton,
  Image,
  Icon,
  Divider
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { FaGraduationCap, FaArrowRight } from 'react-icons/fa';

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Enhanced color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('teal.600', 'teal.300');
  const gradientBg = useColorModeValue(
    'linear(to-r, teal.400, blue.500)',
    'linear(to-r, teal.500, blue.600)'
  );

  // ... existing useEffect code ...

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
      <Container maxW="7xl" py={12}>
        <VStack spacing={12} align="stretch">
          <Box textAlign="center">
            <Icon as={FaGraduationCap} w={12} h={12} color="teal.400" mb={4} />
            <Heading 
              size="2xl"
              bgGradient={gradientBg}
              bgClip="text"
              letterSpacing="tight"
              mb={4}
            >
              Learning Modules
            </Heading>
            <Text
              fontSize="xl"
              color={useColorModeValue('gray.600', 'gray.400')}
              maxW="2xl"
              mx="auto"
            >
              Enhance your skills with our expertly curated learning modules
            </Text>
            <Divider my={8} />
          </Box>

          {loading ? (
            <SimpleGrid columns={{base:1, md:2, lg:3}} spacing={8}>
              {[1,2,3].map(i => (
                <Skeleton 
                  key={i} 
                  height="400px" 
                  borderRadius="xl"
                  startColor={useColorModeValue('gray.100', 'gray.700')}
                  endColor={useColorModeValue('gray.200', 'gray.600')}
                />
              ))}
            </SimpleGrid>
          ) : modules.length === 0 ? (
            <Box 
              textAlign="center" 
              p={12}
              bg={cardBg}
              borderRadius="xl"
              shadow="lg"
            >
              <Text fontSize="xl">No modules available at the moment</Text>
            </Box>
          ) : (
            <SimpleGrid columns={{base:1, md:2, lg:3}} spacing={8}>
              {modules.map((module) => (
                <Card 
                  key={module._id} 
                  bg={cardBg}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="xl"
                  overflow="hidden"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-8px)',
                    boxShadow: '2xl'
                  }}
                >
                  <CardHeader p={6}>
                    <Heading 
                      size="md" 
                      color={headingColor}
                      mb={2}
                    >
                      {module.title}
                    </Heading>
                    <Text 
                      fontSize="sm" 
                      color={useColorModeValue('gray.600', 'gray.400')}
                    >
                      by {module.author}
                    </Text>
                  </CardHeader>
                  <CardBody p={6} pt={0}>
                    <VStack align="stretch" spacing={6}>
                      <Text 
                        noOfLines={3}
                        color={useColorModeValue('gray.700', 'gray.300')}
                      >
                        {module.description}
                      </Text>
                      <Box>
                        <Text 
                          fontWeight="bold" 
                          mb={3}
                          color={useColorModeValue('gray.700', 'gray.300')}
                        >
                          Skills you'll gain:
                        </Text>
                        <HStack wrap="wrap" spacing={2}>
                          {(module.skillsAcquired || []).map((skill, index) => (
                            <Tag 
                              key={index} 
                              size="md" 
                              colorScheme="teal"
                              borderRadius="full"
                              px={3}
                              py={1}
                              variant="subtle"
                            >
                              <TagLabel>{skill}</TagLabel>
                            </Tag>
                          ))}
                        </HStack>
                      </Box>
                      <Button
                        colorScheme="teal"
                        size="lg"
                        onClick={() => navigate(`/modules/${module._id}`)}
                        w="full"
                        mt="auto"
                        rightIcon={<FaArrowRight />}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg'
                        }}
                      >
                        Start Learning
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Modules;