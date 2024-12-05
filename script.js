let voices = [];
let reminderPopup = null;

// Cargar las voces disponibles y seleccionar una en español
function loadVoices() {
    voices = speechSynthesis.getVoices();
}

// Emitir mensaje en voz alta
function speakReminder() {
    const message = "Envía tu asistencia a administración y enciende el Hamachi por favor";
    const utterance = new SpeechSynthesisUtterance(message);

    // Seleccionar una voz en español
    if (!voices.length) voices = speechSynthesis.getVoices();
    const voice = voices.find(voice => voice.lang.startsWith("es"));
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
}

// Mostrar ventana emergente de recordatorio
function showFullScreenPopup() {
    if (reminderPopup && !reminderPopup.closed) {
        reminderPopup.focus();
    } else {
        reminderPopup = window.open("", "Popup", "fullscreen=yes");
        reminderPopup.document.write(`
            <html>
            <head>
                <title>Recordatorio</title>
                <style>
                    body {
                        background-color: red;
                        color: white;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        font-family: Arial, sans-serif;
                        margin: 0;
                        text-align: center;
                    }
                    img {
                        max-width: 150px;
                        margin-bottom: 20px;
                    }
                    h2 {
                        font-size: 2rem;
                    }
                </style>
            </head>
            <body>
                <div>
                    <img src="logo.png" alt="Logotipo de la empresa">
                    <h2>Envía tu asistencia a administración y enciende el Hamachi por favor</h2>
                </div>
            </body>
            </html>
        `);
    }
    // Emitir el mensaje en voz alta cada vez que aparezca la ventana
    speakReminder();
}

// Establecer recordatorio con intervalos
function setReminder() {
    speechSynthesis.onvoiceschanged = loadVoices;
    setInterval(showFullScreenPopup, 5000); // Activar cada 5 segundos
}

window.onload = () => {
    loadVoices();
    setReminder();
};
