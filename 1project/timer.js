let timerInterval;
let totalSeconds = 0;
let remainingSeconds = 0;
let isPaused = false;

// 버튼 요소 가져오기
const startButton = document.querySelector(".start-btn");
const pauseButton = document.querySelector(".pause-btn");
const resumeButton = document.querySelector(".resume-btn");
const resetButton = document.querySelector(".reset-btn");

// 각 버튼에 이벤트 리스너 추가
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resumeButton.addEventListener("click", resumeTimer);
resetButton.addEventListener("click", resetTimer);

// 타이머 시작 함수
function startTimer() {
    clearInterval(timerInterval);
    isPaused = false;

    const minutes = parseInt(document.getElementById("minuteInput").value) || 0;
    const seconds = parseInt(document.getElementById("secondInput").value) || 0;

    // 유효한 숫자가 입력되었는지 확인 (음수 및 0 처리)
    if (minutes < 0 || seconds < 0 || (minutes === 0 && seconds === 0)) {
        alert("유효한 시간을 입력하세요! 분과 초는 0보다 커야 합니다.");
        return;
    }

    totalSeconds = minutes * 60 + seconds;
    remainingSeconds = totalSeconds;
    updateDisplay();
    document.body.classList.remove("time-up");
    document.querySelector(".timer-container").classList.remove("time-up");

    // 타이머 시작
    timerInterval = setInterval(() => {
        if (!isPaused) {
            remainingSeconds--;
            updateDisplay();

            if (remainingSeconds <= 0) {
                clearInterval(timerInterval);
                playEndSound();
                document.getElementById("timerDisplay").innerText = "시간이 다 되었습니다!";
                document.body.classList.add("time-up");
                document.querySelector(".timer-container").classList.add("time-up");
            }
        }
    }, 1000);
}

// 타이머 일시 정지 함수
function pauseTimer() {
    isPaused = true;
}

// 타이머 재시작 함수
function resumeTimer() {
    isPaused = false;
}

// 타이머 리셋 함수
function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 0;
    remainingSeconds = 0;
    isPaused = false;
    document.getElementById("timerDisplay").innerText = "남은 시간: 00:00";
    document.getElementById("minuteInput").value = "";
    document.getElementById("secondInput").value = "";
    document.body.classList.remove("time-up");
    document.querySelector(".timer-container").classList.remove("time-up");
}

// 화면에 시간 업데이트 함수
function updateDisplay() {
    const displayMinutes = Math.floor(remainingSeconds / 60);
    const displaySeconds = remainingSeconds % 60;
    document.getElementById("timerDisplay").innerText = `남은 시간: ${displayMinutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;
}

// 종료음 재생 함수
function playEndSound() {
    const endSound = document.getElementById("endSound");
    endSound.play();
}
