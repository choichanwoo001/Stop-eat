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

// 입력 필드에 이벤트 리스너 추가
document.getElementById('height').addEventListener('input', calculateBMI);
document.getElementById('weight').addEventListener('input', calculateBMI);

// 폼 제출 시 사용자 정보 저장 함수
document.getElementById('profileForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const height = document.getElementById('height').value;
  const weight = document.getElementById('weight').value;
  const bmi = document.getElementById('bmi').value;
  const target_weight = document.getElementById('target_weight').value;

  const userId = localStorage.getItem('userId'); // 로그인 후 저장된 userId를 사용

  if (!userId) {
      alert('로그인 먼저 해주세요.');
      return;
  }

  fetch('http://localhost:3000/updateProfile', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          userId: userId,
          username: username,
          height: height,
          weight: weight,
          bmi: bmi,
          target_weight: target_weight
      }),
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('프로필 정보가 성공적으로 저장되었습니다.');
          window.location.href = 'mealInput.html'; // 저장이 성공하면 mealInput.html로 이동
      } else {
          alert('프로필 정보 저장에 실패했습니다.');
      }
  })
  .catch((error) => {
      console.error('Error:', error);
  });
});
