'use client';
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Rating, Stack, CircularProgress, Box, Menu, MenuItem, Chip,
  Typography
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ProductItem, deleteProduct, ProductRow, updateProductField } from '../Model/ProductItem';
import { ItemDialog } from './ItemDialog';
import { deleteImage } from '@/Firebase/FireStore/UploadImage';
import { useAlert } from '@/context/AlertContext';
import { SkeletonLoading } from './SkeletonLoading';

interface TableProps {
  onSelect: (product: ProductRow) => void;
}

export const ItemsTable = ({ onSelect }: TableProps) => {
   const { showAlert } = useAlert();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<ProductRow | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Menu State for Status Toggle
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<ProductRow | null>(null);

  const loadData = async () => {
    try {
      const data = await ProductItem();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleStatusOpen = (e: React.MouseEvent<HTMLElement>, row: ProductRow) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setSelectedRow(row);
  };

  const handleStatusChange = async (newStatus: boolean) => {
    if (!selectedRow) return;
    try {
      await updateProductField(selectedRow.fullPath, { isActive: newStatus });
      // Update local state so UI refreshes instantly
      setProducts(prev => prev.map(p => 
        p.fullPath === selectedRow.fullPath ? { ...p, isActive: newStatus } : p
      ));
    } catch (err) {
      console.error("Status Update Error:", err);
      showAlert("Permission denied. Update your Firestore rules.",'error');
    }
    setAnchorEl(null);
  };

  const handleDelete = async (e: React.MouseEvent, row: ProductRow) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${row.name}" permanently?`)) {
      try {
        await deleteProduct(row.fullPath);
        if (row.imageUrl) {
          await deleteImage(row.imageUrl);
        }
        setProducts(prev => prev.filter(p => p.fullPath !== row.fullPath));
      } catch (err) {
        showAlert("Delete failed. Check Firebase Storage rules.",'error');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <SkeletonLoading />
      </Box>
    );
  }

  return (
    <>
      <ItemDialog 
        open={isDialogOpen} 
        onClose={() => { setIsDialogOpen(false); loadData(); }} 
        editData={editItem} 
      />

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', mt: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              {['S.No', 'Image', 'Name', 'Type', 'Price (small)', 'Volume (small)', 'Rating', 'Actions', 'Status'].map((head) => (
                <TableCell key={head} sx={{ fontWeight: 'bold', color: 'text.secondary' }}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 10 }}>
                  <Stack alignItems="center" spacing={1}>
                    <Typography variant="body1" color="text.secondary" fontWeight="medium">
                      No item is added
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : (
            products.map((row, index) => (
              <TableRow 
                key={row.fullPath}
                onClick={() => onSelect(row)}
                
                sx={{ '&:hover': { bgcolor: '#fcfcfc', cursor: 'pointer' } }}
              >
                <TableCell sx={{ fontWeight: 'bold' }}>{index + 1}</TableCell>
                
                {/* Image Cell with fallback to fix "empty string" error */}
                <TableCell>
                  <Box 
                    component="img"
                    src={row.imageUrl || 'https://via.placeholder.com/40'} 
                    alt={row.name} 
                    sx={{ width: 40, height: 40, borderRadius: 1, objectFit: 'cover' }} 
                  />
                </TableCell>

                <TableCell sx={{ fontWeight: 'bold' }}>{row.name}</TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>{row.type}</TableCell>
                <TableCell sx={{ color: '#c36c2d', fontWeight: 'bold' }}>{row.price}</TableCell>
                <TableCell sx={{ color: '#c36c2d', fontWeight: 'bold' }}>{row.rawVolumes.small} ml</TableCell>
                <TableCell><Rating value={row.rating} readOnly size="small" /></TableCell>
                
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ bgcolor: '#c36c2d', '&:hover': { bgcolor: '#a65b26' } }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditItem(row);
                        setIsDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      color="error"
                      onClick={(e) => handleDelete(e, row)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.isActive ? "Active" : "Inactive"}
                    color={row.isActive ? "success" : "error"}
                    size="small"
                    onClick={(e) => handleStatusOpen(e, row)}
                    onDelete={(e) => handleStatusOpen(e as any, row)}
                    deleteIcon={<KeyboardArrowDownIcon />}
                    sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                  />
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
             disableScrollLock={true} 
      >
        <MenuItem onClick={() => handleStatusChange(true)}>Active</MenuItem>
        <MenuItem onClick={() => handleStatusChange(false)}>Inactive</MenuItem>
      </Menu>
    </>
  );
};