# 하루안부 보호자앱 v9 — 인수인계 문서
> 2026-04-16 기준 · 새 Claude Code 세션에서 이 파일부터 읽을 것

---

## 1. 프로젝트 개요

**하루안부**는 요양원 보호자를 위한 케어 서비스 앱.
보호자가 부모님의 투약/식사/활동/기분/위생/일정을 실시간으로 확인하고,
간호사·AI와 채팅할 수 있는 서비스.

- **담당**: 김지욱 (디자인 리드)
- **레포**: https://github.com/lg21twins/haru-anbu
- **브랜치**: `design/v8-latest-0416` (최신)
- **목업 위치**: `07_디자인/mockup/v9_보호자앱/`
- **정보구조도**: `01_기획/보호자앱_정보구조도_v8.1.docx`

---

## 2. v8.1 정보구조 (IA)

### 탭바 구성 (5탭)
| 순서 | 탭 | 파일 | 역할 |
|------|-----|------|------|
| 1 | 홈 | g-guardian-live.html | AI 인사말 + 케어 요약 + 일일 리포트 + AI 인사이트 + 퀵메뉴 |
| 2 | AI 가이드 | g02-ai-guide.html | 의료 백과 + 케어 가이드 벤토 + 질문 캐러셀 |
| 3 | 소통 | g03-sotong.html | 대화/알림 세그먼트 · 채팅 목록 + AI 요약 카드 피드 |
| 4 | 기록 | g05-records.html | 처방전/타임라인/시간표/결제 벤토 + 드릴다운 |
| 5 | 마이 | g05-mypage.html | 프로필, 설정, 고객센터, 로그아웃 |

### 글로벌 요소
- **SOS 긴급 배너**: 모든 페이지 상단, 빨간 배너 자동 노출
- **플로팅 AI 버튼**: 모든 페이지 우측 하단, 탭 → AI 채팅 오버레이
- **AI 채팅 오버레이**: 5가지 모드 (일반 질문/케어 상담/감정 지원/요양 백과/복약 정보)

### v8 → v8.1 주요 변경
| 항목 | v8 | v8.1 |
|------|-----|------|
| 탭바 | 홈/채팅/리포트/결제/마이 | 홈/AI가이드/소통/기록/마이 |
| 홈 화면 | AI 채팅 입력 + 위젯 혼재 | AI 인사 + 리포트 + 인사이트 + 퀵메뉴 |
| AI 채팅 | 별도 탭 (채팅 탭) | 글로벌 플로팅 버튼 (모든 페이지) |
| AI 리포트 | 단독 탭 (벤토 그리드) | 홈 스크롤 영역 통합 |
| 결제 | 단독 탭 | 기록 탭 벤토에 통합 |
| SOS | 홈에만 | 글로벌 배너 (모든 페이지) |

---

## 3. 새 세션에서 읽어야 할 파일 (순서대로)

```
1. 이 파일 (HANDOFF.md) — 전체 맥락 파악
2. g-guardian-live.html — 홈화면 (핵심)
3. g02-ai-guide.html — AI 케어 가이드 (신규)
4. g03-sotong.html — 소통 (대화+알림 통합)
5. g05-records.html — 기록 (벤토 + 드릴다운)
6. g05-mypage.html — 마이페이지
7. g03-chat-nurse.html — 간호사 채팅 상세
```

기획서 참고:
```
01_기획/하루안부_통합기획서_v6.0.md   ← 단일 Source of Truth (2026.04.18)
01_기획/보호자앱_정보구조도_v8.1.docx
(구 문서들은 01_기획/_archive/ 로 이관됨)
```

---

## 4. 전체 화면 인벤토리

| ID | 화면명 | 소속 탭 | 파일 | 비고 |
|----|--------|---------|------|------|
| G-01 | 홈 | 홈 | g-guardian-live.html | AI 인사 + 요약 + 리포트 + 퀵메뉴 |
| G-02 | AI 케어 가이드 | AI 가이드 | g02-ai-guide.html | 벤토 그리드 + 질문 캐러셀 |
| G-03 | 소통 | 소통 | g03-sotong.html | 세그먼트 대화/알림 |
| G-04a | 간호사 채팅 | 소통 | g03-chat-nurse.html | 네비바 없음 |
| G-04b | AI 채팅 | 소통 | g03-chat-ai.html | 네비바 없음 |
| G-04c | 환자 채팅 | 소통 | g03-chat-patient.html | 네비바 없음 |
| G-04d | 가족 채팅 | 소통 | g03-chat-family.html | 네비바 없음 |
| G-05 | 기록 | 기록 | g05-records.html | 2×2 벤토 + 인페이지 드릴다운 |
| G-10 | 마이페이지 | 마이 | g05-mypage.html | 설정/계정 관리 |
| G-11 | AI 채팅 오버레이 | 글로벌 | (인페이지) | 플로팅 버튼으로 열림 |
| — | 알림 | 서브 | g06-alert.html | |
| — | 설정 | 서브 | g07-settings.html | |

