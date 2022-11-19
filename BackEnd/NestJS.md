# NestJS

공식문서에 없는 내용 위주

## DTO, DAO

DTO: 클라이언트 -> 백앤드 전달하는 데이터  
DAO: 백엔드 -> 데이터베이스 전달하는 데이터

## IoC (Inversion of Control) & DI (Dependency Injection)

소프트웨어 디자인 패턴.  
@injectable()로 구현  
프로그래머가 작성한 프로그램이 재사용 라이브러리의 흐름제어를 받는다.  
https://sabarada.tistory.com/67  
닥치고 읽도록 하자.

## CORS

## Repository 패턴

서비스와 데이터베이스 사이에 레이어를 하나 더 배치  
데이터베이스에 접근하는 로직을 담음.  
만약 데이터베이스를 바꾸거나 여러 데이터베이스를 사용하는 경우에 관리하기가 용이함. (만약 레포지토리가 없이 구현이 끝난 상태에서 데이터베이스를 바꾸려 하면 바뀐 데이터베이스에 대한 접근 방식을 일일히 수정해줘야함.)

## 앞으로 공부해야 할 것들

node: https://nodejs.org/en/docs/  
jwt: https://jwt.io/introduction  
bcrypt: https://www.npmjs.com/package/bcrypt  
multer: https://github.com/expressjs/multer  
rxjs: https://rxjs.dev/api
