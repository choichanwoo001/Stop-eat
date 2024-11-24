document.getElementById('loginform').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('로그인 성공: ' + data.message);
          localStorage.setItem('userId', data.userId); // Save user ID for future requests
          window.location.href = 'main.html';
      } else if (data.error === 'user_not_found') {
          alert('사용자 정보를 찾을 수 없습니다. 회원가입을 진행해 주세요.');
      } else if (data.error === 'wrong_password') {
          alert('비밀번호가 틀렸습니다.');
      } else {
          alert('로그인 실패: ' + data.message);
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
});
