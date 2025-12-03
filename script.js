let points = 0, level = 1, medals = 0, missionsCompleted = 0;

const instructions = [
    'Lee atentamente la misión y prepara tu respuesta.',
    'Lee atentamente la infografia y el resumen del tema y luego conteste las preguntas.',
    'Lee atentamente el mapa conceptual y el resumen del tema y luego conteste las preguntas.'
];

const classes = [
    '<p>Clase 1: Partes externas.</p><img src="assets/avatar1.png"><video width="900" height="315" controls><source src="assets/El computador y sus partes para niños.mp4" type="video/mp4">Tu navegador no soporta video HTML5.</video>',
    '<p>Clase 2: Microsoft Word.</p><img src="assets/avatar2.png"><img src="assets/clase%202%20infografica.png" alt="Infografía Clase 2" />',
    '<p>Clase 3: El teclado y sus partes</p><img src="assets/avatar1.png"><img src="assets/Mind%20Map.png" alt="Mapa Conceptual Teclado" />'
];



const summaries = [
    'Resumen: objetivo es presentar la definición y los componentes fundamentales de una computadora. Se describe el computador como una herramienta esencial para el trabajo y el entretenimiento que permite guardar, recibir y compartir datos como videos, música y mensajes. El material identifica cuatro partes principales indispensables para el funcionamiento de la máquina: el Monitor, el Teclado, el Mouse y la CPU o torre, señalando a esta última como vital para el almacenamiento de la información. La explicación detalla la función de cada elemento, especificando que el teclado sirve para escribir y buscar, y que el mouse se utiliza para navegar por la pantalla. Adicionalmente, se nombran otros periféricos complementarios como la cámara, el micrófono y la impresora, indicando cómo cada uno añade utilidad a la experiencia informática.',
    'Resumen: introduce a los estudiantes al programa Microsoft Word, el cual se define como el procesador de textos más utilizado para la creación de informes, tareas e investigaciones. El programa ofrece numerosas herramientas que permiten a los usuarios modificar páginas y texto, además de integrar elementos complejos como dibujos, tablas y gráficas. La lección guía a los usuarios a través del proceso de acceso al programa, explicando la necesidad de usar el botón de inicio para localizar el ícono dentro de la carpeta de Microsoft Office. Una vez abierto, el video identifica los principales componentes de la interfaz de usuario, señalando elementos como la barra de título y las diferentes pestañas que componen la cinta de opciones. Para finalizar, se anima a los espectadores a practicar con pequeños escritos, simplemente tecleando sobre el área de trabajo para comenzar a familiarizarse con la edición básica de documentos.',
    'Resumen: Partes del teclado que menciona: Teclas de función: Estas son las teclas especiales en la parte de arriba (F1, F2, etc.). Sirven para hacer comandos especiales en programas. Teclas alfanuméricas: Son las letras, números, signos de puntuación esas sirven para escribir palabras, números, oraciones. Teclado numérico (numpad): Como un mini-calculadora incorporada; tiene números y símbolos para calcular cosas rápida. Teclas de control / especiales: Son teclas como "Control", "Escape", "Shift", "Enter", flechas ayudan a dar órdenes distintas a la computadora o mover el cursor. ¿Para qué sirve saber esto? Te ayuda a usar bien el teclado cuando haces tareas, escribes trabajos, buscas cosas. Te permite reconocer cada parte del teclado así sabes dónde están las letras, números, los comandos especiales. Facilita aprender a usar la computadora correctamente, lo que puede ayudarte en la escuela y en tareas.'
];

const questions = [
    [
        { q: '¿Cuál de estas es una parte externa?', options: ['Monitor', 'CPU', 'RAM', 'SO'], correctIndex: 0 },
        { q: '¿Qué dispositivo se usa para escribir texto?', options: ['Mouse', 'Teclado', 'Monitor', 'CPU'], correctIndex: 1 }
    ],
    [
        { q: '¿Para qué sirve Microsoft Word?', options: ['Dibujar imágenes', 'Procesar textos y escribir documentos', 'Navegar en internet', 'Reproducir música'], correctIndex: 1 },
        { q: '¿Qué haces primero para escribir en Word?', options: ['Abrir un documento nuevo', 'Instalar una impresora', 'Apagar el ordenador', 'Cambiar el fondo de pantalla'], correctIndex: 0 },
        { q: '¿Cuál de estas cosas puedes insertar en un documento de Word?', options: ['Una tabla', 'Un sistema operativo', 'Un antivirus', 'Un monitor'], correctIndex: 0 }
    ],
    [
        { q: '¿Dónde se encuentran las teclas de función (F1, F2, etc.)?', options: ['En la parte de arriba del teclado', 'En el lado derecho', 'En el centro', 'En la parte de abajo'], correctIndex: 0 },
        { q: '¿Para qué sirven las teclas alfanuméricas?', options: ['Para hacer cálculos rápidos', 'Para escribir palabras, números y signos de puntuación', 'Para navegar en internet', 'Para reproducir música'], correctIndex: 1 },
        { q: '¿Cuál es otra forma de llamar al teclado numérico?', options: ['Numpad', 'Mini-calculadora', 'Ambas son correctas', 'Ninguna de las anteriores'], correctIndex: 2 },
        { q: '¿Cuál de estas es una tecla de control especial?', options: ['A', 'B', 'Enter', 'Espacio'], correctIndex: 2 }
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