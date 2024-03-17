import React, { useState } from 'react';
import { Container } from '@mui/material';
import VehicleForm from '@/components/vehicle/vehicleForm';

const Vehicle = () => {

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
     <VehicleForm/>
    </Container>
  );
};

export default Vehicle;
