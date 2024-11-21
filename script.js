async function getGames() {
    let data = await fetch("https://api.rawg.io/api/games?key=7bd2d1c6193547ca9f11e3a826a938c1&dates=2019-09-01,2019-09-30&platforms=18,1,7")
    let games = data.json()
    console.log(games)
}

getGames();