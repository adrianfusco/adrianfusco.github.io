document.addEventListener('DOMContentLoaded', () => {
    const projectsList = document.getElementById('projects-list');

    // We can't fetch from GitHub API pinned repos and we can use GraphQL in the APIv4 but we need Auth for that so... let's just avoid it :)
    const pinnedRepos = [
        { name: 'openinfra2024-dashboard-as-a-code', description: 'This repository contains supplementary materials for our presentation at the OpenInfra Day Germany 2024 in Berlin.', url: 'https://github.com/adrianfusco/openinfra2024-dashboard-as-a-code' },
        { name: 'openinfra2024-software-factory-playground', description: 'This repository contains supplementary materials for our presentation at the OpenInfra Summit Asia 2024 in Korea.', url: 'https://github.com/adrianfusco/openinfra2024-software-factory-playground' },
        { name: 'CI Framework', description: 'CI Framework - used for CI, QE and Devs to run jobs in a converged way', url: 'https://github.com/openstack-k8s-operators/ci-framework/' },
        { name: 'Syncron', description: 'Usage Patterns all in one cli based application written in Golang.', url: 'https://github.com/RedHatCRE/syncron' },
        { name: 'EksS3ClusterApp', description: 'The project provide a solution for creating S3 buckets and adding specific IAM policies using Terraform modules and automate the creation of a AWS EKS cluster where we will have different resources to access into S3 bucket through a Kubernetes Ingress resource.', url: 'https://github.com/adrianfusco/EksS3ClusterApp' },
        { name: 'Cibyl', description: 'Cibyl is a command-line interface and REST API for querying CI/CD environments and systems.', url: 'https://github.com/RedHatCRE/cibyl' },
    ];

    pinnedRepos.forEach(repo => {
        const projectItem = document.createElement('div');
        projectItem.classList.add('p-6', 'bg-gray-100', 'dark:bg-gray-800', 'shadow-md', 'rounded-lg');
        projectItem.innerHTML = `
        <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${repo.name}</h4>
        <p class="text-gray-700 dark:text-gray-300">${repo.description || 'No description available'}</p>
        <a href="${repo.url}" class="text-blue-600 dark:text-blue-400 underline hover:text-blue-500 dark:hover:text-blue-300" target="_blank">View on GitHub</a>
      `;
        projectsList.appendChild(projectItem);
    });
});

const translations = {
    en: {
        command: "$ LC_ALL=en_US.UTF-8 about_me",
        about: [
            "$ about\n\n",
            "Hey! :) I'm Adri, a Software Engineer with a strong DevOps background.\n",
            "I started my journey as a web PHP Backend Developer working on several frameworks and then continued to the world of Linux services automation using Perl and Python.\n",
            "As my career progressed, I transitioned into a software engineer, simultaneously working on diverse projects including automation, monitoring, CI/CD, testing among others.\n",
            "Beyond coding, I have a passion for traveling and food, and I love to immerse myself in different cultures. This enthusiasm extends to languages, as I fluently speak Español, English, Galego, Italiano, and now learning some Turkçe.\n",
            "In every project I work on, I bring not only technical proficiency but also a commitment to speed and efficiency.\n\n",
            "$ \n"
        ]
    },
    es: {
        command: "$ LC_ALL=es_ES.UTF-8 about_me",
        about: [
            "$ sobre\n\n",
            "¡Hola! :) Soy Adri, un Ingeniero de Software con una sólida experiencia en DevOps.\n",
            "Comencé mi viaje como Desarrollador Backend PHP trabajando en varios frameworks y luego continué en el mundo de la automatización de servicios Linux utilizando Perl y Python.\n",
            "A medida que avanzó mi carrera, pasé a ser ingeniero de software, trabajando simultáneamente en diversos proyectos que incluyen automatización, monitoreo, CI/CD, pruebas, entre otros.\n",
            "Más allá de la programación, tengo una pasión por viajar y la comida, y me encanta sumergirme en diferentes culturas. Este entusiasmo se extiende a los idiomas, ya que hablo fluidamente Español, Inglés, Galego, Italiano, y ahora estoy aprendiendo algo de Turkçe.\n",
            "En cada proyecto en el que trabajo, aporto no solo competencia técnica, sino también un compromiso con la velocidad y la eficiencia.\n\n",
            "$ \n"
        ]
    }
};

// Function to switch language
function switchLanguage(lang) {
    const terminal = document.getElementById('terminal');
    terminal.innerHTML = '';
  
    const lines = translations[lang].about;
    const command = translations[lang].command;
    let currentLine = 0;
  
    function typeCharacter(text, element, delay, callback) {
      let index = 0;
      const interval = setInterval(() => {
        element.textContent += text.charAt(index);
        index++;
        if (index >= text.length) {
          clearInterval(interval);
          callback();
        }
      }, delay);
    }
  
    function typeLine(line, callback) {
      const lineElement = document.createElement('div');
      lineElement.classList.add('line');
      terminal.appendChild(lineElement);
  
      typeCharacter(line, lineElement, 2, callback);
    }
  
    function typeNextLine() {
      if (currentLine === 0) {
        typeLine(`${command}\n\n`, () => {
          currentLine++;
          typeNextLine();
        });
      } else if (currentLine < lines.length) {
        typeLine(lines[currentLine], () => {
          currentLine++;
          typeNextLine();
        });
      }
    }
  
    typeNextLine();
  }

document.addEventListener('DOMContentLoaded', () => {
    switchLanguage('en');
    document.getElementById('lang-en').addEventListener('click', () => switchLanguage('en'));
    document.getElementById('lang-es').addEventListener('click', () => switchLanguage('es'));
});

// Handle Theme Toggle
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const darkModeIcon = document.getElementById('theme-toggle-dark-icon');
    const lightModeIcon = document.getElementById('theme-toggle-light-icon');

    function toggleDarkMode() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            darkModeIcon.classList.add('hidden');
            lightModeIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            darkModeIcon.classList.remove('hidden');
            lightModeIcon.classList.add('hidden');
        }
    }

    const storedTheme = localStorage.getItem('color-theme');
    if (storedTheme) {
        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            darkModeIcon.classList.remove('hidden');
            lightModeIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            darkModeIcon.classList.add('hidden');
            lightModeIcon.classList.remove('hidden');
        }
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            darkModeIcon.classList.remove('hidden');
            lightModeIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            darkModeIcon.classList.add('hidden');
            lightModeIcon.classList.remove('hidden');
        }
    }

    themeToggle.addEventListener('click', function () {
        toggleDarkMode();
    });
});

