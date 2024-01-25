const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
// Modal
const modal = document.getElementById("myModal");

const maxRecords = 151
let limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.types.map((type) => type).join(' ')}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                    <div class="poke-img"><img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                    </div>      
            </div> 
            <button class="show-details-button" data-pokemon='${JSON.stringify(pokemon)}'>Show Details</button>
        </li>
    `;
}
loadPokemonItens(offset, limit)

//chat gpt mandou adicionar
function showPokemonDetails(pokemon) {
    const modalContent = document.querySelector(".modal-content");

    if (modalContent) {
        modalContent.innerHTML = `
            <div class="modal-header ${pokemon.types.map((type) => type).join(' ')}">
                <span class="close" onclick="closeModal()">&times;</span>
                <h2>${pokemon.name}</h2>
            </div>
            <div class="modal-body ">
                <ol class ="olDetail">
                    <li class = "${pokemon.types.map((type) => type).join(' ')}">Number: ${pokemon.number}</li>
                    <li class = "${pokemon.types.map((type) => type).join(' ')}">Type: ${pokemon.types.join(', ')}</li>
                    <li class = "${pokemon.types.map((type) => type).join(' ')}">height: ${pokemon.height}</li>
                    <li class = "${pokemon.types.map((type) => type).join(' ')}">Attack: ${pokemon.atk}</li>
                    <li class = "${pokemon.types.map((type) => type).join(' ')}">Defense: ${pokemon.def}</li>
                    <li class = "${pokemon.types.map((type) => type).join(' ')}">Special Attack: ${pokemon.spcatk}</li>
                    <li class = "${pokemon.types.map((type) => type).join(' ')}">Special Defense: ${pokemon.spcdef}</li>
                    <li class = "${pokemon.types.map((type) => type).join(' ')}">Speed: ${pokemon.speed}</li>
                    <li class = "${pokemon.types.map((type) => type).join(' ')}">Health Points: ${pokemon.hp}</li>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </ol>     
            </div>
        `;
        modal.style.display = "block";
    } else {
        console.error("Elemento .modal-content não encontrado.");
    }
}
function closeModal() {
    modal.style.display = "none";
}

pokemonList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('show-details-button')) {
        const pokemonData = JSON.parse(target.getAttribute('data-pokemon'));
        showPokemonDetails(pokemonData);
    }
});

window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

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
