const themeSwitch = document.getElementById('theme-switch');
const currentTheme = localStorage.getItem('theme');

const updateIcon = (theme) => {
  if (theme === 'dark') {
    themeSwitch.textContent = '☀️ Light'; 
  } else {
    themeSwitch.textContent = '🌙 Dark'; 
  }
};

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme)
    updateIcon(currentTheme);
} else {
    updateIcon('light');
}

themeSwitch.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');

    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateIcon('light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateIcon('dark');
    }
});