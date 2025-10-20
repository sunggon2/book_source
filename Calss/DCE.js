// Driver-Car-Engine
class Engine {
  constructor(model = 'I4') {
    this.model = model;
    this.isOn = false;
  }
  start() {
    if (!this.isOn) {
      this.isOn = true;
      console.log(`엔진(${this.model}) ON`);
    }
  }
  stop() {
    if (this.isOn) {
      this.isOn = false; 
      console.log('엔진 OFF'); 
    } 
  }
}

class Car {
  constructor(name, engine) {
    this.name = name;
    this.engine = engine; // 의존성 주입
    this.speed = 0;
  }
  start() { this.engine.start(); }
  stop() { 
    this.speed = 0; 
    this.engine.stop(); 
    console.log('정지'); 
  }
  accelerate(step = 10) {
    if (!this.engine.isOn) {
      console.log(' 시동 OFF: 가속 불가'); 
      return;
    }
    this.speed += step;
    console.log(`가속: ${this.speed} km/h`);
  }
  brake(step = 10) {
    this.speed = Math.max(0, this.speed - step);
    console.log(`감속: ${this.speed} km/h`);
  }
}

class Driver {
  constructor(name, car) {
    this.name = name;
    this.car = car;
  }
  pressStart() { 
    console.log(`${this.name}: 시동`); 
    this.car.start(); 
  }
  pressAccel(step) { 
    console.log(`${this.name}: 가속`); 
    this.car.accelerate(step); 
  }
  pressBrake(step) { 
    console.log(`${this.name}: 브레이크`); 
    this.car.brake(step); 
  }
  pressStop() { 
    console.log(`${this.name}: 시동 OFF`); 
    this.car.stop(); 
  }
}

const engine = new Engine('V6');
const car = new Car('Tussan', engine);
const driver = new Driver('성곤', car);


// driver.pressStop();
driver.pressStart();
driver.pressAccel(20);
driver.pressAccel(15);
driver.pressBrake(10);
driver.pressStop();

