
const main = document.querySelector('.main');

fetch('https://swapi.dev/api/films')
    .then(response => response.json())
    .then(data => {
        const {results} = data
        console.log(results)
        results.forEach(element => {
        //     let movieContainer = document.createElement('div')
        //    movieContainer.innerHTML = `
        //    <div>
        //         <h2>${element.title}</h2>
        //         <ul>
        //             <li>episode: ${element.episode_id}</li>
        //             <li>${element.opening_crawl}</li>
        //         </ul>
        //     </div>
        //     <div>
        //         <h3>list of characters</h3>
        //         <ul class="characters">
                
        //     `
            let characterData = element.characters
            let requests = characterData.map(url => fetch(url))
            Promise.all(requests)
                .then(response => response)
                .then(responses => Promise.all(responses.map(r => r.json())))
                .then(charactersData => {
                    let movieContainer = document.createElement('div')
                    movieContainer.innerHTML = `
                        <div>
                        <h2>${element.title}</h2>
                        <ul>
                            <li>episode: ${element.episode_id}</li>
                            <li>${element.opening_crawl}</li>
                        </ul>
                        </div>
                        <div>
                            <h3>list of characters</h3>
                            <ul class="characters">
                
                        `
                    charactersData.forEach(characterData => {
                    let {name} = characterData
                    console.log(name)
                    
                        movieContainer.innerHTML += `<li> ${name} </li>`
                        //main.appendChild(movieContainer)

                    })
                    movieContainer.innerHTML += '</ul> </div>'
                    main.appendChild(movieContainer)
                
                    }
                    
                    )

                // main.appendChild(movieContainer)
           
        })
    })





     //}
        //     let charactersUrls = (element.characters)
        //     //console.log(charactersData)
        //     let requests = charactersUrls.map(url => fetch(url));
        //     //console.log(requests)
        //     Promise.all(requests)
        //         .then(response => response)
        //         .then(responses => Promise.all(responses.map(r => r.json())))
        //         .then(charactersData => charactersData.forEach(characterData => {
        //             let {name} = characterData
        //             const character = document.querySelector('.character');
        //             character.innerHTML += `<li> ${name} </li>`
                    
        //             console.log(name) 
        //         }))
        //     // //console.log(charactersData)
        //     main.appendChild(movieContainer)

    //for(const charactersUrls of element.characters ){
                //let urlArray =[]
                
                //console.log(requests)
                //let requests = element.characters.map(url => fetch(url))
                // Promise.all(requests)
                //     .then(response => response)
                //     .then(responses => Promise.all(responses.map(r => r.json())))
                //     .then(charactersData => charactersData.forEach(characterData => {
                //                 let {name} = characterData
                //                 //console.log(name)

                            
                //     }))