# 하루안부 보호자앱 v10 — 인수인계 문서
> 2026-04-19 기준 · 새 Claude Code 세션에서 이 파일부터 읽을 것
> 이번 세션 상세 변경사항은 `SESSION_0419.md` 참고.

---

## 1. 프로젝트 개요

**하루안부**는 요양원 보호자를 위한 케어플랫폼 앱.
보호자가 부모님의 투약/식사/활동/기분/위생/일정을 실시간으로 확인하고,
간호사·AI와 채팅할 수 있는 서비스.

- **담당**: 김지욱 (디자인 리드)
- **레포**: https://github.com/lg21twins/haru-anbu
- **브랜치**: `design/v8-latest-0416` (현재 최신)
- **목업 위치**: `07_디자인/mockup/v10_보호자앱/`
- **정보구조도**: `01_기획/보호자앱_정보구조도_v8.1.docx`
- **오딧 문서**: `07_디자인/mockup/v9_보호자앱/AUDIT_0417.md` (v10에도 유효)

---

## 2. v10이 뭔가

v9(김지욱 홈/인트로 플로우) + v9.5(팀원 페이지 디자인)의 **하이브리드**.

| 영역 | 출처 | 사유 |
|---|---|---|
| 홈 (`g-guardian-live.html`) | **v9** | AI 인트로 시퀀스 + 오브 + 더블탭→채팅 플로우 유지 |
| 채팅 상세 4종 (`g03-chat-ai/nurse/family/patient.html`) | **v9** | v9.5에 없음 |
| 보조 (`g-ai.html`, `g02-ai-report.html`) | **v9** | v9.5에 없음 |
| 홈 외 9개 페이지 (g02, g03-sotong, g05*, g06, g07, g08, g09, g10) | **v9.5** | 팀원 디자인 — 글라스 카드, 블롭 배경, 깔끔한 그룹핑 |
| 네비바 전 페이지 통일 | v9.5 구조 + v9 `glass-warp` | 섹션 3 참고 |

---

## 3. 네비바 — 핵심 통일 규칙

모든 페이지의 하단 네비바는 **동일한 구조·위치·크기·질감**.

```html
<div class="bottom-bar">
  <nav class="tabbar">
    <a href="g-guardian-live.html" class="tab" aria-label="홈">
      <span class="tab-icon"><iconify-icon icon="fluent:home-24-filled" style="font-size:26px"></iconify-icon></span>
    </a>
    <a href="g02-ai-guide.html" class="tab" aria-label="AI 가이드">
      <span class="tab-icon"><iconify-icon icon="ph:book-open-text-fill" style="font-size:26px"></iconify-icon></span>
    </a>
    <a href="g03-sotong.html" class="tab" aria-label="소통">
      <span class="tab-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 5.81 2 10.5c0 2.65 1.56 5.02 4 6.56V22l4.34-2.41c.54.07 1.1.11 1.66.11 5.52 0 10-3.81 10-8.5S17.52 2 12 2z"/></svg></span>
    </a>
    <a href="g05-records.html" class="tab" aria-label="기록">
      <span class="tab-icon"><iconify-icon icon="fluent:folder-24-filled" style="font-size:26px"></iconify-icon></span>
    </a>
    <a href="g05-mypage.html" class="tab" aria-label="마이">
      <span class="tab-icon"><iconify-icon icon="fluent:person-24-filled" style="font-size:26px"></iconify-icon></span>
    </a>
  </nav>
  <button class="ai-fab" aria-label="AI와 대화하기">
    <!-- 하루안부 로고 SVG (22x22, viewBox 0 0 2526 2526) -->
  </button>
</div>
```

**스타일 포인트**
- 위치: `bottom: calc(env(safe-area-inset-bottom,0px) + 12px)` — 하단 바짝
- `width: calc(100% - 48px); max-width: 370px; gap: 10px`
- tabbar: `height:60px; background: rgba(210,225,250,.55); backdrop-filter: url(#glass-warp) blur(12px)`
- ai-fab: `60×60px`, 동일 배경·필터
- `border: 1px solid rgba(255,255,255,.45); box-shadow: 0 4px 20px rgba(0,0,0,.1), inset 0 1px 0 rgba(255,255,255,.4)`
- 아이콘 사이즈: `font-size:26px` (탭바 iconify) / `.tab-icon svg { width:26px; height:26px }` (소통 SVG)

**SVG 필터 defs** — 모든 페이지 `<body>` 바로 아래에 주입되어 있음:
```html
<svg style="position:absolute;width:0;height:0;pointer-events:none" aria-hidden="true">
  <defs><filter id="glass-warp" ...>...</filter></defs>
</svg>
```

**PWA standalone fallback** — 모든 페이지 `</style>` 직전:
```css
@media (display-mode: standalone) {
  .tabbar, .ai-fab {
    backdrop-filter: blur(20px) saturate(180%) !important;
    background: rgba(220,232,252,.78) !important;
    border: 1px solid rgba(255,255,255,.6) !important;
  }
}
```
이유: 아이폰 홈 화면 추가 앱 모드에선 `url(#glass-warp)` 미지원 → 순수 blur fallback.

