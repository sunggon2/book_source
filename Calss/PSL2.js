// Person-Switch-Light-Fan (Device라는 공통부모)

class Device {
  constructor(name = '') {
    this.name = name;
    this.isOn = false;
  }

  on() {
    if (!this.isOn) {
      this.isOn = true;
      this.onEffect();  // 하위 클래스에서 동작 정의
    }
  }

  off() {
    if (this.isOn) {
      this.isOn = false;
      this.offEffect(); // 하위 클래스에서 동작 정의
    }
  }

  // 하위 클래스가 오버라이드할 메서드
  onEffect() {}
  offEffect() {}
}


class Light extends Device{
  constructor(name = 'Light') {
    super(name);
  }
  onEffect() {
    console.log(`${this.name} ON`);
  }
  offEffect() {
    console.log(`${this.name} OFF`);
  }
}

class Fan extends Device {
  constructor(name = 'Fan', maxSpeed = 3){
    super(name);
    this.speed = 0;
    this.maxSpeed = maxSpeed;
  }
  
  onEffect() {
    this.speed = Math.max(this.speed, 1);
    console.log(`${this.name} ON (speed: ${this.speed})`);
  }
  offEffect() {
    this.speed = 0;
    console.log(`${this.name} OFF`);
  }


  // 추가 기능: 속도 조절
  increaseSpeed() {
    if (!this.isOn) { console.log('팬이 꺼져 있습니다.'); return; }
    if (this.speed < this.maxSpeed) {
      this.speed++;
      console.log(`${this.name} 속도 증가: ${this.speed}`);
    } else {
      console.log(`${this.name} 최고 속도입니다.`);
    }
  }

  decreaseSpeed() {
    if (!this.isOn) { console.log('팬이 꺼져 있습니다.'); return; }
    if (this.speed > 1) {
      this.speed--;
      console.log(`${this.name} 속도 감소: ${this.speed}`);
    } else {
      console.log(`${this.name} 최저 속도입니다.`);
    }
  }
}

class Switch {
  constructor(device) {
    this.device = device;   // 객체를 전달받음
  }
  toggle() {
    if (this.device.isOn) {
      this.device.off();
    } else {
      this.device.on();
    }
  }

  // ✅ 속도 올리기/내리기
  fanUp() {
    if (typeof this.device.increaseSpeed === 'function') {
      this.device.increaseSpeed();
    } else {
      console.log('이 장치는 속도 조절을 지원하지 않습니다.');
    }
  }
  fanDown() {
    if (typeof this.device.decreaseSpeed === 'function') {
      this.device.decreaseSpeed();
    }
    else {
      console.log('이 장치는 속도 조절을 지원하지 않습니다.');
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

  // ✅ 팬 속도 조절 기능
  pressFanUp() {
    console.log(`${this.name}이(가) 팬 속도를 올렸습니다.`);
    this.sw.fanUp();
  }
  pressFanDown() {
    console.log(`${this.name}이(가) 팬 속도를 내렸습니다.`);
    this.sw.fanDown();
  }
}

const light = new Light('거실');
const fan = new Fan('천정', 5);
const lightSw = new Switch(light);
const fanSw = new Switch(fan);
const sunggon = new Person('성곤', lightSw);
const minjea = new Person('민재', fanSw);

sunggon.pressSwitch();
minjea.pressSwitch();
// sunggon.pressFanUp();
minjea.pressFanUp();
minjea.pressFanUp();



