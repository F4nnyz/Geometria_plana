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
        pergunta: "Em que ano começou a Segunda Guerra Mundial?",
        alternativas: ["1918", "1929", "1939", "1945"],
        correta: 2,
        explicacao: "A Segunda Guerra Mundial começou em 1939, com a invasão da Polônia pela Alemanha."
    },
    {
        pergunta: "Quais países formavam as principais potências do Eixo?",
        alternativas: ["Alemanha, Itália e Japão", "França, Alemanha e Estados Unidos", "Reino Unido, Japão e União Soviética", "Estados Unidos, França e Itália"],
        correta: 0,
        explicacao: "As principais potências do Eixo foram Alemanha, Itália e Japão."
    },
    {
        pergunta: "Qual acontecimento levou os Estados Unidos a entrarem na guerra?",
        alternativas: ["A invasão da Polônia", "O ataque a Pearl Harbor", "O Dia D", "A Batalha de Stalingrado"],
        correta: 1,
        explicacao: "Os Estados Unidos entraram oficialmente na guerra após o ataque japonês a Pearl Harbor, em dezembro de 1941."
    },
    {
        pergunta: "Qual força militar brasileira foi enviada para combater na Europa?",
        alternativas: ["FEB", "ONU", "OTAN", "Mercosul"],
        correta: 0,
        explicacao: "A Força Expedicionária Brasileira (FEB) enviou aproximadamente 25 mil militares para combater na Itália."
    },
    {
        pergunta: "Em qual país europeu a FEB combateu durante a Segunda Guerra Mundial?",
        alternativas: ["França", "Polônia", "Itália", "Alemanha"],
        correta: 2,
        explicacao: "A Força Expedicionária Brasileira participou da campanha militar dos Aliados na Itália."
    },
    {
        pergunta: "Qual foi uma consequência política do Tratado de Versalhes para a Alemanha?",
        alternativas: ["Fortaleceu imediatamente a democracia alemã", "Provocou ressentimento que foi explorado pelo nazismo", "Transformou a Alemanha em aliada da França", "Eliminou os problemas econômicos alemães"],
        correta: 1,
        explicacao: "As punições e limitations impostas à Alemanha contribuíram para um sentimento de insatisfação que mais tarde foi explorado politicamente por Hitler."
    },
    {
        pergunta: "O que foi a Blitzkrieg utilizada pela Alemanha no início da guerra?",
        alternativas: ["Uma estratégia baseada em ataques rápidos e coordenados", "Uma política de negociação diplomática", "Um sistema de defesa das cidades alemãs", "Uma aliança militar entre Alemanha e Japão"],
        correta: 0,
        explicacao: "Blitzkrieg significa guerra-relâmpago e envolvia ataques rápidos e coordenados com tropas terrestres, tanques e aviação."
    },
    {
        pergunta: "Por que a Batalha de Stalingrado é considerada um momento importante da guerra?",
        alternativas: ["Porque marcou a entrada do Japão na guerra", "Porque provocou a rendição dos Estados Unidos", "Porque representou uma importante derrota alemã e favoreceu o avanço soviético", "Porque marcou o início da invasão da Polônia"],
        correta: 2,
        explicacao: "A derrota alemã em Stalingrado, em 1943, foi um importante ponto de virada na frente oriental e abriu caminho para o avanço soviético."
    },
    {
        pergunta: "Qual acontecimento contribuiu diretamente para a entrada do Brasil na guerra em 1942?",
        alternativas: ["A invasão alemã da França", "Os ataques de submarinos do Eixo a navios brasileiros", "A Batalha de Stalingrado", "A invasão japonesa da China"],
        correta: 1,
        explicacao: "Ataques de submarinos do Eixo a navios brasileiros provocaram mortes e forte reação popular, contribuindo para a declaração brasileira de guerra à Alemanha e à Itália."
    },
    {
        pergunta: "Qual contradição política marcou a participação brasileira na Segunda Guerra Mundial?",
        alternativas: ["O Brasil lutava ao lado do Japão enquanto mantinha relações com os Estados Unidos", "O Brasil defendia o nazismo enquanto combatia a Itália", "O Brasil combatia regimes autoritários no exterior enquanto vivia a ditadura do Estado Novo", "O Brasil era uma democracia e apoiava politicamente a Alemanha nazista"],
        correta: 2,
        explicacao: "O Brasil combatia regimes fascistas na Europa Xcode internamente vivia o Estado Novo, regime autoritário comandado por Getúlio Vargas."
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