---

## 4. 홈 화면 — 플로우 & 고유 동작

### 4-1. AI 인트로 시퀀스
1. AI 오브 등장 (민트→블루 그라디언트, 숨쉬듯 7s breath)
2. 메시지 3개 순차 표시 (각 2.2s + 0.52s 페이드):
   - "지욱님, 정희님은 오늘 잘 지내셨어요."
   - "산책·식사·투약 모두 완료했어요."
   - "편히 주무시고 계세요."
3. 피나레: 오브 scale 2.0 확장 → 상단에 돔 형태
4. 홈 콘텐츠 순차 페이드인 (chat-fixed → report-sheet → bottom-bar)

### 4-2. localStorage & DEV_MODE
- 일반 방문: localStorage `haru_intro_seen_v1` = '1' → 다음부터 인트로 건너뜀 (`goStraightToHome`)
- DEV_MODE (localhost / 127.0.0.1 / 192.168.* / 172.* / file://): **매번 인트로 재생**
- `window.resetIntro()` 콘솔 호출 → 다시 보기

### 4-3. 리포트 시트 상호작용
- 초기 위치: `margin-top: 52vh`
- 핸들 드래그 아래로 100px+ 또는 **화면 더블탭** → `enterChat()` → 시트 내려가고 채팅 모드
- **AI FAB 클릭** → 동일하게 `enterChat()` (홈에서만)
- 채팅 모드에서 위로 스와이프 50px+ → `exitChat()`

### 4-4. 더블탭 인라인 힌트
- 위치: `position:fixed; top: calc(env(safe-area-inset-top,0px) + 260px); right: calc(50% - 199px)` (우측 상단, greeting 아래)
- 문구: "화면을 두 번 탭하면 AI와 대화할 수 있어요" (얇은 흰색 `rgba(255,255,255,.92)`)
- 아이콘: `fluent:tap-double-24-regular` (blink 애니메이션)
- 상시 표시, 채팅 모드 진입 시 자동 dismissed, 복귀 시 복원
- 스크롤로 시트가 340px 이하까지 올라오면 `scrolled-away` 클래스로 페이드

### 4-5. 리포트 AI 코멘트 분기 ⭐ (최신 변경)
인트로 종료 경로에 따라 `.ai-comment` 카드가 다르게 동작:

| 경로 | 결과 |
|---|---|
| SKIP 버튼 → `skipIntro()` | **풀 브리핑 카드 노출** — 감정+팩트+액션 |
| 인트로 끝까지 시청 → `finaleAndEnd()` | **카드 숨김** (`display:none`) |
| 재방문 건너뜀 → `goStraightToHome()` | **카드 숨김** (이미 본 사람으로 간주) |

분기 함수: `applyCommentForMode('skipped' | 'watched')` — 각 종료 경로에서 호출.

---

## 5. 파일 인벤토리

```
v10_보호자앱/
├── HANDOFF.md                   ← 이 파일
├── g-guardian-live.html         🟦 v9 홈 (핵심)
├── g02-ai-guide.html            🟩 v9.5
├── g02-ai-report.html           🟦 v9 레거시
├── g03-sotong.html              🟩 v9.5
├── g03-chat-ai.html             🟦 v9 (채팅 상세)
├── g03-chat-nurse.html          🟦 v9
├── g03-chat-patient.html        🟦 v9
├── g03-chat-family.html         🟦 v9
├── g05-records.html             🟩 v9.5
├── g05-mypage.html              🟩 v9.5
├── g06-alert.html               🟩 v9.5
├── g07-settings.html            🟩 v9.5
├── g08-billing.html             🟩 v9.5
├── g09-prescription.html        🟩 v9.5
├── g10-timeline.html            🟩 v9.5
├── g-ai.html                    🟦 v9 보조
├── preview-nav-icons.html       🔧 탭 아이콘 후보 비교
├── preview-tap-hint-icons.html  🔧 더블탭 힌트 아이콘 후보
├── preview-greeting-*.html      🔧 greeting 프로토타입 (레거시)
├── preview-wave-icons.html      🔧
├── icon-pick-*.html             🔧
└── manifest.json, app-icon.svg, common.css, img/, onboarding/
```

### 참조 문서 (v9 폴더에 있음, 내용은 v10에도 유효)
```
07_디자인/mockup/v9_보호자앱/
├── AUDIT_0417.md          ← 14개 페이지 완성도 감사 + 공모전 체크리스트
├── TEAM_UPDATE_0418.md    ← 2026-04-18 작업 현황
├── SESSION_0417.md        ← 디자인 결정 히스토리
└── audit-screenshots/     ← 감사 시점 14장 스크린샷
```

### 기획서
```
01_기획/
├── 케어플랫폼_통합기획서_v5.0.md
└── 보호자앱_정보구조도_v8.1.docx
```

---

## 6. 디자인 시스템 규칙 (v9에서 계승)

```css
:root {
  --blue:#2C7AFC; --blue-l:#5B9BFF; --blue-d:#1D6AF2;
  --green:#34D399; --green-d:#059669;
  --amber:#F59E0B; --red:#EF4444;
  --t1:#111827; --t2:rgba(0,0,0,.5); --t3:rgba(0,0,0,.35);
}
html { background: #d4e4ff; }
```

- **폰트**: Pretendard Variable (CDN)
- **아이콘**: Iconify CDN, 기본은 `fluent:*-24-filled`
- **모든 HTML은 self-contained**
- **보라색(#6D28D9) 사용 금지** — 블루 계열 통일
- **네비바는 섹션 3의 통일 규칙 엄수** — 함부로 바꾸지 말 것

### PWA 메타 (전 페이지 공통)
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="theme-color" content="#d4e4ff">
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="app-icon.svg">
```

---

## 7. 개발 서버

```bash
cd /Users/kimjiwook/Downloads/haru-anbu-main/07_디자인/mockup/v10_보호자앱
python3 -m http.server 9092
```

- PC: http://localhost:9092/g-guardian-live.html
- 폰 (같은 Wi-Fi): http://192.168.0.3:9092/g-guardian-live.html
- 폰 홈 화면 추가 시 `@media (display-mode: standalone)` fallback 발동

---

## 8. 현재 상태 (2026-04-19 기준)

### ✅ 완료
- v10 하이브리드 빌드 (홈 v9 + 페이지 v9.5)
- 네비바 전 페이지 통일 (glass-warp + 홈 기준 위치·크기)
- 탭 아이콘 교체: 기록 → folder / AI 가이드 → book-open-text
- 더블탭 인라인 힌트 (상시 표시, 스크롤/채팅 연동)
- PWA standalone fallback
- **AI 코멘트 카드 제거**
- **리포트 시트 위젯 전면 재편 (0419)**
  - 오늘의 순간 풀카드 추가 (mockup.png)
  - 맥박 위젯 (미니멀 타이포 64px)
  - 수면 위젯 신규 (블루 모노 타임라인 산 형태)
  - 식사 위젯 풀이미지화 (image (16).png)
  - 일정 풀→반 컴팩트
  - 그리드 순서: 투약|맥박 / 기분|식사 / 수면(풀) / 활동(풀) / 위생|일정
- **홈 화면 업데이트 (0419)**
  - 추천 프롬프트 3개 (greeting 하단)
  - 입력바 재디자인 (흰 바탕, 로고 제거, 마이크+전송)
  - "일일 리포트 보기" 버튼 (채팅 모드)

### 🟥 이어서 작업 (중단된 태스크 — 다음 세션 최우선)
사용자가 마지막에 요청한 미구현 태스크:
- [ ] 홈 프롬프트 박스 **순차 다크** (위 밝음 → 아래 진함)
- [ ] 리포트 상태 연동: **리포트 올라간 상태 = 숨김 / 내려간 상태 = 노출**
- [ ] **더블탭** 시 프롬프트 박스를 **탭바 위 중앙 고정**

### 🟥 남은 필수 (AUDIT_0417 기준)
- [ ] 타임라인 필터 실제 동작 구현 (`g10-timeline.html`)
- [ ] SOS 확인 다이얼로그 (`g06-alert.html`)
- [ ] 터치타겟 44×44 이상 일괄 점검
- [ ] 접근성 (aria-label, `:focus-visible`)

### 🟡 차별화 기능
- [ ] "오늘의 이야기" 페이지 (AI 자동 일기)
- [ ] SOS 실시간 대응 허브 (상태 머신)
- [ ] 간호사 말투 템플릿 교체 (5개 채팅 공통)
- [ ] 상대시간 표시 시스템

---

## 9. 다음 세션 권장 우선순위

**즉시 이어갈 작업 (0419 중단분)**
1. 홈 프롬프트 박스 순차 다크 + 리포트 상태별 show/hide + 더블탭 탭바 위 고정

**Day 1 (공모전 결정타)**
2. 타임라인 필터 JS 추가 + 유형별 배경 틴트
3. AI 가이드 카드 아이콘 색상 통일 (g02-ai-guide 내부)
4. SOS 확인 다이얼로그

**Day 2 (정서적 연결)**
5. 간호사 말투 템플릿 (5개 채팅)
6. 수치 옆 감정 라벨 ("58%/평소보다 ↑")
7. 상대시간 시스템 (`2시간 전`, `어제`)

**Day 3 (시그니처)**
8. "오늘의 이야기" 페이지 신규 제작
9. SOS 실시간 대응 허브 업그레이드

---

## 10. Git

```
main ← PR로만 머지
  └── design/v8-latest-0416 ← 현재 브랜치
```

- main 직접 푸시 금지
- 변경 시 새 브랜치 → PR

---

## 11. 감독/코치 원칙 (김지욱이 Claude에게 요구하는 것)

- **객관적 판단** — 근거 없는 칭찬 금지
- **감(感)으로 최적화 금지** — 실측 우선 (Chrome DevTools MCP)
- **우선순위 관리** — 한 번에 하나
- **솔직한 피드백** — 안 되는 건 안 된다고
- 이모지 사용 금지 (사용자 명시 요청 시만)

---

*작성: 2026-04-18 · Claude Opus 4.7 (1M context) via Claude Code*
