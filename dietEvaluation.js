document.getElementById('search-button').addEventListener('click', function() {
    // Toggle between two sets of example data for ratioChart
    let example1 = {
        calorieComment: "일주일 동안 적정 칼로리를 섭취하셨군요!😊❤️",
        ratioComment: "탄수화물, 단백질, 지방 비율 모두 적절하게 섭취했어요!🥰",
        finalComment: "일주일에 평균 1464kcal를 섭취하셨군요!<br> 탄수화물, 단백질, 지방 비율도 약 5:3:2로 골고루 섭취해주셨어요🥰<br> 다이어트를 위한 적정 칼로리와 균형 잡힌 탄단지 비율을 올바르게 섭취하셨네요!<br> 앞으로도 지금처럼 잘 유지하실 수 있도록 도와드릴게요❤<br> 이번주도 다이어트 화이팅!🥰💪",
        ratioXValues: ["탄수화물", "단백질", "지방"],
        ratioYValues: [53, 31, 16],
        ratioBarColors: ["#FE7295", "#FF9286", "#F4B7C6"],
        calorieYValues: [1503, 1423, 1492, 1565, 1382, 1402, 1484],
        calorieXValues: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
        calorieBarColors: ["#FF9286", "#FBB3A5", "#FFC5BA", "#FFCAD4", "#F4B7C6", "#FF92B1", "#FE7295"]
    };

    let example2 = {
        calorieComment: "일주일 동안 너무 많은 칼로리를 섭취했어요🥺💧",
        ratioComment: "탄수화물과 지방을 너무 많이 섭취했어요😭",
        finalComment: "일주일에 평균 1786kcal를 섭취하셨군요!<br> 하루 적정 칼로리 대비 많은 칼로리를 섭취하셨어요😞<br> 탄수화물과 지방을 줄이고 단백질 섭취량을 늘려보시는 걸 권유드려요🥺<br> 다이어트를 하기 위해서는 지금보다 약 300kcal 정도를 덜 섭취하셔야 해요💧<br> 앞으로 다이어트를 돕기 위해 더 좋은 식단을 추천드릴 수 있도록 노력할게요!<br> 건강을 위해 조금만 더 같이 노력해보아요!💪",
        ratioXValues: ["탄수화물", "단백질", "지방"],
        ratioYValues: [67 ,15, 18],
        ratioBarColors: ["#FF9286", "#FBB3A5", "#FFCAD4"],
        calorieYValues: [1923, 1835, 1824, 1742, 1624, 1821, 1734],
        calorieXValues: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
        calorieBarColors: ["#FF9286", "#FBB3A5", "#FFC5BA", "#FFCAD4", "#F4B7C6", "#FF92B1", "#FE7295"]
    };

    let currentExample = document.getElementById('ratio-comment').innerHTML === example1.ratioComment ? example2 : example1;

    document.getElementById('calorie-comment').innerHTML = currentExample.calorieComment;
    document.getElementById('ratio-comment').innerHTML = currentExample.ratioComment;
    document.getElementById('final-comment').innerHTML = currentExample.finalComment;

    // Calorie Chart


    new Chart("calorieChart", {
        type: "bar",
        data: {
            labels: currentExample.calorieXValues,
            datasets: [{
                backgroundColor: currentExample.calorieBarColors,
                data: currentExample.calorieYValues
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: false,
                text: "일별 칼로리 섭취"
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0  // Ensure that the minimum value of the y-axis is 0
                    }
                }]
            }
        }
    });

    // Ratio Chart
    new Chart("ratioChart", {
        type: "doughnut",
        data: {
            labels: currentExample.ratioXValues,
            datasets: [{
                backgroundColor: currentExample.ratioBarColors,
                data: currentExample.ratioYValues
            }]
        },
        options: {
            title: {
                display: false,
                text: "일주일 섭취 탄단지 비율 그래프"
            }
        }
    });
});
