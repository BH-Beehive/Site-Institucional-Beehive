function toggleMenu() {
    const headerHamb = document.getElementById('headerHamb');
    headerHamb.classList.toggle('active')
}

function removeActiveHamburguer() {
    const headerHamb = document.getElementById('headerHamb');
    headerHamb.classList.remove('active')
}

function isIdSuporte() {
    let idSuporte = sessionStorage.ID_SUPORTE
    console.log(idSuporte)
    if(idSuporte == 'null') {
      gerenciarContasId.style.display = 'flex'
      suporteId.style.display = 'none'
      console.log('Entrei')
    }else {
        console.log(sessionStorage.ID_SUPORTE)
        suporteId.style.display = 'flex'
        gerenciarContasId.style.display = 'none'
        console.log('Droga')
    }
}