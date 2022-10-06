const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const res = require('express/lib/response');
const config = require('./config.json')[process.env.NODE_ENV||"dev"]


const connectionString = 'postgresql://postgres:docker@127.0.0.1:5432/studentdb';
const client = new Client({
    connectionString: connectionString,
});
client.connect();

const app = express()
app.use(cors());
app.use(express.json());

const PORT = 3000
//console.log(process.env);
//const HOST = '0.0.0.0'

// App
//const app = express()
// [x]TODO: setup postgres using passed in env var
// [x] FIXME: current env var
// [x] TODO: make sql script to set up students
// [x] TODO: deploy script into postgres docker container
// [x] TODO: verify all records are on psql
// [x] TODO: npm install pg - then at pg tool to 
// TODO: create connection string and then show connection object 
// const pool = new Pool({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'studentdb',
//   password: 'docker',
//   port: 5432,
// })
// [x] TODO: Make route to get list all students




    
    

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

// app.get('/api/students/:name', (req, res) => {
//     client.query('SELECT * FROM students WHERE first_name = $1', [req.params.name])
//     .then(result => {
//         console.log(result.rows[0])
//         res.send(result.rows);
//     })
//     .catch(e => console.error(e.stack))
// });
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
