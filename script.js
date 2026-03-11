const translations = {
  pt: 'Escolha sua língua materna e siga uma jornada personalizada de pronúncia, gírias regionais, verbos e conversação com feedback inteligente.',
  en: 'Choose your native language and follow a personalized journey with pronunciation, regional slang, verbs, and conversation training with smart feedback.',
  es: 'Elige tu lengua materna y sigue una ruta personalizada con pronunciación, jerga regional, verbos y conversación con retroalimentación inteligente.',
  fr: 'Choisissez votre langue maternelle et suivez un parcours personnalisé avec prononciation, argot régional, verbes et conversation avec retour intelligent.',
  de: 'Wähle deine Muttersprache und folge einem personalisierten Lernpfad mit Aussprache, regionalem Slang, Verben und Konversationstraining mit intelligentem Feedback.',
  jp: '母語を選択し、発音・地域スラング・動詞活用・会話練習を含むパーソナライズ学習を進めましょう。'
};

const practicePrompts = {
  Restaurante: 'Você é cliente. Peça um prato típico brasileiro e pergunte sobre ingredientes.',
  Aeroporto: 'Você acabou de chegar ao Brasil. Pergunte como chegar ao hotel.',
  Hotel: 'Você quer fazer check-in e pedir uma troca de quarto.',
  Praia: 'Converse com um local e peça recomendações de lugares para visitar.',
  'Reunião de trabalho': 'Apresente-se formalmente e explique seu objetivo profissional no Brasil.'
};

const nativeLanguage = document.getElementById('native-language');
const welcomeText = document.getElementById('welcome-text');
const themeToggle = document.getElementById('theme-toggle');
const startAi = document.getElementById('start-ai');
const aiFeedback = document.getElementById('ai-feedback');
const scenario = document.getElementById('scenario');
const analyzeButton = document.getElementById('analyze');
const recommendation = document.getElementById('recommendation');

nativeLanguage.addEventListener('change', (event) => {
  welcomeText.textContent = translations[event.target.value] || translations.pt;
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Light mode' : '🌙 Dark mode';
});

startAi.addEventListener('click', () => {
  const currentScenario = scenario.value;
  aiFeedback.textContent = `Desafio de ${currentScenario}: ${practicePrompts[currentScenario]}`;
});

analyzeButton.addEventListener('click', () => {
  const scores = [
    { id: 'slang-score', name: 'Gírias regionais', tip: 'assista vídeos curtos por região e repita frases.' },
    { id: 'verb-score', name: 'Verbos e conjugação', tip: 'faça 10 minutos de conjugação diária com flashcards.' },
    { id: 'conversation-score', name: 'Conversação', tip: 'simule diálogos de viagem 3x por semana.' },
    { id: 'pronunciation-score', name: 'Pronúncia', tip: 'grave sua voz para comparar com nativos.' }
  ];

  const weakest = scores
    .map((area) => ({ ...area, value: Number(document.getElementById(area.id).value) }))
    .sort((a, b) => a.value - b.value)[0];

  recommendation.textContent = `Área com maior dificuldade: ${weakest.name} (${weakest.value}/100). Recomendação: ${weakest.tip}`;
});
