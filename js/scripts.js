document.addEventListener('DOMContentLoaded', () => {
  executeInitialCommands();
  setupCommandInput();
});

const commands = [
  'help',
  'about_me',
  'clear',
  'contact_me',
  'projects',
  'skills',
  'history',
  'redirect'
];

let commandHistory = JSON.parse(localStorage.getItem('commandHistory')) || [];
let commandCounter = 0;

const autocomplete = document.getElementById('autocomplete');
const input = document.getElementById('input');
const output = document.getElementById('output');

let selectedIndex = -1;

const redirectUrls = {
  cv: 'media/cv_afuscoar_2024_01_02.pdf',
  hrs: 'human_readable_index.html',
};

const commandDescriptions = {
  help: getHelpDescription,
  about_me: getAboutMeDescription,
  contact_me: getContactMeDescription,
  projects: getProjectsDescription,
  skills: getSkillsDescription,
  history: getCommandHistory,
  redirect: handleRedirectCommand,
};

function handleRedirectCommand(parameter) {
  const validOptions = Object.keys(redirectUrls);
  const urlPath = redirectUrls[parameter];
  if (urlPath) {
    output.innerHTML += `
      <p class="text-green-500">
        Redirecting...
      </p>
    `;
    setTimeout(() => {
      window.location.href = urlPath;
    }, 1000);

    return;
  } else {
    const validOptionsString = validOptions.join(', ');
    output.innerHTML += `
      <p class="text-red-500">
        Invalid parameter for redirect. Valid options are: ${validOptionsString}. Example:
        $ redirect cv
      </p>
    `;
  }
}

function getHelpDescription() {
  return `Available commands:\n${commands.map(cmd => `- ${cmd}`).join('\n')}`;
}

function getAboutMeDescription() {
  return `
Hey there! 😊 I’m Adri, and I’m a Software Engineer with a strong DevOps background. 💻🔧
I started working as a Backend Developer, diving into different frameworks, and then moved on to Linux services automation with Perl and Python.
I transitioned into a software engineering role, working on different projects from automation and monitoring to CI/CD and testing. 🔄🔍🔧
When I’m not coding, I’m probably traveling or enjoying some good food. 😛🌍 I’m also a bit of a language enthusiast. I speak Español 🇪🇸, English 🇬🇧, Galego 🇪🇸, Italiano 🇮🇹, and I’m learning some Turkçe 🇹🇷.
In every project I work on, I bring not only technical proficiency but also a commitment to speed and efficiency. 🚀
  `;
}

function getContactMeDescription() {
  return `
Need to reach out? 🤔 Well, you could try sending a carrier pigeon, but that might take a while. Instead, you can contact me here on LinkedIn. Click there ;)
- <a href="https://www.linkedin.com/in/adrianfusco" target="_blank">LinkedIn Profile</a>\n
  `;
}

function getProjectsDescription() {
  const pinnedRepos = [
    { name: 'openinfra2024-dashboard-as-a-code', description: 'This repository contains supplementary materials for our presentation at the OpenInfra Day Germany 2024 in Berlin.', url: 'https://github.com/adrianfusco/openinfra2024-dashboard-as-a-code' },
    { name: 'openinfra2024-software-factory-playground', description: 'This repository contains supplementary materials for our presentation at the OpenInfra Summit Asia 2024 in Korea.', url: 'https://github.com/adrianfusco/openinfra2024-software-factory-playground' },
    { name: 'CI Framework', description: 'CI Framework - used for CI, QE and Devs to run jobs in a converged way', url: 'https://github.com/openstack-k8s-operators/ci-framework/' },
    { name: 'Syncron', description: 'Usage Patterns all in one cli based application written in Golang.', url: 'https://github.com/RedHatCRE/syncron' },
    { name: 'EksS3ClusterApp', description: 'The project provides a solution for creating S3 buckets and adding specific IAM policies using Terraform modules and automates the creation of an AWS EKS cluster.', url: 'https://github.com/adrianfusco/EksS3ClusterApp' },
    { name: 'Cibyl', description: 'Cibyl is a command-line interface and REST API for querying CI/CD environments and systems.', url: 'https://github.com/RedHatCRE/cibyl' },
  ];

  return generateRepoList(pinnedRepos);
}

function generateRepoList(repos) {
  let list = 'Here are some of my pinned repositories:\n\n';
  repos.forEach(repo => {
    list += `Repository: ${repo.name}\n`;
    list += `Description: ${repo.description}\n`;
    list += `URL: <a href="${repo.url}" target="_blank">${repo.url}</a>\n\n`;
  });
  return list;
}

