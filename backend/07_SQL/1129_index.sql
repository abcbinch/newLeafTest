DROP TABLE IF EXISTS user; --user 테이블이 존재할 경우 삭제한다.
SHOW TABLES;

CREATE TABLE user{
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    specialize ENUM('축구','야구','클라이밍','배드민턴') NOT NULL,
    gender ENUM('남','여') NOT NULL,
    career_year INT NOT NULL
};--내가 한 것(오류 남)
--enum 작성할 때 띄어쓰기를 안 한 게 원인인가?

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    specialize ENUM('축구', '야구', '클라이밍', '배드민턴') NOT NULL,
    gender ENUM('남', '여') NOT NULL,
    career_year INT NOT NULL
);--챗봇

INSERT INTO user VALUES(NULL, '김판곤', '축구', '남', 40);
INSERT INTO user VALUES(NULL, '손흥민', '축구', '남',15);
INSERT INTO user VALUES(NULL, '김자인', '클라이밍', '여',10);
INSERT INTO user VALUES(NULL, '김동우', '축구', '남',1);
INSERT INTO user VALUES(NULL, '전유진', '배드민턴', '여',2);
INSERT INTO user VALUES(NULL, '이대호', '야구', '남',24);
INSERT INTO user VALUES(NULL, '안세영', '배드민턴', '여',11);
INSERT INTO user VALUES(NULL, '배서연', '클라이밍', '여',3);
INSERT INTO user VALUES(NULL, '황희찬', '축구', '남',9);
INSERT INTO user VALUES(NULL, '지소연', '축구', '여',17);
INSERT INTO user VALUES(NULL, '이정후', '야구', '남',11);
INSERT INTO user VALUES(NULL, '김광현', '야구', '남',21);

SELECT * FROM user;

--집계함수

SELECT COUNT(specialize) FROM user WHERE specialize='축구';
SELECT SUM(career_year) from user WHERE specialize='축구';
SELECT AVG(career_year) from user WHERE specialize='축구';
SELECT MIN(career_year) from user WHERE specialize='축구';
SELECT MAX(career_year) from user WHERE specialize='축구';


-- GROUP BY
SELECT specialize from user GROUP BY specialize;
SELECT specialize, COUNT(specialize) FROM user GROUP BY specialize;


-- HAVING
SELECT specialize, COUNT(specialize) 
FROM user 
WHERE gender='여' 
GROUP BY specialize 
HAVING COUNT(specialize);

-- DCL, 제어어
DESC mysql.user;

SELECT * FROM mysql.user;

CREATE USER 'user2'@'localhost' IDENTIFIED BY '1234';
--유저 계정을 만들고, 비번을 설정했다.

SHOW GRANTS;
--권한을 볼 수 있다.
SHOW GRANTS FOR 'user2'@'localhost';
--특정 계정(유저)에 대한 권한 조회
DROP USER 'user2'@'localhost';
--계정(유저) 삭제할 때는 DROP 사용

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password
by '0401';
--비밀번호를 0702에서 0401로 바꿨다.
--다만 다음에 다시 사용할 때 접속을 끊고 다시 비번 치고 들어와야 할 수도 있다.