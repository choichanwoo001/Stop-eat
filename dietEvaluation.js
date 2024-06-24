document.getElementById('search-button').addEventListener('click', function() {
    // Fetch the evaluation comments from the backend (this part is to be implemented)
    // Example:
    // fetch('backend_url')
    //     .then(response => response.json())
    //     .then(data => {
    //         // Use data to populate the comments
    //     });

    // Temporary comments for demonstration
    const calorieComment = "칼로리 섭취가 적절합니다.";
    const ratioComment = "탄수화물, 단백질, 지방 비율이 균형잡혀 있습니다.";
    const finalComment = "전체적으로 훌륭한 식단입니다.";

    // Display the comments
    document.getElementById('calorie-comment').textContent = calorieComment;
    document.getElementById('ratio-comment').textContent = ratioComment;
    document.getElementById('final-comment').textContent = finalComment;

    // Calorie Chart
    const calorieXValues = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
    const calorieYValues = [2000, 1800, 2200, 2100, 1900, 2300, 2500];
    const calorieBarColors = ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#66bb6a", "#ffa726", "#8d6e63"];

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
                display: true,
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
    const yValues = [60, 25, 15];
    const barColors = [
        "#ff6384",
        "#36a2eb",
        "#cc65fe"
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
                display: true,
                text: "Macronutrient Distribution"
            }
        }
    });
});
