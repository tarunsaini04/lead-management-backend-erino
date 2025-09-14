import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import User from './models/User.js';
import Lead from './models/Lead.js';

dotenv.config();

const TEST_USER_EMAIL = 'tarun@example.com'; 
const NUM_LEADS = 120; 
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    const user = await User.findOne({ email: TEST_USER_EMAIL });

    if (!user) {
      console.error(`Error: Test user with email ${TEST_USER_EMAIL} not found.`);
      process.exit(1);
    }

    await Lead.deleteMany({ user: user._id });
    console.log('Existing leads for user cleared.');

    const leads = [];
    for (let i = 0; i < NUM_LEADS; i++) {
      leads.push({
        user: user._id,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number(),
        company: faker.company.name(),
        status: faker.helpers.arrayElement(['new', 'contacted', 'qualified', 'won', 'lost']),
        source: faker.helpers.arrayElement(['website', 'referral', 'events', 'other']),
        score: faker.number.int({ min: 0, max: 100 }),
        lead_value: faker.number.int({ min: 100, max: 50000 }),
      });
    }

    await Lead.insertMany(leads);
    console.log(`${NUM_LEADS} leads have been seeded successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();