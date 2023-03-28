const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'productTag_tag',
  foreignKey: 'product_id'
})


Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

Category.hasMany(Product, {
  foreignKey: 'category_id'
})

Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'productTag_product',
  foreignKey: 'tag_id'
})

module.exports = {
  Tag,
  ProductTag,
  Product,
  Category,
};
