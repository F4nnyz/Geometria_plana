//ACORDEÃO (ABRIR E FECHAR CONTEÚDOS)
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        let conteudo = botao.nextElementSibling; //pegue o próximo elemento
        let simbolo = botao.querySelector("span");

        // Alterna entre block e none usando operador ternário
        conteudo.style.display = conteudo.style.display === "block" ? "none" : "block";
        simbolo.textContent = conteudo.style.display === "block" ? "−" : "+";
    });
});

//LINHA DO TEMPO
function mostrarAno(id, botao) {
    // Esconde todos os eventos de uma vez só
    document.querySelectorAll(".evento").forEach(ev => ev.style.display = "none");
    
    // Remove a classe 'ativo' de todos os botões de anos
    document.querySelectorAll(".anos button").forEach(btn => btn.classList.remove("ativo"));

    // Mostra o evento selecionado e ativa o botão atual
    let eventoSelecionado = document.getElementById(id);
    eventoSelecionado.style.display = "block";
    botao.classList.add("ativo");

    // Rolar suavemente até o marco
    eventoSelecionado.scrollIntoView({ behavior: "smooth", block: "center" });
}

//EIXO E ALIADOS
function mostrarBlocoGuerra(id) {
    let conteudo = document.getElementById(id);
    let estavaAberto = conteudo.style.display === "block";

    // Fecha todos os blocos de guerra em uma linha
    document.querySelectorAll(".conteudo-guerra").forEach(bloco => bloco.style.display = "none");

    // Só reabre se ele já não estivesse aberto antes
    if (!estavaAberto) conteudo.style.display = "block";
}

