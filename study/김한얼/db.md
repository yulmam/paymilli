
# 1. 데이터베이스 트랜잭션(transaction)을 아십니까?

url

[데이터베이스 트랜잭션(transaction)을 아십니까? 그리고 트랜잭션의 매우 중요한 속성들인 ACID를 아십니까? 모르신다면 들렀다 가시지요](https://www.youtube.com/watch?v=sLJ8ypeHGlM)

### transaction

- 단일한 논리적인 작업 단위
- 논리적인 이유로 여러 SQL문들을 단일 작업으로 묶어서 나눠질 수 없게 만든 것이다.
- SQL문들 중에 일부만 성공해서 DB에 반영되는 일은 일어나지 않는다.

```sql
START TRANSACTION;//transaction 시작을 알림
~~~
COMMIT; // 지금까지 작업한 내용을 DB에 영구적으로 저장하라 transaction 종료

ROLLBACK; //지금까지 작업을 모두 취소하고 transaction 이전 상태로 되돌린다. transaction 종료
```

### AUTOCOMMIT

- 각각의 SQL문을 자동으로 tranaction 처리 해주는 개념
- SQL문이 성공적으로 실행하면 자동으로commit한다
- 실행 중에 문제가 있었다면 알아서 rollback 한다
- MySQL에서는 default로 autocommit이 enabled 되어 있다.

SELECT @@AUTOCOMMIT; //autocommit이 켜져있는지 확인

//1이면 true 0이면 falkse

SET autocommit=0; //AUTOCOMMIT 비 활성화

그래서 START TRASACTION  실행과 동시에 autocommit은 off 된다. COMMIT/ ROLLBACK과 함께 transaction이 종료되면 원래 autocommit 상태로 돌아간다.

스프링에서는 @Transactional 어노테이션을 사용해서 관리한다.

ACID

Atomicity 

- 모두 성공하거나 모두 실패하거나
- transactinon은 논리적으로 쪼개질 수 없는 작업 단위이기 떄문에 내부의 SQL 문들이 모두 성공해야 한다
- 중간에 SQL 문이 실패하면 지금까지의 작업을 모두 취소해야 한다.
- 개발자가 하는 것  : 언제 commit 하거나 rollback 할치 챙기는 것
- DBMS가 하는 것 : commit 실행 시 DB에 영구적으로 저장하는 것, ROLLBACK 실행 시 이전 상태로 되돌리는 것

Consistency

- transaction은 DB 상태를 consistent 상태에서 또 다른 consistent 상태로 바꿔줘야 한다.(ex 통장은 마이너스를 허용하지 않는다면 이를 깨트리면 안된다)
- constraints, trigger 등을 통해 DB에 정의도니 rules을 transaction이 위반했다면 rollback해야 한다
- transaction이 DB에 정의된 rule을 위반했는지 DBMS가 commit 전에 확인하고 알려준다.
- 그 외에 application 관점에서 transaction이 consistent하게 동작하는지는 개발자가 챙겨야 한다.

Isolation

- 여러 transaction들이 동시에 실행될 때도 혼자 실행되는 것처럼 동작하게 만든다.
- DBMS는 여러 종류의 isolation level을 제공한다.
- 개발자는 isolation level 중에 어떤 level로 transaction을 동작시킬지 설정할 수 있다.
- concurrency control의 주된 목표가 isolation이다.

Durability

- commit된 transaction은 DB에 영구적으로 저장된다.
- 즉 DB system에 문제가 생겨도 commit된 transaction 은 DB에 남아 있는다.
- 기본적으로 transaction의 durability는 DBMS가 보장한다.

### 참고 사항

- transaction을 어떻게 정의해서 쓸지는 개발자가 정하는 것이기 때문에 구현하려는 기능과 ACID 속성을 이해해야 transaction을 잘 정의할 수 있다.
- transaction의 ACID와 관련해서 개발자가 챙겨야 하는 부분이 있다. DBMS가 모든것을 하지는 않는다.
- transaction SQL 은 RDBMS마다 문법이 다를 수 있다.

# 2. concurrency control 기초 : schedule과 serializability

url

https://www.youtube.com/watch?v=DwRN24nWbEc

## schedule

- 여러 transaction들이 동시에 실행될 때 각 transaction에 속한 operation들의 실행 순서
- 각 transaction 내의operations 들의 순서는 바뀌지 않는다.

### Serial schedule

- transaction 들이 겹치지 않고 한 번에 하나씩 실행되는 schedule
- 성능 : io 작업중에 cpu는 다른 작업을 할 수 있음에도 불구하고 serial schedule이기 때문에 다른 트랜잭션을 실행 시킬 수 없다.
- 그러므로 현실적으로 사용할 수 없는 방식

### Nonserial schedule

- transaction 들이 겹쳐서 실행되는 schedule
- 성능 : transaction 들이 겹쳐서 실행되기 때문에 동시성이 높아져서 같은 시간 동안 더 많은 transaction들을 처리할 수 있다.
- 단점 : transaction들이 어떤 형태로 겹쳐서 실행되는지에 따라 이상한 결과가 나올 수 있다.

serial schedule과 동일한 nonserial schedule을 실행하면 된다.

serial schedule 가 동일하다

### Conflict

세가지 조건을 모두 만족하면 conflict

- 서로 다른 transaction 소속
- 같은 데이터에 접근
- 최소 하나는 write operation

### conflict equivalent

두 조건을 모두 만족하면 conflict equivalent

- 두 schedule은 같은 transaction들을 가진다.
- 어떤 conflicting operations의 순서도 양쪽 schedule모두 동일하다
    - 즉 데드락에서 말하는 순환 대기를 안하면 된다. 즉 순서를 정해서 순서대로만 접근 할 수 있으면 된다.

### Conflict serializable

serial schedule과 conflict equivalent일 때 Conflict serializable이라고 한다.

이것을 허용하면 성능을 증가시킬 수 있다.

### 구현 법

여러 transaction을 동시에 실행해도 schedule이 conflict serializable하도록 보장하는 프로토콜을 적용

# 3. concurrency control 기초 : recoverability. 트랜잭션들이 동시에 실행될 때 rollback이 발생하면 어떤 일이 벌어질까요?

url

[(2부) concurrency control 기초 : recoverability. 트랜잭션들이 동시에 실행될 때 rollback이 발생하면 어떤 일이 벌어질까요?](https://www.youtube.com/watch?v=89TZbhmo8zk)

### unrecoverable schedule

schedule 내에서 commit 된 transaction이 rollback된 transaction이 write 했었던 데이터를 읽은 경우

- rollback을 해도 이전 상태로 회복 불가능할 수 있기 때문에 이런 schedule은 DBMS가 허용하면 안된다.

### 어떤 schedule이 recoverable한가??

- 의존성이 있는 트랜잭션이 먼저 commit이 되고 의존성이 없는 transaction이 커밋 되어야 한다.
- schedule 내에서 그 어떤 transaction도 자신이 읽은 데이터를 write한 transaction이 먼저 commit/rollback 전까지는 commit 하지 않는 경우

cascading rollback : 하나의 transaction이 rollback하면 의존성이 있는 다른 transaction도 rollback 해야 한다. 

### recoverable schedule

- cascadeless schedule : schedule 내에서 어떤 transaction도 commit 되지 않은 transaction들이 write한 데이터는 읽지 않은 경우
- strict schedule : schedule 내에서 어떤 transaction도 commit 되지 않은 transaction들이 write한 데이터는 쓰지도 읽지 않은 경우
    - rollback할 때 recovery가 쉽다.

concurrency control은 serializability와 recoverability를 재공하는 것

