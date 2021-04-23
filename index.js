const express = require('express');
const cors = require('cors');

const app = express()
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const courses = [
    { id: 1, name: 'Maths' },
    { id: 2, name: 'PC' },
    { id: 3, name: 'SVT' },
    { id: 4, name: 'Espagnol' },
    { id: 5, name: 'Informatic' },
]

app.get('/', (req, res) => {
    res.send("Hello world !")
})

//  Get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses)
})

// Get one course by our id
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(crs => crs.id == parseInt(req.params.id))
    if (!course) res.status(404).send("The course with given ID was not found") // 404
    res.send(course)
})

// Create one course
app.post('/api/courses', (req, res) => {
    if (!req.body.name || req.body.name < 3) return res.status(400).send("Name is required and should be minimum 3 characters")

    console.log(req.body)
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    console.log(course)
    courses.push(course)
    res.send(course)
})

// Update Course
app.put('/api/courses/:id', (req, res) => {
    // Look at the course
    const course = courses.find(crs => crs.id == parseInt(req.params.id))
    if (!course) return res.status(404).send("The course with given ID was not found") // 404
    // Update course
    course.name = req.body.name
    res.send(course)


})

// Delete course
app.delete('/api/courses/:id', (req, res) => {
    // Look at the course
    const course = courses.find(crs => crs.id == parseInt(req.params.id))
    if (!course) return res.status(404).send("The course with given ID was not found")
    // Delete course
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(course)

})

app.listen(port, () => console.log(`Listening on port ${port}...`))