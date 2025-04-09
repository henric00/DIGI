const input = document.getElementById("entradaJogador");
const palavraAlvo = document.getElementById("palavraAlvo");
const cronometro = document.getElementById("cronometro");
const pontuacao = document.getElementById("pontuacao");
const feedback = document.getElementById("feedback");

const palavras = [
  "matrix", "neon", "pixel", "programação", "funcional", "codigo", "bit", "nave", "bug", "byte",
  "terminal", "hacker", "console", "script", "rede", "sintaxe", "debug", "sombra", "nuvem", "login",
  "sistema", "criptografia", "modem", "loop", "array", "glitch", "ascii", "algoritmo", "virtual",
  "stack", "compilar", "cyber", "kernel", "wireless", "pacote", "buffer", "shell", "prompt", "binario",
  "processo", "firewall", "router", "proxy", "conexão", "fonte", "tecla", "ethernet", "firmware",
  "input", "output", "overflow", "boot", "malware", "spam", "cookie", "backup", "drive", "invasor"
];

let estado = {
  tempo: 60,
  pontos: 0,
  palavraAtual: "",
  palavrasRestantes: [...palavras],
  intervalo: null
};

const escolherPalavra = () => {
  const i = Math.floor(Math.random() * estado.palavrasRestantes.length);
  estado.palavraAtual = estado.palavrasRestantes[i];
  palavraAlvo.textContent = estado.palavraAtual;
};

const atualizarPontuacao = () => {
  pontuacao.textContent = estado.pontos;
};

const iniciarContagem = () => {
  estado.intervalo = setInterval(() => {
    estado.tempo -= 1;
    cronometro.textContent = `${estado.tempo}s`;

    if (estado.tempo <= 0) {
      clearInterval(estado.intervalo);
      input.disabled = true;
      feedback.textContent = `⏱️ Tempo esgotado! Você fez ${estado.pontos} ponto(s).`;
    }
  }, 1000);
};

const iniciarJogo = () => {
  escolherPalavra();
  atualizarPontuacao();
  input.focus();

  input.addEventListener("input", () => {
    if (input.value.trim() === estado.palavraAtual) {
      estado.pontos++;
      input.value = "";
      escolherPalavra();
      atualizarPontuacao();
    }
  });

  // Bloquear colar texto
  input.addEventListener("paste", (e) => {
    e.preventDefault();
    feedback.textContent = "❌ Colar não é permitido!";
    setTimeout(() => feedback.textContent = "", 2000);
  });

  iniciarContagem();
};

iniciarJogo();
