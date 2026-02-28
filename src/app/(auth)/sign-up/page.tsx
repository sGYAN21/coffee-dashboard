'use client'
import { useForm } from 'react-hook-form';
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
import { Email, Visibility, VisibilityOff, Coffee, Lock } from '@mui/icons-material';
import { signUpUser } from './Model/signupModel';
import { useRouter } from 'next/navigation';
import { SignUpFormData, signUpSchema } from '@/utils/authValidationSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp = async (data: SignUpFormData) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await signUpUser(data.username, data.email, data.password, 'admin');
      setSuccess('Verification link has been sent to your email.');
      
      reset(); 
      setTimeout(() => router.push('/sign-in'), 3000);
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

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              border: '1px solid #E0E0E0',
              boxShadow: '0px 10px 30px rgba(111, 78, 55, 0.05)'
            }}
          >
            <form onSubmit={handleSubmit(handleSignUp, (errors) => console.log("Form Errors:", errors))}>
              <Stack spacing={2.5}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.8, fontWeight: '700', color: '#5D4037' }}>
                    Username
                  </Typography>
                  <TextField
                    {...register("username")}
                    fullWidth
                    placeholder="johnDiggle"
                    size="small"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.8, fontWeight: '700', color: '#5D4037' }}>
                    Email Address
                  </Typography>
                  <TextField
                    {...register("email")}
                    fullWidth
                    placeholder="john.doe@example.com"
                    size="small"
                    error={!!errors.email}
                    helperText={errors.email?.message}
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
                    {...register("password")}
                    fullWidth
                    size="small"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock fontSize="small" sx={{ color: '#A1887F' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              type="button"
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
                  type="submit"
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
            </form>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default SignUp;