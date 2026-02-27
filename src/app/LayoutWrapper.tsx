'use client'
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { SidebarDrawer } from "../components/SideBarDrawer";
import { NavBar } from "../components/NavBar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();


  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';

  useEffect(() => {
    // 2. Fix: Redirect to the correct sign-in path
    if (!loading && !user && !isAuthPage) {
      router.push('/sign-in'); // Changed from '/login' to match your check
    }
  }, [user, loading, isAuthPage, router]);

  // 3. Render Auth Pages without Sidebar/Navbar
  if (isAuthPage) {
    return (
      <Box 
        component="main" 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: '#f5f5f5' // Light background for auth pages
        }}
      >
        {children}
      </Box>
    );
  }

  // 4. Render Dashboard Layout
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAF3' }}>
      <SidebarDrawer />
      
      <Stack 
        sx={{ 
          flexGrow: 1, 
          width: { sm: `calc(100% - 240px)` }, // Adjust based on your Drawer width
          minHeight: '100vh'
        }}
      >
        <NavBar />
        <Box 
          component="main" 
          sx={{ 
            p: 3, 
            flexGrow: 1, 
            overflowY: 'auto' 
          }}
        >
          {children}
        </Box>
      </Stack>
    </Box>
  );
}