//QUIZ (DADOS E LÓGICA)
const perguntas = [
    {
        pergunta: "Uma escola pretende construir um jardim retangular de 12 metros de comprimento e 8 metros de largura. Para proteger o espaço, será colocada grama em toda a sua superfíci.Qual será a área total ocupada pela grama?",
        alternativas: ["A) 20 m²", "B) 40 m²", "C) 96 m²", "D) 192 m²"],
        correta: 2,
        explicacao: "A área do retângulo é calculada multiplicando o comprimento pela largura: 12m x 8m = 96 m²."
    },
    {
        pergunta: "Uma praça quadrada será cercada para a realização de um evento. Cada lado da praça mede 15 metros. A organização deseja instalar uma fita de proteção ao redor de toda a praça.Quantos metros de fita serão necessários, desconsiderando sobras?",
        alternativas: ["A) 30 metros", "B) 45 metros", "C) 60 metros", "D) 225 metros"],
        correta: 2,
        explicacao: "O perímetro de um quadrado é calculado multiplicando o comprimento de um lado por 4: 15m x 4 = 60 metros."
    },
    {
        pergunta: "Um terreno triangular será utilizado para a construção de uma área de lazer. Sua base mede 18 metros e sua altura perpendicular à base mede 10 metros.Qual é a área desse terreno?",
        alternativas: ["A) 90 m²", "B) 180 m²", "C) 270 m²", "D) 360 m²"],
        correta: 1,
        explicacao: "A área do triângulo é calculada como (base × altura) / 2: (18m × 10m) / 2 = 90 m²."
    },
    {
        pergunta: "Uma ciclovia circular possui raio de 7 metros. Uma pessoa deseja dar uma volta completa nessa ciclovia. Considere \(\pi = 3{,}14\).Aproximadamente, qual distância essa pessoa percorrerá em uma volta?",
        alternativas: ["A) 22 metros", "B) 44 metros", "C) 66 metros", "D) 88 metros"],
        correta: 1,
        explicacao: "Para calcular o comprimento da circunferência, multiplicamos 2 por pi e pelo raio. Utilizando pi igual a 3,14 e raio de 7 metros, obtemos aproximadamente 43,96 metros."
    },
    {
        pergunta: "O piso de uma sala retangular mede 6 metros de comprimento e 4 metros de largura. O proprietário deseja instalar um revestimento cujo custo é de R$ 35,00 por metro quadrado.Desconsiderando perdas de material, qual será o custo total do revestimento?",
        alternativas: ["A) R$ 840,00", "B) R$ 1.050,00", "C) R$ 1.260,00", "D) R$ 1.680,00"],
        correta: 0,
        explicacao: "A área da sala é de 6m × 4m = 24 m². O custo total é de 24 m² × R$ 35,00/m² = R$ 840,00."
    },
    {
        pergunta: "Durante uma aula de geometria, um estudante desenhou um triângulo cujos ângulos internos medem \(2x\), \(3x\) e \(4x\).Sabendo que a soma dos ângulos internos de qualquer triângulo é 180°, qual é a medida do maior ângulo?",
        alternativas: ["A) 60°", "B) 80°", "C) 100°", "D) 120°"],
        correta: 2,
        explicacao: "A soma dos ângulos internos de um triângulo é 180°. Portanto, \(2x + 3x + 4x = 180°\). Isso resulta em \(9x = 180°\), ou seja, \(x = 20°\). O maior ângulo é \(4x = 4 X 20° = 80°\)."
    },
    {
        pergunta: "Um terreno tem formato de trapézio, com base maior de 20 metros, base menor de 12 metros e altura de 8 metros. O proprietário deseja calcular a área para planejar o plantio.Qual é a área desse terreno?",
        alternativas: ["A) 128 m²", "B) 160 m²", "C) 192 m²", "D) 224 m²"],
        correta: 0,
        explicacao: "Para calcular a área do trapézio, somamos as duas bases, 20 e 12, multiplicamos o resultado pela altura de 8 metros e dividimos por 2. O resultado é 128 m²."
    },
    {
        pergunta: "Uma maquete de um parque possui um jardim retangular de 4 cm de comprimento e 3 cm de largura. Na construção real, o jardim terá 20 metros de comprimento.Mantendo a proporção da maquete, qual será a largura real do jardim?",
        alternativas: ["A) 15 m", "B) 20 m", "C) 25 m", "D) 30 m"],
        correta: 0,
        explicacao: "A proporção entre a maquete e a construção real é de 4 cm para 20 metros, ou seja, 1 para 5. Portanto, a largura real será 3 cm × 5 = 15 metros."
    },
    {
        pergunta: "Uma peça decorativa tem formato de losango. Suas diagonais maior e menor medem, respectivamente, 16 cm e 10 cm. Para produzir a peça, é necessário conhecer sua área.Qual é a área dessa figura?",
        alternativas: ["A) 80 cm²", "B) 120 cm²", "C) 160 cm²", "D) 200 cm²"],
        correta: 0,
        explicacao: "A área do losango é calculada multiplicando as diagonais e dividindo o resultado por 2. Assim, 16 vezes 10, dividido por 2, resulta em 80 cm²."
    },
    {
        pergunta: "Uma praça é formada por um quadrado de lado 10 metros e um retângulo de 10 metros de comprimento por 4 metros de largura, construído ao lado do quadrado, sem sobreposição entre as áreas.Qual é a área total da praça?",
        alternativas: ["A) 140 m²", "B) 160 m²", "C) 180 m²", "D) 200 m²"],
        correta: 0,
        explicacao: "A área do quadrado é 10 vezes 10, resultando em 100 m². A área do retângulo é 10 vezes 4, resultando em 40 m². Somando as duas áreas, obtemos 140 m²."
    }
];

let perguntaAtual = 0;
let pontos = 0;

function mostrarPergunta() {
    let pergunta = perguntas[perguntaAtual];
    
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    
    let alternativasContainer = document.getElementById("alternativas");
    alternativasContainer.innerHTML = ""; // Limpa anterior

    pergunta.alternativas.forEach((alternativa, indice) => {
        let botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasContainer.appendChild(botao);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(indice) {
    let pergunta = perguntas[perguntaAtual];
    let botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach(btn => btn.disabled = true);

    if (indice === pergunta.correta) {
        botoes[indice].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta correta! ${pergunta.explicacao}`;
        pontos++;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta. ${pergunta.explicacao}`;
    }

    document.getElementById("proxima").style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let msg = pontos === perguntas.length ? "Excelente! Você acertou todas!" : 
              pontos >= 7 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";

    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id='refazer' onclick='refazerQuiz()'>Refazer Quiz</button>
    `;
}

function refazerQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p>
        <h3 id="pergunta"></h3>
        <div id="alternativas"></div>
        <p id="feedback"></p>
        <button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>
    `;
    mostrarPergunta();
}

// Inicialização automática do Quiz
if (document.getElementById("quiz-container")) {
    mostrarPergunta();
}
