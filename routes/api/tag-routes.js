const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');



router.get('/', async (req, res) => {

  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  };
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!tagData) {
      res.status(404).json({message: 'There is no tag data that matches your search.'})
      return
    };
    res.status(200).json(tagData);
  } catch (err) {
      console.log(err)
      res.status(500).json(err)
  };
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  };
});

router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updateTag[0]) {
      res.status(404).json({message: 'There is no tag data that matches your search.'})
      return
    };
    res.status(200).json(updateTag)
  } catch (err) {
    res.status(500).json(err)
  };
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({message: 'There is no tag data that matches your search.'})
      return
    };
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  };
});

module.exports = router;
