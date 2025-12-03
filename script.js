let points = 0, level = 1, medals = 0, missionsCompleted = 0;

const instructions = [
    'Lee atentamente la misión y prepara tu respuesta.',
    'Comprende cómo el CPU procesa datos.',
    'Aprende la función de la memoria RAM.'
];

const classes = [
    '<p>Clase 1: Partes externas.</p><img src="assets/avatar1.png"><iframe src="https://www.youtube.com/embed/egTWbikmo4A" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    '<p>Clase 2: CPU.</p><img src="assets/avatar2.png"><iframe src="https://www.youtube.com/embed/8lXdyD2Yzls"></iframe>',
    '<p>Clase 3: RAM.</p><img src="assets/avatar1.png"><iframe src="https://www.youtube.com/embed/3EJvD1vQ1fY"></iframe>'
];

const summaries = [
    'Resumen: Periféricos permiten interacción.',
    'Resumen: CPU es el cerebro del computador.',
    'Resumen: RAM almacena datos temporales.'
];

const questions = [
    [
        { q: '¿Cuál de estas es una parte externa?', options: ['Monitor', 'CPU', 'RAM', 'SO'], correctIndex: 0 },
        { q: '¿Qué dispositivo se usa para escribir texto?', options: ['Mouse', 'Teclado', 'Monitor', 'CPU'], correctIndex: 1 }
    ],
    [
        { q: '¿Cuál es la función principal del CPU?', options: ['Procesar datos', 'Almacenar archivos', 'Imprimir', 'Internet'], correctIndex: 0 },
        { q: '¿Qué parte del CPU realiza cálculos?', options: ['Unidad aritmético-lógica', 'Unidad de control', 'Memoria caché', 'Disco duro'], correctIndex: 0 }
    ],
    [
        { q: 'La memoria RAM se usa para…', options: ['Guardar datos', 'Procesar gráficos', 'Almacenar datos temporales', 'Controlar audio'], correctIndex: 2 },
        { q: '¿Qué pasa con los datos en RAM al apagar?', options: ['Se pierden', 'Se guardan', 'Se imprimen', 'Se duplican'], correctIndex: 0 }
    ]
];

let currentMission = 0, currentQuestionIndex = 0;

function showInstruction(i) {
    document.getElementById('missions').style.display = 'none';
    document.getElementById('instruction-section').style.display = 'block';
    document.getElementById('instruction-text').innerText = instructions[i];
}

function showClass(i) {
    document.getElementById('missions').style.display = 'none';
    document.getElementById('class-section').style.display = 'block';
    document.getElementById('class-content').innerHTML = classes[i];
    document.getElementById('class-summary').innerText = summaries[i];
}

function showQuiz(i) {
    currentMission = i;
    currentQuestionIndex = 0;
    document.getElementById('missions').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentMission][currentQuestionIndex];
    document.getElementById('question').innerText = q.q;
    const container = document.getElementById('options');
    container.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.innerText = opt;
        div.onclick = () => answerQuiz(idx === q.correctIndex);
        container.appendChild(div);
    });
}

function answerQuiz(correct) {
    if (correct) {
        points += 20;
        missionsCompleted++;
        updateScoreboard();
        playSound('correct');
        launchConfetti();
        showModal('¡Correcto!', 'Ganaste 20 puntos', '🎉');
    } else {
        playSound('wrong');
        showModal('¡Ups!', 'Intenta otra opción', '🤔');
    }
}

function updateScoreboard() {
    document.getElementById('points').innerText = points;
    if (points > 0 && points % 50 === 0) {
        level++;
    }
    document.getElementById('level').innerText = level;
    if (missionsCompleted > 0 && missionsCompleted % 3 === 0) {
        medals++;
    }
    document.getElementById('medals').innerText = medals;
}

function showModal(title, detail, emoji) {
    document.getElementById('modal-message').innerText = title;
    document.getElementById('modal-detail').innerText = detail;
    document.getElementById('modal-emoji').innerText = emoji;
    document.getElementById('custom-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('custom-modal').style.display = 'none';
    document.getElementById('confetti').innerHTML = '';
    if (currentQuestionIndex < questions[currentMission].length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        backToMissions();
    }
}

function backToMissions() {
    document.getElementById('instruction-section').style.display = 'none';
    document.getElementById('class-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('missions').style.display = 'block';
}

function playSound(type) {
    const audio = document.getElementById(type === 'correct' ? 'sound-correct' : 'sound-wrong');
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

function launchConfetti() {
    const confetti = document.getElementById('confetti');
    if (!confetti) return;
    confetti.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.width = '10px';
        div.style.height = '10px';
        div.style.backgroundColor = `hsl(${Math.random() * 360},100%,50%)`;
        div.style.top = '0';
        div.style.left = Math.random() * 100 + '%';
        div.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
        confetti.appendChild(div);
    }
}