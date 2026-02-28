// import { cookies } from "next/headers";
// import { adminAuth } from "@/Firebase/admin";
// import { redirect } from "next/navigation";
// import { Box } from "@mui/material";

// export default async function Dashboard() {
//   const session = (await cookies()).get("session")?.value;

//   if (!session) redirect("/login");

//   try {
//     // Verify the cookie is still valid
//     const decodedClaims = await adminAuth.verifySessionCookie(session, true);
//     return <h1>Welcome to Coffee Paglu, {decodedClaims.email}!</h1>;
//   } catch (error) {
//     redirect("/sign-in");
//   }
// }



import { cookies } from "next/headers";
import { adminAuth } from "@/Firebase/admin";
import { redirect } from "next/navigation";
import { Box, Typography, Container, Paper, Stack, Grid } from "@mui/material";
import { Coffee } from "@mui/icons-material";

export default async function Dashboard() {
  const session = (await cookies()).get("session")?.value;

  // 1. Check if session exists
  if (!session) redirect("/sign-in");

  let userEmail = "";

  try {
    // 2. Verify the cookie is still valid with Firebase Admin
    const decodedClaims = await adminAuth.verifySessionCookie(session, true);
    userEmail = decodedClaims.email || "Valued Member";
  } catch (error) {
    // 3. If cookie is expired or invalid, boot to sign-in
    redirect("/sign-in");
  }

  // 4. Render the protected UI
  return (
    <Box sx={{ bgcolor: '#F5F5F5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #E0E0E0' }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Box sx={{ bgcolor: '#3c2a21', p: 1, borderRadius: 2, display: 'flex' }}>
              <Coffee sx={{ color: 'white' }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="800" color="#3c2a21">
                Coffee Paglu Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Welcome back, {userEmail}
              </Typography>
            </Box>
          </Stack>

          <Grid container spacing={3}>
            {/* Example Stats Card */}
            <Grid >
              <Paper sx={{ p: 3, bgcolor: '#C67C4E', color: 'white', borderRadius: 3 }}>
                <Typography variant="h6">Today's Brews</Typography>
                <Typography variant="h3" fontWeight="700">128</Typography>
              </Paper>
            </Grid>
            
            {/* Add more dashboard widgets here */}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}