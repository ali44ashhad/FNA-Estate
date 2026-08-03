require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Property = require('../models/Property');

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const all = await Property.find({ status: 'Approved' }).select('_id pricing.basePrice');
  const byPrice = [...all].sort(
    (a, b) => (b.pricing?.basePrice || 0) - (a.pricing?.basePrice || 0)
  );
  const premiumIds = byPrice.slice(0, 6).map((p) => p._id);
  const hotIds = byPrice.slice(2, 7).map((p) => p._id);

  await Property.updateMany({}, { $set: { isVerified: true, isPremium: false, isHot: false } });
  await Property.updateMany({ _id: { $in: premiumIds } }, { $set: { isPremium: true } });
  await Property.updateMany({ _id: { $in: hotIds } }, { $set: { isHot: true } });

  const premium = await Property.countDocuments({ isPremium: true });
  const hot = await Property.countDocuments({ isHot: true });
  const verified = await Property.countDocuments({ isVerified: true });
  console.log({ premium, hot, verified, total: all.length });
  await mongoose.disconnect();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
