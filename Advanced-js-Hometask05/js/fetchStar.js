const main = document.querySelector('.main');

fetch('https://swapi.dev/api/films')
    .then(response => response.json())
    .then(data => {
        const {results} = data
        console.log(results)
        results.forEach(element => {       
            let characterData = element.characters
            let requests = characterData.map(url => fetch(url))
            Promise.all(requests)
                .then(response => response)
                .then(responses => Promise.all(responses.map(r => r.json())))
                .then(charactersData => {
                    let movieContainer = document.createElement('div')
                    movieContainer.className='episode-container'
                    movieContainer.innerHTML = `
                        <div>
                        <h2>${element.title}</h2>
                        <ul>
                            <li>episode: ${element.episode_id}</li>
                            <li>${element.opening_crawl}</li>
                        </ul>
                        </div>
                        <div class="characters-container">
                            <h3>list of characters</h3>
                            <ul class="characters" id="characters-episode__${element.episode_id}">
                            </ul> 
                        </div>
                        `
                        main.appendChild(movieContainer)
                    charactersData.forEach(characterData => {
                        const characterContainer = document.getElementById(`characters-episode__${element.episode_id}`)
                        let {name} = characterData
                        characterContainer.innerHTML += `<li class="character"> ${name} </li>`
                    })
                    
                    
                
                })
          
        })
    })