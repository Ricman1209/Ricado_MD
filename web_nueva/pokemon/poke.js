async function getPokemon() {
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Pokémon no encontrado');

        const data = await response.json();
        document.getElementById('pokemon-info').innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <p>✨ ID: ${data.id}</p>
            <p>🔥 Tipo: ${data.types.map(t => t.type.name).join(', ')}</p>
            <img src="${data.sprites.front_default}" alt="${data.name}">
        `;
    } catch (error) {
        document.getElementById('pokemon-info').innerText = 'Error: Pokémon no encontrado';
        console.error(error);
    }
}
