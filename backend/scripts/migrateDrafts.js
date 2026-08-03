/**
 * One-time: convert any legacy Draft listings to Pending Approval.
 * Usage: node scripts/migrateDrafts.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Property = require('../models/Property');

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const result = await Property.updateMany(
    { status: 'Draft' },
    { $set: { status: 'Pending Approval' } }
  );
  console.log(`Migrated ${result.modifiedCount} Draft → Pending Approval`);
  await mongoose.disconnect();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
