function calculator (previousValue, currentValue) {
    return previousValue + currentValue
}
class HamburgerException {
    constructor (error, message) {
        this.error = error;
        this.message = message;
    }
}
class Hamburger {
    constructor (size, stuffing) {
        try {
            if(!(size && stuffing)){
                 let a = new HamburgerException('NoParameters', 'parameters not passed')
                 throw a
            }
            if((Object.keys(size)[0] != 'size') || Object.keys(stuffing)[0] != 'stuffing'){
                let b = new HamburgerException('incorrectParameters', 'incorrect parameters passed')
                throw b 
            }
            this.size = size;
            this.stuffing = stuffing;
            this.topping = []
        } catch (error) {
            console.log(error.error + ": " + error.message)
        }
    }
    
    addTopping(topping) {
        try {
            if (!topping){
                let noToppingErr = new HamburgerException('NoTopping', 'No Topping Passed')
                throw noToppingErr
           }
            else if(topping.added){
                //console.log(topping)
                 let duplicateErr = new HamburgerException('duplicateTopping', 'Topping already exists')
                 throw duplicateErr
            }
            else if (Object.keys(topping)[0] != 'topping'){
                let wrongDataErr = new HamburgerException('WrongData', 'Wrong Parameter passed')
                throw wrongDataErr
            }
            else{
                this.topping.push(topping)
                topping.added =true
            }
        } catch (error) {
            console.log(error.error + ": " + error.message)
        }

    }

    removeTopping(topping) {
        try {
            if (!topping) {
                let noToppingPassedErr = new HamburgerException('Notopping', 'no topping argument passed')
                throw noToppingPassedErr
            }
            else if(!topping.added){
                let notInArrErr = new HamburgerException('Notopping', 'Topping not in array')
                throw notInArrErr
            }
            else{
                this.topping = this.topping.filter(function(item){
                    return item.topping != topping.topping
                })
                topping.added =false
            }
        } catch (error) {
            console.log(error.error + ": " + error.message)
        }
    }

    getToppings() {
        console.log(this.topping)
    }

    getSize() {
        console.log(this.size.size)
    }

    getStuffing() {
        console.log(this.stuffing.stuffing)
    }
    calculatePrice() {
        const priceSize = this.size.price ;
        const priceStuffing = this.stuffing.price
        const priceTopping = this.topping.map(item => item.price );
        const total = [priceSize, priceStuffing, ...priceTopping].reduce(calculator)
        console.log(`the total price is ${total} AZN`)
    }
    calculateCalories() {
        const caloSize =this.size.calories ;
        const caloeStuffing = this.stuffing.calories
        const caloTopping = this.topping.map(item => item.calories );
        const total = [caloSize, caloeStuffing, ...caloTopping].reduce(calculator)
        console.log(`the total calories are ${total}`)
    }
}
Hamburger.SIZE_SMALL = {size:'small', price: 50, calories: 20}
Hamburger.Size_LARGE = {size:'large', price: 100, calories: 40}
Hamburger.STUFFING_CHEESE = {stuffing:'cheese', price: 10, calories: 20}
Hamburger.STUFFING_SALAD = {stuffing:'salad', price: 20, calories: 5}
Hamburger.STUFFING_POTATO = {stuffing:'potatoe', price: 15, calories: 10}
Hamburger.TOPPING_MAYO = {topping:'mayo', price: 20, calories: 5, added: false}
Hamburger.TOPPING_SPICE = {topping:'spice', price: 15, calories: 0, added: false}


// TEST CASE
// const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE)

// hamburger.addTopping(Hamburger.TOPPING_MAYO)
// console.log(hamburger)

// hamburger.removeTopping(Hamburger.TOPPING_MAYO)
// console.log(hamburger)


//hamburger.getToppings()
//hamburger.getSize()
//hamburger.getStuffing()
// hamburger.calculatePrice()
// hamburger.calculateCalories()
