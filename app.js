const express = require('express')
// pg is a node.js module for interfacing with PostgreSQL
const { Client } = require('pg');
// we are using the config.json file to store our connection string
const config = require('./config.json')[process.env.NODE_ENV || "dev"]

// create a new client
const client = new Client({
    connectionString: config.connectionString
});
// connect to our database
client.connect();

// create our express app
const app = express()
const PORT = 3000;
// parse application/json
app.use(express.json());

// create a GET route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// create a GET route for all students
app.get('/api/students', (req, res) => {
    client.query('SELECT * FROM students')
        .then(result => {
            console.log(result.rows[0])
            res.send(result.rows);
        })
        .catch(e => console.error(e.stack))
});

// create a GET route with a parameter
app.get('/api/owners/:id', (req, res) => {
    //using async/await
    async function getOwners() {
        try {
            const result = await client.query(`SELECT * FROM owners WHERE owner_id = ${req.params.id}`);
            console.log(result)
            res.send(result.rows);
        } catch (e) {
            console.error(e.stack)
        }
    }
    getOwners();
});

// create a POST route
app.post('/api/students/', (req, res) => {
    let student = req.body;
    let name = student.first_name;
    let age = student.age;
    client.query(`INSERT INTO students (first_name, age) VALUES ('${name}',${age}) RETURNING *`)
        .then(result => {
            console.log(result.rows[0])
            res.status(201).send(result.rows);
        })
        .catch(e => console.error(e.stack))
});
// create a DELETE route
app.delete('/api/students/:id', (req, res) => {
    client.query(`DELETE FROM students WHERE id = ${req.params.id}`)
        .then(result => {
            res.status(204).send(result.rows);
        })
        .catch(e => console.error(e.stack))
});

// listen on port 3000
app.listen(PORT, () => {
    console.log(`Our app running on ${PORT}`)
})
