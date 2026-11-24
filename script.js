(function () {
  const lista = ["gorras", "grafos", "rap", "xboox", "ropa"];

  const preguntas = [
    {
      texto: "1. algo de mi lista (gorras, grafos, rap, xboox, ropa):",
      validar: (r) =>
        lista.includes(r)
          ? { estado: "ok", msg: "esa es" }
          : { estado: "mal", msg: "nop" },
    },
    {
      texto: "2. ¿qué género musical va conmigo?:",
      validar: (r) =>
        r === "rap"
          ? { estado: "ok", msg: "bien ahí" }
          : { estado: "mal", msg: "era rap" },
    },
    {
      texto: "3. ¿qué arte callejero me cuadra?:",
      validar: (r) =>
        ["grafos", "grafiti", "graffiti"].includes(r)
          ? { estado: "ok", msg: "eso mismo" }
          : { estado: "mal", msg: "eran los grafos" },
    },
    {
      texto: "4. ¿qué consola puse en la lista?:",
      validar: (r) =>
        ["xboox", "xbox"].includes(r)
          ? { estado: "ok", msg: "bien jugado" }
          : { estado: "mal", msg: "era xboox" },
    },
    {
      texto: "5. ¿qué uso o colecciono para vestir?:",
      validar: (r) =>
        ["ropa", "gorras"].includes(r)
          ? { estado: "ok", msg: "correcto" }
          : { estado: "mal", msg: "mal ahí" },
    },
    {
      texto: "6. si salgo a la calle, ¿qué me pongo en la cabeza?:",
      validar: (r) =>
        ["gorra", "gorras"].includes(r)
          ? { estado: "ok", msg: "sí señor" }
          : { estado: "mal", msg: "era gorra" },
    },
    {
      texto: "7. ¿qué prefiero entre rap o xboox?:",
      validar: (r) =>
        ["rap", "xboox", "xbox"].includes(r)
          ? { estado: "ok", msg: "vale, te la doy" }
          : { estado: "mal", msg: "ninguna de esas" },
    },
    {
      texto: "8. dime otra palabra que esté en mi lista:",
      validar: (r) =>
        lista.includes(r)
          ? { estado: "ok", msg: "bien, esa sí está" }
          : { estado: "mal", msg: "esa no estaba" },
    },
    {
      texto: "9. ¿grafos o fútbol?:",
      validar: (r) =>
        r === "grafos"
          ? { estado: "ok", msg: "obvio" }
          : { estado: "mal", msg: "no, grafos" },
    },
    {
      texto: "10. del 1 al 10, ¿qué tanto me conoces?:",
      validar: (r) =>
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].includes(r)
          ? { estado: "ok", msg: "anotado" }
          : { estado: "mal", msg: "error de sintaxis, intente de nuevo" },
    },
  ];

  let nombre = "parcero";
  let indiceActual = 0;
  let ok = 0;
  let mal = 0;
  let respondida = false;

  const pantallaInicio = document.getElementById("pantalla-inicio");
  const pantallaQuiz = document.getElementById("pantalla-quiz");
  const pantallaResultado = document.getElementById("pantalla-resultado");

  const inputNombre = document.getElementById("input-nombre");
  const btnEmpezar = document.getElementById("btn-empezar");

  const progresoTexto = document.getElementById("progreso-texto");
  const marcadorVivo = document.getElementById("marcador-vivo");
  const barraRelleno = document.getElementById("barra-relleno");
  const preguntaTexto = document.getElementById("pregunta-texto");
  const inputRespuesta = document.getElementById("input-respuesta");
  const btnResponder = document.getElementById("btn-responder");
  const mensajeRespuesta = document.getElementById("mensaje-respuesta");
  const btnSiguiente = document.getElementById("btn-siguiente");

  const tituloResultado = document.getElementById("titulo-resultado");
  const fraseResultado = document.getElementById("frase-resultado");
  const totalBuenas = document.getElementById("total-buenas");
  const totalMalas = document.getElementById("total-malas");
  const btnReiniciar = document.getElementById("btn-reiniciar");

  function cargarPregunta() {
    respondida = false;
    const actual = preguntas[indiceActual];

    const numFormateado = String(indiceActual + 1).padStart(2, "0");
    progresoTexto.textContent = "RONDA " + numFormateado + " / " + preguntas.length;
    marcadorVivo.textContent = "✔ " + ok + " | ✘ " + mal;
    barraRelleno.style.width = ((indiceActual + 1) / preguntas.length) * 100 + "%";
    preguntaTexto.textContent = actual.texto;

    inputRespuesta.value = "";
    inputRespuesta.disabled = false;
    btnResponder.disabled = false;

    mensajeRespuesta.textContent = "";
    mensajeRespuesta.className = "feedback hidden";

    btnSiguiente.classList.add("hidden");
    btnSiguiente.textContent =
      indiceActual === preguntas.length - 1 ? "VER RESULTADO FINAL" : "SIGUIENTE PISTA >>";

    inputRespuesta.focus();
  }

  function mostrarResultadoFinal() {
    pantallaQuiz.classList.add("hidden");
    pantallaResultado.classList.remove("hidden");

    tituloResultado.textContent = "listo " + nombre + ": " + ok + " buenas y " + mal + " malas";
    totalBuenas.textContent = ok;
    totalMalas.textContent = mal;

    if (ok >= 7) {
      fraseResultado.textContent = "me conoces re bien";
    } else if (ok >= 4) {
      fraseResultado.textContent = "algo sabes, ahí vamos";
    } else {
      fraseResultado.textContent = "no me conoces nada jaja";
    }
  }

  function empezar() {
    const limpio = inputNombre.value.trim();
    nombre = limpio === "" ? "parcero" : limpio;

    ok = 0;
    mal = 0;
    indiceActual = 0;

    pantallaInicio.classList.add("hidden");
    pantallaResultado.classList.add("hidden");
    pantallaQuiz.classList.remove("hidden");

    cargarPregunta();
  }

  function responder() {
    if (respondida) return;

    const r = inputRespuesta.value.trim().toLowerCase();
    if (r === "") {
      mensajeRespuesta.textContent = "error de sintaxis, intente de nuevo";
      mensajeRespuesta.className = "feedback error";
      inputRespuesta.focus();
      return;
    }

    const resultado = preguntas[indiceActual].validar(r);
    if (resultado.estado === "ok") {
      ok += 1;
      mensajeRespuesta.textContent = resultado.msg;
      mensajeRespuesta.className = "feedback ok";
    } else {
      mal += 1;
      mensajeRespuesta.textContent = resultado.msg;
      mensajeRespuesta.className = "feedback mal";
    }

    respondida = true;
    inputRespuesta.disabled = true;
    btnResponder.disabled = true;
    marcadorVivo.textContent = "✔ " + ok + " | ✘ " + mal;
    btnSiguiente.classList.remove("hidden");
    btnSiguiente.focus();
  }

  function siguiente() {
    indiceActual += 1;
    if (indiceActual < preguntas.length) {
      cargarPregunta();
    } else {
      mostrarResultadoFinal();
    }
  }

  function reiniciar() {
    inputNombre.value = "";
    pantallaResultado.classList.add("hidden");
    pantallaQuiz.classList.add("hidden");
    pantallaInicio.classList.remove("hidden");
    inputNombre.focus();
  }

  btnEmpezar.addEventListener("click", empezar);
  inputNombre.addEventListener("keydown", (e) => {
    if (e.key === "Enter") empezar();
  });

  btnResponder.addEventListener("click", responder);
  inputRespuesta.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !respondida) responder();
  });

  btnSiguiente.addEventListener("click", siguiente);
  btnReiniciar.addEventListener("click", reiniciar);
})();