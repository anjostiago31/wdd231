// Lista provisória de cursos
const cursos = [
    {
        subject: "CSE",
        number: 110,
        title: "Introdução à Programação",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Fundamentos da Web",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programação com Funções",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programação com Classes",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Fundamentos da Web Dinâmica",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Desenvolvimento Web Frontend I",
        credits: 2,
        completed: false
    }
];

// Elementos HTML
const listaCursos = document.querySelector("#lista-cursos");
const totalCreditos = document.querySelector("#total-creditos");

const botaoTodos = document.querySelector("#todos");
const botaoWdd = document.querySelector("#wdd");
const botaoCse = document.querySelector("#cse");

// Exibir os cursos
function exibirCursos(lista) {

    listaCursos.innerHTML = "";

    lista.forEach(curso => {

        const cartao = document.createElement("div");

        cartao.classList.add("curso");

        if (curso.completed) {
            cartao.classList.add("concluido");
        }

        cartao.textContent =
            `${curso.subject} ${curso.number}`;

        cartao.title = curso.title;

        listaCursos.appendChild(cartao);
    });

    // Calcular créditos dinamicamente
    const creditos = lista.reduce(
        (total, curso) => total + curso.credits,
        0
    );

    totalCreditos.textContent =
        `Total de créditos: ${creditos}`;
}

// Identificar botão selecionado
function selecionarBotao(botao) {

    [botaoTodos, botaoWdd, botaoCse].forEach(item => {
        item.classList.remove("selecionado");
        item.setAttribute("aria-pressed", "false");
    });

    botao.classList.add("selecionado");
    botao.setAttribute("aria-pressed", "true");
}

// Todos os cursos
botaoTodos.addEventListener("click", () => {

    exibirCursos(cursos);
    selecionarBotao(botaoTodos);

});

// Apenas cursos WDD
botaoWdd.addEventListener("click", () => {

    const cursosWdd = cursos.filter(
        curso => curso.subject === "WDD"
    );

    exibirCursos(cursosWdd);
    selecionarBotao(botaoWdd);

});

// Apenas cursos CSE
botaoCse.addEventListener("click", () => {

    const cursosCse = cursos.filter(
        curso => curso.subject === "CSE"
    );

    exibirCursos(cursosCse);
    selecionarBotao(botaoCse);

});

// Exibição inicial
exibirCursos(cursos);
selecionarBotao(botaoTodos);