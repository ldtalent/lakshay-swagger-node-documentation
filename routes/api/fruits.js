const express = require("express");
const router = express.Router();
var Fruits = require('../../model/fruits.js')

/**
 * @swagger
 * /api/fruits:
 *   get:
 *     tags:
 *       - Fruits
 *     description: Returns all fruits
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of fruits
 *         schema:
 *           $ref: '#/components/schemas/fruits'
 *       500:
 *         description: SERVER ERROR
 */
router.get('/fruits', async(req, res) => {
  try {
    var fruits = await Fruits.find();
    //console.log(fruits)

    return res.json({
      fruits
    })
  } catch (err) {
    res.status(500).send('Server error')
  }
})


/**
 * @swagger
 * /api/fruits/{_id}:
 *   get:
 *     tags:
 *       - Fruits
 *     description: Returns a single fruit
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: Particular Fruit Object's ID (Automatically assigned by MongoDB)
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single fruit
 *         schema:
 *           $ref: '#/components/schemas/fruits'
 *       500:
 *         description: Server Error
 */
router.get('/fruits/:_id', async(req, res) => {
  try {
    var objectId = req.params._id;
    var fruit = await Fruits.findOne({
      "_id": objectId
    });
    if (fruit) {
      return res.json(fruit)
    } else {
      return res.send(`No fruit with the ${objectId} ID is present in the database`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error')
  }
})


/**
 * @swagger
 * /api/fruits:
 *   post:
 *     tags:
 *       - Fruits
 *     description: Adds a new fruit to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: fruit
 *         description: Fruit object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/fruits'
 *     responses:
 *       200:
 *         description: Successfully added
 *       500:
 *         description: Server error
 */
router.post('/fruits', async(req, res) => {
  try {

    var name = req.body.name;
    if (name) {
      var fruit = new Fruits({
        "name": name
      })
      fruit.save();
      return res.send(`Added ${name} to the DB`)
    } else {
      return res.send('Enter the name of the fruit in the body')
    }
  } catch (err) {
    res.status(500).send('Server Error')
  }

})


/**
 * @swagger
 * /api/fruits/{_id}:
 *   put:
 *     tags:
 *       - Fruits
 *     description: Updates a single fruit
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: fruit
 *         description: Fruit object resources
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/fruits'
 *       - name: _id
 *         description: Fruit Object ID
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully added
 *       500:
 *         description: Server error
 */
router.put('/fruits/:_id', async(req, res) => {
  try {
    var objectId = req.params._id;
    var name = req.body.name;
    if (objectId && name) {
      await Fruits.findByIdAndUpdate({
        "_id": objectId
      }, req.body);
      return res.json({
        "status": "Successully updated"
      })

    } else {
      res.send('Check your inputs!!')
    }


  } catch (err) {
    res.status(500).send('Server error');
  }
})


/**
 * @swagger
 * /api/fruits/{_id}:
 *   delete:
 *     tags:
 *       - Fruits
 *     description: Deletes a single fruit
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: Fruit Object ID
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       500:
 *         description: Server error
 */
router.delete('/fruits/:_id', async(req, res) => {
  try {

    var objectId = req.params._id;
    if (await Fruits.findOne({
        "_id": objectId
      })) {
      await Fruits.findByIdAndDelete({
        "_id": objectId
      })
      return res.json({
        "status": "Successfully deleted"
      })
    } else {
      return res.send(`No fruit with ${objectId} ID exists in the database`)
    }

  } catch (err) {
    res.status(500).send("Server error")
  }

})

module.exports = router