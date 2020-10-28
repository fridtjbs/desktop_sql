import mysql from 'mysql';

let knappInput = document.getElementById("knappInput");

// Setup MySQL-server connection pool
let pool = mysql.createPool({
  host: 'mysql-ait.stud.idi.ntnu.no',
  user: 'fridtjbs', // Replace "username" with your username
  password: 'ggfJYxW6', // Replace "password" with your password
  database: 'fridtjbs', // Replace "username" with your username
  connectionLimit: 1, // Reduce load on NTNU MySQL server
});
oppdater();
knappInput.onclick = () => {
  
let navn = document.getElementById("inputN").value;
let mail = document.getElementById("inputE").value;
  
  // Perform insert
  pool.query(
    
    'INSERT INTO Students (name, email) VALUES (?, ?)',[navn, mail],
    (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      console.log('Inserted id: ' + results.insertId); // Print out the id of the inserted row
      oppdater();
    }
  );
  }

// Perform select-query that fetches all the Students table rows from the database()
function oppdater(){
while(studentList.firstChild){
  studentList.removeChild(studentList.firstChild)
}
pool.query('SELECT * FROM Students', (error, results) => {
  if (error) return console.error(error); // If error, show error in console (in red text) and return

  for (let student of results) {
    console.log(student.name + ', ' + student.email);
    let li = document.createElement('li');
    li.innerHTML = "";
    li.innerText = student.name + ', ' + student.email;
    studentList.appendChild(li);
  }
});
}