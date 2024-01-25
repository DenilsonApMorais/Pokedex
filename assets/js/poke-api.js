const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height
    /*Nova adições*/
    pokemon.atk = pokeDetail.stats[1].base_stat
    pokemon.def = pokeDetail.stats[2].base_stat
    pokemon.hp = pokeDetail.stats[0].base_stat
    /*ataque e defesa especial e velocidade */
    pokemon.spcatk = pokeDetail.stats[3].base_stat
    pokemon.spcdef = pokeDetail.stats[4].base_stat
    pokemon.speed = pokeDetail.stats[5].base_stat
    return pokemon
}
// Esse método retorna uma Promise que será resolvida com os detalhes do pokemon.
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => { // se chamar passando nada os valores padrões serão 0 e 10.
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json()) // transforma a responde do body em json
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests)) //lista de promise esperar ser resolvida
        .then((pokemonsDetails) => pokemonsDetails)
}
