const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mystudent', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌Connection error", err));

// 2. Define Employee Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  designation: String,
  salary: Number
});

// 3. Create Model
const Employee = mongoose.model('Employee', employeeSchema);

// 4. Insert Employee Data
async function insertEmployees() {
  await Employee.deleteMany(); // Clear old data for testing
  const employees = [
    { name: "Alice",age:25 ,designation: "Developer", salary: 50000 },
    { name: "Bob", age:31,designation: "Manager", salary: 75000 },
    { name: "Charlie", age:29,designation: "HR", salary: 40000 },
    { name: "David",age:37 ,designation: "Intern", salary: 20000 }
  ];
  await Employee.insertMany(employees);
  console.log("✅ Employees inserted");
}

// 5. Find Max and Min Salary
async function findMinMaxSalary() {
  const maxSalaryEmp = await Employee.findOne().sort({ salary: -1 });
  const minSalaryEmp = await Employee.findOne().sort({ salary: 1 });

  console.log(`\nEmployee with Maximum Salary: Name: ${maxSalaryEmp.name}, Salary: ${maxSalaryEmp.salary}`);
  

  console.log(`\nEmployee with Minimum Salary:Name: ${minSalaryEmp.name}, Salary: ${minSalaryEmp.salary}`);
 
}

// 6. Run the script
async function run() {
  await insertEmployees();
  await findMinMaxSalary();
  mongoose.connection.close();
}

run();
