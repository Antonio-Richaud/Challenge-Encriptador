"use strict";

// ----------------------------------------------------------------------------------------------------------------------

// Seleccionamos los elementos del DOM

// Selecciona el elemento 'textarea' del DOM para futuras operaciones
const textarea = document.querySelector("textarea");

// Selecciona el botón de encriptar por su ID para agregarle eventos más adelante
const encryptBtn = document.querySelector("#encrypt-btn");

// Selecciona el botón de desencriptar por su ID para agregarle eventos más adelante
const decryptBtn = document.querySelector("#decrypt-btn");

// Selecciona el elemento 'aside' del DOM, que puede ser usado para mostrar información adicional
const aside = document.querySelector("aside");

// Selecciona un contenedor dentro del 'aside' por su clase, posiblemente para agregar elementos dinámicamente
const asideContainer = document.querySelector(".aside__container");

// Selecciona una imagen dentro del 'aside' por su ID, que puede ser usada para propósitos visuales o de interacción
const asideImg = document.querySelector("#aside__img");

// Selecciona un elemento de texto dentro del 'aside' por su clase, para modificar o mostrar texto
const asideText = document.querySelector(".aside__text");

// Selecciona el botón de copiar por su ID para agregarle eventos de interacción
const copyBtn = document.querySelector("#copy-btn");

// ----------------------------------------------------------------------------------------------------------------------

// Inicializa un arreglo para almacenar párrafos y variables para copiar al portapapeles

// Crea un arreglo vacío para almacenar párrafos
const paragraphs = [];

// Accede al API del portapapeles del navegador para futuras operaciones de copia
const clipboard = navigator.clipboard;

// Inicializa una variable para asignar identificadores únicos a los elementos del DOM
let uniqueId = 0;

// Inicializa una variable para almacenar el texto seleccionado y otra para los elementos de lista
let selectedText, listItems = "";

// ----------------------------------------------------------------------------------------------------------------------

// Función para remover etiquetas HTML de la visualización

// Define una función que oculta los elementos HTML pasados como argumentos
const removeHtmlTag = (...args) => {

  // Itera sobre cada elemento en los argumentos y cambia su estilo para que no se muestre
  args.forEach((element) => (element.style.display = "none"));

};

// ----------------------------------------------------------------------------------------------------------------------


// Muestra el párrafo en el área lateral

// Nota: La función que debería mostrar el párrafo en el área lateral parece estar incompleta o no incluida en el fragmento proporcionado.

const displayParagraph = () => {

  const paragraph = paragraphs.slice(-1);

  const paragraphElement = document.createElement("p");
  paragraphElement.setAttribute("id", `item-${uniqueId}`);
  paragraphElement.classList.add("aside__paragraph--new");
  paragraphElement.textContent = paragraph;

  asideContainer.appendChild(paragraphElement);

  listItems = document.querySelectorAll(".aside__container p");

  // Evento para seleccionar texto de la lista

  listItems.forEach((item) => {

    item.addEventListener("click", () => {

      listItems.forEach((otherItem) => {

        otherItem.classList.remove("selected");

      });

      item.classList.add("selected");

      selectedText = item.innerText;

    });

  });
  
};

// ----------------------------------------------------------------------------------------------------------------------

// Muestra el botón de copiar si hay algo

// Define la función displayCopyBtn
const displayCopyBtn = () => {

  // Verifica si el arreglo 'paragraphs' contiene al menos un elemento
  // Esto indica si hay texto encriptado disponible
  if (paragraphs.length > 0) {
    
    // Crea un elemento botón con HTML como cadena de texto
    // Asigna un ID y una clase para estilización y selección posterior
    const copyBtn = `<button id="copy-btn" class="copy__btn">Copiar</button>`;

    // Inserta el botón recién creado en el elemento 'aside'
    // 'beforeend' indica que el botón se inserta como último hijo de 'aside'
    aside.insertAdjacentHTML("beforeend", copyBtn);

  }
};

// ----------------------------------------------------------------------------------------------------------------------

// Encriptamos el texto que se ingrese
const encryptHandler = (text) => {

  // Divide el texto en caracteres individuales y los mapea a su versión encriptada
  const splittedText = text.split("").map((char) => {

    let encryptedText = "";

    // Reemplazamos cada vocal por su código correspondiente

    // Si el carácter es 'a', lo reemplaza por 'ai'
    if (char.includes("a")) {
      encryptedText = char.replace("a", "ai");
    } 
    // Si el carácter es 'e', lo reemplaza por 'enter'
    else if (char.includes("e")) {
      encryptedText = char.replace("e", "enter");
    } 
    // Si el carácter es 'i', lo reemplaza por 'imes'
    else if (char.includes("i")) {
      encryptedText = char.replace("i", "imes");
    } 
    // Si el carácter es 'o', lo reemplaza por 'ober'
    else if (char.includes("o")) {
      encryptedText = char.replace("o", "ober");
    } 
    // Si el carácter es 'u', lo reemplaza por 'ufat'
    else if (char.includes("u")) {
      encryptedText = char.replace("u", "ufat");
    } 
    // Si no es ninguna vocal, deja el carácter sin cambios
    else {
      encryptedText = char;
    }

    // Retorna el texto encriptado (carácter por carácter)
    return encryptedText;
  });

  // Une todos los caracteres encriptados y devuelve el texto completo encriptado
  return splittedText.join("");
};

