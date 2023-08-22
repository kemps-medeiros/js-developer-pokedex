const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li id="${pokemon.number}" class="pokemon ${pokemon.type}" data-pokemon='${JSON.stringify(pokemon)}'>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function openPokemonModal(pokemon) {
    console.log(pokemon);
}


pokemonList.addEventListener('click', function(event) {
    const clickedPokemon = event.target.closest('.pokemon');
    if (clickedPokemon) {
        const pokemonData = JSON.parse(clickedPokemon.getAttribute('data-pokemon'));
        const pokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
        const modal = new bootstrap.Modal(document.getElementById('pokemonModal'));
        const modalBody = document.getElementById('pokemonModalBody');
        
        modalBody.innerHTML = `
            <div class="row">
                <h2>${pokemonName} #${pokemonData.number}</h2>

                <div class="col">
                </br>
                    <p>Abilities: ${pokemonData.abilities.join(', ')}</p>
                    <p>Types: ${pokemonData.types.join(', ')}</p>
                </div>
                <div class="col">
                    <img src="${pokemonData.photo}" alt="${pokemonData.name}">
                </div>
            </div>
                `;

        modal.show();
    }
});