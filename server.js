const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3000;
const saltRounds = 10;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: '최찬우', // MySQL 사용자 이름으로 변경
    password: 'choi3495', // MySQL 비밀번호로 변경
    database: 'logindb' // 데이터베이스 이름으로 변경
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// 사용자 등록
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ success: false, message: 'Error processing request.' });
        }

        const query = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hash], (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).json({ success: false, message: 'Error registering user.' });
            }
            res.status(200).json({ success: true, message: 'User registered successfully.' });
        });
    });
});

// 사용자 로그인
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM login WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ success: false, message: 'Error processing request.' });
        }

        if (results.length === 0) {
            return res.status(400).json({ success: false, message: '사용자 정보를 찾을 수 없습니다.', error: 'user_not_found' });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                console.error('Error comparing password:', err);
                return res.status(500).json({ success: false, message: 'Error processing request.' });
            }

            if (match) {
                res.status(200).json({ success: true, message: 'Login successful.', userId: user.id });
            } else {
                res.status(400).json({ success: false, message: '비밀번호가 틀렸습니다.', error: 'wrong_password' });
            }
        });
    });
});

// 프로필 업데이트
app.post('/updateProfile', (req, res) => {
    const { userId, username, height, weight, bmi, target_weight } = req.body; // targetWeight를 target_weight로 변경

    const sql = 'INSERT INTO my_info (user_id, username, height, weight, bmi, target_weight) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE username = VALUES(username), height = VALUES(height), weight = VALUES(weight), bmi = VALUES(bmi), target_weight = VALUES(target_weight)';
    const values = [userId, username, height, weight, bmi, target_weight];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating profile:', err);
            res.status(500).json({ success: false, message: 'Error updating profile.' });
            return;
        }

        res.status(200).json({ success: true, message: 'Profile updated successfully.' });
    });
});

// 사용자 정보 조회
app.get('/getUserInfo', (req, res) => {
  const userId = req.query.userId;

  const query = 'SELECT * FROM my_info WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
      if (err) {
          console.error('Error fetching user info:', err);
          return res.status(500).json({ success: false, message: 'Error fetching user info.' });
      }

      if (results.length === 0) {
          return res.status(400).json({ success: false, message: 'User not found.' });
      }

      res.status(200).json(results[0]);
  });
});

// Save meal record
app.post('/saveMeal', (req, res) => {
  const mealData = req.body;

  if (!Array.isArray(mealData) || mealData.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid meal data.' });
  }

  const checkQuery = 'SELECT * FROM today_meals WHERE user_id = ? AND date = ? AND meal_type = ? AND menu = ?';
  const insertQuery = 'INSERT INTO today_meals (user_id, date, meal_type, menu, calories) VALUES ?';
  const values = mealData.map(meal => [meal.userId, meal.date, meal.meal_type, meal.menu, meal.calories]);

  let hasError = false;
  let processedCount = 0;
  const newMeals = [];

  mealData.forEach((meal, index) => {
      db.query(checkQuery, [meal.userId, meal.date, meal.meal_type, meal.menu], (checkErr, checkResult) => {
          if (checkErr) {
              console.error('Error checking duplicate meal:', checkErr);
              if (!hasError) {
                  hasError = true;
                  return res.status(500).json({ success: false, message: 'Error checking duplicate meal.', error: checkErr.message });
              }
              return;
          }

          if (checkResult.length === 0) {
              newMeals.push(values[index]);
          }

          processedCount++;
          if (processedCount === mealData.length && !hasError) {
              if (newMeals.length === 0) {
                  return res.status(200).json({ success: true, message: 'No new meals to save.' });
              }

              db.query(insertQuery, [newMeals], (err, result) => {
                  if (err) {
                      console.error('Error saving meal:', err);
                      return res.status(500).json({ success: false, message: 'Error saving meal.', error: err.message });
                  }

                  res.status(200).json({ success: true, message: 'Meal saved successfully.' });
              });
          }
      });
  });
});

// Search food by name
app.get('/searchFood', (req, res) => {
  const { foodName } = req.query;
  const query = 'SELECT foodName, oneServing, calories FROM food_info WHERE foodName LIKE ?';

  db.query(query, [`%${foodName}%`], (err, results) => {
      if (err) {
          console.error('Error fetching food data:', err);
          return res.status(500).json({ error: 'Failed to fetch data' });
      }

      res.json(results);
  });
});


// 특정 날짜의 식단 기록 조회
app.get('/getMealRecords', (req, res) => {
    const { date, user_id } = req.query;

    const query = 'SELECT * FROM today_meals WHERE user_id = ? AND date = ?';
    db.query(query, [user_id, date], (err, results) => {
        if (err) {
            console.error('Error fetching meal records:', err);
            return res.status(500).json({ success: false, message: 'Error fetching meal records.' });
        }

        res.status(200).json(results);
    });
});

// 음식 검색 (foodName 기준)
app.get('/searchFoodByServing', (req, res) => {
  const { foodName } = req.query;
  const query = `SELECT foodName, oneServing, calories FROM food_data WHERE foodName LIKE ?`;

  console.log(`Executing query: ${query} with value: %${foodName}%`); // 쿼리와 값을 로그에 출력

  db.query(query, [`%${foodName}%`], (err, results) => {
      if (err) {
          console.error('Error executing query:', err); // 로그에 오류 메시지 출력
          res.status(500).json({ error: 'Failed to fetch data' });
          return;
      }
      console.log('Query results:', results); // 쿼리 결과를 로그
      res.json(results);
  });
});

// 주간 식단 기록 조회
app.get('/getWeeklyData', (req, res) => {
    const { startDate, endDate } = req.query;

    const query = `
        SELECT date, meal_type, SUM(calories) AS total_calories 
        FROM today_meals 
        WHERE date BETWEEN ? AND ?
        GROUP BY date, meal_type
    `;

    db.query(query, [startDate, endDate], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch data' });
            return;
        }

        res.json(results);
    });
});

// 정적 파일 서빙
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
