import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Rating,
  Select,
  MenuItem,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Coffee } from '@mui/icons-material';

import { updateProductItem, uploadProductItem } from "../Model/UploadProductItem"
import { useAlert } from '@/context/AlertContext';
interface ItemDialogProps {
  open: boolean;
  onClose: () => void;
  editData?: any;
}

export const ItemDialog = ({ open, onClose, editData }: ItemDialogProps) => {

  const { showAlert } = useAlert();
  // Form State
  const [type, setType] = useState('');
  const [category, setCategory] = useState('coffee');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState<number | null>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [price, setPrice] = useState({ small: '', medium: '', large: '' });
  const [volume, setVolume] = useState({ small: '', medium: '', large: '' });


  // UI State
  const [loading, setLoading] = useState(false);

  const isFormInvalid = !name.trim() || !type;

  useEffect(() => {
    if (editData) {
      setName(editData.name || '');
      setCategory(editData.category || 'coffee');
      setType(editData.type || '');
      setDescription(editData.description || '');
      setPrice(editData.rawPrices || { small: '', medium: '', large: '' });
      setVolume(editData.rawVolumes || { small: '', medium: '', large: '' });
      setPreviewUrl(editData.imageUrl || null);
    } else {
      // Reset form for "Add New" mode
      setName('');
      setCategory('coffee');
      setType('');
      setDescription('');
      setPrice({ small: '', medium: '', large: '' });
      setVolume({ small: '', medium: '', large: '' });
      setPreviewUrl(null);
      setImageFile(null);
    }
  }, [editData, open]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        name,
        description,
        category,
        type,
        imageFile,
        price,
        volume,
        isActive: editData ? editData.isActive : true,
      };

      if (editData) {
        // EDIT MODE
        await updateProductItem(editData.fullPath, payload as any, editData.imageUrl);
        showAlert("Item updated successfully!", "success");
        onClose();
      } else {
        // ADD MODE
        await uploadProductItem(payload as any);
        showAlert("Item uploaded successfully!", "success");
      }
      onClose();
    } catch (error) {
      showAlert("Operation failed", 'error');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth disableScrollLock={true}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#f8f9fa' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Coffee fontSize="small" />
          <Typography variant="h6" fontWeight="bold">Upload Item</Typography>
        </Stack>
        <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>

          {/* Left Column: Media & Meta */}
          <Stack spacing={3} sx={{ flex: 1 }}>
            <Box
              component="label"
              sx={{
                height: 300,
                border: '2px dashed #e0e0e0', borderRadius: 2,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', bgcolor: '#fcfcfc', cursor: 'pointer',
                overflow: 'hidden'
              }}
            >
              <input type="file" hidden onChange={handleFileChange} accept="image/*" />
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <>
                  <AddPhotoAlternateIcon sx={{ fontSize: 40, color: 'text.disabled' }} />
                  <Typography variant="body2" color="text.secondary">+ Upload Image</Typography>
                </>
              )}
            </Box>

            <Box>
              <Typography variant="caption" fontWeight="bold">Category</Typography>
              <Select fullWidth size="small" value={category} onChange={(e) => setCategory(e.target.value)}>
                <MenuItem value="coffee">Coffee</MenuItem>
                <MenuItem value="juices">Juice</MenuItem>
                <MenuItem value="shakes">Shakes</MenuItem>
                <MenuItem value="mocktails">Mocktails</MenuItem>
                <MenuItem value="protein_shakes">Protein Shakes</MenuItem>
              </Select>
            </Box>

            <Box>
              <Typography variant="caption" fontWeight="bold">Type</Typography>
              <Select fullWidth size="small" value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value="iced">Iced Drinks</MenuItem>
                <MenuItem value="hot">Hot Drinks</MenuItem>
              </Select>
            </Box>
          </Stack>

          {/* Right Column: Details & Maps */}
          <Stack spacing={2.5} sx={{ flex: 1 }}>
            <TextField
              label="Item Name" fullWidth size="small"
              value={name} onChange={(e) => setName(e.target.value)}
            />

            {/* Volume Map Section */}
            <Typography variant="caption" fontWeight="bold" color="text.secondary">Volume (e.g. 250ml)</Typography>
            <Stack direction="row" spacing={1}>
              {['small', 'medium', 'large'].map((size) => (
                <TextField
                  key={size} label={size} size="small"
                  value={volume[size as keyof typeof volume]}
                  onChange={(e) => setVolume({ ...volume, [size]: e.target.value })}
                />
              ))}
            </Stack>

            {/* Price Map Section */}
            <Typography variant="caption" fontWeight="bold" color="text.secondary">Pricing ($)</Typography>
            <Stack direction="row" spacing={1}>
              {['small', 'medium', 'large'].map((size) => (
                <TextField
                  key={size} label={size} size="small"
                  value={price[size as keyof typeof price]}
                  onChange={(e) => setPrice({ ...price, [size]: e.target.value })}
                />
              ))}
            </Stack>

            <TextField
              label="Description" fullWidth multiline rows={7}
              value={description} onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: '#f8f9fa' }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading || isFormInvalid}
          sx={{ bgcolor: '#c36c2d', '&:hover': { bgcolor: '#a05624' } }}
        >
          {loading ? 'Processing...' : editData ? 'Update Item' : 'Save Item'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};