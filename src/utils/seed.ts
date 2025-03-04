import { Column } from './../../node_modules/drizzle-seed/types/tables.d';
import { coordinateSchema, locationSchema } from './../models/location';
import { employeeSchema } from './../models/user';
import { dbConnection } from './db';
import { seed } from 'drizzle-seed';
import { shiftSchema } from '../models/shift';
import { faker } from '@faker-js/faker';

// Initialize Drizzle ORM

const db = dbConnection;

// Seed Data
export async function seedDate() {
  const seededData:any = await seed(db, {
    tables: {
      employees: {
        count: 10,
        template: {
          email: () => faker.internet.email(),
          passwordHash: () => faker.string.uuid(),
          firstName: () => faker.person.firstName(),
          lastName: () => faker.person.lastName(),
          role: () => faker.helpers.arrayElement(['admin', 'user', 'manager']),
          requiresCertificate: () => faker.datatype.boolean(),
          avatar: () => faker.image.avatar(),
          employeeId: () => faker.string.alphanumeric(8).toUpperCase(),
          hourlyRate: () => parseFloat(faker.finance.amount({min:15, max:50, dec:2})),
          created_at: () => new Date(),
          updated_at: () => new Date()
        }
      },
      coordinates: {
        count: 10,
        template: {
          latitude: () => faker.location.latitude(),
          longitude: () => faker.location.longitude(),
          created_at: () => new Date(),
          updated_at: () => new Date()
        }
      },
      locations: {
        count: 5,
        template: {
          name: () => faker.location.city(),
          address: () => faker.location.streetAddress(),
          floor: () => faker.number.int({ min: 1, max: 10 }),
          geofenceId: '{{relation.geofences.id}}',
          coordinatesId: '{{relation.coordinates.id}}',
          created_at: () => new Date(),
          updated_at: () => new Date()
        }
      },
      shifts: {
        count: 10,
        template: {
          name: () => faker.helpers.arrayElement(['Morning Shift', 'Afternoon Shift', 'Night Shift']),
          startTime: () => faker.date.future(),
          endTime: (data:any) => {
            const start = data.startTime;
            return new Date(start.getTime() + (8 * 60 * 60 * 1000)); // 8 hours after start
          },
          locationId: '{{relation.locations.id}}',
          minStaffRequired: () => faker.number.int({ min: 1, max: 5 }),
          maxStaffRequired: (data:any) => data.minStaffRequired + faker.number.int({ min: 1, max: 3 }),
          defaultHourlyRate: () => parseFloat(faker.finance.amount({min:20, max:40, dec:2})),
          created_at: () => new Date(),
          updated_at: () => new Date()
        }
      }
    }
  });

  // Insert Seed Data into Database
// await db.insert(employeeSchema).values(seededData?.employees);
//   await db.insert(coordinateSchema).values(seededData.coordinates);
//   await db.insert(locationSchema).values(seededData.locations);
//   await db.insert(shiftSchema).values(seededData.shifts);
console.log(seededData);
  
  console.log('Seed data inserted successfully!');
  return seededData;
}
seedDate()