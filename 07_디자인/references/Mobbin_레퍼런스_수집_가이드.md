# Mobbin 레퍼런스 수집 가이드

> 각 팀원이 담당 역할별로 Mobbin에서 **실제 앱 화면 스크린샷**을 수집합니다.
> 수집한 이미지를 해당 폴더에 넣어주세요.

---

## 폴더 구조

```
07_디자인/references/
├── guardian/    ← A 담당 (보호자 앱)
├── nurse/       ← B 담당 (의료진 앱)
├── patient/     ← C 담당 (환자 앱)
└── common/      ← 공통 (누구나)
```

---

## 파일명 규칙

`앱이름_화면유형_메모.png`

예시: `toss_dashboard_카드레이아웃.png`, `medisafe_medication_투약리스트.png`

---

## A 담당 — 보호자 앱 (guardian/)

보호자는 **모바일에서 케어 현황을 확인하고, AI와 소통하는** 사용자입니다.
따뜻하고 안심되는 느낌, 카드 기반, 여백 넉넉한 UI를 찾아주세요.

### 찾아야 할 화면 (10종)

| # | 화면 유형 | 우리 기능 | Mobbin 검색어 | 참고할 포인트 | 추천 앱 |
|---|----------|----------|-------------|-------------|--------|
| 1 | **홈 대시보드** | F-02 보호자 대시보드 | `health dashboard`, `home summary` | 카드 배치, 완료율/퍼센트 표시, 상단 요약 영역 | Toss, Apple Health, Noom |
| 2 | **상태 카드 (완료율)** | F-02 케어 완료율 | `progress card`, `completion rate` | 원형/바 프로그레스, 숫자 강조, 컬러 시멘틱 | MyFitnessPal, Apple Health |
| 3 | **AI 챗봇 대화** | F-06 AI 케어 가이드 | `AI chatbot`, `chat assistant` | 말풍선 스타일, 타이핑 인디케이터, 모드 전환 UI | ChatGPT, Noom Coach |
| 4 | **일일 리포트 카드** | F-05 AI 일일 리포트 | `daily summary`, `report card` | 날짜별 카드, 요약 텍스트, 아이콘+수치 조합 | Apple Health, Gentler Streak |
| 5 | **1:1 채팅** | F-04 채팅 | `messaging chat`, `direct message` | 말풍선 좌우 배치, 사진 첨부, 읽음 확인 | KakaoTalk, iMessage |
| 6 | **알림 센터** | F-01 읽음확인, F-10 의료설명 | `notification center`, `alert list` | 알림 카드 리스트, 읽음/안읽음 구분, 시간 표시 | Toss, 당근 |
| 7 | **처방전/약물 정보** | F-09 처방전 열람 | `prescription`, `medication list` | 약물 카드, 복용 시간, 상세 정보 펼치기 | Medisafe, Apple Health |
| 8 | **타임라인 뷰** | F-09 의료 타임라인 | `timeline`, `activity feed` | 시간축 세로 배치, 컬러 도트, 이벤트 카드 | Instagram, Notion |
| 9 | **설정/프로필** | 공통 | `settings profile`, `account` | 리스트 메뉴, 토글, 프로필 카드 | 토스, 당근 |
| 10 | **온보딩/역할 선택** | F-07 역할 분기 | `onboarding`, `role selection` | 카드 선택 UI, 일러스트, 단계 표시 | Calm, Headspace |

### 엄선 기준
- 따뜻한 톤 (화이트/블루/소프트 컬러) 우선
- 카드 기반 레이아웃 우선
- 여백 넉넉한 디자인 우선
- 병원/의료 차트 느낌은 피하기

---

## B 담당 — 의료진 앱 (nurse/)

의료진은 **PC에서 환자를 관리하고, 모바일에서 긴급 상황에 대응하는** 사용자입니다.
전문적이면서도 효율적인, 정보 밀도가 적절한 UI를 찾아주세요.

### 찾아야 할 화면 (10종)

| # | 화면 유형 | 우리 기능 | Mobbin 검색어 | 참고할 포인트 | 추천 앱 |
|---|----------|----------|-------------|-------------|--------|
| 1 | **관리 대시보드** | 의료진 홈 | `admin dashboard`, `management overview` | 통계 카드, 환자 수/완료율, 주의 환자 표시 | Notion, Asana |
| 2 | **체크리스트** | F-01 케어 체크리스트 | `checklist`, `task list`, `to-do` | 체크박스, 카테고리 분류, 완료/미완료 시각적 구분 | Todoist, Notion |
| 3 | **환자 목록 (리스트)** | 환자 관리 | `patient list`, `contact list`, `member list` | 리스트 행 (아바타+이름+상태뱃지), 검색/필터 | Slack, 카카오톡 |
| 4 | **환자 상세 프로필** | 환자 관리 상세 | `user profile detail`, `patient detail` | 상단 프로필 카드 + 하단 탭(기록/처방/타임라인) | Apple Health, 삼성헬스 |
| 5 | **SOS 긴급 알림 발송** | F-03 SOS | `emergency alert`, `SOS`, `urgent notification` | 빨간 강조 버튼, 확인 모달, 상황 입력 폼 | Life360, 안전디딤돌 |
| 6 | **인수인계 리포트** | F-11 AI 인수인계 | `handoff report`, `shift summary` | 섹션별 요약 카드, 특이사항 강조, 편집 가능 | Notion, 슬랙 |
| 7 | **일정/스케줄 관리** | F-08 시간표 | `schedule calendar`, `shift management` | 일간/주간 뷰, 시간 블록, 담당자 표시 | Google Calendar, 당직 앱 |
| 8 | **처방전 입력 폼** | F-09 처방전 작성 | `form input`, `medical form` | 폼 필드 레이아웃, 드롭다운, 자동완성 | 삼성서울병원, MyChart |
| 9 | **채팅 (보호자와)** | F-04 채팅 | `messaging`, `team chat` | 환자별 채팅방 구분, 읽음 표시, 파일 첨부 | Slack, 키즈노트 |
| 10 | **PC 사이드바 네비게이션** | 의료진 PC 레이아웃 | `sidebar navigation`, `desktop dashboard` | 아이콘+텍스트 메뉴, 활성 상태, 접기/펼치기 | Notion, Figma, Linear |

