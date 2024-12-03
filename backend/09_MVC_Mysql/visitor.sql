-- Active: 1733117003929@@127.0.0.1@3306@newleaf
SHOW DATABASES;

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

CREATE USER 'sesac'@'%' IDENTIFIED BY '0401';

GRANT ALL PRIVILEGES ON *.* TO 'sesac'@'%' WITH GRANT OPTION;

ALTER USER 'sesac'@'%' IDENTIFIED WITH mysql_native_password BY '0401';
FLUSH PRIVILEGES;

SELECT*FROM mysql.user;

SHOW GRANTS FOR 'sesac'@'%';