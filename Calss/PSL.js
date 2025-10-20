// Person-Switch-Light

class Light {
  constructor() {
    this.isOn = false;
  }
  on() {
    this.isOn = true;
    console.log('Light ON');
  }
  off() {
    this.isOn = false;
    console.log('Light OFF');
  }
}

class Switch {
  constructor(light) {
    this.light = light;   // Light 객체를 전달받음
  }
  toggle() {
    if (this.light.isOn) {
      this.light.off();
    } else {
      this.light.on();
    }
  }
}

class Person {
  constructor(name, sw) {
    this.name = name;
    this.sw = sw;         // Switch 객체를 전달받음
  }
  pressSwitch() {
    console.log(`${this.name}이(가) 스위치를 눌렀습니다.`);
    this.sw.toggle();
  }
}

const light = new Light();
const sw = new Switch(light);
const sunggon = new Person('성곤', sw);

sunggon.pressSwitch();
sunggon.pressSwitch();