### 엄선 기준
- PC 웹 화면 + 모바일 화면 둘 다 수집
- 정보 밀도 높되 빽빽하지 않은 것
- 전문적이면서 부드러운 느낌 (의료 키오스크 X)
- 그린 계열과 어울리는 톤 우선

---

## C 담당 — 환자 앱 (patient/)

환자는 **78세 어르신**입니다. 스마트폰 조작이 어렵고, 큰 글씨와 최소한의 탭이 필요합니다.
단순하고, 크고, 따뜻한 UI를 찾아주세요.

### 찾아야 할 화면 (8종)

| # | 화면 유형 | 우리 기능 | Mobbin 검색어 | 참고할 포인트 | 추천 앱 |
|---|----------|----------|-------------|-------------|--------|
| 1 | **큰 글자 홈 화면** | 환자 홈 | `elderly app`, `accessibility home`, `senior UI` | 큰 글씨(18px+), 최소 메뉴, 인사 문구, 다음 일정 강조 | 오늘건강, iOS 접근성 |
| 2 | **투약 알림 카드** | F-08 시간표 (투약) | `medication reminder`, `pill reminder` | 큰 시간 표시, 약물명, 큰 "확인" 버튼 | Medisafe, 라운드랩 |
| 3 | **일과표/일정 리스트** | F-08 일과표 | `daily schedule`, `routine list` | 시간순 리스트, 완료 체크, 큰 글씨, 아이콘 | Google Calendar, 삼성리마인더 |
| 4 | **가족 소식/연결** | 가족 탭 | `family feed`, `photo sharing` | 가족 사진, 메시지, 큰 버튼, 감성적 UI | 가족앨범, 밴드 |
| 5 | **긴급 도움 버튼** | 도움 탭 | `SOS button`, `emergency button`, `help` | 화면 가득 큰 버튼, 원터치, 빨간색 강조 | 팸케어SOS, 안전디딤돌 |
| 6 | **처방전 확인 (큰 글자)** | F-09 처방전 | `medication detail`, `prescription` | 약물 이름 크게, 복용법 간단 표시 | Medisafe |
| 7 | **하단 탭바 (3탭)** | 환자 네비게이션 | `bottom tab bar`, `simple navigation` | 3탭 이하, 큰 아이콘, 텍스트 라벨 | iOS 기본 앱, 오늘건강 |
| 8 | **빈 상태 / 안내 화면** | 공통 | `empty state`, `onboarding` | 일러스트 + 따뜻한 안내 문구 | Calm, Headspace |

### 엄선 기준
- **글씨 크기 18px 이상** 화면 우선
- 탭/메뉴 3개 이하 화면
- 고대비 (배경 밝고 텍스트 진한)
- 따뜻한 베이지/크림 톤과 어울리는 것
- 복잡한 기능 없이 단순한 화면

---

## 공통 (common/) — 누구나 수집 가능

| # | 화면 유형 | Mobbin 검색어 | 참고할 포인트 |
|---|----------|-------------|-------------|
| 1 | **스플래시/로딩** | `splash screen`, `loading` | 브랜드 컬러, 로고 배치, 로딩 애니메이션 |
| 2 | **에러/오프라인** | `error state`, `offline` | 따뜻한 에러 메시지, 재시도 버튼 |
| 3 | **모달/바텀시트** | `bottom sheet`, `modal dialog` | 둥근 모서리, 그림자, 딤 배경 |
| 4 | **토스트/스낵바** | `toast notification`, `snackbar` | 성공/경고/에러 컬러, 자동 사라짐 |
| 5 | **카드 컴포넌트** | `card component`, `card UI` | 둥근 모서리, 그림자, 내부 여백 |

---

## 수집 팁

1. **앱 단위로 보기** — Mobbin에서 앱 이름 검색 후 전체 화면 훑어보기
2. **화면당 1장** — 같은 유형이면 가장 좋은 것 1장만
3. **왜 골랐는지 메모** — 파일명에 핵심 포인트 적기
4. **우리 톤과 맞는지 체크** — 차갑거나 딱딱한 느낌은 피하기
5. **총 3~5장이면 충분** — 많이 가져오는 것보다 잘 고르는 게 중요

---

## 수집 완료 후

레퍼런스가 폴더에 들어오면:
1. 팀 공유 + 방향 합의
2. Claude에게 레퍼런스 분석 요청
3. 디자인 시스템 구축 시작
4. Lo-Fi 와이어프레임 제작

---

*하루안부 프로젝트 | Mobbin 레퍼런스 수집 가이드 | 2026.03*
