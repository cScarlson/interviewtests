
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

var Darwin = (function(){

  'use strict';
  var BOARDX, BOARDY, AREA, MATROID, PARTICIPANTS, MEMBERS = [];

  function getNeighborCoords(x, y, dir){
    var NE = 1, SW = -1;
    var neighbor = undefined;
    if(dir === 'North'){
        neighbor = (MATROID[x] && MATROID[x][y+NE]) ? {x: x, y: y+NE} : undefined;
    } else if(dir === 'South') {
        neighbor = (MATROID[x] && MATROID[x][y+SW]) ? {x: x, y: y+SW} : undefined;
    } else if(dir === 'East') {
        neighbor = (MATROID[x+NE] && MATROID[x+NE][y]) ? {x: x+NE, y: y} : undefined;
    } else if(dir === 'West') {
        neighbor = (MATROID[x+SW] && MATROID[x+SW][y]) ? {x: x+SW, y: y} : undefined;
    } else {
        throw new Error('Type Error: invalid neighbor-direction');
    }
    return neighbor;
  }

  var Kin = function(coords){
    var x = coords.x, y = coords.y
    this.neighbors = {
      N: getNeighborCoords(x, y, 'North'),
      S: getNeighborCoords(x, y, 'South'),
      E: getNeighborCoords(x, y, 'East'),
      W: getNeighborCoords(x, y, 'West')
    };
  };
  var Person = function(person, coords){
    this.name = person.name;
    this.status = (person.alive + 0);
    this.coords = coords;
    Kin.call(this, coords);
  };

  /**
   * Creates a matrix where:
   *  * X === array of:
   *  *   * Y === array of values
   * Usage: new Matroid(8, 8);
   */
  var Matroid = function(xLen, yLen){
    var x = [], matroid = x;
    BOARDX = xLen, BOARDY = yLen, AREA = (xLen * yLen);
    for(var i=0; i<yLen; i++){
      var y = [];
      for(var ii=0; ii<xLen; ii++){
          y.push(-1);
      }
      x.push(y);
    }
    MATROID = matroid;
    return matroid;
  };

  function createBoard(xLen, yLen){
    return new Matroid(xLen, yLen);
  }

  function addMembers(members){
    PARTICIPANTS = members.length;
    for(var i=0,l=members.length; i<l; i+=BOARDX){
      var x = i/8;
      for(var j=i,ll=i+BOARDY; j<ll; j++){
        var y = j-x*BOARDY;
        if(members[i] || members[j]){
          var person = new Person(members[j], {x: x, y: y});
          MATROID[x][y] = person;
          MEMBERS.push(person);
        }
      }
    }
  }

  function getMember(coords){
    if(!!coords === false){ return false; }
    var region = coords.x * coords.y;
    return (region >= 0 && region <= AREA) && MATROID[coords.x][coords.y];
  }

  function displayMembers(){
    var tab = '<span style="margin-left: 12px;"></span>';
    document.writeln('<br>');
    for(var i=0,l=MATROID.length; i<l; i++){
      document.writeln('<br>');
      for(var j=0,m=MATROID[i].length; j<m; j++){
        document.write(tab + MATROID[i][j].status);
      }
    }
  }

  function evolve(){
    for(var i=0,l=MATROID.length; i<l; i++){
      for(var j=0,m=MATROID[i].length; j<m; j++){
        var person = MATROID[i][j], nghs = person.neighbors;
        var sum = ( // use boolean-algebra
          !!getMember(nghs.N).status
          +
          !!getMember(nghs.S).status
          +
          !!getMember(nghs.E).status
          +
          !!getMember(nghs.W).status
        );
        if(person.status === 1){  // live cell
        
          if(sum < 2){  // under-population
            person.status = 0;
          } else if(sum >= 2 && sum <= 3){  // servival
            person.status = 1;
          } else if(sum > 3){  // overcrowding
            person.status = 0;
          } else {
            console.log('Evolution Error: miscalculated sum for live cell');
          }
          
        } else if(person.status === 0){  // dead cell
        
          if(sum === 3){  // reproduction
            person.status = 1;
          } else {
            // do nothing
          }
        } else {
          console.log('@status', person.status);
          throw new Error('Evolution Error: bad status');
        }
        
      }
    }
  }

  function rerender(){
    var current = document.body.innerHTML;
    displayMembers();
    document.writeln('<br><br>');
    document.writeln('<b>EVOLUTION:</b>');
    document.body.innerHTML += current;
  }

  function sendFlowersTo(name){
    MEMBERS.forEach(function(membr){
      if(membr.name === name){ membr.flowers = true; alert('flowers sent'); }
    });
  }

  function randomizeStatuses(ppl){
    ppl.forEach(function(p){
      p.status = Math.floor(Math.random()*2);
    });
  }
  
  return {
    MEMBERS: MEMBERS,
    newGame: createBoard,
    addPeople: addMembers,
    mixStatuses: randomizeStatuses,
    sample: displayMembers,
    evolve: evolve,
    resample: rerender
  };

})();

var board = Darwin.newGame(8, 8);
Darwin.addPeople(people);
Darwin.mixStatuses(Darwin.MEMBERS);
Darwin.sample();
setTimeout(function(){
  Darwin.evolve();
  Darwin.resample();
}, (0*1000) );

console.log('@board', board.length, board[0].length, board, board[0]);

