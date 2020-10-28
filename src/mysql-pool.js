import mysql from 'mysql';

// Setup MySQL-server connection pool
let pool = mysql.createPool({
  host: 'mysql-ait.stud.idi.ntnu.no',
  user: 'fridtjbs', // Replace "username" with your username
  password: 'ggfJYxW6', // Replace "password" with your password
  database: 'fridtjbs', // Replace "username" with your username
  connectionLimit: 1, // Reduce load on NTNU MySQL server
});

// Perform select-query that fetches all the Students table rows from the database
pool.query('SELECT * FROM Students', (error, results) => {
  if (error) return console.error(error); // If error, show error in console (in red text) and return

  for (let student of results) {
    console.log(student.name, student.email);
  }
});