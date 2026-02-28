import React from 'react';
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Grid,
  Divider
} from '@mui/material';

export const SkeletonLoading = () => {
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {/* Top Section Skeletons (Details & Sidebar) */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={9}>
          <Skeleton 
            variant="rectangular" 
            height={120} 
            sx={{ borderRadius: 2, border: '1px dashed #ccc' }} 
          />
        </Grid>
        <Grid size={3}>
          <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
        </Grid>
      </Grid>

      {/* Table Skeleton */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #eee' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              {['S.No', 'Image', 'Name', 'Type', 'Price', 'Rating', 'Actions', 'Status'].map((col) => (
                <TableCell key={col} sx={{ fontWeight: 'bold' }}>
                  <Skeleton variant="text" width={50} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton variant="text" width={20} /></TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: 1 }} />
                </TableCell>
                <TableCell><Skeleton variant="text" width={120} /></TableCell>
                <TableCell><Skeleton variant="text" width={80} /></TableCell>
                <TableCell><Skeleton variant="text" width={40} /></TableCell>
                <TableCell><Skeleton variant="text" width={100} /></TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Skeleton variant="rectangular" width={50} height={30} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="text" width={40} />
                  </Stack>
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width={60} height={25} sx={{ borderRadius: 4 }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};


// export const SummarySkeleton = () => {
//   return (
//     <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      
//       {/* Top Section: Details Placeholder & Sidebar */}
//       <Box sx={{ display: 'flex', gap: 2 }}>
//         {/* Left: Product Detail Placeholder */}
//         <Paper variant="outlined" sx={{ flex: 3, p: 4, borderStyle: 'dashed', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <Skeleton variant="text" width="40%" height={30} />
//         </Paper>

//         {/* Right: Sidebar Categories */}
//         <Paper variant="outlined" sx={{ flex: 1, p: 2 }}>
//           {[...Array(5)].map((_, i) => (
//             <Box key={i}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <Skeleton variant="circular" width={24} height={24} />
//                   <Skeleton variant="text" width={80} />
//                 </Stack>
//                 <Skeleton variant="text" width={10} />
//               </Box>
//               {i < 4 && <Divider />}
//             </Box>
//           ))}
//         </Paper>
//       </Box>

//       {/* Bottom Section: Table */}
//       <TableContainer component={Paper} variant="outlined">
//         <Table>
//           <TableHead sx={{ bgcolor: '#f9fafb' }}>
//             <TableRow>
//               {['S.No', 'Image', 'Name', 'Type', 'Price', 'Rating', 'Actions', 'Status'].map((col) => (
//                 <TableCell key={col}><Skeleton variant="text" width={40} /></TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {[...Array(4)].map((_, index) => (
//               <TableRow key={index}>
//                 <TableCell><Skeleton variant="text" width={10} /></TableCell>
//                 <TableCell><Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: 1 }} /></TableCell>
//                 <TableCell><Skeleton variant="text" width={100} /></TableCell>
//                 <TableCell><Skeleton variant="text" width={60} /></TableCell>
//                 <TableCell><Skeleton variant="text" width={30} /></TableCell>
//                 <TableCell><Skeleton variant="text" width={80} /></TableCell>
//                 <TableCell>
//                   <Stack direction="row" spacing={1}>
//                     <Skeleton variant="rectangular" width={45} height={25} sx={{ borderRadius: 1 }} />
//                     <Skeleton variant="text" width={35} />
//                   </Stack>
//                 </TableCell>
//                 <TableCell><Skeleton variant="rounded" width={60} height={25} sx={{ borderRadius: 4 }} /></TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };