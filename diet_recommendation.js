function calculateBMI() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const bmiValueElement = document.getElementById('bmiValue');
    const bmiStatusElement = document.getElementById('bmiStatus');
    const bmiMessageElement = document.getElementById('bmiMessage');
    const bmiRecommendationElement = document.getElementById('bmiRecommendation');

    if (age > 0 && height > 0 && weight > 0) {
        const bmiValue = (weight / ((height / 100) ** 2)).toFixed(2);
        bmiValueElement.innerText = bmiValue;

        let bmiStatus = '';
        let bmiMessage = '';
        let bmiRecommendation = 'Easy, Medium';

        if (gender === 'female') {
            if (age >= 2 && age <= 5) {
                if (bmiValue < 14.0) bmiStatus = '저체중';
                else if (bmiValue <= 18.9) bmiStatus = '정상 체중';
                else bmiStatus = '과체중';
            } else if (age >= 6 && age <= 11) {
                if (bmiValue < 15.0) bmiStatus = '저체중';
                else if (bmiValue <= 20.9) bmiStatus = '정상 체중';
                else bmiStatus = '과체중';
            } else if (age >= 12 && age <= 18) {
                if (bmiValue < 17.5) bmiStatus = '저체중';
                else if (bmiValue <= 24.9) bmiStatus = '정상 체중';
                else bmiStatus = '과체중';
            } else if (age >= 19 && age <= 34) {
                if (bmiValue < 18.5) bmiStatus = '저체중';
                else if (bmiValue <= 24.9) bmiStatus = '정상 체중';
                else bmiStatus = '과체중';
            } else if (age >= 35 && age <= 54) {
                if (bmiValue < 20.0) bmiStatus = '저체중';
                else if (bmiValue <= 25.9) bmiStatus = '정상 체중';
                else bmiStatus = '과체중';
            } else if (age >= 55 && age <= 74) {
                if (bmiValue < 22.0) bmiStatus = '저체중';
                else if (bmiValue <= 27.9) bmiStatus = '정상 체중';
                else bmiStatus = '과체중';
            } else {
                if (bmiValue < 24.0) bmiStatus = '저체중';
                else if (bmiValue <= 29.9) bmiStatus = '정상 체중';
                else bmiStatus = '과체중';
            }
        } else {
            if (age >= 2 && age <= 5) {
                if (bmiValue < 15.0) bmiStatus = '저체중';
                else if (bmiValue <= 19.9) bmiStatus = '정상 체중';
                else bmiStatus = '과체중';
            } else if (age >= 6 && age <= 11) {
                if (bmiValue < 16.0) bmiStatus = '저체중';
                else if (bmiValue <= 21.9) bmiStatus = '정상 체중';
                else bmiStatus = '과체중';
            } else if (age >= 12 && age <= 18) {
                if (bmiValue < 18.5) bmiStatus = '저체중';
                else if (bmiValue <= 24.9) bmiStatus = '정상 체중';
                else bmiStatus = '과체중';
            } else if (age >= 19 && age <= 34) {
                if (bmiValue < 19.0) bmiStatus = '저체중';
                else if (bmiValue <= 25.9) bmiStatus = '정상 체중';
                else bmiStatus = '과체중';
            } else if (age >= 35 && age <= 54) {
                if (bmiValue < 21.0) bmiStatus = '저체중';
                else if (bmiValue <= 26.9) bmiStatus = '정상 체중';
                else bmiStatus = '과체중';
            } else if (age >= 55 && age <= 74) {
                if (bmiValue < 23.0) bmiStatus = '저체중';
                else if (bmiValue <= 28.9) bmiStatus = '정상 체중';
                else bmiStatus = '과체중';
            } else {
                if (bmiValue < 25.0) bmiStatus = '저체중';
                else if (bmiValue <= 30.9) bmiStatus = '정상 체중';
                else bmiStatus = '과체중';
            }
        }

        if (bmiStatus === '저체중') {
            bmiMessage = '체중을 늘리기 위해 노력해보세요.';
            bmiRecommendation = 'Easy';
        } else if (bmiStatus === '정상 체중') {
            bmiMessage = '과도한 다이어트보다는 건강한 식습관을 유지해보세요.';
            bmiRecommendation = 'Easy, Medium';
        } else {
            bmiMessage = '체중을 줄이기 위해 노력해보세요.';
            bmiRecommendation = 'Medium, Hard';
        }

        bmiStatusElement.innerText = bmiStatus;
        bmiMessageElement.innerText = bmiMessage;
        bmiRecommendationElement.innerText = bmiRecommendation;
    } else {
        bmiValueElement.innerText = '___';
        bmiStatusElement.innerText = '___';
        bmiMessageElement.innerText = '___';
        bmiRecommendationElement.innerText = '___';
    }
}

function selectIntensity(intensity) {
    const dietRecommendationElement = document.getElementById('dietRecommendation');
    let recommendation = '';

    if (intensity === 'easy') {
        recommendation = 'Easy 강도의 식단 추천: \n1. 샐러드 \n2. 과일 \n3. 저지방 요거트';
    } else if (intensity === 'medium') {
        recommendation = 'Medium 강도의 식단 추천: \n1. 구운 닭가슴살 \n2. 찐 야채 \n3. 현미밥';
    } else if (intensity === 'hard') {
        recommendation = 'Hard 강도의 식단 추천: \n1. 고단백 식품 \n2. 고섬유질 식품 \n3. 저탄수화물 식단';
    }

    dietRecommendationElement.innerText = recommendation;
}
