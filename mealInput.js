// 메뉴를 검색하여 칼로리를 표시하는 함수
function searchFunction(meal, index) {
  const menuElement = document.getElementById(`${meal}-menu-${index}`);
  const calorieElement = document.getElementById(`${meal}-calories-${index}`);
  
  if (!menuElement || !calorieElement) {
      console.error(`Elements with ID ${meal}-menu-${index} or ${meal}-calories-${index} not found`);
      return;
  }

  const foodName = menuElement.value;
  
  if (!foodName) {
      alert('메뉴를 입력하세요.');
      return;
  }

  // 서버로 검색 요청 보내기
  fetch(`http://localhost:3000/searchFood?foodName=${encodeURIComponent(foodName)}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          if (data.length === 0) {
              alert('검색 결과가 없습니다.');
              return;
          }
          const result = data[0];
          calorieElement.innerText = `총 칼로리: ${Math.round(result.calories)} kcal (${result.oneServing}g 당 ${Math.round(result.calories)} kcal)`;
      })
      .catch(error => {
          console.error('Error fetching food data:', error);
          alert('음식 데이터를 가져오는데 실패했습니다.');
      });
}

// 모든 식사 정보를 저장하는 함수
function saveAllMeals() {
  const date = document.getElementById('record-date').value;
  if (!date) {
      alert('날짜를 선택하세요.');
      return;
  }

  const meals = [];
  ['breakfast', 'lunch', 'dinner', 'snack'].forEach(mealTime => {
      document.querySelectorAll(`#${mealTime}-group .input-row`).forEach((row, index) => {
          const foodNameElement = document.getElementById(`${mealTime}-menu-${index}`);
          const caloriesElement = document.getElementById(`${mealTime}-calories-${index}`);

          if (foodNameElement && caloriesElement) {
              const foodName = foodNameElement.value;
              const caloriesText = caloriesElement.innerText.split(' ')[2];
              const calories = parseFloat(caloriesText);

              if (foodName && !isNaN(calories)) {
                  meals.push({ userId: 1, date, meal_type: mealTime, menu: foodName, calories });
              }
          }
      });
  });

  fetch('http://localhost:3000/saveMeal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meals)
  })
      .then(response => response.json())
      .then(data => {
          if (data.error) {
              alert('저장하는데 실패했습니다: ' + data.message);
          } else {
              alert('데이터가 성공적으로 저장되었습니다.');
              evaluateTotalCalories(meals);
          }
      })
      .catch(error => {
          console.error('Error saving data:', error);
          alert('저장하는데 실패했습니다.');
      });
}

// 총 칼로리를 계산하고 평가하는 함수
function evaluateTotalCalories(meals) {
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const adviceBubble = document.getElementById('advice-bubble');
  
  if (totalCalories > 2300) {
      adviceBubble.innerHTML = `총 칼로리: ${totalCalories} kcal. 칼로리가 너무 높습니다. 조절이 필요합니다.<br><a href="dietEvaluation.html">자세히 보기</a>`;
  } else {
      adviceBubble.innerHTML = `총 칼로리: ${totalCalories} kcal. 적절한 칼로리 섭취입니다.<br><a href="dietEvaluation.html">자세히 보기</a>`;
  }
}

// 주간 데이터를 불러오는 함수
function fetchWeeklyData() {
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;

  if (!startDate || !endDate) {
      alert('시작 날짜와 종료 날짜를 모두 선택하세요.');
      return;
  }

  fetch(`http://localhost:3000/getWeeklyData?startDate=${startDate}&endDate=${endDate}`)
      .then(response => response.json())
      .then(data => {
          displayWeeklyData(data);
      })
      .catch(error => {
          console.error('Error fetching weekly data:', error);
          alert('주간 데이터를 가져오는데 실패했습니다.');
      });
}

// 주간 데이터를 차트에 표시하는 함수
function displayWeeklyData(data) {
  const labels = [];
  const caloriesData = { breakfast: [], lunch: [], dinner: [], snack: [] };

  data.forEach(row => {
      if (!labels.includes(row.date)) {
          labels.push(row.date);
      }
      caloriesData[row.meal_type].push(row.total_calories);
  });

  const ctx = document.getElementById('calorie-chart').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels,
          datasets: [
              {
                  label: '아침',
                  data: caloriesData.breakfast,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1
              },
              {
                  label: '점심',
                  data: caloriesData.lunch,
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
              },
              {
                  label: '저녁',
                  data: caloriesData.dinner,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
              },
              {
                  label: '간식',
                  data: caloriesData.snack,
                  borderColor: 'rgba(153, 102, 255, 1)',
                  borderWidth: 1
              }
          ]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

  const totalCalories = (caloriesData.breakfast.reduce((a, b) => a + b, 0) +
      caloriesData.lunch.reduce((a, b) => a + b, 0) +
      caloriesData.dinner.reduce((a, b) => a + b, 0) +
      caloriesData.snack.reduce((a, b) => a + b, 0)) / labels.length;

  const height = 1.75; // 키를 미터 단위로 설정 (예: 1.75m)
  const standardWeight = calculateStandardWeight(height);
  const recommendedCalories = calculateRecommendedCalories(standardWeight);
  const weeklyAdvice = totalCalories > recommendedCalories ? '평균 칼로리가 너무 높습니다.' : '평균 칼로리가 적당합니다.';
  document.getElementById('weekly-advice-bubble').innerHTML = `${weeklyAdvice}<br><a href="dietEvaluation.html">자세히 보기</a>`;
}

// 표준체중을 계산하는 함수 (21.5로 고정)
function calculateStandardWeight(height) {
  return height * height * 21.5;
}

// 일일 권장 칼로리를 계산하는 함수 (활동 지수 30으로 고정)
function calculateRecommendedCalories(standardWeight) {
  return standardWeight * 30;
}

// "저장하기" 버튼에 이벤트 리스너 추가
document.querySelector('.save-button').addEventListener('click', saveAllMeals);

// 이벤트 리스너를 검색 버튼에 추가
document.querySelectorAll('.search-button').forEach((button, index) => {
  const meal = button.closest('.meal-card').id.split('-')[0];
  button.addEventListener('click', () => searchFunction(meal, index));
});

// 주간 데이터를 불러오는 이벤트 리스너 추가
document.getElementById('start-date').addEventListener('change', fetchWeeklyData);
document.getElementById('end-date').addEventListener('change', fetchWeeklyData);
