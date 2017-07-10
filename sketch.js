var symbol;
var symbolSize = 60
function setup(){
    //create canvas that is max browser width and height:
    createCanvas(
        window.innerWidth,
        window.innerHeight,
    );
    background(0);
    //create a new symbol in the center of the screen:
    symbol = new Symbol(
        width / 2,
        0,
        //random speed value between 5 and 10
        random(5, 10)
    );
    //set the new symbol to a random symbol:
    symbol.setToRandomSymbol();
    textSize(symbolSize);
}
function draw(){
    //draw the symbol on the canvas
    symbol.render();
}
function Symbol(x, y, speed) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;

    this.setToRandomSymbol = function() {
        //set value to a string from unicode character code 
        this.value = String.fromCharCode(
            //pick random coptic symbol:
            //unicode val + random number between 0 and 128:
            0x03E2 + round(random(0, 128))    
        );    
    }
    this.render = function() {
        fill(110, 15, 95);
        //display value symbol at x and y location on the canvas:
        text(this.value, this.x, this.y);
        //call rain function to move symbol down:
        this.rain();
    }
    this.rain = function() {
        //increment the symbol y value based on speed
        this.y += this.speed;
    }
}
function Stream() {

}