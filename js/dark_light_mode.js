document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
});

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const darkModeIcon = document.querySelector('.sun-icon');
    const lightModeIcon = document.querySelector('.moon-icon');

    function toggleDarkMode() {
        const isDarkMode = document.documentElement.classList.contains('dark');

        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            themeToggle.checked = false;
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            themeToggle.checked = true;
        }

        darkModeIcon.classList.toggle('hidden', !isDarkMode);
        lightModeIcon.classList.toggle('hidden', isDarkMode);
    }

    const storedTheme = localStorage.getItem('color-theme');
    if (storedTheme) {
        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            themeToggle.checked = true;
        } else {
            document.documentElement.classList.remove('dark');
            themeToggle.checked = false;
        }
    } else {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            document.documentElement.classList.add('dark');
            themeToggle.checked = true;
        } else {
            document.documentElement.classList.remove('dark');
            themeToggle.checked = false;
        }
    }

    themeToggle.addEventListener('change', toggleDarkMode);
}