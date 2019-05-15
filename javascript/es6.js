const _radius = Symbol();

class Circle {
  constructor(radius) {
    this[_radius] = radius;
  }
  draw() {
    console.log('Draw Method');
  }
}

const cr = new Circle(1);
cr.radius;



function Cir()
{
    console.log(this);
}

var cir = new Cir();

cir.toString();
