const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryDataById = await Category.findByPk( req.params.id, {
      include: [{model: Product}]
    });
    res.status(200).json(categoryDataById);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => { 
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(400).json({ message: 'Sorry there is no category with this id'});
      return;
    }
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteData = await Category.destroy({
      where: { 
        id: req.params.id, 
      },
    });
    res.status(200).json(deleteData);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
