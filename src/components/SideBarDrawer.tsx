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
import { useAuth } from '@/context/AuthContext';
import { UserSignOut } from '@/Firebase/FirebaseAuth/UserSignOut';
import { useAlert } from '@/context/AlertContext';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Orders', icon: <ReceiptLong />, path: '/orders' },
  { text: 'Menu', icon: <MenuBook />, path: '/menu' },
  { text: 'Customers', icon: <People />, path: '/customers' },
  { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

export const SidebarDrawer = () => {
 const {showAlert} = useAlert();
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

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#3C2A21',
          borderRight: '1px solid #2D1E19',
          color: 'white',
        },
      }}
    >
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
          // 3. Check if this specific item is active
          const isActive = pathname === item.path;

          return (
            /* 4. Use Next.js Link with legacyBehavior or pass child directly to remove blue/underline */
            <Link
              href={item.path}
              key={item.text}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    py: 1.5,
                    // 5. Apply dynamic colors based on active state
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

      {/* 2. Logout Button Section */}
      <List sx={{ mb: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              py: 1.5,
              color: '#FF6B6B', // Subtle red to indicate action
              borderLeft: '4px solid transparent',
              '&:hover': {
                bgcolor: 'rgba(255, 107, 107, 0.1)',
                color: '#FF5252',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 45 }}>
              <Logout />
            </ListItemIcon>
            <ListItemText 
                primary="Logout" 
                primaryTypographyProps={{ fontWeight: '600' }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};