

const app = require('./app');
require('./env');
const router = require('./controller');
app.use('/api', router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is listening on PORT: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});


/*
- GET: /api/users - DB에 있는 모든 유저들의 닉네임 리스트를 반환합니다.
- GET: /api/users/:id - DB에서 해당 id를 가진 유저 반환합니다.
- GET: /api/users/results - DB에서 해당 문자열을 포함한 닉네임을 가진 유저들을 반환합니다.
- PUT: /api/users/:id - DB에서 해당 id를 가진 유저의 회원정보를 수정합니다.
- DELETE: /api/users/:id - 해당 id를 가진 유저의 회원탈퇴를 수행합니다.
*/

app.get('/api/users', (req, res) => {
  res.send('모든 유저들의 닉네임 리스트를 반환했습니다.');
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  res.send(id);
});

app.get('/api/users/results', (req, res) => {
  const { tag } = req.query;
  const people = obj_list.filter((obj) => obj.tags.includes(tag));

  if (people.lenth == 0){
      res.send('존재하지 않습니다.');
  } else {
      res.send(people);
  }
})

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  idx = obj.list.findIndex((obj) => obj.id == id);
  if (ooj_idx === -1){
      res.send('존재하지 않습니다.');
  } else {
      obj_list[idx] = { id, name, age };
      res.send(obj_list);
  }
});

app.delete('/api/users/:id', (req, res) => {
  res.send('회원탈퇴가 완료됐습니다.');
});

/*
- POST: /api/auth/register - 회원가입을 수행합니다.
- POST: /api/auth/login - 로그인을 수행합니다.
- GET: /api/auth/logout - 로그아웃을 수행합니다.
*/
