function savePlanType(plano){

    localStorage.setItem('planType',plano);

    setTimeout(() => {
        window.location = "Cadastro.html";
    }, "1000")

}