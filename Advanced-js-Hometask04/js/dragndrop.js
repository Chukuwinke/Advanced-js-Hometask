class Trello {
    constructor() {
        this.mainContainer = document.querySelector(".main")
    }
    createIds(num){
        const ids = [];
        const getRandomId = (max) => {
            const id = Math.floor(Math.random() * max);
            if (ids.indexOf(id) === -1) {
                ids.push(id);
                return id;
            }
            getRandomId(max);
        };
        return getRandomId(num)
    }
    onready(){
        this.createColumn();
        
    }
    createColumn(){
        let btnId = this.createIds(100000)
        this.column = document.createElement('div')
        this.column.innerHTML = `
        <input type="text" class="header " id="header${btnId}"></input>
        <button class="sort-btn" id="sort-column__btn${btnId}">Sort</button>
        <ul class="card-list__container" id="ul-column__${btnId}">

        </ul>
        <button id="add-column__btn${btnId}">Add Column</button>`
        this.column.classList.add('column')
        this.mainContainer.appendChild(this.column)

        this.allCardContainers = document.querySelectorAll('.card-list__container')
        this.addColumn = document.getElementById(`add-column__btn${btnId}`)
        this.headerId = document.getElementById(`header${btnId}`)

        this.headerId.onkeyup =(e) => {
            if(e.keyCode === 13){
                 this.addColumn.click()
            }
        }
        
        this.addColumn.onclick = (e) => {
            this.createCard(btnId)
            this.createColumn()
            
        }
        this.sortCards(btnId)
    }
    createCard(btnId){
        this.addColumn.remove()
        this.createCardBtn = document.createElement('button')
        this.createCardBtn.setAttribute('id', `add-card__btn${btnId}`)
        this.createCardBtn.innerHTML ='Create Card...'
        this.createCardBtn.className ='addCardBtn'
        this.column.appendChild(this.createCardBtn)
        let prevSiblings = this.createCardBtn.previousElementSibling;


        this.createCardBtn.onclick = (e) => {
            this.cardContainer = document.querySelector(".card-list__container")
            this.card = document.createElement('li')
            this.card.className = 'card'
            this.card.innerHTML = `
            <div class="marker"></div>
            <input class="input-field" id="myInput${btnId}" placeholder="Enter Message..."></input>
            `
            prevSiblings.appendChild(this.card)
            this.dragAndDrop()
        }
    
    }
    dragAndDrop(){
        this.draggables = document.querySelectorAll('.card')
        this.draggables.forEach(draggable => {
            draggable.setAttribute('draggable', 'true')
            draggable.addEventListener('dragstart', (event) => {
                event.target.style.opacity = 1;
                draggable.classList.add('dragging')
            })
            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging')
            })
        })
        this.allCardContainers.forEach(container => {
            container.addEventListener('dragover', (e) => {
                e.preventDefault()
                const afterElement =this.getDragPosition(container, e.clientY)
                const draggable = document.querySelector('.dragging')
                if(afterElement == null){
                    container.appendChild(draggable)
                }
                else{
                    container.insertBefore(draggable, afterElement)
                }
            })
        })
    }
    getDragPosition(container, y){
        const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')]

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2;
            if(offset < 0 && offset > closest.offset){
                return {offset: offset, element: child}
            }
            else{
                return closest
            }

        }, {offset: Number.NEGATIVE_INFINITY}).element
    }
    sortCards(btnId){
        this.sortCardBtn = document.getElementById(`sort-column__btn${btnId}`)
        this.sortCardBtn.onclick = () => {
            const ul = document.getElementById(`ul-column__${btnId}`)

            let childrenLists = [...ul.children]
                
                childrenLists.sort((a,b)=> {
                    const first = a.lastChild.previousSibling.value;
                    const second = b.lastChild.previousSibling.value;
                    if (first > second) return 1;
                    else if (second > first) return -1;
                    else return 0;
                })
                .forEach(node=> ul.appendChild(node));

        }
        
    }
    start(){
        console.log("started")
        this.onready()
    }
}