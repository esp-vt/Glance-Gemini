const musicToggle = document.getElementById('musicToggle');
const musicStatus = document.getElementById('musicStatus');

// Update status based on toggle switch state
musicToggle.addEventListener('change', () => {
  if (musicToggle.checked) {
    musicStatus.textContent = 'ON';
    musicStatus.style.color = '#4caf50'; // Green when ON
  } else {
    musicStatus.textContent = 'OFF';
    musicStatus.style.color = 'white'; // White when OFF
  }
});

// Example button click handlers
const settingsButton = document.querySelector('.settings');
settingsButton.addEventListener('click', () => {
  alert('Settings Button Clicked!');
});

// const therapistButton = document.querySelector('.therapist');
// therapistButton.addEventListener('click', () => {
//   alert('Personal Therapist Button Clicked!');
// });

// const weatherButton = document.querySelector('.weather');
// weatherButton.addEventListener('click', () => {
//   alert('Weather Button Clicked!');
// });

const calendarButton = document.querySelector('.calendar');
const calendarContainer = document.getElementById('calendarContainer');
const monthYear = document.getElementById('monthYear');
const calendarBody = document.querySelector('#calendar tbody');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

let currentDate = new Date();

// 달력을 표시하는 함수
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 현재 월과 연도를 표시
  monthYear.textContent = `${getMonthName(month)} ${year}`;

  // 달력 내용 비우기
  calendarBody.innerHTML = '';

  // 현재 월의 첫째 날
  const firstDay = new Date(year, month, 1);
  // 현재 월의 마지막 날
  const lastDate = new Date(year, month + 1, 0);
  
  // 첫 번째 요일 (일요일=0, 월요일=1, ...)
  const firstDayOfWeek = firstDay.getDay();

  // 마지막 날짜
  const lastDateOfMonth = lastDate.getDate();

  // 날짜 채우기
  let row = document.createElement('tr');
  for (let i = 0; i < firstDayOfWeek; i++) {
    row.appendChild(document.createElement('td')); // 빈 칸 추가
  }

  for (let date = 1; date <= lastDateOfMonth; date++) {
    if (row.children.length === 7) {
      calendarBody.appendChild(row);
      row = document.createElement('tr');
    }

    const cell = document.createElement('td');
    cell.textContent = date;

    // 날짜 클릭 시 선택 기능 추가
    cell.addEventListener('click', () => {
      // 선택된 날짜에 스타일 추가
      const selectedCell = document.querySelector('.selected');
      if (selectedCell) {
        selectedCell.classList.remove('selected');
      }
      cell.classList.add('selected');
    });

    row.appendChild(cell);
  }

  // 마지막 주 추가
  if (row.children.length > 0) {
    calendarBody.appendChild(row);
  }
}

// 월 이름을 반환하는 함수
function getMonthName(month) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[month];
}

// 이전 달로 이동
prevMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

// 다음 달로 이동
nextMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Calendar 버튼 클릭 시 달력 표시
calendarButton.addEventListener('click', () => {
  if (calendarContainer.style.display === 'none' || calendarContainer.style.display === '') {
    calendarContainer.style.display = 'block';
    renderCalendar();
  } else {
    calendarContainer.style.display = 'none';
  }
});

const todoButton = document.querySelector('.todo');
const checklist = document.getElementById('checklist');
const checklistItems = document.getElementById('checklistItems');
const newItemInput = document.getElementById('newItemInput');
const addItemButton = document.getElementById('addItemButton');

todoButton.addEventListener('click', () => {
  // Toggle the display of the checklist
  if (checklist.style.display === "none" || checklist.style.display === "") {
    checklist.style.display = "block";  // Show the checklist
  } else {
    checklist.style.display = "none";   // Hide the checklist
  }
});

// Add new task to the checklist when the button is clicked
addItemButton.addEventListener('click', () => {
  const newItemText = newItemInput.value.trim();
  if (newItemText !== "") {
    const newItem = document.createElement('li');
    newItem.innerHTML = `<input type="checkbox"> ${newItemText}`;
    checklistItems.appendChild(newItem);
    newItemInput.value = ''; // Clear the input field
  }
});

// Optionally, allow pressing Enter to add a new item
newItemInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addItemButton.click();
  }
});

// Toggle greeting text between states
const greeting = document.querySelector('.greeting');
let greetingState = 0;

greeting.addEventListener('click', () => {
  if (greetingState === 0) {
    greeting.textContent = '오늘의 운세';
    greetingState = 1;
  } else if (greetingState === 1) {
    greeting.textContent = '운세에 따른 짧은 격려';
    greetingState = 2;
  } else {
    greeting.textContent = 'Hi, Username'; // Reset to initial state
    greetingState = 0;
  }
});

// Clock을 표시할 요소 가져오기
const clockElement = document.querySelector('.clock');

// 현재 시간 체계를 저장할 변수 (12시간 체계 기본 설정)
let is12HourFormat = true;

