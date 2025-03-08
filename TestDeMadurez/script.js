function evaluarQuiz() {
    let puntos = 0;

    // Obtener todas las preguntas
    const preguntas = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15"];

    preguntas.forEach(pregunta => {
        const seleccion = document.querySelector(`input[name="${pregunta}"]:checked`);
        if (seleccion) {
            puntos += parseInt(seleccion.value);
        }
    });

    if(puntos >= 0 && puntos <= 10){
        document.getElementById("resultado").textContent = `Eres una persona inmadura, te cuesta asumir responsabilidades propias de tu edad y esto puede traerte problemas interpersonales.`;
    } else if(puntos >= 11 && puntos <= 20){
        document.getElementById("resultado").textContent = `Estás en camino a la madurez. Conocerte a ti mismo, intetar ser autónomo y adquirir mayor responsabilidad emocional te ayudarán a seguir avanzando.`;
    } else if(puntos >= 21 && puntos <= 30){
        document.getElementById("resultado").textContent = `Eres bastante maduro, procuras conocerte e identificas lo que depende de ti para actuar al respecto, solo no olvides sacar tu frescura y dejar que otros te cuiden de vez en cuando.`;
    }

}