// ----------------------------------------------------------------------------------------------------------------------

// Desencriptamos el texto encriptado
const decryptHandler = (text) => {

  // Reemplaza cada secuencia encriptada por la vocal correspondiente
  // para revertir el proceso de encriptación

  // Cambia 'ai' por 'a'
  text = text.split("ai").join("a");

  // Cambia 'enter' por 'e'
  text = text.split("enter").join("e");

  // Cambia 'imes' por 'i'
  text = text.split("imes").join("i");

  // Cambia 'ober' por 'o'
  text = text.split("ober").join("o");

  // Cambia 'ufat' por 'u'
  text = text.split("ufat").join("u");

  // Devuelve el texto desencriptado
  return text;
};

// ----------------------------------------------------------------------------------------------------------------------

// Ajusta los estilos del área lateral

const setAsideStyles = (style) => {

  // Establece la propiedad CSS 'justify-content' del elemento 'aside' 
  // Esta propiedad alinea los elementos hijos en el eje principal del contenedor flex (horizontalmente)
  aside.style.justifyContent = style;

  // Establece la propiedad CSS 'align-items' del elemento 'aside' 
  // Esta propiedad alinea los elementos hijos en el eje transversal del contenedor flex (verticalmente)
  aside.style.alignItems = style;

};

// ----------------------------------------------------------------------------------------------------------------------

// Evento del botón de encriptación
encryptBtn.addEventListener("click", () => {

  // Obtiene el texto ingresado por el usuario en el área de texto
  const userInput = textarea.value;

  // Verifica si el usuario ha ingresado texto; si no, muestra una alerta y detiene la ejecución
  if (!userInput) return alert("Porfavor ingrese un texto");

  // Verifica si el texto ingresado es válido (solo letras minúsculas y espacios); si no, muestra una alerta
  if (!/^[a-z\s]+$/.test(userInput)) return alert("Texto no válido");

  // Elimina las etiquetas HTML del área lateral (aside) especificadas
  removeHtmlTag(asideImg, asideText);

  // Ajusta los estilos del área lateral para empezar desde el inicio (alinea los elementos al inicio)
  setAsideStyles("flex-start");

  // Añade el texto encriptado al arreglo 'paragraphs'
  paragraphs.push(encryptHandler(userInput));

  // Incrementa el identificador único para el nuevo párrafo
  uniqueId++;

  // Muestra el nuevo párrafo en el área lateral
  displayParagraph();

  // Ajusta el estilo del área lateral para distribuir el espacio entre los elementos
  aside.style.justifyContent = "space-between";

  // Muestra el botón de copiar
  copyBtn.style.display = "block";

  // Establece el margen superior del contenedor del área lateral a 0
  asideContainer.style.marginTop = "0px";

  // Limpia el área de texto y coloca el foco en ella
  textarea.value = "";
  textarea.focus();
});

// ----------------------------------------------------------------------------------------------------------------------

// Evento del botón de desencriptar
decryptBtn.addEventListener("click", () => {

  // Verifica si hay párrafos en el arreglo 'paragraphs'; si no, muestra una alerta
  // Esto significa que no hay texto encriptado disponible para desencriptar
  if (!paragraphs.length) return alert("Aun no has ingresado ningún texto");

  // Verifica si se ha seleccionado algún texto; si no, muestra una alerta
  // Esto es necesario para saber qué texto se va a desencriptar
  if (!selectedText) return alert("Seleccione o copie un párrafo");

  // Desencripta el texto seleccionado y lo muestra en el área de texto (textarea)
  // Usa la función 'decryptHandler' para realizar la desencriptación
  textarea.value = decryptHandler(selectedText);

});

// ----------------------------------------------------------------------------------------------------------------------

// Eventos para manejar el foco del área de texto

textarea.addEventListener("focus", () => {

  textarea.removeAttribute("placeholder");

});

textarea.addEventListener("blur", () => {

  !textarea.value &&
  textarea.setAttribute("placeholder", "Ingrese el texto aquí");

});

// ----------------------------------------------------------------------------------------------------------------------

// Evento para copiar el texto al portapapeles

// Añade un oyente de eventos de clic al botón de copiar
copyBtn.addEventListener("click", () => {

  // Verifica si hay texto seleccionado; si no, muestra una alerta y detiene la función
  if (!selectedText) return alert("Seleccione un párrafo de la barra");

  // Almacena el texto seleccionado en una variable
  const copiedParagraph = selectedText;

  // Si hay un párrafo seleccionado, procede con la copia
  if (copiedParagraph) {

    // Utiliza el API del portapapeles para escribir el texto seleccionado en el portapapeles
    clipboard.writeText(copiedParagraph);

    // Lee el texto del portapapeles (como una verificación adicional)
    clipboard.readText().then((text) => {

      // Coloca el texto copiado en el área de texto (textarea)
      textarea.value = text;

      // Actualiza la variable selectedText con el texto que se acaba de copiar
      selectedText = text;

    });

  }

});