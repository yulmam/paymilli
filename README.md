# SSENBI Test Repository
센비(SSENBI) 프로젝트의 성능 테스트 및 리팩토링을 위한 레포지토리입니다.

## 1. CI/CD 구축하기
센비 프로젝트의 자동 배포 및 운영 환경을 구축하기 위해 CI/CD를 적용하였습니다.

### 📌 관련 문서
- [CI/CD 개념](https://www.notion.so/17e708433a6d80c48b4dcb85c41a810e)
- [CI/CD 구축 문서](https://www.notion.so/CI-CD-180708433a6d80d1bfdff4df240465d0)
- [EC2 설정](https://www.notion.so/EC2-174708433a6d80cca58ac949aedffb4d)
- [Docker 설정](https://www.notion.so/Docker-174708433a6d8034be5bf01e37eb1e55)
- [nginx 설정](https://www.notion.so/nginx-175708433a6d8074aa0cc42537331200)
- [GitHub Actions 설정](https://www.notion.so/Actions-17b708433a6d800ca6deff739f91405b)
- [Troubleshooting](https://www.notion.so/troubleshooting-17c708433a6d8030b740c37a9d21d236)

---

## 2. 성능 향상시키기
센비 프로젝트의 성능을 최적화하기 위해 다양한 개선 작업을 진행하고 있습니다.

### 2.1 Ehcache를 통한 성능 향상
- 데이터베이스의 부하를 줄이고 응답 속도를 높이기 위해 Ehcache를 적용하였습니다.
- 자세한 내용은 [Ehcache 성능 향상 문서](https://acoustic-rib-4c4.notion.site/ehcache-180708433a6d807db8dec6d4458da1ec?pvs=4)에서 확인할 수 있습니다.

### 2.2 비동기를 통한 성능 향상 (작성 중)
- 요청 처리 속도를 개선하기 위해 비동기 프로그래밍을 적용하는 작업을 진행 중입니다.
- 주요 내용:
  - Spring의 `@Async`를 활용하여 비동기 처리 구현
  - CompletableFuture를 활용한 효율적인 병렬 처리
  - 비동기 처리 시 예외 처리 및 트랜잭션 관리 고려
- 해당 내용은 작성 후 업데이트될 예정입니다.

---

## 📌 Pay-milli
**Pay-milli**는 SSAFY A702 팀 프로젝트로 개발된 온라인 분할 결제 서비스입니다. 사용자는 이 서비스를 통해 결제를 여러 번에 걸쳐 나누어 처리할 수 있으며, 안전하고 효율적인 결제를 지원합니다.

### 팀 구성원
- **Backend**: 신권일, 김한얼, 이태현
- **Frontend**: 유수빈, 유성주, 김효준

### 프로젝트 구조
#### 브랜치 전략
개발은 백엔드와 프론트엔드 작업을 분리하여 진행했습니다:
- `backend` 브랜치 (`be/`)
- `frontend` 브랜치 (`fe/`)

각 기능이나 수정 사항은 이슈로 관리되었으며, 브랜치 이름은 다음과 같은 규칙을 따랐습니다: `(fe/be)/(이슈번호)/(feat/fix)/(작업내용)`

#### 작업 순서
1. **이슈 생성**: 작업을 시작하기 전에 이슈를 생성하여 작업을 추적했습니다.
2. **브랜치 생성**: 이슈가 생성되면, 해당 이슈에 맞는 브랜치를 생성했습니다.
3. **개발 진행**: 브랜치에서 각각 백엔드 또는 프론트엔드 작업을 진행했습니다.
4. **Pull Request (PR) 제출**: 작업이 완료된 후 PR을 제출했습니다.
5. **코드 리뷰**: 팀원들의 코드 리뷰를 거쳤습니다.
6. **Merge**: 리뷰가 완료되면 최종적으로 메인 브랜치에 병합했습니다.