// 시간을 표시하는 함수
function updateClock() {
  const now = new Date(); // 현재 시간 가져오기
  let hours = now.getHours(); // 24시간 체계의 시간
  const minutes = now.getMinutes().toString().padStart(2, '0'); // 분
  const seconds = now.getSeconds().toString().padStart(2, '0'); // 초

  let period = ""; // AM/PM 표시용 변수

  // 12시간 체계로 전환
  if (is12HourFormat) {
    if (hours >= 12) {
      period = "PM";
      if (hours > 12) hours -= 12; // 12시 이후는 12시간 체계로 변환
    } else {
      period = "AM";
      if (hours === 0) hours = 12; // 자정은 12시로 표시
    }
  }

  // 12시간 체계일 때, 시간을 12:00:00 PM 형식으로 표시
  const timeString = is12HourFormat 
    ? `${hours}:${minutes}:${seconds} ${period}` 
    : `${hours}:${minutes}:${seconds}`; // 24시간 체계일 때는 그냥 24시 체계로 표시

  // 'Clock' 버튼에 현재 시간 설정
  clockElement.textContent = timeString;
}

// 처음에 한번 실행해서 시간을 표시하고, 1초마다 업데이트
updateClock();
setInterval(updateClock, 1000);

// 클릭 시 시간 체계 변경
clockElement.addEventListener('click', () => {
  is12HourFormat = !is12HourFormat; // 12시간 체계와 24시간 체계 전환
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("chatModal");
  const openChatBtn = document.getElementById("openChatBtn");
  const closeBtn = document.querySelector(".close");

  const resultContainer = document.getElementById("resultContainer");
  const horoscopeElement = document.getElementById("horoscope");
  const weatherElement = document.getElementById("weather");
  const quoteElement = document.getElementById("quote");
  
  const API_KEY = "a8103c3ccfec81daceab535bd4b3c839";

  getLocation();

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
      weatherElement.innerHTML = "User denied the request for Geolocation.";
      break;
      case error.POSITION_UNAVAILABLE:
      weatherElement.innerHTML = "Location information is unavailable.";
      break;
      case error.TIMEOUT:
      weatherElement.innerHTML = "The request to get user location timed out.";
      break;
      default:
      weatherElement.innerHTML = "An unknown error occurred.";
    }
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather, showError);
    } else {
      weatherElement.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function getWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const location = data.name;
      const celsiusTemperature = Number(data.main.temp) - 273.15; // Convert to Celsius
      const fahrenheitTemperature = celsiusTemperature * 1.8 + 32; // Convert to Fahrenheit
      const formattedTemperature = fahrenheitTemperature.toFixed(2);
      const weatherDescription = data.weather[0].description;
      const icon = data.weather[0].icon;
      
      weatherElement.innerHTML = `
      <div class="weather-info">
      <h2>${location}</h2>
      <p><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weatherDescription}"></p>
      <p>Temperature: ${formattedTemperature}°F</p>
      <p>Condition: ${weatherDescription}</p>
      </div>
      `;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherElement.innerHTML = "Unable to fetch weather data.";
    });
  }

  // 모달 열기
  openChatBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // 모달 닫기
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 모달 외부 클릭 시 닫기
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // 채팅 입력 처리 (기본 동작 예제)
  // const chatInput = document.getElementById("chatInput");
  // const sendBtn = document.getElementById("sendBtn");
  // const chatWindow = document.getElementById("chatWindow");

  // sendBtn.addEventListener("click", () => {
  //   const message = chatInput.value.trim();
  //   if (message) {
  //     const msgElement = document.createElement("p");
  //     msgElement.textContent = `사용자: ${message}`;
  //     chatWindow.appendChild(msgElement);
  //     chatInput.value = ""; // 입력창 초기화
  //     chatWindow.scrollTop = chatWindow.scrollHeight; // 스크롤 자동 내려가기
  //   }
  // });

  const chatMessages = document.getElementById("chatMessages");
  const userInput = document.getElementById("userInput");
  const submitBtn = document.getElementById("submitBtn");
  const GEMINI_KEY = 'AIzaSyCjHNvWNz9T4aNtV7pQah_zIrzWCv6abJs';

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

  function addMessage(content, type) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", `${type}-message`);
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    userInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showLoading() {
    const loadingDiv = document.createElement("div");
    loadingDiv.classList.add("message", "loading");
    loadingDiv.textContent = "AI가 응답 중입니다...";
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return loadingDiv;
  }

  function removeLoading(loadingDiv) {
    if (loadingDiv) {
      chatMessages.removeChild(loadingDiv);
    }
  }

  submitBtn.addEventListener("click", async () => {
    const userMessage = userInput.value.trim();

    if (!userMessage) {
      alert("질문을 입력해주세요.");
      return;
    }

    addMessage(userMessage, "user");
    userInput.value = "";
    const loadingDiv = showLoading();

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: {
            role: "user",
            parts: [{ text: userMessage }]
          },
          generationConfig: {
            maxOutputTokens: 300
          }
        }),
      });
    
      const data = await response.json();
      removeLoading(loadingDiv);
    
      if (data && data.candidates && data.candidates[0].content.parts[0].text) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        addMessage(aiResponse, "ai");
      } else {
        addMessage("죄송합니다. 응답을 받을 수 없습니다.", "ai");
      }
    } catch (error) {
      removeLoading(loadingDiv);
      console.error("에러 발생:", error);
      addMessage("죄송합니다. 오류가 발생했습니다.", "ai");
    }
  });

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      submitBtn.click();
    }
  });
});
