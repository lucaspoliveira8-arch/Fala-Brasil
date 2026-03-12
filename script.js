const languageGuidance = {
  pt: {
    welcome: 'Você aprenderá português com explicações em português (modo imersão).',
    slang: 'Dica: compare gírias com expressões informais que você já usa no dia a dia.',
    verbs: 'Dica: observe o sujeito antes de conjugar o verbo.',
    conversation: 'Dica: use “por favor” e “com licença” para soar natural e educado.',
    pronunciation: 'Dica: pratique sons nasais com gravações curtas e repetição.'
  },
  en: {
    welcome: 'Portuguese lessons will be explained in English to make learning easier.',
    slang: 'Tip: map Brazilian slang to casual expressions you already use in English.',
    verbs: 'Tip: identify the subject first, then choose the right verb ending.',
    conversation: 'Tip: start with polite chunks like “por favor” and “com licença”.',
    pronunciation: 'Tip: train nasal sounds slowly and compare with native audio.'
  },
  es: {
    welcome: 'Las lecciones de portugués se explicarán en español para facilitar el aprendizaje.',
    slang: 'Consejo: relaciona las jergas brasileñas con expresiones informales en español.',
    verbs: 'Consejo: primero identifica el sujeto y luego conjuga.',
    conversation: 'Consejo: usa frases de cortesía para sonar natural.',
    pronunciation: 'Consejo: practica sonidos nasales con repeticiones cortas.'
  },
  fr: {
    welcome: 'Les leçons de portugais seront expliquées en français pour faciliter votre progression.',
    slang: 'Astuce : associez les expressions brésiliennes à votre langage courant.',
    verbs: 'Astuce : identifiez le sujet avant la conjugaison.',
    conversation: 'Astuce : utilisez des formules polies pour mieux communiquer.',
    pronunciation: 'Astuce : entraînez les sons nasaux avec répétition.'
  },
  de: {
    welcome: 'Die Portugiesisch-Lektionen werden auf Deutsch erklärt, um das Lernen zu erleichtern.',
    slang: 'Tipp: Verbinde brasilianische Slangs mit lockeren Ausdrücken auf Deutsch.',
    verbs: 'Tipp: Bestimme zuerst das Subjekt und dann die Verbform.',
    conversation: 'Tipp: Nutze höfliche Redemittel für natürlichere Gespräche.',
    pronunciation: 'Tipp: Übe Nasallaute mit kurzen Wiederholungen.'
  },
  jp: {
    welcome: 'ポルトガル語の学習説明は日本語で表示されます。',
    slang: 'ヒント：ブラジルのスラングを日本語のくだけた表現と比較しましょう。',
    verbs: 'ヒント：まず主語を確認してから活用を選びましょう。',
    conversation: 'ヒント：丁寧表現を使うと自然に聞こえます。',
    pronunciation: 'ヒント：鼻母音をゆっくり反復練習しましょう。'
  }
};

const practicePrompts = {
  Restaurante: 'Desafio: peça um prato típico, pergunte ingredientes e solicite a conta.',
  Aeroporto: 'Desafio: pergunte onde fica o transporte para o centro da cidade.',
  Hotel: 'Desafio: faça check-in e peça um quarto silencioso.'
};

const answerKeys = {
  slang: { exercise: 'trem', quiz: 'nordeste' },
  verbs: { exercise: 'vamos', quiz: 'nós vamos' },
  conversation: { quiz: 'onde fica' },
  pronunciation: { exercise: 'pao', quiz: 'filho' }
};

const chapterLabels = {
  slang: 'Gírias',
  verbs: 'Verbos',
  conversation: 'Conversação',
  pronunciation: 'Pronúncia'
};

const storageKeys = {
  theme: 'falaBrasil.theme',
  lang: 'falaBrasil.lang',
  tests: 'falaBrasil.chapterTests'
};

const nativeLanguage = document.getElementById('native-language');
const welcomeText = document.getElementById('welcome-text');
const themeToggle = document.getElementById('theme-toggle');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const diagnosisText = document.getElementById('diagnosis-text');
const chapterResults = document.getElementById('chapter-results');

let testResults = JSON.parse(localStorage.getItem(storageKeys.tests) || '{}');

function saveTests() {
  localStorage.setItem(storageKeys.tests, JSON.stringify(testResults));
}

