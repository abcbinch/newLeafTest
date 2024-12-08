-- Active: 1733117003929@@127.0.0.1@3306@newleaf
SHOW DATABASES;
SHOW TABLES;

USE newLeaf;

CREATE TABLE visitor(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    comment MEDIUMTEXT
);

DESC visitor;

INSERT INTO visitor(name, comment) VALUES('Charlotte','Hi, I am Charlotte!');
INSERT INTO visitor VALUES(null, 'Knight','...');
INSERT INTO visitor VALUES(null, 'Yi','...hi');

SELECT * FROM visitor;

UPDATE visitor SET comment="git gud" WHERE id=2;

DELETE FROM visitor WHERE id=3;

-- 새로운 사용자 만들기

-- DCL

CREATE USER 'sesac'@'%' IDENTIFIED BY '0401';--잘 기억해두기
--외부에서 최상위  계정(루트)으로의 비밀번호 접근을 허용하지 않는다.
--새로운 사용자를 만들고 그 사용자로 접근을 해야 한다.

GRANT ALL PRIVILEGES ON *.* TO 'sesac'@'%' WITH GRANT OPTION;

ALTER USER 'sesac'@'%' IDENTIFIED WITH mysql_native_password BY '0401';
FLUSH PRIVILEGES;

SELECT*FROM mysql.user;

SHOW GRANTS FOR 'sesac'@'%';

