
var symbolSize = 26;
var streams = [];
function setup(){
    //create canvas that is max browser width and height:
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    background(0);
    var x = 0;
    
    //loop through each vertical stream:
    //width/streamSize is the width of each stream
    for (var i = 0; i <= width / symbolSize; i++){
        //create a new stream:
        var stream = new Stream();
        //generate the the random coptic symbols:
        stream.generateSymbols(x, random(-750, 0));
        //push the stream into the streams mega array:
        streams.push(stream);
        //move the x position symbolSize value to the right
        x += symbolSize;
    }
    textSize(symbolSize);
}
function draw(){
    //draw the symbol on the canvas
    background(0, 150);
    streams.forEach(function(stream) {
        stream.render();
    });
}
function Symbol(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    //interval to switch to a different symbol
    this.switchInterval = round(random (2, 20));
    this.first = first;
    this.setToRandomSymbol = function() {
        //frameCount is a p5 variable that keeps track 
        //of how many frames have passed.
        //whenever frameCount divides, by switchinterval, without remainder:
        if (frameCount % this.switchInterval == 0) {
            //set value to a string from unicode character code 
            this.value = String.fromCharCode(
                //pick random coptic symbol:
                //unicode val + random number between 0 and 128:
                0x03E2 + round(random(0, 128))    
            );
        }    
    }
    
    
    this.rain = function() {
        //if the symbol's y position is >= the height of the canvas
        if (this.y >= height) {
           //send the symbol back to the top at y = 0
           this.y = 0; 
        } else {
            //increment the symbol y value based on speed
            this.y += this.speed;
        }
    }
}
function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(1, 5);

    this.generateSymbols = function(x, y) {
        //set first if random 1 to 4 == 1;
        var first = round(random(0, 4)) == 1;
        //loop until totalSymbol value is reached:
        for (var i = 0; i <= this.totalSymbols; i++) {
            //create a new random symbol with each iteration
            symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            //push the new symbol to the symbols array:
            this.symbols.push(symbol);
            //set next symbol y position directly ontop of current:
            y -= symbolSize;
            //after first iteration first will be set to false
            first = false;
        }
    }

    this.render = function() {
        
        //render function called each frame by draw function:
        //draw a random symbol and make it rain:
        this.symbols.forEach(function(symbol) {
            if (symbol.first){
                //color the symbol light purple
                fill(121,73,155);    
            } else {
                //color symbol dark purple
                fill(88,28,130);
            }
            
            //display value symbol at x and y location on the canvas:
            text(symbol.value, symbol.x, symbol.y);
            //call rain function to move symbol down:
            symbol.rain();
            //pick a new random symbol each frame:
            symbol.setToRandomSymbol();
        });
    }
}