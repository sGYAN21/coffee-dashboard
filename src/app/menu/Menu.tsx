'use client'
import { Box, Stack, Typography, Button } from '@mui/material';
import { ProductCard } from './components/ProductCard';
import { SummaryCard } from './components/SummaryCard';
import { ItemsTable } from './components/ItemsTable';
import { useState } from 'react';
import { ItemDialog } from './components/ItemDialog';
import { ProductRow } from './Model/ProductItem';

export default function MenuPage() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductRow | null>(null);
  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh', p: 4, color: 'white' }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5" fontWeight="bold" sx={{color:'#C67C4E'}}>Upload Beverage Item</Typography>
          <Box sx={{ p: 4 }}>
          <Button
          sx={{bgcolor:'#c36c2d'}}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            + Upload New Item
          </Button>

          <ItemDialog open={open} onClose={() => setOpen(false)} />
        </Box>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <ProductCard product={selectedProduct} />
        <Stack spacing={2}>
          <SummaryCard />
        </Stack>
      </Stack>

      <Box mt={4}>

        <Typography variant="h6" mb={2}>Uploaded Items</Typography>
        <ItemsTable onSelect={setSelectedProduct} />
      </Box>
    </Box>
  );
}