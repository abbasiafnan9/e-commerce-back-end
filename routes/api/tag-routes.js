const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', (req, res) => {
  Tag.findAll({
    include:[Product]
  })
    .then(dbTag => {
      if (dbTag.length) {
        res.json(dbTag);
      } else {
        res.status(404).json({ message: "No tag found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

router.get('/:id', async(req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [Product]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(newTag => {
    res.json(newTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'an error occures', err: err})
  });
});

router.put('/:id', async (req, res) => {
  try{
    const tagData = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
    if (!tagData[0]) {
    res.status(404).json({ message: 'No tag with this id!' });
    return;
  }
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
  
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;