const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
    Category.findAll({
      include:[Product]
    })
      .then(dbCategories => {
        if (dbCategories.length) {
          res.json(dbCategories);
        } else {
          res.status(404).json({ message: "No category found!" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "an error occured", err: err });
      });
  });


router.get('/:id', async (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  });
  
  router.post('/', (req, res) => {
    Category.create({
      category_name: req.body.category_name
    }).then(newCategory => {
      res.json(newCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'an error occures', err: err})
    });
  });
  
  router.put('/:id', async (req, res) => {
    try{
      const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
      if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
    });



router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;