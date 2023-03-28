const Router = require('express').Router();
const { Category, Product } = require('../../models');


Router.get('/', (req, res) => {
  Category.findAll({
 
    include: [
      {
        model: Product
      }
    ]
  })
  .then(cateData => res.json(cateData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

Router.get('/:id', (req, res) => {

  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]     
  })
  .then(cateData => {
    if (!cateData) {
      res.status(404).json({ message: 'No Category found with this id' });
      return;
  }
    res.json(cateData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

Router.post('/', (req, res) => {

  Category.create({
    category_name: req.body.category_name
  })
  .then(cateData => res.json(cateData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

Router.put('/:id', (req, res) => {

  Category.update( 
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    } 
  )
  .then(cateData => {
    if (!cateData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
    }
    res.json(cateData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

Router.delete('/:id', (req, res) => {

  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(cateData => {
    if (!cateData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
    }
    res.json(cateData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

module.exports = Router;
