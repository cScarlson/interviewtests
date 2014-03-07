
var people = [
    {name: 'Franky', alive: false},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'Charly', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'Biff', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'Doc', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'Marty', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'Great Scott', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'Kirk', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'Spok', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true},
    {name: 'FFF', alive: true}
];


'use strict';
var BOARDX, BOARDY, AREA, MATROID, PARTICIPANTS, MEMBERS;

function getNeighbor(x, y, dir){
    //console.log('@MATROID[x][y]',x,y);
    var NE = 1, SW = -1;
    var neighbor = undefined;
    if(dir === 'North'){
        neighbor = MATROID[x] ? MATROID[x][y+NE] : undefined;
    } else if(dir === 'South') {
        neighbor = MATROID[x] ? MATROID[x][y+SW] : undefined;
    } else if(dir === 'East') {
        neighbor = MATROID[x+NE] ? MATROID[x+NE][y] : undefined;
    } else if(dir === 'West') {
        neighbor = MATROID[x+SW] ? MATROID[x+SW][y] : undefined;
    } else {
        throw new Error('Type Error: invalid neighbor-direction');
    }
}

var Kin = function(coords){
    var x = coords.x, y = coords.y
    this.neighbors = {
        N: getNeighbor(x, y, 'North'),
        S: getNeighbor(x, y, 'South'),
        E: getNeighbor(x, y, 'East'),
        W: getNeighbor(x, y, 'West')
    };
};
var Person = function(person, coords){
    this.name = person.name;
    this.status = (person.alive + 0);
    this.latLon = coords;
    Kin.call(this, coords);
};

/**
 * Creates a matrix where:
 *  * X === array of:
 *  *   * Y === array of values
 * Usage: new Matroid(8, 8);
 */
var Matroid = function(xLen, yLen){
    const X = [], matroid = X;
    BOARDX = xLen, BOARDY = yLen, AREA = (xLen * yLen);
    for(var i=0; i<yLen; i++){
        var y = [];
        for(var ii=0; ii<xLen; ii++){
            y.push(-1);
        }
        X.push(y);
    }
    MATROID = matroid;
    return matroid;
};

function createBoard(xLen, yLen){
    return new Matroid(xLen, yLen);
}

function addMembers(members){
    PARTICIPANTS = members.length;
    for(var x=0,l=BOARDX; x<l; x+=BOARDX){
        console.log('@loops x', x);
        for(var y=x,ll=x+BOARDY; y<ll; y++){
            console.log('\t@loops y', y);
            if(members[x] || members[y]){
                MATROID[x][y] = new Person(members[y], {x: x, y: y});
            }
        }
    }
}

function sendFlowersTo(name){
    MEMBERS.forEach(function(membr){
        if(membr.name === name){ membr.flowers = true; alert('flowers sent'); }
    });
}

var board = createBoard(8, 8);
addMembers(people);

console.log('@board', board.length, board[0].length, board, board[0]);

