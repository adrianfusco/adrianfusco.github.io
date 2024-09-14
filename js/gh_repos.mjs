document.addEventListener('DOMContentLoaded', () => {
    setupProjects();
});

const pinnedRepos = [
    { name: 'openinfra2024-dashboard-as-a-code', description: 'This repository contains supplementary materials for our presentation at the OpenInfra Day Germany 2024 in Berlin.', url: 'https://github.com/adrianfusco/openinfra2024-dashboard-as-a-code' },
    { name: 'openinfra2024-software-factory-playground', description: 'This repository contains supplementary materials for our presentation at the OpenInfra Summit Asia 2024 in Korea.', url: 'https://github.com/adrianfusco/openinfra2024-software-factory-playground' },
    { name: 'CI Framework', description: 'CI Framework - used for CI, QE and Devs to run jobs in a converged way', url: 'https://github.com/openstack-k8s-operators/ci-framework/' },
    { name: 'Syncron', description: 'Usage Patterns all in one cli based application written in Golang.', url: 'https://github.com/RedHatCRE/syncron' },
    { name: 'EksS3ClusterApp', description: 'The project provides a solution for creating S3 buckets and adding specific IAM policies using Terraform modules and automates the creation of an AWS EKS cluster.', url: 'https://github.com/adrianfusco/EksS3ClusterApp' },
    { name: 'Cibyl', description: 'Cibyl is a command-line interface and REST API for querying CI/CD environments and systems.', url: 'https://github.com/RedHatCRE/cibyl' },
];

function setupProjects() {
    const projectsList = document.getElementById('projects-list');
    pinnedRepos.forEach(repo => {
        const projectItem = document.createElement('div');
        projectItem.classList.add('p-6', 'bg-white', 'dark:bg-gray-800', 'shadow-lg', 'rounded-lg', 'transition-transform', 'transform', 'hover:scale-105', 'duration-300');
        projectItem.innerHTML = `
  <h4 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">${repo.name}</h4>
  <a href="${repo.url}" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300" target="_blank">View on GitHub</a>
  <p class="text-gray-700 dark:text-gray-300 mt-2">${repo.description || 'No description available'}</p>
`;
        projectsList.appendChild(projectItem);
    });
}