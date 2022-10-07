const config = require('../config');

let ApiUrl = config[process.env.NODE_ENV || "dev"];


var classList = document.getElementById("class-list");
console.log("the actual HTML element: ",classList);

fetch(`${ApiUrl}/api/students`)
    .then(response => response.json())
    .then(data => {
        data.forEach(student => {
            var studentElement = document.createElement('li');
            studentElement.innerHTML = `${student.first_name} - age ${student.age}`;
            // console.log(studentElement);
            classList.appendChild(studentElement);
        });
    });


var submit = document.getElementById('create-student').addEventListener("click", event => {
    let first = document.getElementById("first-name").value;
    let age = document.getElementById("age").value;
    
    let student = {
        "first_name": first,
        "age": age
    }
    
    fetch(`${ApiUrl}/api/students`, {
        method: 'POST',
        mode: cors,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    })
    .then(response => {
        if(response.status == 201){
            var studentElement = document.createElement('li');
            studentElement.innerHTML = `${student.first_name} - age ${student.age}`;
            classList.appendChild(studentElement);
        }else {
            alert("something went HORRIBLY WRONG!!!", response);
        }
    })
    //.then(data => console.log("success! Student added!", data))
    .catch(error => console.error(error));

})