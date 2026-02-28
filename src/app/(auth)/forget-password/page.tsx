'use client'
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Stack,
  Paper,
  Alert
} from '@mui/material';
import { Email, Coffee, ArrowBack } from '@mui/icons-material';
import { resetUserPassword } from './Model/forgetModel';

// Validation Imports
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/utils/authValidationSchema';

const ForgetPassword = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });


  const handleResetPassword = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await resetUserPassword(data.email);
      setSuccess('Password reset link has been sent to your email.');
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
                Reset Password
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
                <Coffee sx={{ color: 'white', fontSize: 28 }} />
              </Box>

              <Typography variant="h4" fontWeight="800" gutterBottom color="#3E2723">
                Coffee Paglu
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Enter your email to receive a password reset link.
            </Typography>
          </Stack>

          {/* White Reset Card */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              border: '1px solid #E0E0E0',
              boxShadow: '0px 10px 30px rgba(111, 78, 55, 0.05)'
            }}
          >
            {/* 3. Wrap in form tag */}
            <form onSubmit={handleSubmit(handleResetPassword)}>
              <Stack spacing={2.5}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

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
                  {loading ? 'Sending link...' : 'Send Link'}
                </Button>

                <Box textAlign="center" sx={{ pt: 1 }}>
                  <Link
                    href="/sign-in"
                    sx={{
                      color: '#C67C4E',
                      fontWeight: '700',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 0.5
                    }}
                  >
                    <ArrowBack fontSize="small" /> Back to Sign In
                  </Link>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ForgetPassword;