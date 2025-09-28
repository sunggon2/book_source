// 요소 선택 및 상수 선언
const numbersDiv = document.querySelector('.numbers');
const bonusDiv = document.querySelector('.bonus');
const drawButton = document.querySelector('#draw');
const resetButton = document.querySelector('#reset');
const plusSign = document.querySelector('.plus-sign'); // <<-- 이 부분 추가!

// 실제 로또 공 색상
const colors = {
  '1': '#fbc400',  // 1 ~ 10: 노란색
  '2': '#69c8f2',  // 11 ~ 20: 파란색
  '3': '#ff7272',  // 21 ~ 30: 빨간색
  '4': '#aaa',     // 31 ~ 40: 회색
  '5': '#b0d840'   // 41 ~ 45: 초록색
};

let intervalId = null; // setInterval을 제어하기 위한 변수

// 번호 공을 화면에 그리는 함수
function paintNumber(number, container) {
  const eachNumDiv = document.createElement('div');
  eachNumDiv.classList.add('ball');
  eachNumDiv.textContent = number;
  
  // 번호에 따른 색상 적용
  const colorIndex = Math.ceil(number / 10);
  eachNumDiv.style.backgroundColor = colors[colorIndex];
  
  container.appendChild(eachNumDiv);

  // 잠시 후 'visible' 클래스를 추가하여 등장 애니메이션 실행
  setTimeout(() => {
    eachNumDiv.classList.add('visible');
  }, 50);
}

// 초기화 함수
function resetGame() {
  // 진행중인 애니메이션이 있다면 중지
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  numbersDiv.innerHTML = "";
  bonusDiv.innerHTML = "";
  plusSign.classList.remove('visible'); // <<-- 이 부분 추가! -->> '+' 기호 숨기기
}

// 추첨 버튼 클릭 이벤트 핸들링
drawButton.addEventListener('click', function() {
  // 이전 추첨 결과 초기화
  resetGame();

  // 1부터 45까지의 숫자 배열 생성
  const candidate = Array(45).fill().map((v, i) => i + 1);
  
  // 45개 숫자를 랜덤으로 섞기 (피셔-예이츠 셔플)
  for (let i = candidate.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [candidate[i], candidate[j]] = [candidate[j], candidate[i]];
  }

  // 섞인 배열에서 7개 숫자를 뽑아 정렬
  const winningNumbers = candidate.slice(0, 7).sort((a, b) => a - b);
  const mainNumbers = winningNumbers.slice(0, 6);
  const bonusNumber = winningNumbers[6];
  
  let index = 0;
  
  // 0.5초마다 번호를 하나씩 표시
  intervalId = setInterval(() => {
    if (index < mainNumbers.length) {
      // 일반 번호 6개 표시
      paintNumber(mainNumbers[index], numbersDiv);
    } else if (index === mainNumbers.length) {
      // 보너스 번호 표시 직전에 '+' 기호 나타내기
      plusSign.classList.add('visible'); // <<-- 이 부분 추가!
      
      // 보너스 번호 1개 표시
      paintNumber(bonusNumber, bonusDiv);
      clearInterval(intervalId); // 모든 번호가 표시되면 인터벌 중지
    }
    index++;
  }, 500); // 0.5초 간격
});

// 초기화 버튼 클릭 이벤트 핸들링
resetButton.addEventListener('click', resetGame);