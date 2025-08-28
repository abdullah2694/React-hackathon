import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { addOffer, getOffers } from '../../firebase/firestore';


const OfferManagement = () => {
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch offers on component mount
  const fetchOffers = async () => {
    setLoading(true);
    try {
      const data = await getOffers();
      setOffers(data);
    } catch (err) {
      console.error('Failed to fetch offers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!discount || !description) {
      alert('Please fill all fields');
      return;
    }
    try {
      await addOffer({ discount: Number(discount), description });
      setDiscount('');
      setDescription('');
      fetchOffers(); // refresh offers
    } catch (err) {
      console.error('Failed to add offer:', err);
      alert('Error adding offer');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Manage Offers</Typography>

      <Box component="form" sx={{ maxWidth: 400, mt: 2 }} onSubmit={handleSubmit}>
        <TextField
          label="Discount (%)"
          type="number"
          value={discount}
          onChange={e => setDiscount(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Add Offer
        </Button>
      </Box>

      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Discount (%)</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={2}>Loading...</TableCell>
            </TableRow>
          ) : offers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2}>No offers available</TableCell>
            </TableRow>
          ) : (
            offers.map(offer => (
              <TableRow key={offer.id}>
                <TableCell>{offer.discount}</TableCell>
                <TableCell>{offer.description}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OfferManagement;
