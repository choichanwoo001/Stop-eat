document.getElementById('search-button').addEventListener('click', function() {
    // Fetch the evaluation comments from the backend (this part is to be implemented)
    // Example:
    // fetch('backend_url')
    //     .then(response => response.json())
    //     .then(data => {
    //         // Use data to populate the comments
    //     });

    // Temporary comments for demonstration
    const calorieComment = "일주일 동안 적정 칼로리를 섭취하셨군요!😊❤️";
    const ratioComment = "탄수화물, 단백질, 지방 비율 모두 적절하게 섭취했어요!🥰 ";
    const finalComment = "일주일에 평균 1675kcal를 섭취하셨군요!<br> 탄수화물, 단백질, 지방 비율도 약 5:3:2로 골고루 섭취해주셨어요🥰<br> 다이어트를 위한 적정 칼로리와 균형 잡힌 탄단지 비율을 올바르게 섭취하셨네요!<br> 앞으로도 지금처럼 잘 유지하실 수 있도록 도와드릴게요❤<br> 이번주도 다이어트 화이팅!🥰💪";

    // Display the comments
    document.getElementById('calorie-comment').innerHTML = calorieComment;
    document.getElementById('ratio-comment').innerHTML = ratioComment;
    document.getElementById('final-comment').innerHTML = finalComment;


    // Calorie Chart
    const calorieXValues = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
    const calorieYValues = [1573, 1823, 1492, 1765, 1982, 1302, 1784];
    const calorieBarColors = ["#FF9286", "#FBB3A5", "#FFC5BA", "#FFCAD4", "#F4B7C6", "#FF92B1", "#FE7295"];

    new Chart("calorieChart", {
        type: "bar",
        data: {
            labels: calorieXValues,
            datasets: [{
                backgroundColor: calorieBarColors,
                data: calorieYValues
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
    const xValues = ["탄수화물", "단백질", "지방"];
    const yValues = [53, 31, 16];
    const barColors = [
        "#FE7295",
        "#FF9286",
        "#F4B7C6"
       
    ];

    new Chart("ratioChart", {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
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
