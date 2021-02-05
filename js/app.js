// Te quiero mucho <3
const textAreas = document.getElementsByTagName('textarea');
const result = document.getElementById('result');
const addVarButton = document.getElementById('addVar');
const copyTextButton = document.getElementById('copyText');
const superContainer = document.getElementById('superContainer');
const pokeImg = document.getElementById('poke');
const pasteInput = document.getElementById('paste');

// Función para concatenar todos los textos de las variables
const writeResult = () => {
  let resultText = '';
  const variables = document.getElementsByClassName('varContainer');
  // Recorre cada variable
  for (let i = 0; i < variables.length; i++) {
    const variable = variables[i];
    const version = variable.getElementsByClassName('varInput');
    // Recorre cada versión
    for (let j = 0; j < version.length; j++) {
      const varInput = version[j];
      resultText += varInput.value.trim();
      //console.log(varInput.value.trim().split('\n'));
      // Para que agregue ; a todos menos el último
      j !== version.length - 1 ? resultText += ';':'';
    }
    resultText += '<br>';
  }

  result.innerHTML = resultText.trim();
}

const pasteVariables = () => {
  const text = pasteInput.value.trim().replaceAll(' ', '').replaceAll('$', '');
  const textArray = text.split('\n');
  // Borra el último valor por si se pegó la V6
  if (textArray.length === 7) textArray.pop();
  const inputs = document.getElementsByClassName('varInput');
  // Pega el texto en los inputs
  if (textArray.length <= 6) { // Variable única
    let textCounter = textArray.length-1;
    for (let i = inputs.length-1; i > inputs.length-7; i--) {
      const input = inputs[i];
      input.value = textArray[textCounter];
      textCounter--;
    }
  } else { // Múltiples variables
    let totalVariables = document.getElementsByTagName('input').length;
    let newArray = [];
    // Crea un array ordenados por los valores de las variables
    for (let i = 0; i < totalVariables; i++) {
      for (let j = i; j < textArray.length; j+=totalVariables) {
        newArray.push(textArray[j]);
      }
    }
    //console.log(newArray);
    // Pega los valores del array ordenado en los inputs
    for (let i = 0; i < newArray.length; i++) {
      const input = inputs[i];
      input.value = newArray[i];
    }
  }
  
  writeResult();
}

const createVariable = () => {
  const varContainer = document.createElement('div');
  varContainer.classList.add('varContainer');
  for (let i = 0; i < 6; i++) {
    const varElement = document.createElement('div');
    varElement.classList.add('var');
    const label = document.createElement('label');
    label.for = 'varInput';
    const vNumber = i === 0 ? 'Nombre variable: ' : 'V' + (i + 1);
    label.innerHTML = vNumber;
    let textArea;
    if (i === 0) {
      textArea = document.createElement('input');
      textArea.type = 'text';  
    } else {
      textArea = document.createElement('textarea');  
      textArea.rows = '4';
      textArea.cols = '20';
    }
    
    textArea.classList.add('varInput');
    textArea.name = vNumber;
    textArea.addEventListener('keyup', writeResult);
    varElement.appendChild(label);
    varElement.appendChild(textArea);
    varContainer.appendChild(varElement);
  }
  superContainer.appendChild(varContainer);
}

const copyToClipboard = () => {

  const text = result.innerHTML.replaceAll('<br>', '\n');
  console.log(text);
  navigator.clipboard.writeText(text.trim())
  .then(() => {
    console.log('Texto copiado');
  })
  .catch(err => {
    alert('Error in copying text: ', err);
  });
}

const pokemon = ['hoothoot', 'leafeon', 'vaporeon', 'dratini', 'blissey', 'dragonair', 'gabite', 'sylveon'];

const changePokeImg = () => {
  let chosenPoke;
  do {
    chosenPoke = getRandomPoke();
  } while(chosenPoke === pokeImg.name)
  console.log(chosenPoke);
  pokeImg.src = getGif(chosenPoke);
  pokeImg.name = chosenPoke;
}

const getRandomPoke = () => {
  return pokemon[Math.floor(Math.random() * pokemon.length)];
}

for (let i = 0; i < textAreas.length; i++) {
  const textArea = textAreas[i];
  textArea.addEventListener('keyup', writeResult);
}

addVarButton.addEventListener('pointerdown', createVariable);
copyTextButton.addEventListener('pointerdown', copyToClipboard);
pokeImg.addEventListener('pointerdown', changePokeImg);
pasteInput.addEventListener('keyup', pasteVariables);


function getGif(pokemonName) {
  const url = `https://projectpokemon.org/images/normal-sprite/${pokemonName}.gif`;
  return url;
}






