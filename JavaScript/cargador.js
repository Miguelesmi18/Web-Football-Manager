// Carga el Header
    fetch('../Html/header.html')
        .then(response => response.text())
        .then(data => document.getElementById('main-header').innerHTML = data);

// Carga el Footer
fetch('../Html/footer.html')
    .then(response => response.text())
    .then(data => document.getElementById('main-footer').innerHTML = data);