const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 10
let offset = 0
const maxRecords = 151




function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <div class="detailList">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <span class="about">About</span>
                    <span class="aboutItem">Height: ${pokemon.height /10} m</span>
                    <span class="aboutItem">Weight: ${pokemon.weight /10} kg</span>
                    <span class="about">Abilities</span>
                    <ol class="abilities">
                        ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('')}
                    </ol>
                    </div>
                <img src="${pokemon.photo}" 
                alt="${pokemon.name}">
            </div>
        </li>
    `).join("")
        pokemonList.innerHTML += newHtml
    })
    
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


// Outra opção para tratar erros
/* try {
    
} catch (error) {
    
} */