import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Container, Grid, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';
import { getToasterSuccessNotifications } from '../notifications/success';
import { getToasterErrors } from '../notifications/error';

const VehicleForm = () => {
  const [carModel, setCarModel] = useState('');
  const [price, setPrice] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [maxPictures, setMaxPictures] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [showPictures, setshowPictures] = useState([]);


  const handleFileChange = (e) => {
    const files = e.target.files;
    setPictures(files);

    let urls = [];
    let selectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      selectedFiles.push(files[i]);
      if (urls.length < maxPictures) {
        const reader = new FileReader();
        reader.onload = (event) => {
          urls.push(event.target.result);
          if (urls.length === files.length || urls.length === maxPictures) {
            setshowPictures(urls);
          }
        };
        reader.readAsDataURL(files[i]);
      } else {
        getToasterErrors(`You can upload a maximum of ${maxPictures} images`);
        break;
      }
    }
  };

  const handleSubmit = async () => {
    if (carModel.length < 3) {
      getToasterErrors('Car model must be at least 3 characters long');
      return;
    }
    if (phoneNumber.length < 10) {
      getToasterErrors('Phone number must be 10 digits long');
      return;
    }
    else if(pictures?.length-1 > maxPictures){
      getToasterErrors(`You can not  upload more ${maxPictures} images please choose more images`);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('carModel', carModel);
      formData.append('price', price);
      formData.append('phoneNumber', phoneNumber);
      formData.append('city', city);
      formData.append('maxPictures', maxPictures);
      
      for (let i = 0; i < pictures.length; i++) {
        formData.append('images', pictures[i]);
      }

      // Make a POST request to your backend vehicle endpoint
      const response = await axios.post('http://localhost:3000/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        getToasterSuccessNotifications('Vehicle information submitted successfully');
      } else {
        getToasterSuccessNotifications('error while Vehicle information submitted ');
      }
      setCarModel('');
      setPrice('');
      setPhoneNumber('');
      setCity('');
      setPictures([]);
      setshowPictures([]);
      setMaxPictures(1)
    } catch (error) {
      // Handle error response from the server
      getToasterErrors('Error submitting vehicle information');
    }
  };

  return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Submit Vehicle Information
              </Typography>
              <TextField
                label="Car Model"
                variant="outlined"
                fullWidth
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                style={{ marginBottom: '8px' }}
              />
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ marginBottom: '8px' }}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{ marginBottom: '8px' }}
              />
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ marginBottom: '8px' }}
              />
              <FormControl fullWidth variant="outlined" style={{ marginBottom: '8px' }}>
                <InputLabel>Max Number of Pictures</InputLabel>
                <Select
                  value={maxPictures}
                  onChange={(e) => setMaxPictures(e.target.value)}
                  label="Max Number of Pictures"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                    <MenuItem key={number} value={number}>
                      {number}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <input type="file" accept="image/*" multiple onChange={handleFileChange} style={{ marginBottom: '8px' }} />
              <Box sx={{ display: 'flex', marginTop: '16px', flexWrap: 'wrap' }}>
                {showPictures.map((url, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={index} src={url} alt={`Picture ${index + 1}`} style={{ width: '100px', height: 'auto', margin: '8px' }} />
                ))}
              </Box>
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} style={{ marginTop: '16px' }}>
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
  );
};

export default VehicleForm;
