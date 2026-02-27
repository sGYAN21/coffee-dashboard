import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { SidebarDrawer } from "@/components/SideBarDrawer";
import { Box } from "@mui/material"; // Import Box for layout


export const metadata: Metadata = {
  title: "Coffee Dashboard",
  description: "Management portal",
};
import { AuthProvider } from "@/context/AuthContext";
import LayoutWrapper from "./LayoutWrapper"; 
import { Geist, Geist_Mono } from "next/font/google";
import { AlertProvider } from "@/context/AlertContext";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
         <AlertProvider> {/* Now alerts work everywhere */}
            <LayoutWrapper>{children}</LayoutWrapper>
          </AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         {/* 1. Use a Flex container for the whole screen */}
//         <Box sx={{ display: 'flex', minHeight: '100vh', }}>
  
//           <SidebarDrawer />

//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,
//               display: 'flex',
//               flexDirection: 'column',
//               width: { sm: `calc(100% - 240px)` }, 
//             }}
//           >
//             <NavBar />

//             <Box sx={{ p: 3 }}>
//               {children}
//             </Box>
//           </Box>
//         </Box>
//       </body>
//     </html>
//   );
// }
