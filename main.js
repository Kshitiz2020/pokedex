const content = document.querySelector(".container");
const SearchInput = document.querySelector("#searchBar");
let pokeData = [];

SearchInput.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredData = pokeData.filter((fData) => {
    return fData.name.toLowerCase().includes(searchString);
  });
  displayCharacters();
});

const fetchData = async () => {
  await fetch(" https://pokeapi.co/api/v2/pokemon?limit=121&offset=0 ")
    .then((response) => response.json())
    .then((data) => {
      const fetches = data.results.map((item) => {
        return fetch(item.url)
          .then((res) => res.json())
          .then((data) => {
            return {
              id: data.id,
              name: data.name,
              img: data.sprites.other["official-artwork"].front_default,
              types: data.types,
            };
          });
      });
      Promise.all(fetches).then((res) => {
        pokeData = res;
        pokeCards();
      });
    });
};

/* syntax for fetch Api
 fetch(file)
.then(x => x.text())
.then(y => myDisplay(y)); */

const displayCharacters = (fData) => {};

const pokeCards = () => {
  const cards = pokeData
    .filter()
    .map((pokemon) => {
      return ` <div class="card">
      <p>${pokemon.id}</p>
    <img
      src="${pokemon.img}"
      alt="Pikachu"
    />
    <h2>${pokemon.name}</h2>
    
    <div>
    ${pokemon.types.map((type) => getTypeString(type)).join("")}
    </div>
  </div>`;
    })
    .join("");

  content.innerHTML = cards;
};

const getTypeString = (type) => {
  return `<p> ${type.type.name} </p>`;
};

fetchData();

/* const typeOfPokemon = types.map(() => {
  <div class="type"><p>Water</p> <p>Poison</p></div>
  </div>`
}) */
