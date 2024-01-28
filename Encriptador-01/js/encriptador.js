// Define un conjunto de caracteres que se utilizarán para el cifrado y descifrado
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,?!'_-&@#$%*()/:<>|+= ";

// Función de cifrado
function encryptText(text, key) {
    let encryptedText = "";

    // Recorre cada carácter del texto
    for (let i = 0; i < text.length; i++) {
        const textChar = text[i];
        const keyChar = key[i % key.length]; // Se repite la clave según sea necesario

        // Encuentra los índices de los caracteres en la cadena 'characters'
        const textIndex = characters.indexOf(textChar);
        const keyIndex = characters.indexOf(keyChar);

        // Si el carácter no está en 'characters', lo añade directamente al resultado
        if (textIndex === -1) {
            encryptedText += textChar;
        } else {
            // Calcula el nuevo índice y añade el carácter correspondiente de 'characters'
            const newIndex = (textIndex + keyIndex) % characters.length;
            encryptedText += characters[newIndex];
        }
    }

    return encryptedText;
}

// Función de descifrado
function decryptText(encryptedText, key) {
    let decryptedText = "";

    // Recorre cada carácter del texto cifrado
    for (let i = 0; i < encryptedText.length; i++) {
        const encryptedChar = encryptedText[i];
        const keyChar = key[i % key.length]; // Se repite la clave según sea necesario

        // Encuentra los índices de los caracteres en la cadena 'characters'
        const encryptedIndex = characters.indexOf(encryptedChar);
        const keyIndex = characters.indexOf(keyChar);

        // Si el índice es -1, lo añade directamente al resultado
        if (encryptedIndex === -1) {
            decryptedText += encryptedChar;
        } else {
            // Calcula el nuevo índice ajustando por la longitud de 'characters'
            let newIndex = encryptedIndex - keyIndex;
            if (newIndex < 0) newIndex += characters.length;
            decryptedText += characters[newIndex];
        }
    }

    return decryptedText;
}

// Función para actualizar el resultado de la operación (cifrado o descifrado)
function updateResult(isEncrypting) {
    const text = document.getElementById("message").value;
    const key = document.getElementById("key").value;

    let result = "";

    // Determina si se cifra o descifra el texto
    if (isEncrypting) {
        result = encryptText(text, key);
    } else {
        result = decryptText(text, key);
    }

    // Muestra el resultado en el elemento 'result'
    document.getElementById("result").textContent = result;
}

// Agrega oyentes de eventos a los botones
document.getElementById("enc-btn").addEventListener('click', function () {
    updateResult(true); // Cifra el texto al hacer clic
});

document.getElementById("dec-btn").addEventListener('click', function () {
    updateResult(false); // Descifra el texto al hacer clic
});

// Actualiza el resultado cuando se carga o recarga la página
document.addEventListener('DOMContentLoaded', () => {
    updateResult(true);
});