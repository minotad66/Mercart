// Variables
const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const compras = document.querySelector(".precios");
let total = 0;

const repoWrap = document.querySelector(".repos-wrap");

let reposPromise = fetch("https://app.fakejson.com/q", {
  method: "post",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    token: "oBnzdo7RVLm0AiuXnIIwXw",
    data: {
      _repeat: 10,
      id: "cryptoUUID",
      image: "personAvatar",
      name: "productName",
      price: "numberInt|0,100000",
      quantity: "numberInt",
      size: "productSize",
      status: "productOrderStatus"
    }
  })
}).then(r => r.json());

data = [
  {
    id: "8de99ce2-b0eb-46c2-a4a8-9b94cba6fefd",
    image: "https://robohash.org/ut.png?size=300x300",
    name: "Zum ancof",
    price: 64253,
    quantity: 425,
    size: "M",
    status: "started"
  },
  {
    id: "48d30cdf-71e1-4259-90f1-9efd26b82890",
    image: "https://robohash.org/plural.png?size=300x300",
    name: "Stat zimtax",
    price: 95350,
    quantity: 1000,
    size: "XS",
    status: "cancelled"
  },
  {
    id: "fcd16403-2aaf-419a-846b-417004fc28c6",
    image: "https://robohash.org/man.png?size=300x300",
    name: "Home lamflex",
    price: 38739,
    quantity: 304,
    size: "2XS",
    status: "completed"
  },
  {
    id: "4ffb5444-e6b8-4766-bc88-c293a45991a4",
    image: "https://robohash.org/labore.png?size=300x300",
    name: "Zath-key",
    price: 64973,
    quantity: 450,
    size: "3XL",
    status: "in-progress"
  },
  {
    id: "7278b3f2-6195-4ef1-91a6-d3834ea8526d",
    image: "https://robohash.org/plant.png?size=300x300",
    name: "Finlax",
    price: 60787,
    quantity: 234,
    size: "XL",
    status: "completed"
  },
  {
    id: "346e5690-519d-4422-8b38-8a233c58cf77",
    image: "https://robohash.org/keep.png?size=300x300",
    name: "Driptouch",
    price: 17210,
    quantity: 248,
    size: "S",
    status: "started"
  },
  {
    id: "0ba32660-23ca-4f53-b065-43b53e5066d1",
    image: "https://robohash.org/noon.png?size=300x300",
    name: "Double dubdax",
    price: 83979,
    quantity: 901,
    size: "L",
    status: "cancelled"
  },
  {
    id: "5fe4b1c6-5359-4eda-8e52-987a2a86c087",
    image: "https://robohash.org/method.png?size=300x300",
    name: "Isron",
    price: 68556,
    quantity: 835,
    size: "2XL",
    status: "in-progress"
  },
  {
    id: "230987c2-f180-4703-a753-b7fb76f1a353",
    image: "https://robohash.org/body.png?size=300x300",
    name: "Inchlam",
    price: 4986,
    quantity: 613,
    size: "XL",
    status: "started"
  },
  {
    id: "92580889-1a00-4e7f-bb9a-fd83d882b8df",
    image: "https://robohash.org/sed.png?size=300x300",
    name: "Tan remplus",
    price: 89942,
    quantity: 69,
    size: "L",
    status: "completed"
  }
];

reposPromise = Promise.resolve(data);

function datos_web() {
  reposPromise
    .then(repos => {
      const html = repos.map(repo => {
        return ` <div class="mx-5 p-5">
        <div class="card">
            <img src="${repo.image}" class="imagen-curso">
            <div class="info-card">
                <h4 class="card-title">${repo.name}</h4>
                <p>Cantidad: ${repo.quantity}</p>
                <p> Talla: ${repo.size}
                <h5 class="precio"><span class="u-pull-right">$ ${repo.price}</span></h5>
                <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${repo.id}">Agregar
                    Al Carrito</a>
            </div>
        </div>
    </div>`;
      });
      return html.join("");
    })
    .then(htmlList => {
      repoWrap.innerHTML = htmlList;
    });
}

datos_web();

// Listeners
cargarEventListeners();

