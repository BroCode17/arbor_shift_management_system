import { Column } from './../../node_modules/drizzle-seed/types/tables.d';
import { coordinateSchema, locationSchema } from './../models/location';
import { employeeSchema } from './../models/user';
// import { users, departments, locations, shiftTemplates } from './schema';
import { dbConnection } from './db';
import { seed } from 'drizzle-seed';
import { shiftSchema } from '../models/shift';

// Initialize Drizzle ORM

const db = dbConnection;

// Seed Data
export async function seedDate() {
  const seededData = await seed(db, {
    tables: {
      employees: {
        count: 10, // Generate 10 users
        Column: {},
        // template: {
        //   id: '{{uuid}}',
        //   email: '{{internet.email}}',
        //   password_hash: '{{string.uuid}}', // Simulate hashed passwords
        //   first_name: '{{name.firstName}}',
        //   last_name: '{{name.lastName}}',
        //   role: ['admin', 'manager', 'staff'][Math.floor(Math.random() * 3)],
        // //   department_id: '{{relation.departments.id}}', // Reference departments
        //   employee_id: '{{string.uuid}}',
        //   hourly_rate: Math.random() * 50 + 10, // Random hourly rate between 10 and 60
        //   created_at: '{{date.recent}}',
        //   updated_at: '{{date.recent}}',
        // },
      },
      coordinates: {
        count: 10, // Generate 10 coordinate entries
        column: {},
        // template: {
        //   id: '{{uuid}}',
        //   latitude: () => (Math.random() * 180 - 90).toFixed(6), // Random latitude between -90 and 90
        //   longitude: () => (Math.random() * 360 - 180).toFixed(6), // Random longitude between -180 and 180
        //   created_at: '{{date.recent}}',
        //   updated_at: '{{date.recent}}',
        // },
      },
      // departments: {
      //     count: 3, // Generate 3 departments
      //     template: {
      //         id: "{{uuid}}",
      //         name: ["HR", "Engineering", "Sales"][Math.floor(Math.random() * 3)],
      //         location_id: "{{relation.locations.id}}", // Reference locations
      //         manager_id: "{{relation.users.id}}", // Reference users
      //         created_at: "{{date.recent}}",
      //     },
      // },
      locations: {
        count: 5, // Generate 5 locations
        column: {},
        with: {
            coordinateSchema
        }
        // template: {
        //   id: '{{uuid}}',
        //   name: '{{address.cityName}}',
        //   address: '{{address.streetAddress}}',
        //   //wing: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
        //   floor: Math.floor(Math.random() * 10) + 1, // Random floor between 1 and 10
        //   created_at: '{{date.recent}}',
        // },
      },
      shifts: {
        count: 10, // Generate 5 shift templates
        column: {},
        with: {
            locationSchema
        },
        // template: {
        //   id: '{{uuid}}',
        //   name: ['Morning Shift', 'Afternoon Shift', 'Night Shift'][
        //     Math.floor(Math.random() * 3)
        //   ],
        //   start_time: '{{date.future}}',
        //   end_time: '{{date.future}}',
        //   // department_id: '{{relation.departments.id}}', // Reference departments
        //   location_id: '{{relation.locations.id}}', // Reference locations
        //   min_staff_required: Math.floor(Math.random() * 5) + 1, // Random number between 1 and 5
        //   created_at: '{{date.recent}}',
        // },
      },
    },
  });

  // Insert Seed Data into Database
//   await db.insert(employeeSchema).values(seededData.employees);
//   //await db.insert(departments).values(seededData.departments);
//   await db.insert(locationSchema).values(seededData.shifts);
//   await db.insert(shiftSchema).values(seededData.locations);
//   await db.insert(coordinateSchema).values(seededData.coordinates);
  console.log(seededData);
}
seedDate()