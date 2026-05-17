아래 인수인계 문서를 먼저 읽고 작업을 이어서 진행해줘.

1. `07_디자인/mockup/v9_보호자앱/HANDOFF.md` 읽어줘 — 전체 프로젝트 맥락, 디자인 시스템 규칙, v8.1 정보구조가 정리되어 있어.

2. 그 다음 핵심 파일 3개를 읽어줘:
   - `07_디자인/mockup/v9_보호자앱/g-guardian-live.html` (홈화면)
   - `07_디자인/mockup/v9_보호자앱/g02-ai-guide.html` (AI 케어 가이드)
   - `07_디자인/mockup/v9_보호자앱/g03-sotong.html` (소통 - 대화+알림)

3. 읽고 나면 현재 상태를 간단히 요약해줘.

## 반드시 지켜야 할 규칙
- 브랜드 컬러: #2C7AFC (파란색). 보라색 절대 금지.
- 폰트: Pretendard Variable
- 아이콘: Iconify CDN (Fluent filled 우선)
- HTML은 self-contained (인라인 CSS, common.css 의존 최소화)
- backdrop-filter:blur 사용 금지 — 성능 이슈로 전면 제거. rgba 반투명 배경으로 대체.
- 네비바: floating pill 스타일 (border-radius:999px, max-width:320px, 아이콘만)
- 탭 5개: 홈/AI가이드/소통/기록/마이
- 글로벌 요소: SOS 배너 (모든 페이지 상단) + 플로팅 AI 버튼 (모든 페이지 우하단)
- 채팅 상세 페이지에는 네비바 없음
- html background: #d4e4ff
- PWA 메타 태그 전 페이지에 포함

## 정보구조도
- `01_기획/보호자앱_정보구조도_v8.1.docx` — v8.1 IA 설계서

## Git
- 레포: https://github.com/lg21twins/haru-anbu
- 최신 브랜치: design/v8-latest-0416
- main에 직접 푸시 금지, 항상 새 브랜치 만들어서 PR

준비되면 알려줘. 내가 다음 작업 지시할게.
