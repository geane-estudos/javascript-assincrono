const promessa = new Promise(function (resolve, reject) {
  let number = 100;
  if (number % 2 === 0) {
    resolve("Number é par");
  } else {
    reject(Error("Number não é par"));
  }
});

promessa.then(function (resolucao) {
  //resolucao corresponde ao que tem no resolve
  console.log(resolucao);
});

const promessaArrow = new Promise((resolve, reject) => {
  let Numero = 33;
  if (Numero % 3 === 0) {
    resolve("Número é divisível por 3");
  } else {
    reject(Error("Número não é divisível por 3"));
  }
});

console.log(promessaArrow);

// promessaArrow.then((resol) => {
//     console.log(resol)
// }) OU:

promessaArrow.then((resol) => console.log(resol));

// O método then() retorna outra Promise. Podemos colocar then() após then() e fazer um encadeamento de promessas. O valor do primeiro argumento de cada then, será o valor do retorno anterior.
const promise = new Promise((resolve, reject) => {
  resolve("Etapa 1");
});

promise
  .then((resolucao) => {
    console.log(resolucao); // 'Etapa 1';
    return "Etapa 2";
  })
  .then((resolucao) => {
    console.log(resolucao); // 'Etapa 2';
    return "Etapa 3";
  })
  .then((r) => r + 4)
  .then((r) => {
    console.log(r); // Etapa 34 (concatenou 3 + 4)
  });

const divisor = new Promise((resolve, reject) => {
  let num = 30;
  if (num % 4 === 0) {
    resolve("número é divisível por 4");
  } else {
    reject(Error("número não é divisível por 4"));
  }
});

divisor
  .then((resolucao) => {
    console.log(resolucao);
  })
  .catch((reject) => {
    console.log(reject)
  })
  .finally(() => {
    console.log('Acabou')
  })

// PROMISE.ALL()
const login = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Usuário logado')
    }, 1000)
})

const dados = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Dados carregados')
    }, 1500)
})

const carregouTudo = Promise.all([login, dados])

carregouTudo.then((resolucao) => {
    console.log(resolucao)
})


//FETCH
const doc = fetch('./doc.txt')
doc.then((resolução) => {
  return resolução.text()
}).then((body) => {
  // const coonteudo = document.querySelector('.conteudo')
  // coonteudo.innerText = body
  console.log('fetch 1:',body)
})

const cep = fetch('https://viacep.com.br/ws/91260010/json/')
cep.then((resolução) => {
  return resolução.json()
}).then((body) => {
  const conteudo = document.querySelector('.conteudo')
  conteudo.innerText = body.logradouro
  console.log('fetch 2:',body.bairro)
})

const stylesheet = fetch('./style.css')
stylesheet.then((resolução) => {
  return resolução.text()
}).then((body) => {
  const conteudo = document.querySelector('.conteudo')
  const style = document.createElement('style')
  style.innerText = body
  conteudo.appendChild(style)
})

const about = fetch('./about.html')
about.then((resolução) => {
  return resolução.text()
}).then((body) => {
  console.log('fetch 3:',body)
})

const image = fetch('./image.png')
image.then((resolução) => {
  return resolução.blob()
}).then((body) => {
  const blobURL = URL.createObjectURL(body)
  imageDom = document.querySelector('img')
  imageDom.src = blobURL
})

const clone = fetch('https://viacep.com.br/ws/01001000/json/')
clone.then(response => {
  const cloneResponse = response.clone();
  response.json().then(json => {
    console.log('fetch 4 (json)',json)
  });
  cloneResponse.text().then(text => {
    console.log('fetch 5 (text)',text)
  });
});

//HEADERS
const viacepheaders = fetch('https://viacep.com.br/ws/01001000/json/')
viacepheaders.then((response) => {
  console.log('response:',response)
  response.headers.forEach(console.log)
})

const dogs = fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos")
dogs.then((response) => {
   console.log('fetch 6',response.type)
})

//EXERCÍCIO
//1
const inputCep = document.getElementById('cep');
const btnCep = document.getElementById('btnCep');
const resultadoCep = document.getElementById('resultadoCep')

btnCep.addEventListener('click', handleClick);

function handleClick(event) {
  event.preventDefault()
  const cep = inputCep.value;
  buscaCep(cep);
  console.log('event:',event)
}

function buscaCep(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then((response) => response.text())
  .then((body) => {
    resultadoCep.innerText = body;
  })
}

//2
const piadaChuck = document.getElementById('piada');
const proximaPiada = document.getElementById('proxima');

function puxarPiada() {
  fetch('https://api.chucknorris.io/jokes/random')
  .then(response => response.json())
  .then(body => piadaChuck.innerText = body.value)
  }

proximaPiada.addEventListener('click', puxarPiada)
puxarPiada()