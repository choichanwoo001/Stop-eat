 // BMI 계산 함수
 function calculateBMI() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const bmi = document.getElementById('bmi');

    if (height > 0 && weight > 0) {
        const bmiValue = (weight / ((height / 100) ** 2)).toFixed(2);
        bmi.value = bmiValue;
    } else {
        bmi.value = '';
    }
}

// 비밀번호 확인 함수
function validatePassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('confirmPassword').setCustomValidity('비밀번호가 일치하지 않습니다.');
    } else {
        document.getElementById('confirmPassword').setCustomValidity('');
    }
}

// 입력 필드에 이벤트 리스너 추가
document.getElementById('height').addEventListener('input', calculateBMI);
document.getElementById('weight').addEventListener('input', calculateBMI);
document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('confirmPassword').addEventListener('input', validatePassword);