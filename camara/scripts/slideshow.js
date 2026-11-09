/* ==========================================
   SLIDESHOW - CÂMARA DE COMÉRCIO DE GARÇA
   Autor: Tiago dos Anjos
========================================== */

const slideshow = document.querySelector(".slideshow");

if (slideshow) {

    const slides = slideshow.querySelectorAll(".slide");
    const indicadores = slideshow.querySelectorAll(".indicador");

    const anterior = slideshow.querySelector(".slide-anterior");
    const proximo = slideshow.querySelector(".slide-proximo");

    let slideAtual = 0;
    let intervalo;

    const tempo = 5000;

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    // MOSTRAR SLIDE

    function mostrarSlide(indice) {

        slides.forEach((slide, i) => {

            const ativo = i === indice;

            slide.classList.toggle("ativo", ativo);
            slide.setAttribute("aria-hidden", String(!ativo));

            if ("inert" in slide) {
                slide.inert = !ativo;
            }

        });

        indicadores.forEach((indicador, i) => {

            const ativo = i === indice;

            indicador.classList.toggle("ativo", ativo);

            if (ativo) {
                indicador.setAttribute("aria-current", "true");
            } else {
                indicador.removeAttribute("aria-current");
            }

        });

        slideAtual = indice;
    }

    // PRÓXIMO SLIDE

    function avancar() {

        const indice = (slideAtual + 1) % slides.length;

        mostrarSlide(indice);
    }

    // SLIDE ANTERIOR

    function voltar() {

        const indice =
            (slideAtual - 1 + slides.length) % slides.length;

        mostrarSlide(indice);
    }

    // INICIAR TRANSIÇÃO

    function iniciar() {

        parar();

        if (movimentoReduzido.matches || document.hidden) {
            return;
        }

        intervalo = setInterval(avancar, tempo);
    }

    // PARAR TRANSIÇÃO

    function parar() {

        clearInterval(intervalo);
    }

    // BOTÕES

    proximo.addEventListener("click", () => {

        avancar();
        iniciar();
    });

    anterior.addEventListener("click", () => {

        voltar();
        iniciar();
    });

    // INDICADORES

    indicadores.forEach((indicador, indice) => {

        indicador.addEventListener("click", () => {

            mostrarSlide(indice);
            iniciar();

        });

    });

    // PAUSAR COM O MOUSE

    slideshow.addEventListener("mouseenter", parar);

    slideshow.addEventListener("mouseleave", iniciar);

    // PAUSAR COM O TECLADO

    slideshow.addEventListener("focusin", parar);

    slideshow.addEventListener("focusout", (evento) => {

        if (!slideshow.contains(evento.relatedTarget)) {
            iniciar();
        }

    });

    // PAUSAR QUANDO A ABA ESTIVER OCULTA

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {
            parar();
        } else {
            iniciar();
        }

    });

    // INICIAR SLIDESHOW

    mostrarSlide(0);
    iniciar();

}