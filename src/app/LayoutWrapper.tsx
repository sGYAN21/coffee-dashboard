'use client'
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import { SidebarDrawer } from "../components/SideBarDrawer";
import { NavBar } from "../components/NavBar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();


  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up' || pathname === '/forget-password';

  useEffect(() => {

    if (!loading && !user && !isAuthPage) {
      router.push('/sign-in');
    }
  }, [user, loading, isAuthPage, router]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', bgcolor: '#F8FAF3' }}>
        <CircularProgress sx={{ color: '#3C2A21' }} />
      </Box>
    );
  }

  if (isAuthPage) {
    return (
      <Box component="main" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
        {children}
      </Box>
    );
  }
  if (!user) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAF3' }}>
      <NavBar />
      <Stack
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: `240px` },
          mt: { xs: '56px', sm: '64px' },
          minHeight: '100vh'
        }}
      >
        {/* <SidebarDrawer /> */}
        <Box component="main" sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
          {children}
        </Box>
      </Stack>
    </Box>
  );
}