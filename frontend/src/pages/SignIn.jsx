import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';

const SignIn = () => {
  return (
    <Box p={4} textAlign="center">
      <Heading mb={4}>Sign In</Heading>
      <Button as="a" href="http://localhost:5000/auth/google" colorScheme="teal">
        Sign in with Google
      </Button>
    </Box>
  );
};

export default SignIn;