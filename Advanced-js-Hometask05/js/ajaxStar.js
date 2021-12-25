
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
                for(const character of element.characters ){
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', character, true);
                    xhr.onload = () =>{
                        if(xhr.status == 200){
                           //console.log(JSON.parse(xhr.responseText))
                           const {name} = JSON.parse(xhr.responseText)
                           const characterContainer = document.getElementById(`characters-episode__${element.episode_id}`)
                           console.log(name)
                           characterContainer.innerHTML += `<li class="character"> ${name} </li>`
                        }
                    }
                    xhr.send();

                }
                
                main.appendChild(movieContainer)
            })
        }
    }
    xhr.send();
}