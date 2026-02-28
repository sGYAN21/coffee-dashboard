'use client'
import React from 'react';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Toolbar, Stack, Avatar, Typography,
  Button,
  Box
} from '@mui/material';
import {
  Dashboard, ReceiptLong, MenuBook, People, Analytics, Settings, Coffee,
  Logout
} from '@mui/icons-material';
// 1. Import the correct Link and Hook
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { UserSignOut } from '@/Firebase/FirebaseAuth/UserSignOut';
import { useAlert } from '@/context/AlertContext';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Orders', icon: <ReceiptLong />, path: '/orders' },
  { text: 'Menu', icon: <MenuBook />, path: '/menu' },
  { text: 'Customers', icon: <People />, path: '/customers' },
  { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

export const SidebarDrawer: React.FC<SidebarProps> = ({ open, onClose }) => {
  const { showAlert } = useAlert();
  const pathname = usePathname();
  const router = useRouter();
  // const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      const success = await UserSignOut();
      if (success) {
        router.push('/sign-in');
      }
    } catch (error: any) {
      console.error("Logout process failed:", error.message);
      showAlert("Error logging out. Please try again.", 'warning');
    }
  };

  const drawerContent = (
    <>
      <Toolbar>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ bgcolor: '#7B4D31', width: 32, height: 32 }}>
            <Coffee fontSize="small" />
          </Avatar>
          <Typography variant="h6" color="#FFFFFF" fontWeight="700" fontSize="1.1rem">
            Coffee Paglu
          </Typography>
        </Stack>
      </Toolbar>
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              href={item.path}
              key={item.text}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={onClose} // Add onClose here to hide drawer on mobile
                  sx={{
                    py: 1.5,

                    color: isActive ? '#D4A373' : 'inherit',
                    borderLeft: isActive ? '4px solid #D4A373' : '4px solid transparent',
                    bgcolor: isActive ? 'rgba(212, 163, 115, 0.1)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 45 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    // Ensure text color is inherited correctly
                    sx={{ color: 'inherit' }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <List sx={{ mb: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              py: 1.5,
              justifyContent: 'center', // Center content horizontally
              color: '#FF6B6B', // Subtle red to indicate action
              borderLeft: '4px solid transparent',
              '&:hover': {
                bgcolor: 'rgba(255, 107, 107, 0.1)',
                color: '#FF5252',
              }
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Logout fontSize="small" />
              <Typography fontWeight="600">Logout</Typography>
            </Stack>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#3C2A21', borderRight: '1px solid #2D1E19', color: 'white' },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#3C2A21', borderRight: '1px solid #2D1E19', color: 'white' },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};