### 레거시 파일 (v8, 참고용)
- `g03-chat.html` — v8 채팅 리스트 (→ g03-sotong.html로 대체)
- `g02-ai-report.html` — v8 AI 리포트 (→ 홈에 통합)
- `g08-billing.html` — v8 결제 단독 탭 (→ 기록에 통합)
- `g09-prescription.html` — v8 처방전 (→ 기록 드릴다운)
- `g10-timeline.html` — v8 타임라인 (→ 기록 드릴다운)

---

## 5. 디자인 시스템 규칙

### 5-1. 기본 원칙
- **모든 HTML은 self-contained** — common.css 의존 최소화, 인라인 CSS
- **보라색(#6D28D9) 사용 금지** — 파란색(#2C7AFC) 계열로 통일
- **폰트**: Pretendard Variable (CDN)
- **아이콘**: Iconify CDN (Fluent filled 우선)

### 5-2. 색상 변수
```css
:root {
  --blue:#2C7AFC; --blue-l:#5B9BFF; --blue-d:#1D6AF2;
  --green:#34D399; --green-d:#059669;
  --amber:#F59E0B; --red:#EF4444;
  --t1:#111827; --t2:rgba(0,0,0,.5); --t3:rgba(0,0,0,.25);
}
```

### 5-3. 배경
```css
html { background: #d4e4ff; }
background: linear-gradient(180deg, #d4e4ff 0%, #e8f0fe 40%, #f2f6ff 70%, #EEF3FB 100%);
```

### 5-4. 탭바 (전 페이지 통일)
- **Floating pill** — `border-radius:999px; max-width:370px; height:56px;`
- **아이콘 + 텍스트 라벨** — Iconify Fluent filled, `font-size:24px`
- **CDN**: `https://cdn.jsdelivr.net/npm/iconify-icon@2.3.0/dist/iconify-icon.min.js`
- **채팅 상세 페이지에서는 네비바 없음**

#### 탭별 아이콘 (v9 확정, 2026-04-17)
| # | 탭명 | 링크 | 아이콘 | 비고 |
|---|------|------|--------|------|
| 1 | 홈 | g-guardian-live.html | `fluent:home-24-filled` | |
| 2 | AI 케어 가이드 | g02-ai-guide.html | `fluent:shield-checkmark-24-filled` | ← v9 변경 |
| 3 | 소통 | g03-sotong.html | `fluent:chat-24-filled` | |
| 4 | 기록 | g05-records.html | `fluent:document-text-24-filled` | |
| 5 | 마이 | g05-mypage.html | `fluent:person-24-filled` | |

#### 탭바 HTML 템플릿
```html
<nav class="tabbar">
  <a href="g-guardian-live.html" class="tab">
    <span class="tab-icon"><iconify-icon icon="fluent:home-24-filled" style="font-size:24px"></iconify-icon></span>
    <span class="tab-label">홈</span>
  </a>
  <a href="g02-ai-guide.html" class="tab">
    <span class="tab-icon"><iconify-icon icon="fluent:shield-checkmark-24-filled" style="font-size:24px"></iconify-icon></span>
    <span class="tab-label">가이드</span>
  </a>
  <a href="g03-sotong.html" class="tab">
    <span class="tab-icon"><iconify-icon icon="fluent:chat-24-filled" style="font-size:24px"></iconify-icon></span>
    <span class="tab-label">소통</span>
  </a>
  <a href="g05-records.html" class="tab">
    <span class="tab-icon"><iconify-icon icon="fluent:document-text-24-filled" style="font-size:24px"></iconify-icon></span>
    <span class="tab-label">기록</span>
  </a>
  <a href="g05-mypage.html" class="tab">
    <span class="tab-icon"><iconify-icon icon="fluent:person-24-filled" style="font-size:24px"></iconify-icon></span>
    <span class="tab-label">마이</span>
  </a>
</nav>
```

> **아이콘 선택 원칙**: Fluent UI filled 계열 통일, 24px 고정. 탭 간 형태 충돌 금지 (예: 문서형 아이콘 중복 사용 불가)

### 5-5. 글로벌 요소
- **SOS 배너**: `border-radius:14px; background:rgba(239,68,68,.08)`
- **플로팅 AI 버튼**: `width:52px; border-radius:50%; background:linear-gradient(var(--blue),var(--blue-d))`
- **AI 오버레이**: 바텀시트 스타일, 5모드 칩

### 5-6. 위젯 카드 스타일
```css
.w {
  background: rgba(255,255,255,.88);
  border: 1px solid rgba(0,0,0,.04);
  border-radius: 20px;
  padding: 18px;
  contain: layout style paint;
}
```

### 5-7. PWA 설정 (전 페이지)
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#d4e4ff">
```

### 5-8. 성능 규칙
- **backdrop-filter:blur 사용 금지** — rgba 반투명 배경으로 대체
- **will-change 제거**
- **Canvas**: 1x 해상도, 15fps, 6px step

---

## 6. 개발 서버

```bash
cd 07_디자인/mockup/v9_보호자앱/
python3 -m http.server 9090
```

---

## 7. Git

```
main ← PR 통해서만 머지
  └── design/v8-latest-0416 ← 현재 최신
```

**주의**: main에 직접 푸시 금지. 항상 브랜치 → PR
