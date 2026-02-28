'use client'
import React from 'react';
import {
  AppBar, Toolbar, TextField, InputAdornment, Stack,
  IconButton, Avatar, Box, Typography
} from '@mui/material';
import { Search, Notifications } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { SidebarDrawer } from './SideBarDrawer';
export const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: '#C67C4E',
        width: { sm: `calc(100% - 240px)` }, 
        ml: { sm: `240px` },
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => setOpen(true)}
            size="large"
     
            edge="start"
            sx={{ mr: 2,color: '#fff', display: { sm: 'none' } }} // Hide on sm and up
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <SidebarDrawer open={open} onClose={() => setOpen(false)} />
        <TextField
          placeholder="Search items"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#black' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            width: 400,
            bgcolor: '#ffff',
            borderRadius: 2,
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
          }}
        />

        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton sx={{ color: '#D4A373' }}>
            <Notifications />
          </IconButton>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box textAlign="right">
              <Typography variant="body2" fontWeight="700" color="white">
                Alex Johnson
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Admin
              </Typography>
            </Box>
            <Avatar src="https://i.pravatar.cc/100" sx={{ width: 40, height: 40, border: '1px solid #2D2D2D' }} />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};