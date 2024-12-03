show databases;
--sql은 비절차적 언어라서 순서는 내 마음대로 해도 된다.
--그러나 한 번에 여러 명령어를 실행시킬 경우,
--위에 있는 것들 중 하나라도 오류가 나면, 아래 있는 것들은 하나도 실행되지 않는다.
--똑같은 내용을 다시 넣으려고 하면, 덮어쓰거나 하는 게 아니라 오류가 난다.


CREATE DATABASE mydatabase DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE DATABASE newLeaf CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- 더 많은 문자열 지원
/* 이모지, 특수문자, 다국어 등등 */

-- 데이터베이스 사용 선언
USE newLeaf;

SHOW TABLES;

DROP DATABASE mydatabase;

--테이블 관련 명령어---------------------------------------------------------

/* 
CREATE TABLE ~~(
    속성명 데이터타입 제약조건,
    ~~,
    ~~,
    .
    .
    .

);
-제약 조건(여러 종류 줄 수 있다.)
NOT NULL: null을 허용하지 않는다.
AUTO_INCREMENT: 자동 숫자 증가. 무슨 뜻? 속성명의 숫자가 늘어난다?
PRIMARY KEY: 튜플 식별용. null과 중복을 허용하지 않는다. 튜플 중 하나에만 줄 수 있다.
DEFAULT: 기본 값 설정
UNIQUE: 중복 허용을 허락하지 않는다. null 허용 안 함. 그러나 여러 튜플에 줄 수 있다.
 */

 CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    model_number VARCHAR(15) NOT NULL,
    series VARCHAR(30) NOT NULL
 );

 SHOW TABLES; --테이블 목록 확인

 DESC products; --테이블 구조 확인

 DROP TABLE products;

 ALTER TABLE products ADD new_column VARCHAR(20);--컬럼 추가
 ALTER TABLE products MODIFY new_column INT; -- 데이터 타입 변경. 
 --그 이외의 것도 바꿀 수 있나?

 ALTER TABLE products DROP new_column; --컬럼 삭제

--DML, 데이터 조작어 ------------------------------------------------------------------

--데이터 CRUD에 사용한다.

CREATE TABLE user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    age INT NOT NULL,
    address VARCHAR(100)
);

SHOW TABLES;

--INSERT INTO
INSERT INTO user (name, age, address) VALUES('김민정',20,'서울특별시 마포구');
INSERT INTO user (name, age, address) VALUES('권용래',20,'대구광역시 동구');
INSERT INTO user (name, age, address) VALUES('랄세이',14,'다크월드');
INSERT INTO user (name, age, address) VALUES('샤를로테',15,'집');
INSERT INTO user (name, age, address) VALUES('호넷',3000,'신성둥지');
INSERT INTO user (name, age, address) VALUES('금마리',18,'조선');
INSERT INTO user (name, age, address) VALUES('예',600,'봉래 하나라');
INSERT INTO user (name, age, address) VALUES('항아',25,'봉래 하나라');
INSERT INTO user (name, age, address) VALUES('희',6000,'봉래');

INSERT INTO user (name, age, address) VALUES('마도츠키',15,'일본');
INSERT INTO user (name, age, address) VALUES('질',21,'지구');
INSERT INTO user (name, age, address) VALUES('스칼렛',16,'진계');
INSERT INTO user (name, age) VALUES('슬러그캣',1000);

--READ
--SELECT
SELECT * FROM user; --전체 조회
SELECT name FROM user;
SELECT name, age FROM user;

--where
SELECT * FROM user WHERE age >=20;
SELECT * FROM user WHERE id=3;
SELECT id,age FROM user WHERE name='항아';

--like
--패턴 조회
SELECT * FROM user WHERE address LIKE '%하나라';
SELECT * FROM user WHERE name LIKE '__로%';
--n번째 자리에 '로'가 들어가는 사람을 찾고 싶으면 반드시 뒤에 %도 같이 붙여줘야 한다.
--그냥 언더바만 쓰고 그 끝에 '로'를 쓰면, 이름이 '로'로 끝나는 사람을 찾는다는 뜻이 된다.
SELECT * FROM user WHERE address LIKE '%광역시%';

--IN(list)
SELECT * FROM user WHERE age IN (20, 21, 22, 23);
--between
SELECT * FROM user WHERE age BETWEEN 20 AND 30;
SELECT * FROM user WHERE age BETWEEN 30 AND 20;--작은 수가 앞에, 큰 수가 뒤에 와야 한다.
-- 그렇게 쓰지 않으면 아무것도 안 나온다.

--주소가 null인 슬러그캣
SELECT * FROM user WHERE address IS NULL;
--주소가 NULL인 유저 조회
SELECT * FROM user WHERE address IS NOT NULL;
--주소가 NULL이 아닌 유저 조회


--논리 연산자
--주소가 NULL이 아니면서, AGE가 25 초과인 전체 속성
SELECT * FROM user WHERE address IS NOT NULL AND age > 25;

--금 씨이면서 나이가 18인 사람
SELECT * FROM user WHERE name LIKE '금%' AND age = 18;

--서울에 살거나 김씨인 사람
SELECT * FROM user WHERE address LIKE '서울%' OR name LIKE '김%';

--정렬, 중복 제거, 제한-------------------------------------------------------------

SELECT * FROM user ORDER BY age DESC; --나이를 기준으로 정렬한다.

SELECT * FROM user WHERE id > 6 ORDER BY age ASC;
--id가 6보다 큰 튜플을 먼저 추린 다음, 나이 기준 오름차순으로 정렬했다.

SELECT DISTINCT age FROM USER ORDER BY age ASC;

SELECT name, address FROM USER WHERE address LIKE '서울%' LIMIT 2; 
SELECT name, address FROM USER WHERE address LIKE '봉래%' LIMIT 2; 

SELECT * FROM user;
-- UPDATE

UPDATE user SET name='가스터' WHERE id=13; 
UPDATE user SET address='서울특별시 도봉구' WHERE id=1;
UPDATE user SET address = '제주특별자치도 제주시', name='권준민' WHERE id=12;

-- DELETE 
DELETE FROM user WHERE id=13;
DELETE FROM user WHERE id>5;

-- DEFAULT 설정
CREATE TABLE student(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL DEFAULT '홍길동',
    hobby VARCHAR(20)
);

INSERT INTO student(hobby) VALUES('등산');
INSERT INTO student(hobby, name) VALUES('간식 먹기','Kris');
-- INSERT INTO student VALUES(NULL, NULL, '독서');
-- 기본값이 있더라도 일부러 NULL을 줄 수는 없다.

DESC student;
SELECT * FROM student;