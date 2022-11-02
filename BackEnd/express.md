# express 짤막하게 필기

## Express on Typescript 타입들

app의 타입: express.Express

### app.get에서

req(request 타입): express.Request
res(response 타입): express.Resopnse

## 라우터

라우터를 통해 서버는 클라이언트/프론트엔드 에서 요청을 받는다.  
사용자가 보낸 요청에 대한 라우터가 서버에 없다면 오류가 뜬다.

## 미들웨어

프론트엔드가 서버에 요청을 보내면 익스프레스는 라우터를 쭉 읽고 해당 요청에 대한 응답을 한다.  
이때 미들웨어가 라우터와 프론트엔드 사이에서 받은 요청을 정리하여 라우터에 전달하면 얼마나 좋을까

```typescript
//app.use함수 사용(특정 동사 (get 등)에 맞춰 사용하려면 use 대신 해당 동사 함수 사용하면 됨.), 콜백 함수로 전달되는 매개변수중 next는 다음 라우터로 이동시키는 함수
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  next();
});
```

사전적으로 검사해주는 느낌

## READ

```typescript
//고양이 읽기
app.get("/cats", (req, res) => {
  try {
    const cats = Cat;
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      error: (e as Error).message,
    });
  }
});
```

## CREATE

express에서 json을 post할 때는 따로 미들웨어를 처리해줘야 한다.

### 미들웨어

```typescript
app.use(express.json());
```

### post

```typescript
//* CREATE 고양이
app.post("/cats", (req, res) => {
  try {
    const data = req.body;
    Cat.push(data); //db에 저장해주면 됨
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      error: (e as Error).message,
    });
  }
});
```
