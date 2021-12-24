
const main = document.querySelector('.main');


window.onload = () => {
    const xhr = new XMLHttpRequest();
    let url = "https://swapi.dev/api/films"

    xhr.open('GET', url, true);
    xhr.onload = () => {
        if(xhr.status == 200){
            let {results} = JSON.parse(xhr.responseText)
            console.log(results)
            results.forEach(element => {
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
                    <ul>
                
                `
                for(const character of element.characters ){
                    //console.log(character)

                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', character, true);
                    xhr.onload = () =>{
                        if(xhr.status == 200){
                           //console.log(JSON.parse(xhr.responseText))
                           const {name} = JSON.parse(xhr.responseText)
                           console.log(name)
                           movieContainer.innerHTML += `<li> ${name} </li>`
                        }
                    }
                    xhr.send();

                }
                movieContainer.innerHTML += '</ul> </div>'
                main.appendChild(movieContainer)
            })

            
        }
    }
    xhr.send();
}

//let allMovies = movies.results.map(results => results)
            // console.log(allMovies)
            // allMovies.forEach(element => {
            //     let movieContainer = document.createElement('div')
            //     movieContainer.innerHTML = `
            //      <div>
            //          <h2>${element.title}</h2>
            //      </div>
            //     `
            //     main.appendChild(movieContainer)
            // });