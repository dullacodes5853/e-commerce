const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', (req, res) => {

  Product.findAll({
    include: [
      {
        model: Category
      },
      {
        model: Tag,
        attributes: ['tag_name'],
        through: ProductTag,
        as: 'productTag_tag'
      }
    ]
  })
  .then(prodData => res.json(prodData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.get('/:id', (req, res) => {

  Product.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category
      },
      {
        model: Tag,
        attributes: ['tag_name'],
        through: ProductTag,
        as: 'productTag_tag'
      }
    ]
  })
  .then(prodData => {
    if (!prodData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(prodData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });


});

router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {

      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      
      res.status(200).json(product);
    })
    .then((productidTags) => res.status(200).json(productidTags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


router.put('/:id', (req, res) => {

  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {

      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
   
      const productidTags = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productidTags.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
  
      const ProdTagsRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

   
      return Promise.all([
        ProductTag.destroy({ where: { id: ProdTagsRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProdTags) => res.json(updatedProdTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(prodData => {
    if (!prodData) {
      res.status(404).json({ message: 'No Product found with this id' });
      return;
    }
    res.json(prodData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
