const SeedingCategories = require('./cate-seed');
const SeedingProducts = require('./prod_seed');
const SeedingTags = require('./tag-seed');
const SeedingProductTags = require('./prodtag-seed');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SUCCESSFULLY SYNCED -----\n');
  await SeedingProducts();

  console.log('\n----- ALL PRODUCTS SEEDED -----\n');
  await SeedingCategories();
  console.log('\n----- ALL CATEGORIES SEEDED -----\n');

  await SeedingProductTags();
  console.log('\n----- ALL PRODUCT TAGS SEEDED -----\n');

  await SeedingTags();
  console.log('\n----- ALL TAGS SEEDED -----\n');
  process.exit(0);
};

seedAll();
