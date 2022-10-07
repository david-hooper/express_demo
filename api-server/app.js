const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const config = require('./config.json')[process.env.NODE_ENV||"dev"]



const client = new Client({
    connectionString: config.connectionString,
});
client.connect();

const app = express()
app.use(cors());
app.use(express.json());

const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/students', (req, res) => {
    client.query('SELECT * FROM students')
    .then(result => {
        // console.log(result.rows[0])
        res.send(result.rows);
    })
    .catch(e => console.error(e.stack))
});

app.get('/api/students/:id', (req, res) => {
    client.query('SELECT * FROM students WHERE id = $1', [req.params.id])
    .then(result => {
        console.log(result.rows[0])
        res.send(result.rows);
    })
    .catch(e => console.error(e.stack))
});

app.post('/api/students/', (request, response) => {

    let studentJson = request.body;
    console.log(studentJson);
    if(studentJson.age && studentJson.first_name){
        client.query("INSERT INTO students (first_name, age) VALUES ($1, $2)"
            , [studentJson.first_name, studentJson.age]
            , (error, result) => {
                if(error){
                    response.status(500).send(error);
                } else {
                    console.log("response successful", result);
                    response.status(201).send("Success!")
                }
            }
        ); 
    }
    else {
        response.status(500).send("you need to send an age and a name!!")
    }
})

app.listen(PORT, () => {
    console.log(`Our app running on ${PORT}`)
})
