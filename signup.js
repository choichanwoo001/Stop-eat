document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
  }

  fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('회원가입 성공: ' + data.message);
          window.location.href = 'login.html'; // 회원가입 후 로그인 페이지로 이동
      } else {
          alert('회원가입 실패: ' + data.message);
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
});
