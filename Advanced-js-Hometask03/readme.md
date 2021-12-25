## The task is

Create analog of [Whack a mole](./moles.png) game.

#### Technical requirements:
- Create a 10*10 field using the ```<table>``` element.
- The point of the game is: any unlight cell in the table for a short time is colored blue. The user should have time to click on the painted cell. If the user did this in time, it is painted in green, the user receives 1 point. If he didn't, it is colored red, the computer gets 1 point.
- The game continue, until half of the cells on the field are colored green or red. As soon as this happens, the player (user or computer) whose number of cells on the field are bigger - wins the competition.
- The game must have three difficulty levels to choose before the game starts: 
  - Light - a new cell is highlighted every 1.5 seconds;
  - Medium - the new cell is highlighted once per second;
  - Heavy - the new cell is highlighted every half second.
- Display a message about who won at the end of the game. 
- After the end of the game it should be possible to change the level of difficulty and start a new game.
- Be sure to use the functionality of the OOP when writing the application.
- Нou can insert pictures instead of highlighting table cells.
