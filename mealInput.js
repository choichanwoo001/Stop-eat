function addMenuItem(mealType) {
    const group = document.getElementById(`${mealType}-group`);
    const index = group.childElementCount / 2; // 현재 추가된 행의 수를 기준으로 인덱스를 결정
    
    const menuRow = document.createElement('div');
    menuRow.className = 'input-row';
    menuRow.innerHTML = `
        <label for="${mealType}-menu-${index}">메뉴:</label>
        <input type="text" id="${mealType}-menu-${index}" class="menu-input" data-meal="${mealType}">
        <button class="search-button" onclick="searchCalories('${mealType}', ${index})">검색</button>
    `;
    
    const calorieRow = document.createElement('div');
    calorieRow.className = 'input-row';
    calorieRow.innerHTML = `
        <label for="${mealType}-calories-${index}">칼로리:</label>
        <div id="${mealType}-calories-${index}" class="calorie-display" data-meal="${mealType}"></div>
    `;
    
    group.appendChild(menuRow);
    group.appendChild(calorieRow);
}

function saveCalories() {
    const date = document.getElementById('record-date').value;
    if (!date) {
        alert('날짜를 선택해주세요.');
        return;
    }

    const meals = ['breakfast', 'lunch', 'dinner', 'snack'];
    const calories = {};

    meals.forEach(meal => {
        const displays = document.querySelectorAll(`.calorie-display[data-meal=${meal}]`);
        calories[meal] = Array.from(displays).reduce((total, display) => {
            const cal = parseInt(display.textContent) || 0;
            return total + cal;
        }, 0);
    });

    const totalCalories = Object.values(calories).reduce((total, cal) => total + cal, 0);
    document.getElementById('total-calories').textContent = `${date}의 총 섭취 칼로리는 ${totalCalories}kcal입니다!`;

    let adviceText = '';
    if (calories.snack > 200) {
        adviceText = '간식을 조금만 줄여보는 건 어떨까요?';
    } else {
        adviceText = '잘하고 있어요! 계속 유지하세요!';
    }

    const adviceBubble = document.getElementById('advice-bubble');
    adviceBubble.textContent = adviceText;
    adviceBubble.style.display = 'block';

    // 입력 필드 초기화
    document.querySelectorAll('.menu-input').forEach(input => input.value = '');
    document.querySelectorAll('.calorie-display').forEach(display => display.textContent = '');
}

function searchCalories(mealType, index) {
    const menuInput = document.getElementById(`${mealType}-menu-${index}`);
    const calorieDisplay = document.getElementById(`${mealType}-calories-${index}`);

    // Simulate fetching calorie data for the given menu
    // This should be replaced with an actual API call
    const mockCalories = {
        '김밥': 250,
        '라면': 500,
        '샐러드': 150
    };

    const menu = menuInput.value;
    const calories = mockCalories[menu] || 0;

    // Display the fetched calorie data
    calorieDisplay.textContent = calories ? `${calories} kcal` : '칼로리 정보를 찾을 수 없습니다';
}

// 임시 데이터로 그래프 표시
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('calorie-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07'],
            datasets: [
                {
                    label: '아침',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    data: [300, 500, 400, 600, 350, 450, 500]
                },
                {
                    label: '점심',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    data: [700, 800, 750, 700, 900, 850, 800]
                },
                {
                    label: '저녁',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    data: [600, 700, 800, 650, 700, 750, 700]
                },
                {
                    label: '간식',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    data: [200, 300, 250, 200, 300, 250, 200]
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'category',
                    labels: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07']
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById('start-date').addEventListener('change', updateChart);
    document.getElementById('end-date').addEventListener('change', updateChart);

});

function updateChart() {
    // 여기서는 날짜에 맞춰 데이터를 업데이트하는 로직을 추가하세요.
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    console.log(`날짜 범위: ${startDate} - ${endDate}`);
}
