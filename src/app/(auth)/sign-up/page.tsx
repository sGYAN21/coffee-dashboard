'use client'
import React, { useEffect, useRef, useState } from 'react';
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
import { signUpUser } from './Model/signupModel';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;

    }
    setLoading(true);
    setError('');
    try {
      await signUpUser(username, email, password, 'admin');
      router.push('/sign-in');
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
              <Typography variant="h4" fontWeight="600" fontSize={50} color="#3c2a21" letterSpacing={0.5} >
                Create new Account
              </Typography>
            </Stack>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box
                sx={{
                  bgcolor: '#C67C4E',
                  borderRadius: '100%',
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',


                }}
              >
                <Coffee sx={{ color: 'white', fontSize: 32 }} />
              </Box>

              <Typography variant="h4" fontWeight="800" gutterBottom color="#3E2723">
                Coffee Paglu
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Enter your details to create new account
            </Typography>
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
              {success && <Alert severity="success">{success}</Alert>}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.8, fontWeight: '700', color: '#5D4037' }}>
                  Username
                </Typography>
                <TextField
                  fullWidth
                  placeholder="johnDiggle"
                  size="small"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.8, fontWeight: '700', color: '#5D4037' }}>
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  placeholder="john.doe@example.com"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email fontSize="small" sx={{ color: '#A1887F' }} />
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
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
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
              <Button
                fullWidth
                variant="contained"
                onClick={handleSignUp}
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
                {loading ? 'Sent Verification Link' : 'Send Verification Link'}
              </Button>

              <Typography variant="body2" align="center" color="text">
                Already have an account? {' '}
                <Link href="sign-in" sx={{ color: '#C67C4E', fontWeight: '700', textDecoration: 'none' }}>
                  Sign in
                </Link>
              </Typography>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default SignUp;