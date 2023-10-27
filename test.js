const inquirer = require('inquirer');
const fs = require('fs');

// Add validation for required fields
const questions = [
  {
    type: 'input',
    name: 'projectTitle',
    message: 'Enter your project title:',
    validate: input => {
      if (!input) {
        return 'Project title is required';  
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter a project description:',
    validate: input => {
      if (!input) {
        return 'Project description is required';
      }
      return true;  
    }
  },

  // Rest of questions...

  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:',
  },
];

// Generate dynamic badge URL
function getLicenseBadge(license) {
  return `![License](https://img.shields.io/badge/License-${license}-blue.svg)`;
}

// Generate Table of Contents
function generateTOC(readme) {
  // Split readme into array of lines
  const lines = readme.split('\n');

  // Filter for lines that start with # heading
  const headings = lines.filter(line => line.startsWith('#'));

  // Generate TOC entries
  const toc = headings.map(heading => {
    const title = heading.slice(2).trim();
    return `- [${title}](#${title.toLowerCase().replace(/ /g, '-')})`; 
  }).join('\n');

  // Insert TOC
  lines.splice(2, 0, `## Table of Contents\n${toc}`);

  return lines.join('\n');
}

// Generate filename from project title 
function generateFilename(projectTitle) {
  return `${projectTitle.toLowerCase().replace(/ /g, '_')}.md`;
}

// Generate README content
function generateReadme(responses) {
  const {projectTitle, description, installation, usage, contributing, tests, license, githubUsername, email} = responses;

  const badge = getLicenseBadge(license);

  const readme = `
  # ${projectTitle}  

  ## Description

  ${description}

  // Rest of README...
  `;

  const tocReadme = generateTOC(readme);
  
  return tocReadme; 
}

// Write to file
inquirer.prompt(questions)
.then(responses => {

  const filename = generateFilename(responses.projectTitle);
  const readme = generateReadme(responses);

  fs.writeFileSync(filename, readme);
});