function setLanguageSupport(lang) {
  const data = languageGuidance[lang] || languageGuidance.pt;
  welcomeText.textContent = data.welcome;
  document.querySelector('[data-help-key="slang"]').textContent = data.slang;
  document.querySelector('[data-help-key="verbs"]').textContent = data.verbs;
  document.querySelector('[data-help-key="conversation"]').textContent = data.conversation;
  document.querySelector('[data-help-key="pronunciation"]').textContent = data.pronunciation;
}

function renderChapterResults() {
  const chapters = ['slang', 'verbs', 'conversation', 'pronunciation'];
  chapterResults.innerHTML = chapters.map((chapter) => {
    const score = testResults[chapter];
    if (typeof score !== 'number') return `<div class="result-item">${chapterLabels[chapter]}: teste pendente</div>`;
    const status = score === 1 ? '✅ bom' : '⚠️ reforçar';
    return `<div class="result-item">${chapterLabels[chapter]}: ${score}/1 ${status}</div>`;
  }).join('');
}

function registerWeakPoint(chapter) {
  const lows = Object.entries(testResults)
    .filter(([, value]) => value === 0)
    .map(([key]) => chapterLabels[key]);

  if (!lows.length) {
    diagnosisText.textContent = 'Excelente! Você não tem pontos fracos críticos nos testes atuais.';
    return;
  }

  diagnosisText.textContent = `Seus pontos fracos atuais: ${lows.join(', ')}. Recomendação: refaça os exercícios desses capítulos.`;
}

function openTab(tabName) {
  tabButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === tabName));
  tabPanels.forEach((panel) => panel.classList.toggle('active', panel.id === `tab-${tabName}`));
}

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => openTab(btn.dataset.tab));
});

if (themeToggle) {
  const savedTheme = localStorage.getItem(storageKeys.theme);
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️ Light mode';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const dark = document.body.classList.contains('dark');
    themeToggle.textContent = dark ? '☀️ Light mode' : '🌙 Dark mode';
    localStorage.setItem(storageKeys.theme, dark ? 'dark' : 'light');
  });
}

if (nativeLanguage) {
  const savedLang = localStorage.getItem(storageKeys.lang) || 'pt';
  nativeLanguage.value = savedLang;
  setLanguageSupport(savedLang);

  nativeLanguage.addEventListener('change', (event) => {
    const lang = event.target.value;
    localStorage.setItem(storageKeys.lang, lang);
    setLanguageSupport(lang);
  });
}

const slangButtons = document.querySelectorAll('[data-exercise="slang"] button');
slangButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const hit = btn.dataset.value === answerKeys.slang.exercise;
    document.getElementById('feedback-slang').textContent = hit ? 'Correto! “Trem” é comum em Goiás.' : 'Ainda não. Tente novamente.';
  });
});

const pronButtons = document.querySelectorAll('[data-exercise="pronunciation"] button');
pronButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const hit = btn.dataset.value === answerKeys.pronunciation.exercise;
    document.getElementById('feedback-pronunciation').textContent = hit ? 'Correto! “Pão” tem nasalização forte.' : 'Resposta incorreta. Revise os sons nasais.';
  });
});

document.getElementById('check-verb').addEventListener('click', () => {
  const value = (document.getElementById('verb-input').value || '').trim().toLowerCase();
  const ok = value === answerKeys.verbs.exercise;
  document.getElementById('feedback-verbs').textContent = ok ? 'Perfeito! “Nós vamos”.' : 'Quase! A forma correta é “vamos”.';
});

document.getElementById('start-ai').addEventListener('click', () => {
  const current = document.getElementById('scenario').value;
  document.getElementById('ai-feedback').textContent = practicePrompts[current];
});

document.querySelectorAll('[data-submit]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const chapter = btn.dataset.submit;
    const selected = document.getElementById(`quiz-${chapter}`).value;
    const correct = answerKeys[chapter].quiz;
    const result = selected === correct ? 1 : 0;
    testResults[chapter] = result;
    saveTests();
    renderChapterResults();
    registerWeakPoint(chapter);
  });
});

document.getElementById('show-diagnosis').addEventListener('click', () => {
  renderChapterResults();
  registerWeakPoint();
  openTab('fluency');
});

renderChapterResults();
