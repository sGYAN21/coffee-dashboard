'use client'
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Stack,
  Paper,
  Alert
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff, Coffee } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { signInUser } from './Model/signinModel';

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSignIn = async () => {
    if ( !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInUser( email, password,); 
      router.refresh();
      router.push('/dashboard'); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end', 
        backgroundImage: 'url(/signin/coverImage3.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        bgcolor: 'rgba(0,0,0,0.2)',
      }}
    >
   
      <Box
        sx={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          bgcolor: 'rgba(0,0,0,0.2)',
          zIndex: 0
        }}
      />

      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '0 0 45%', lg: '0 0 60%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          zIndex: 1, 
        
        }}
      >
        <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 4 } }}>
          {/* Logo and Header */}
          <Stack spacing={1} alignItems="center" sx={{ mb: 4 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  bgcolor: '#C67C4E',
                  borderRadius: '50%',
                  p: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Coffee sx={{ color: 'white', fontSize: 28 }} />
              </Box>
              <Typography variant="h4" fontWeight="600" fontSize={50} color="#3c2a21" letterSpacing={0.5} >
                Welcome Back!
              </Typography>
            </Stack>

            <Box textAlign="center" sx={{ pt: 2 }}>
              <Typography variant="h4" fontWeight="800" gutterBottom color="#3E2723">
                Coffee Paglu
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Log in to your coffee shop dashboard.
              </Typography>
            </Box>
          </Stack>

          {/* White Login Card */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              border: '1px solid #E0E0E0',
              boxShadow: '0px 10px 30px rgba(111, 78, 55, 0.05)'
            }}
          >
            <Stack spacing={2.5}>
              {error && <Alert severity="error">{error}</Alert>}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.8, fontWeight: '700', color: '#5D4037' }}>
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="small"

                     slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email fontSize="small" sx={{ color: '#C67C4E' }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      bgcolor: 'white'
                    }
                  }}
                 
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.8, fontWeight: '700', color: '#5D4037' }}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock fontSize="small" sx={{ color: '#C67C4E' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                />
              </Box>

              <Box textAlign="right">
                <Link href="forget-password" underline="hover" sx={{ color: '#C67C4E', fontSize: '0.8rem', fontWeight: '500' }}>
                  Forgot Password?
                </Link>
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={handleSignIn}
                disabled={loading}
                sx={{
                  bgcolor: '#3c2a21',
                  '&:hover': { bgcolor: '#C67C4E' },
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  py: 1.2,
                  borderRadius: 2,
                  mt: 1
                }}
              >
              {loading ? 'Sign in...' : 'Sign in'}
              </Button>

              <Typography variant="body2" align="center" color="text.secondary">
                Don't have an account?{' '}
                <Link href="/sign-up" sx={{ color: '#C67C4E', fontWeight: '700', textDecoration: 'none' }}>
                  Sign Up
                </Link>
              </Typography>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default SignIn;