function cargarEventListeners() {
  // Dispara cuando se presiona "Agregar Carrito"
  cursos.addEventListener("click", comprarCurso);

  // Cuando se elimina un curso del carrito
  carrito.addEventListener("click", eliminarCurso);

  // Al Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  // Al cargar el documento, mostrar LocalStorage
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

// Funciones
// Función que añade el curso al carrito
function comprarCurso(e) {
  e.preventDefault();
  // Delegation para agregar-carrito
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    // Enviamos el curso seleccionado para tomar sus datos
    leerDatosCurso(curso);
  }
}
// Lee los datos del curso
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id")
  };

  insertarCarrito(infoCurso);
}

// Muestra el seleccionado en el Carrito
function insertarCarrito(curso) {
  const row = document.createElement("tr");
  row.innerHTML = `
          <td>  
               <img src="${curso.imagen}" width=100>
          </td>
          <td>${curso.titulo}</td>
          <td>${curso.precio}</td>
          <td>
               <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
          </td>
     `;
  listaCursos.appendChild(row);
  guardarCursoLocalStorage(curso);
}
// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
  e.preventDefault();

  let curso, cursoId;
  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector("a").getAttribute("data-id");
  }
  eliminarCursoLocalStorage(cursoId);
}
// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
  // forma lenta
  // listaCursos.innerHTML = '';
  // forma rapida (recomendada)
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }

  // Vaciar Local Storage
  vaciarLocalStorage();

  return false;
}

// Almacena cursos en el carrito a Local Storage

function guardarCursoLocalStorage(curso) {
  let cursos;
  let total = obtenerTotalLocalStorage();
  total += parseInt(curso.precio.substr(1));
  compras.innerHTML = `sub total: ${total}`;
  // Toma el valor de un arreglo con datos de LS o vacio
  cursos = obtenerCursosLocalStorage();

  // el curso seleccionado se agrega al arreglo
  cursos.push(curso);
  localStorage.setItem("total", total);
  localStorage.setItem("cursos", JSON.stringify(cursos));
}

function obtenerTotalLocalStorage() {
  let totalLS;
  // comprobamos si hay algo en localStorage
  if (localStorage.getItem("total") === null) {
    totalLS = 0;
  } else {
    totalLS = JSON.parse(localStorage.getItem("total"));
  }
  return totalLS;
}

// Comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage() {
  let cursosLS;
  // comprobamos si hay algo en localStorage
  if (localStorage.getItem("cursos") === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem("cursos"));
  }
  return cursosLS;
}

// Imprime los cursos de Local Storage en el carrito

function leerLocalStorage() {
  let cursosLS;
  let totalLS = obtenerTotalLocalStorage();
  compras.innerHTML = `sub total: ${totalLS}`;
  cursosLS = obtenerCursosLocalStorage();

  cursosLS.forEach(function(curso) {
    // constrir el template
    const row = document.createElement("tr");
    row.innerHTML = `
             <td>  
                  <img src="${curso.imagen}" width=100>
             </td>
             <td>${curso.titulo}</td>
             <td>${curso.precio}</td>
             <td>
                  <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
             </td>
        `;
    listaCursos.appendChild(row);
  });
}
// Elimina el curso por el ID en Local Storage

function eliminarCursoLocalStorage(curso) {
  let cursosLS;
  let totalLS = obtenerTotalLocalStorage();
  // Obtenemos el arreglo de cursos
  cursosLS = obtenerCursosLocalStorage();
  // Iteramos comparando el ID del curso borrado con los del LS
  cursosLS.forEach(function(cursoLS, index) {
    if (cursoLS.id === curso) {
      cursosLS.splice(index, 1);
      totalLS -= parseInt(cursoLS.precio.substr(1));
    }
  });
  // Añadimos el arreglo actual a storage
  compras.innerHTML = `sub total: ${totalLS}`;
  localStorage.setItem("cursos", JSON.stringify(cursosLS));
  localStorage.setItem("total", totalLS);
}

// Elimina todos los cursos de Local Storage

function vaciarLocalStorage() {
  localStorage.clear();
}
