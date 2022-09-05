function toggleMenu() {
    const headerHamb = document.getElementById('headerHamb');
    headerHamb.classList.toggle('active')
}

function removeActiveHamburguer() {
    const headerHamb = document.getElementById('headerHamb');
    headerHamb.classList.remove('active')
}