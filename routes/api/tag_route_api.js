const Router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

Router.get('/', (req, res) => {

  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'productTag_product'
      }
    ]
  })
  .then(Datatag => res.json(Datatag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

Router.get('/:id', (req, res) => {
 
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'productTag_product'
      }
    ]
  })
  .then(Datatag => {
    if (!Datatag) {
      res.status(404).json({ message: 'No Tag found with this id' });
      return;
    }
    res.json(Datatag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

Router.post('/', (req, res) => {

  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(Datatag => res.json(Datatag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

Router.put('/:id', (req, res) => {

  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(Datatag => {
    if (!Datatag) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
    }
    res.json(Datatag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

Router.delete('/:id', (req, res) => {
 
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(Datatag => {
    if (!Datatag) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
    }
    res.json(Datatag);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = Router;
