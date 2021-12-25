## The task is:
Create an implementation of the function, that will allow you to create objects with the type Hemburger. Use ES5 standart only.

## Technical requirements:
A fast food offers you two types of hamburgers:
 - small (50 AZN, 20 calories)
 - lagre (100 AZN, 40 calories)

The hamburger must include one additional stuffing (necessarily), It can be:
 - cheese (+10 AZN, +20 calories)
 - salad (+20 AZN, +5 calories)
 - potatoes (+15 AZN, +10 calories)

Additionally, you can add toppings: spice (+15 AZN, 0 calories) or mayonnaise (+ 20 UAH, + 5 calories).

You should write a program that calculates the cost and calorie value of a hamburger. Be sure to use the OOP approach. Hint: you need a class of burger, some constants, methods to select options and calculate the desired values.

The code must be written under the ES5 standard.

Your code must be protected against errors. Imagine that your class will be used by another programmer. If it sends the wrong type of hamburger, for example, or the wrong type of stuffing, an exception should be thrown out (the error should not be ignored in silence).


The written class must match the following jsDoc description (i.e. contain the specified methods that accept and return data of the specified type and throw out exceptions of the specified type. Comments below can also be copied into your code):

```
/**
* 
* @constructor
* @param size        size of the hamburger
* @param stuffing    selected stuffing
* @throws {HamburgerException}  In case of incorrect usage
*/
function Hamburger(size, stuffing) { ... } 

/* Sizes, types of stuffings and toppings */
Hamburger.SIZE_SMALL = ...
Hamburger.SIZE_LARGE = ...
Hamburger.STUFFING_CHEESE = ...
Hamburger.STUFFING_SALAD = ...
Hamburger.STUFFING_POTATO = ...
Hamburger.TOPPING_MAYO = ...
Hamburger.TOPPING_SPICE = ...

/**
* Add topping to hamburger. Several toppings can be added, only if they are diferent. You can't add same topping two times. 
* 
* @param topping     type of topping
* @throws {HamburgerException}  in case of incorrect usage
*/
Hamburger.prototype.addTopping = function (topping) ...

/**
 * Delete the toppping, only if it was added earlier.
 * 
 * @param topping   topping type
 * @throws {HamburgerException}  in case of incorrect usage
 */
Hamburger.prototype.removeTopping = function (topping) ...

/**
 * Get list of toppings
 *
 * @return {Array} an Array with the list of constants like Hamburger.TOPPING_* inside
 */
Hamburger.prototype.getToppings = function () ...

/**
 * Find out the size of the Hamburger
 */
Hamburger.prototype.getSize = function () ...

/**
 * Find out the stuffing of the Hamburger
 */
Hamburger.prototype.getStuffing = function () ...

/**
 * Find out the price of the hamburger
 * @return {Number} the number of price in AZN
 */
Hamburger.prototype.calculatePrice = function () ...

/**
 * Find out callories amount of the hamburger
 * @return {Number} Number of calories
 */
Hamburger.prototype.calculateCalories = function () ...

/**
 * Provides information about an error while working with a hamburger. 
 * Details are stored in the message property.
 * @constructor 
 */
function HamburgerException (...) { ... }

```

### Comments:

This is a task for the OOP. You need to create a class that receives information about the hamburger at the entrance and gives information about the weight and price at the output. The class should not do any interaction with the user and the outside world - all the necessary data should be passed to it explicitly. It will not ask anything and will not display anything.

Why not? Because everybody has to do his or her job, the class must only process the hamburger, and the input-output must be done by other parts of the code. Otherwise, we will get porridge where different functions are mixed together.

Types of stuffings and sizes should be made as constants. There should be no magic strings.

The information about the parameters of the hamburger is stored inside the class instance in its fields. This is how using of this class can look like:
```
// small hamburger with cheese
var hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// mayo topping
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// asking the number of calories
console.log("Calories: %f", hamburger.calculateCalories());
// asking the price
console.log("Price: %f", hamburger.calculatePrice());
// I've changed my mind, and I've decided to add more topping
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// Did hte price changed?
console.log("Price with sauce: %f", hamburger.calculatePrice());
// How large is this hamburger
console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false
// Remove the topping
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log("Have %d toppings", hamburger.getToppings().length); // 1
```

#### In case of incorrect usage, the class will report it via exception ejection.
```
// have not passed on the necessary parameters
var h2 = new Hamburger(); // => HamburgerException: no size given

// pass incorrect values, an topping instead of a size
var h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE); 
// => HamburgerException: invalid size 'TOPPING_SAUCE'

// add to many toppings
var h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_MAYO); 
// HamburgerException: duplicate topping 'TOPPING_MAYO'
```

#### Pay attention to such points in the code above:
 - the class does not interact with the outside world. It's none of its business, there will be another code that will do this, but the class lives in isolation from the world
 - we pass the necessarily parameters (size and stuffing) through the constructor, so that it is impossible to create an object without specifying them
 - optional (toppings) can be added via specific methods
 - Method names begin with the verb and look like "doWhat": calculateCalories(), addTopping()
 - The types of stuffing are marked with "constants" with clear names. In fact, they are just properties written with capital letters, which we agreed to consider "constants".
 - Report exceptional situations via exceptions
 - The object is created through the constructor - a function that sets the initial field values. The constructor name is written with a capital letter and is usually a noun: new Hamburger(...)
 - "constants" like `Hamburger.SIZE_SMALL` may have a value that is a string or number. Nothing should change from changing the value of the constant (i.e. these values should not be written somewhere else). Unfortunately, unlike other languages (Java, PHP, C#), the JS interpreter will not point out the following error in the name of such "constant".
 - It is logical to store the initial data (size, type of stuffing) in the properties of the hamburger object, but not the calculated values (price, number of calories, etc.). It is logical to calculate the price and calories at the moment when it is necessary, but not beforehand.
 - JS has no syntax to mark a property or method as private (available only within the class), so some developers start their names by underscore and agree that no one outside the class will use them. In general, there are no normal classes in JS before ES6, so much they based on such arrangements.
 - In addition, here is another instruction how to solve tasks with OOP. When you solve a problem in OOP, you have to answer the questions:
  * What are the entities for which we will make classes? (Hamburger).
  * What properties do they have (size, filling, additives). Price or calories are not properties because they are calculated from other properties and do not need to be stored.
  * What we want to get from them (what methods they should have). For example, how much does a hamburger cost?
  * How are the entities connected? We have one "Hamburger" entitie and it is independent.
  * Note also that in the example above the class does not interact with the outside world. The external code is responsible for this. That's why our class: can be used in the console, displaying data through console.log, or it can be attached a tricky HTML-interface with buttons to run on a tablet with touchscreen. It is in this style that you need to write OOP code.
  * Classes in JS are simulated by ~~any crutches~~ in different ways, adding methods to the prototypes of the object is one of the most commonly used.

#### Literature:
- [Object prototype](https://javascript.info/prototypes)
- [Ptivate and protected properties, methods](https://javascript.info/private-protected-properties-methods
- [JS Errors, try(){}catch(){}](https://www.w3schools.com/js/js_errors.asp
- [throw](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/throw)

Условие задачи взято с [codedokode](https://gist.github.com/codedokode).