function getSkillsDescription() {
  return `
Here are some of my technical skills:

- Collaboration: Experience working in both upstream and downstream projects across multiple teams.
- CI Systems: Proficient in creating CI pipelines with Jenkins and workflows in GitHub repositories.
- Python Development: Extensive use of Python, especially in the OpenStack community.
- Agile & Scrum: Experience with agile and scrum development methodologies.
- ELK Stack: Skilled in using the ELK Stack, Beats, and painless scripting for troubleshooting and data manipulation.
- Grafana & Telegraf: Experience with Grafana visualizations, Telegraf, and InfluxDB.
- Programming: Contributed to various projects using Go and Python.
- Automation: Expertise in automation with Ansible, including using Ansible Molecule for testing roles.
- Scripting: Proficient in Bash scripting and working with Makefiles.
- GitHub Actions: Experienced in using GitHub Actions for automation.
- Dashboard Creation: Skilled in creating Grafana dashboards and automating with jsonnet.
  `;
}

function getCommandHistory() {
  return commandHistory.map((cmd, index) => `<li><strong>${index + 1}:</strong> ${cmd}</li>`).join('');
}

function executeInitialCommands() {
  executeCommand('help');
}

function setupCommandInput() {
  input.addEventListener('input', handleInput);
  input.addEventListener('keydown', handleKeyDown);
}

function handleInput(event) {
  const value = event.target.value.toLowerCase();
  event.target.value = value;
  const suggestions = commands.filter(cmd => cmd.startsWith(value) && value.length > 0);
  renderSuggestions(suggestions);
}

function handleKeyDown(event) {
  const items = document.querySelectorAll('.autocomplete-suggestion');
  if (event.ctrlKey && event.key === 'c') {
    event.preventDefault();
    executeCommand('clear');
  } else if (event.key === 'ArrowDown') {
    selectedIndex = (selectedIndex + 1) % items.length;
    updateSelection();
  } else if (event.key === 'ArrowUp') {
    selectedIndex = (selectedIndex - 1 + items.length) % items.length;
    updateSelection();
  } else if (event.key === 'Enter') {
    if (items.length > 0) {
      executeCommand(items[selectedIndex].textContent.trim());
    } else {
      executeCommand(input.value.trim());
    }
  } else if (event.key === 'Escape') {
    autocomplete.innerHTML = '';
  } else if (event.key === 'Tab') {
    event.preventDefault();
    if (autocomplete.children.length > 0) {
      input.value = autocomplete.children[0].textContent;
      autocomplete.innerHTML = '';
    }
  }
}

function updateSelection() {
  const items = document.querySelectorAll('.autocomplete-suggestion');
  items.forEach((item, index) => {
    item.classList.toggle('bg-gray-200', index === selectedIndex);
  });
}

function renderSuggestions(suggestions) {
  autocomplete.innerHTML = '';
  suggestions.forEach(suggestion => {
    const item = document.createElement('div');
    item.classList.add('autocomplete-suggestion', 'p-2', 'cursor-pointer', 'hover:bg-gray-200');
    item.textContent = suggestion;
    item.addEventListener('click', () => {
      executeCommand(suggestion);
      autocomplete.innerHTML = '';
    });
    autocomplete.appendChild(item);
  });
}

function createSeparator() {
  return '<hr class="my-4 border-gray-500">';
}

function handleCommandNotFound(command) {
  return `
    <p class="text-red-500">Command not found: <strong>${command}</strong></p>
  `;
}

function handleRecalledCommand(recalledCommand) {
  return `
    <p class="text-blue-500">Recalled command: <strong>${recalledCommand}</strong></p>
    ${createSeparator()}
  `;
}

function executeCommand(command) {
  const separator = createSeparator();

  if (command === 'clear') {
    output.innerHTML = '';
    input.value = '';
    input.focus();
    return;
  }

  if (command.startsWith('!')) {
    const index = parseInt(command.slice(1), 10) - 1;
    if (index >= 0 && index < commandHistory.length) {
      const recalledCommand = commandHistory[index];
      output.innerHTML += handleRecalledCommand(recalledCommand) + separator;
      executeCommand(recalledCommand);
      return;
    } else {
      output.innerHTML += `<p class="text-red-500">No such history entry: ${command}</p>${separator}`;
      return;
    }
  }

  commandCounter++;
  commandHistory.push(command);
  localStorage.setItem('commandHistory', JSON.stringify(commandHistory));

  const [cmd, ...params] = command.split(' ');
  const param = params.join(' ');

  if (!commands.includes(cmd)) {
    output.innerHTML += handleCommandNotFound(cmd) + separator;
  } else {
    const result = cmd === 'redirect'
      ? handleRedirectCommand(param)
      : typeof commandDescriptions[cmd] === 'function'
        ? commandDescriptions[cmd]()
        : commandDescriptions[cmd];

    output.innerHTML += `
      <p class="text-green-500">${result || ''}</p>
      ${separator}
    `;
  }

  input.value = '';
  input.focus();
}


