function extend(Child, Parent) {
Child.prototype = Object.create(Parent.prototype);
// reset the prototype
Child.prototype.constructor = Child;
}
function Shape(color) {
  this.color = color;
}
Shape.prototype.duplicate = function() {
  console.log("duplicate");
};


extend(Circle, Shape);

Circle.prototype.duplicate = function() {
  console.log("Circle duplicate");
};

function Circle(radius, color) {
  // Inheritance property for circle object
  // Call super constructor
  Shape.call(this, color);
  this.radius = radius;
}



Circle.prototype.draw = function() {
  console.log('Draw');
};


function Rect(para) {
  this.para = para;
}

extend(Rect, Shape);

Rect.prototype.duplicate = function() {
  console.log("Rect duplicate");
};


// const r = new Rect(1);
// const s = new Shape();
// const c = new Circle(1, 'Red');

const duplicate = [
  new Shape(1),
  new Rect(1),
  new Circle(1,'red')
];


for(let dup of duplicate) {
  dup.duplicate();
}


// Some of the concept of mixing

function mixing(target, ...source) {
    Object.assign(target.prototype, ...source);
}

const canEat = {
  eat: function() {
    console.log('Eating')
  }
};
const canWalk = {
  walk: function() {
    console.log("Walking");
  }
};
const canSwim = {
  swim: function() {
    console.log("Swimming");
  }
};

function Person() {
  console.log('Persion');
}

function GoldFish() {
  console.log("goldFish");
}
mixing(GoldFish, canEat, canSwim);
mixing(Person, canEat, canWalk);
// Object.assign(GoldFish.prototype, canEat, canSwim);
// Object.assign(Person.prototype, canEat, canWalk);

const p = new Person();
const gold = new GoldFish();
