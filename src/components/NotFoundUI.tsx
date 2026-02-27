'use client';
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

const NotFoundUI = () => {
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{mt:10}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
          gap: 2,
        }}
      >
        {/* 404 Image Section */}
        <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
          <Box
            component="img"
            src="/404/coffee-cup.gif" 
            alt="404 Not Found"
            sx={{
              width: '100%',
              maxWidth: 400,
              height: 'auto',
              borderRadius: '30px',
            }}
          />
        </Box>

        {/* Text Section */}
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            color: '#42495a',
            fontSize: { xs: '1.5rem', sm: '2.125rem' } 
          }}
        >
          Oops! Page not found
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ color: '#6b7280', mb: 3 }}
        >
          The page you're looking for doesn't exist.
        </Typography>
             
        {/* Action Button */}
        <Button
          variant="contained"
          onClick={() => router.push('/')}
          sx={{
            background: 'linear-gradient(to right, #26405c, #001F3F)',
            color: 'white',
            textTransform: 'none',
            fontSize: '1.1rem',
            fontWeight: 600,
            px: 6,
            py: 1.5,
            borderRadius: '50px',
            boxShadow: '0px 8px 15px rgba(232, 134, 101, 0.3)',
            '&:hover': {
              background: 'linear-gradient(to right, #26405c, black)',
              boxShadow: '0px 12px 20px rgba(232, 134, 101, 0.4)',
            },
          }}
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundUI;