const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close'); // Add reference to close button

// Open the navbar when the hamburger is clicked
if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active'); // Adds the 'active' class to display navbar
    });
}

// Close the navbar when the close button is clicked
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active'); // Removes 'active' class to hide navbar
    });
}
