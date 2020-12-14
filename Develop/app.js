const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "index.html");

const render = require("./lib/htmlRenderer");
let Questions = [];

function generateTeam() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "Name",
      },
      {
        type: "input",
        message: "What is your team ID?",
        name: "ID",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "Email",
      },
      {
        type: "list",
        message: "What is your role?",
        name: "Role",
        options: ["Intern", "Manager", "Engineer"],
      },
    ])
    .then(function ({ name, role, id, email }) {
      let roleQuestions = [];
      if (role === "Engineer") {
        roleQuestions = "Enter your GitHub username please";
      } else if (role === "Intern") {
        roleQuestions = "Enter your school please";
      } else {
        roleQuestions = "Add an office number";
      }
      inquirer
        .prompt([
          {
            message: `What is this member's ${roleQuestions}?`,
            name: "roleQuestions",
          },
          {
            type: "list",
            message: "Are there any more team members you would like too add?",
            name: "addTeamMembers",
            options: ["yes", "no"],
          },
        ])
        .then(function ({ roleQuestions, newMembers }) {
          let teamMembers;
          if (role === "Engineer") {
            teamMembers = new Engineer(name, id, email, roleQuestions);
          } else if (role === "Intern") {
            teamMembers = new Intern(name, id, email, roleQuestions);
          } else {
            teamMembers = new Manager(name, id, email, roleQuestions);
          }
          employees.push(teamMembers);
          if (addMembers) {
            generateTeam();
          } else {
            render(employees);
            fs.writeFile(outputPath, render(employees), (err) => {
              if (err) {
                throw err;
              }
            });
          }
        })
        .catch((err) => {
          if (err) {
          }
        });
    });
}

generateTeam();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!
