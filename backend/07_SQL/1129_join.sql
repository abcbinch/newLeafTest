show tables;
--부모 테이블
CREATE TABLE customer(
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    birthday DATE NOT NULL
);

DESC customer;

INSERT INTO customer
VALUES('aaa','손흥민','1992-03-17');
INSERT INTO customer
VALUES('bbb','황희찬','1997-11-01');
INSERT INTO customer
VALUES('ccc','이강인','2001-05-31');
INSERT INTO customer
VALUES('ddd','조현우','1992-03-17');

--자식 테이블
CREATE TABLE orderlist(
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(10) NOT NULL,
    product_name VARCHAR(20) NOT NULL,
    quantity INT,
    FOREIGN KEY(customer_id) REFERENCES customer(id) ON UPDATE CASCADE ON DELETE CASCADE
);--foreign key 안에는 '현재 테이블에서 어떤 것이 외래 키인지'를 적는다
-- references 다음에는 '어떤 테이블에서, 어떤 키를 가지고 왔는지'를 적는다.
--외래 키로 연결되어 있다면, 자식 테이블(빌린 테이블, 외래키를 가지고 있는, 여기서는 orderlist)을 먼저 삭제하고, 
--그 다음 부모 테이블(빌려준 테이블, 참조된 기본 키를 가지고 있는, 여기서는 customer)을 삭제해야 삭제가 가능하다.

-- ON UPDATE CASCADE:
--기준 테이블의 데이터가 변경되면 참조 테이블의 데이터도 변경된다.
--여기서는, 회원테이블 아이디가 바뀌면, 주문서 테이블의 아이디도 바뀐다.
-- ON DELETE CASCADE:
--기준 테이블의 데이터가 삭제되면, 참조 테이블의 데이터도 삭제된다.
--회원 테이블에서 회원 정보가 삭제되면, 주문서 테이블의 아이디도 없어진다.

DESC orderlist;

INSERT INTO orderlist (customer_id, product_name, quantity)
VALUES('aaa','맥북', 1);
INSERT INTO orderlist (customer_id, product_name, quantity)
VALUES('bbb','빅파이', 31);
INSERT INTO orderlist (customer_id, product_name, quantity)
VALUES('ccc','키보드', 3);
INSERT INTO orderlist (customer_id, product_name, quantity)
VALUES('bbb','초코파이', 5);
INSERT INTO orderlist (customer_id, product_name, quantity)
VALUES('ccc','시나모롤 텀블러', 2);
INSERT INTO orderlist (customer_id, product_name, quantity)
VALUES('fff','시나모롤 텀블러', 2);
--부모 테이블에 없는 데이터를 넣으려 하면 오류 난다.


######join
--JOIN: 두 테이블을 묶어서 하나의 테이블로 만든다.

--INNER JOIN
-- 1. INNER JOIN ON

SELECT * FROM customer
INNER JOIN orderlist ON customer.id=orderlist.customer_id;
--1-2. WHERE로 INNER JOIN
SELECT * FROM customer, orderlist
WHERE customer.id=orderlist.customer_id;
--둘이 같은 결과

--2. WHERE와 INNER JOIN
SELECT * FROM customer id
INNER JOIN orderlist
ON customer.id = orderlist.customer_id
WHERE quantity >=5;

--3.
SELECT * FROM customer, orderlist
WHERE customer.id=orderlist.customer_id AND quantity>=5;

--4.특정 컬럼 조회
SELECT orderlist.id, customer.id, customer.name
orderlist.product_name, orderlist.quantity
FROM orderlist, customer WHERE customer.id=orderlist.customer_id;

--5.테이블 별칭 짓기
SELECT c.id AS user_id, o.id AS order_id, c.name, o.product_name
FROM customer AS c, orderlist AS o
WHERE user_id=order_id;

--left outer join
SELECT * FROM orderlist LEFT OUTER JOIN customer
ON orderlist.customer_id=customer.id;
--right outer join
SELECT * FROM orderlist RIGHT OUTER JOIN customer
ON orderlist.customer_id=customer.id;

--NATURAL JOIN
SELECT * FROM orderlist NATURAL JOIN customer;
--컬럼의 이름이 다르면 아무것도 안 나온다. 

