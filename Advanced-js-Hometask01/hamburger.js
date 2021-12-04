
function Hamburger (size, stuffing) {
    try {
        if(!(size && stuffing)){
            throw new HamburgerException('NoParameters', 'parameters not passed')
        }
        if((Object.keys(size)[0] != 'size') || Object.keys(stuffing)[0] != 'stuffing'){
            throw new HamburgerException('incorrectParameters', 'incorrect parameters passed')
        }
        this.size = size;
        this.stuffing = stuffing;
        this.topping = []
    } catch (error) {
        console.log(error.error + ": " + error.message)
    }
    
}

Hamburger.SIZE_SMALL = {size:'small', price: 50, calories: 20}
Hamburger.Size_LARGE = {size:'large', price: 100, calories: 40}
Hamburger.STUFFING_CHEESE = {stuffing:'cheese', price: 10, calories: 20}
Hamburger.STUFFING_SALAD = {stuffing:'salad', price: 20, calories: 5}
Hamburger.STUFFING_POTATO = {stuffing:'potatoe', price: 15, calories: 10}
Hamburger.TOPPING_MAYO = {topping:'mayo', price: 20, calories: 5, added: false}
Hamburger.TOPPING_SPICE = {topping:'spice', price: 15, calories: 0, added: false}
//console.log(Hamburger)


function HamburgerException(error, message) {
    this.error = error;
    this.message = message;
}
function calculator (previousValue, currentValue) {
    return previousValue + currentValue
}

// adding toppings to the hamburger
Hamburger.prototype.addTopping = function (topping) {
    try {
        if(topping.added == true){
            console.log('true')
            throw new HamburgerException('duplicateTopping', 'Topping already exists')
        }
        else if (!topping){
            throw new HamburgerException('NoTopping', 'No Topping Passed')
        }
        else if (Object.keys(topping)[0] != 'topping'){
            throw new HamburgerException('WrongData', 'Wrong Parameter passed')
        }
        else{
            this.topping.push(topping)
            //console.log()
            topping.added =true
        }
    } catch (error) {
        console.log(error.error + ": " + error.message)
    }
}

// removing a topping from the hamburger 
Hamburger.prototype.removeTopping = function (topping) {
    try {
        if (!topping) {
            throw new HamburgerException('Notopping', 'no topping argument passed')
        }
        else if(!topping.added){
            //console.log('true')
            throw new HamburgerException('Notopping', 'Topping not in array')
        }
        else{
            this.topping = this.topping.filter(function(item){
                //console.log(item)
                return item.topping != topping.topping
            })
            topping.added =false
        }
    } catch (error) {
        console.log(error.error + ": " + error.message)
    }
}

// get a list of toppings
Hamburger.prototype.getToppings = function () {
    console.log(this.topping)
}

// get the size of burger
Hamburger.prototype.getSize = function () {
    console.log(this.size.size)
}

// get the stuffing
Hamburger.prototype.getStuffing = function () {
    console.log(this.stuffing.stuffing)
}

// calculate the total price
Hamburger.prototype.calculatePrice = function (){
    const priceSize = this.size.price ;
    const priceStuffing = this.stuffing.price
    const priceTopping = this.topping.map(item => item.price );
    const total = [priceSize, priceStuffing, ...priceTopping].reduce(calculator)
    console.log(`the total price is ${total} AZN`)
}

//calculate the total calories
Hamburger.prototype.calculateCalories = function () {
    const caloSize =this.size.calories ;
    const caloeStuffing = this.stuffing.calories
    const caloTopping = this.topping.map(item => item.calories );
    const total = [caloSize, caloeStuffing, ...caloTopping].reduce(calculator)
    console.log(`the total calories are ${total}`)
}


// TEST CASE 1

// const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// hamburger.addTopping(Hamburger.TOPPING_MAYO)
// console.log(hamburger)

//Add topping test
//hamburger.addTopping(Hamburger.TOPPING_SPICE)
//console.log(hamburger)

//hamburger.addTopping(Hamburger.TOPPING_MAYO)
//console.log(hamburger)

//duplicate topping test
//hamburger.addTopping(Hamburger.TOPPING_MAYO)
//console.log(hamburger)

//remove topping test
// hamburger.removeTopping(Hamburger.TOPPING_MAYO)
// console.log(hamburger)


//hamburger.getToppings()
//hamburger.getSize()
//hamburger.getStuffing()
//hamburger.calculatePrice()
//hamburger.calculateCalories()

// TEST CASES 2 

// passing in wrong arguments
//const hamburger = new Hamburger(Hamburger.STUFFING_CHEESE, Hamburger.TOPPING_MAYO);

// passing in no arguments
//const hamburger = new Hamburger();

//passing no topping argument
//hamburger.addTopping()

// passing wrong topping argument
//hamburger.addTopping(Hamburger.SIZE_SMALL)

// passing no remove topping argument
//hamburger.removeTopping()

// passing wrong remove topping arguments
//hamburger.removeTopping(Hamburger.SIZE_SMALL)

