
import { Box, Typography, Stack, Divider, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { CategorySummary, ProductSummary } from '../Model/ProductSummary';

const categories = [
  { label: 'Coffees', count: 105, icon: '☕' },
  { label: 'Juices', count: 57, icon: '🍹' },
  { label: 'Liquors', count: 27, icon: '🥃' },
  { label: 'Mocktails', count: 39, icon: '🍸' },
];

export const SummaryCard = () => {
  const [data, setData] = useState<CategorySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummary = async () => {
      const summary = await ProductSummary();
      setData(summary);
      setLoading(false);
    };
    loadSummary();
  }, []);
  return (
  <Box sx={{ 
    bgcolor: '#f8f9fa',
    border: '1px solid #e0e0e0', 
    borderRadius: 2, 
    p: 2, 
    color: 'text.primary', 
    width: '300px' 
  }}>
    <Stack spacing={2}>
      {/* {loading ? ( */}
         {/* <Stack alignItems="center" p={2}><CircularProgress size={24} /></Stack>
      // ) : ( */}
      {data.map((cat, index) => (
        <Box key={cat.label}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ fontSize: '1.5rem', filter: 'grayscale(0.5)' }}>
                    {cat.icon}
                  </Box>
              <Typography fontWeight={500} color="text.secondary">{cat.label}</Typography>
            </Stack>
            <Typography variant="h6" fontWeight="semibold" color="#3C2A21">
              {cat.count}
            </Typography>
          </Stack>
          {index < data.length - 1 && <Divider sx={{ mt: 1 }} />}
        </Box>
      ))}
    </Stack>
  </Box>
  )
};