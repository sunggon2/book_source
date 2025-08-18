function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDayName(dayIndex) {
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return days[dayIndex];
}

function updateClock() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const dayName = getDayName(now.getDay());

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const ampm = hours >= 12 ? '오후' : '오전';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    const formattedHours = String(hours).padStart(2, '0');

    // 윤년 여부 (표시하지 않음)
    const _ = isLeapYear(year);

    document.getElementById('clock').textContent = `${ampm} ${formattedHours}:${minutes}:${seconds}`;
    document.getElementById('date').textContent = `${year}년 ${month}월 ${date}일 (${dayName})`;
}

setInterval(updateClock, 1000);
updateClock();