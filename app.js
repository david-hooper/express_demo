const express = require('express')
const { Client } = require('pg');

const config = require('./config.json')[process.env.NODE_ENV || "dev"]

const connectionString = 'postgresql://postgres:docker@127.0.0.1:5432/apartmentlab';
const client = new Client({
    connectionString: connectionString,
});
client.connect();

const app = express()
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/owners', (req, res) => {
    client.query('SELECT * FROM owners')
        .then(result => {
            console.log(result.rows[0])
            res.send(result.rows);
        })
        .catch(e => console.error(e.stack))
});


app.get('/api/owners/:id', (req, res) => {
    //using async/await
    console.log(req.params.id);


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



app.get('/api/students/:id', (req, res) => {
    client.query('SELECT * FROM students WHERE id = $1', [req.params.id])
        .then(result => {
            console.log(result.rows[0])
            res.send(result.rows);
        })
        .catch(e => console.error(e.stack))
});

app.listen(PORT, () => {
    console.log(`Our app running on ${PORT}`)
})
