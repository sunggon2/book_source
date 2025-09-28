// 요소 선택 및 상수 선언
const numbersDiv = document.querySelector('.numbers');
const drawButton = document.querySelector('#draw');
const resetButton = document.querySelector('#reset');

// 로또번호 6개 배열 선언, 로또 숫자별 구별위한 배열
const lottoNumbers = [];
const colors = ['orange', 'skyblue', 'red', 'purple', 'green'];

// 추첨 버튼 클릭 이벤트 핸들링
// 숫자 6개를 만들어 lottoNumbers 배열에 넣으면 된다.
drawButton.addEventListener('click', function(){
  while(lottoNumbers.length < 6){
    let ran = Math.floor(Math.random() * 45) + 1;  // 원하는 숫자범위!! 외우자.
    if(lottoNumbers.indexOf(ran) === -1){           // 중복 숫자 제외
      lottoNumbers.push(ran);
      paintNumber(ran);                           // 색을 위한 함수를 하나 만들자
    }
  }
//  console.log(lottoNumbers);
})

// paintNumber 함수 (추첨된 숫자를 화면에 표시하기 위해)
function paintNumber(number){
  const eachNumDiv = document.createElement('div');
  eachNumDiv.classList.add('eachnum');
  eachNumDiv.textContent = number;
  numbersDiv.appendChild(eachNumDiv);
}

// paintNumber 함수 (색깔 구별)
function paintNumber(number){
  const eachNumDiv = document.createElement('div');
  eachNumDiv.classList.add('eachnum');
  let colorIndex = Math.floor(number / 10);
  eachNumDiv.style.backgroundColor = colors[colorIndex];
  eachNumDiv.textContent = number;
  numbersDiv.appendChild(eachNumDiv);
}

// 다시 버튼 클릭 이벤트 핸들링
resetButton.addEventListener('click', function(){
  lottoNumbers.splice(0, 6)
  numbersDiv.innerHTML = ""
})