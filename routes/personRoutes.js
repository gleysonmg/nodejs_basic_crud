const router = require('express').Router()

// Model import
const Person = require('../models/Person')

//router.get('/', (req, res) => {
//    res.json({ message: 'Hello Express!' })
//})

// Read - Get
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Create - Post
router.post('/', async (req, res) => {

    //Body example ("name": "Gleyson", "salary": 10000, "approved": true)
    const { name, salary, approved } = req.body

    //Name validation
    if (!name) {
        res.status(422).json({error: 'Name is mandatory!'})

        return
    }

    const person = {
        name,
        salary,
        approved
    }

    //Create method - mongoose
    try {
        //Data creation
        await Person.create(person)

        //Data creation success - HTTP Status 201 (Created - successful request)
        res.status(201).json({ message: 'Person successfully registered!' })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Get by id
router.get('/:id', async (req, res)=> {
    //console.log(req)
    const id = req.params.id

    try {

        const person = await Person.findOne({_id: id})

        if (!person) {
            res.status(422).json({message: "Person not found!"})

            return
        }

        res.status(200).json(person)

    } catch {
        res.status(500).json({ error: error})
    }
})

// Update (PUT, PATCH)
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {

        const updatedPerson = await Person.updateOne({_id: id }, person)

        if(updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'An error occurred during the update!' })

            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    const person = await Person.findOne({ _id: id})

    if (!person) {
        res.status(422).json({ message: 'Person not found!' })

        return
    }

    try {
        await Person.deleteOne({ _id: id })

        res.status(200).json({ message: 'Person successfully deleted!'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router