--1. DDL을 이용하여 MEMBER 테이블 만들기
SHOW DATABASES;

CREATE DATABASE practice CHARACTER SET utf8 COLLATE utf8_general_ci;
USE practice;

CREATE TABLE member(
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(5),
    age INT NOT NULL,
    gender VARCHAR(2),
    email VARCHAR(50) NOT NULL,
    promotion VARCHAR(2) NOT NULL
);

SHOW TABLES;
--2. 튜플 속성 변경, 추가, 제거
ALTER TABLE member MODIFY id INT;
ALTER TABLE member DROP age;
ALTER TABLE member ADD interest VARCHAR(30);
--3. CREATE로 USER 테이블 생성

CREATE TABLE user(
    id VARCHAR(10) NOT NULL PRIMARY KEY,
    pw VARCHAR(20) NOT NULL,
    name VARCHAR(5) NOT NULL,
    gender ENUM('F','M','') DEFAULT '',
    birthday DATE NOT NULL,
    age INT(3) NOT NULL DEFAULT 0
);

--4. INSERT사용, 테이블 조회
INSERT INTO user(id, pw, name, gender, birthday, age) VALUES('hong1234', '8o4bkg', '홍길동', 'M', '1990-01-31', 33);
INSERT INTO user(id, pw, name, gender, birthday, age) VALUES('sesysung','87awjkdf','성춘향','F','1992-03-31',31);
INSERT INTO user(id, pw, name, gender, birthday, age) VALUES('power70', 'qxur8sda', '변사또', 'M', '1970-05-02', 53);
INSERT INTO user(id, pw, name, gender, birthday, age) VALUES('hanjo','jk48fn4','한조','M','1984-10-18',39);
INSERT INTO user(id, pw, name, gender, birthday, age) VALUES('widowmaker','38wifh3', '위도우','F','1976-06-27', 47);
INSERT INTO user(id, pw, name, gender, birthday, age) VALUES('dvadva','k3f3ah','송하나','F','2001-06-03', 22);
INSERT INTO user(id, pw, name, gender, birthday, age) VALUES('jungkrat','4ifha7f','정크랫','M','1999-11-11',24);

SELECT * FROM user;

--5.SELECT 사용해보기
SELECT * FROM user ORDER BY birthday ASC;--1
SELECT * FROM user WHERE gender LIKE 'M' ORDER BY name DESC;--2
SELECT id, name FROM user WHERE birthday BETWEEN '1990-01-01' AND '1999-12-31';--3
SELECT * FROM user WHERE MONTH(birthday)=6 ORDER BY birthday ASC;--4번
SELECT * FROM user WHERE gender='M' AND birthday BETWEEN '1970-01-01' AND '1979-12-31' ;--5
SELECT * FROM user ORDER BY age DESC LIMIT 3;--6
SELECT * FROM user WHERE age BETWEEN 25 AND 50;--7
UPDATE user SET pw='12345678' WHERE id='hong1234' ;--8
DELETE FROM user WHERE id='jungkrat';--9

