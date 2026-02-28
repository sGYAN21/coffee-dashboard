import { Box, Typography, Stack, Rating, Divider, Chip } from '@mui/material';
import { ProductRow } from '../Model/ProductItem';

interface ProductCardProps {
  product: ProductRow | null;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  console.log("Selected Product Data:", product);
  // Show a placeholder if no item is selected
  if (!product) {
    return (
      <Box sx={{ flex: 1, p: 5, border: '1px dashed #ccc', borderRadius: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">Select an item from the table to view details</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      bgcolor: 'white', p: 3, borderRadius: 4, flex: 1,
      border: '1px solid #eef0f2',
      boxShadow: '0px 10px 30px rgba(0,0,0,0.03)',
    }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="caption" sx={{ bgcolor: '#f0f4f8', px: 1.5, py: 0.5, borderRadius: 1, color: 'secondary.main', fontWeight: 'bold' }}>
          {/* ID: #{product.id} */}
        </Typography>
        <Chip
          label={product.isActive ? "Active" : "Inactive"}
          size="small"
          color={product.isActive ? "success" : "error"}
          sx={{ fontWeight: 'bold' }}
        />
      </Stack>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
        {/* Left Side: Image & Description */}
        <Box sx={{ width: { lg: '35%' } }}>
          <Box sx={{ height: 450, bgcolor: '#f8f9fa', borderRadius: 3, overflow: 'hidden', border: '1px solid #f0f0f0', mb: 2 }}>
            <img
              src={product.imageUrl || ''}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Box>

        {/* Right Side: Specifications */}
        <Box sx={{ flex: 1 }}>
          <Stack spacing={2.5}>
            <Box>
              <Typography variant="h4" fontWeight="500" color="text.primary">{product.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>
                {product.description || "No description provided for this item."}
              </Typography>
            </Box>

            <Stack direction="row" spacing={4}>
              <Box>
                <Typography variant="caption" color="text.primary" fontWeight="bold" display="block" gutterBottom>TYPE</Typography>
                <Typography variant="body1" fontWeight="600" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{product.type}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.primary" fontWeight="bold" display="block" gutterBottom>CATEGORY</Typography>
                <Typography variant="body1" fontWeight="600" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{product.category || 'N/A'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.primary" fontWeight="bold" display="block" gutterBottom>RATING</Typography>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Rating value={product.rating} readOnly size="small" precision={0.5} />
                  <Typography variant="body2" fontWeight="bold">({product.rating.toFixed(1)})</Typography>
                </Stack>
              </Box>
            </Stack>

            <Divider />

            {/* Pricing/Size Section - Mapping from Firestore Objects */}
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" sx={{ mb: 1.5 }}>
                AVAILABLE SIZES & PRICING
              </Typography>
              <Stack direction="row" spacing={2}>
                {['small', 'medium', 'large'].map((size) => (
                  <Box key={size} sx={{
                    p: 2, flex: 1, borderRadius: 2, bgcolor: '#fcfcfc',
                    border: '1px solid #f0f0f0', textAlign: 'center'
                  }}>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                      {size}
                    </Typography>
                    <Typography variant="h6" fontWeight="800" color="primary.main">
                      {/* Access the nested price object from your Firestore schema */}
                      ${product.rawPrices?.[size] || '0.00'}
                    </Typography>
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: 15, fontWeight: 'bold' }}>
                      {/* Access the nested volume object */}
                      {product.rawVolumes?.[size] || '--'} ml
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};