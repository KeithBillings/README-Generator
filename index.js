const fs = require('fs');
const inquirer = require('inquirer');

console.log('Enter in values to fill in your README.');

// Array of questions that will be asked to the user
let questions = [
  {
    type: 'input',
    name: 'projectTitle',
    message: 'What is the Project Title?',
  },
  {
    type: 'input',
    name: 'description',
    message: "What is the project's description?",
  },
  {
    type: 'input',
    name: 'installation',
    message: 'What are the steps required to install your project?',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'What is your project being used for? Provide examples of use: ',
  },
  {
    type: 'input',
    name: 'screenshot',
    message: '(Optional) Please provide the file path to a screenshot of your project. Press Enter to skip if you do not have one. Can be added later.',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Describe what kind of tests that were done on this project: '
  },
  {
    type: 'input',
    name: 'authors',
    message: 'Who contributed to this project? Please list the authors separated by commas.',
  },
  {
    type: 'list',
    name: 'license',
    message: 'What kind of license do you want your project to have?',
    choices: [
      'Leave blank',
      'MIT License',
      'ISC License'
    ]
  },
  {
    type: 'number',
    name: 'year',
    message: 'What year will be used for this license?',
    when: function(answers) {
      return answers.license !== 'Leave blank'
    }
  },
  {
    type: 'input',
    name: 'userName',
    message: 'What name will be used for this license? Please provide full name: ',
    when: function(answers) {
      return answers.license !== 'Leave blank'
    }
  },
  {
    type: 'input',
    name: 'badgeLabel',
    message: 'Time to create a badge! What do you want your badge label to be?'
  },
  {
    type: 'input',
    name: 'badgeMessage',
    message: 'What do you want your badge message to be?'
  },
  {
    type: 'input',
    name: 'badgeColor',
    message: 'What do you want your badge color to be?',
    default: 'blue'
  },
  {
    type: 'list',
    name: 'badgeStyle',
    message: 'What style do you want your badge to be?',
    choices: [
      'plastic',
      'flat',
      'flat-square',
      'for-the-badge',
      'social'
    ]
  },
  {
    type: 'confirm',
    name: 'confirmBadgeLogo',
    message: 'Do you want your badge to have a logo?'
  },
  {
    type: 'input',
    name: 'badgeLogo',
    message: 'Please type in your badge logo name. Use simpleicons.org as a reference.',
    default: 'GitHub',
    when: function(answers){
      return answers.confirmBadgeLogo === true
    }
  }
];

// Prompting the questions to the user
inquirer.prompt(questions).then(function (answers) {

  // Determining what string to put in the licensing area of the README form
  if (answers.license === 'Leave blank'){
    answers.license = '';
  };
  if (answers.license === 'MIT License'){
    answers.license = 
    `MIT License

    Copyright (c) ${answers.year} ${answers.userName}
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.`;
  };
  if (answers.license === 'ISC License'){
    answers.license =
    `ISC License

    Copyright (c) ${answers.year}, ${answers.userName}
    
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted, provided that the above
    copyright notice and this permission notice appear in all copies.
    
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
    WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
    MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
    ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
    WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
    ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
    OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`
  };

  // Encoding badge variables to be URL friendly
  function encodingBadgeURL (label, message, color, style, logo) {
    // Creating Badge URL
    let badgeURL = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}?style=${style}&logo=${encodeURIComponent(logo)}`

    return badgeURL
  };
  // Calling badgeURL function
  let badgeURL = encodingBadgeURL(answers.badgeLabel, answers.badgeMessage, answers.badgeColor, answers.badgeStyle, answers.badgeLogo);
  
  // Filling in the README form with user's answers as input
  let fileInterior = 

  `# ${answers.projectTitle}\n\n` +
  `## Description\n\n` +
  `${answers.description}\n\n` +
  `## Table of Contents\n\n` +
  ` * [Installation](#installation)\n\n` +
  ` * [Usage](#usage)\n\n` +
  ` * [Credits](#Authors)\n\n` +
  ` * [License](#license)\n\n` +
  `## Installation\n\n` + 
  `${answers.installation}\n\n` + 
  `## Usage\n\n` + 
  `${answers.usage} \n\n` + 
  `## Screenshots\n\n` + 
  `![image](${answers.screenshot})\n\n` +
  `## Tests` +
  `${answers.tests}` + 
  `## Authors\n\n` + 
  `${answers.authors}\n\n` + 
  `## License\n\n` + 
  `${answers.license}\n\n` + 
  `## Badges\n\n` + 
  `![badgeLogo](${badgeURL})\n\n`;

  // Creating and writing a new file into current directory
  fs.writeFile('NEW_README.md', fileInterior, function(error){return error});

  // Letting the user know their new file has been created with their parameters
  console.log('New file created at new_README.md')
});