import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { units } from './src/db/schema';
import { eq } from 'drizzle-orm';

// This is a temporary script to add sample units
// Run it with: npx ts-node add-sample-units.ts

async function addSampleUnits() {
  // You would need to inject the database connection here
  // For now, this is just the structure
  
  const sampleUnits = [
    {
      buildingId: 1, // Assuming building with ID 1 exists
      name: 'A-101',
      type: 'residential',
      status: 'occupied',
      squareFootage: 850,
      bedrooms: 2,
      bathrooms: 1,
      floor: 1,
      rent: 1200.00,
      deposit: 2400.00,
      tenant: 'John Smith',
      tenantEmail: 'john.smith@email.com',
      tenantPhone: '555-0101',
      leaseStart: new Date('2024-01-01'),
      leaseEnd: new Date('2024-12-31'),
    },
    {
      buildingId: 1,
      name: 'A-102',
      type: 'residential',
      status: 'vacant',
      squareFootage: 850,
      bedrooms: 2,
      bathrooms: 1,
      floor: 1,
      rent: 1200.00,
      deposit: 2400.00,
    },
    {
      buildingId: 1,
      name: 'B-201',
      type: 'residential',
      status: 'occupied',
      squareFootage: 1200,
      bedrooms: 3,
      bathrooms: 2,
      floor: 2,
      rent: 1800.00,
      deposit: 3600.00,
      tenant: 'Jane Doe',
      tenantEmail: 'jane.doe@email.com',
      tenantPhone: '555-0102',
      leaseStart: new Date('2024-03-01'),
      leaseEnd: new Date('2025-02-28'),
    }
  ];

  console.log('Sample units structure ready for insertion:', sampleUnits);
  console.log('To actually add these units, you would need to:');
  console.log('1. Set up proper database connection');
  console.log('2. Use the BuildingsService.addUnitToBuilding method');
  console.log('3. Or create a proper migration/seeding script');
}

addSampleUnits().catch(console.error);
