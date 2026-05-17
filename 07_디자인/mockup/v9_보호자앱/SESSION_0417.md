# v9 작업 인수인계 — 2026-04-17 세션

> 새 Claude Code 세션에서 이 파일부터 읽고 작업 이어갈 것

## 현재 상태 요약

v8 → v9 폴더 복사 완료. `g-guardian-live.html` (홈) 중심으로 이번 세션에서 큰 방향 전환이 있었음.

**핵심 컨셉 변화:**
- 홈 뒤에 AI 채팅 페이지가 깔려 있고, 그 위에 반투명 글래스 시트가 올라와 일일 리포트를 보여주는 **레이어드 구조**
- 시트를 드래그하면 AI 채팅이 드러남. 가운데에 AI 프롬프트 chip 3개가 보여서 "여기에 AI 있음" 시각적 단서
- 네비바(탭바)는 글래스 + SVG warp 왜곡 유지. 시트는 왜곡 제거 (가독성)

## 이번 세션에 완료된 것

### g-guardian-live.html (홈)
1. **글래스 시트**: `rgba(180,210,250,.15)` + `backdrop-filter:blur(40px)`. 블루 틴트, 투명도 15%
2. **SVG warp 왜곡**: 시트에서는 제거. 네비바에만 유지 (feTurbulence + feDisplacementMap 듀얼 레이어 scale 55+12)
3. **초록기/핑크기 artifact 해결**: feDisplacementMap의 `xChannelSelector/yChannelSelector`를 **둘 다 "R"**로 통일 → RGB fringing 제거
4. **스크롤 페이드**: "일일리포트" 텍스트가 화면을 완전히 덮으면 뒤 AI 채팅 텍스트 페이드아웃
5. **AI 프롬프트 chips**: 시트 가운데에 3개 chip ("오늘 정희님 상태 어때요?", "담당 간호사와 대화하기", "이번 주 케어 요약해줘")
6. **활동 위젯**: 24바 차트로 교체 (Product Categories 래퍼런스 스타일), full-width. JS 루프로 생성
7. **식사 위젯**: 위생 옆으로 이동
8. **기분 위젯**: dot grid (28일치 점수), JS 루프로 생성, "최근 28일" 라벨
9. **오늘 일정**: 전체보기 링크 제거, 팝업 trigger 카드로 변환 (다음 일정만 노출)
10. **바로가기 섹션 제거** ← 방금 삭제
11. **투약 파도 이탈 수정** ← 방금 fix. canvas를 좌우 4px 확장 + 자체 border-radius 제거, 부모 `overflow:hidden`이 클리핑

### 전 페이지 (14개)
- 탭바 위치 통일: `bottom:calc(env(safe-area-inset-bottom,0px) + 12px)`
- 탭바 글래스 통일: `rgba(180,210,250,.15)` + `backdrop-filter:blur(40px)`

## 거부됐던 시도 (다시 제안 금지)
- ❌ AI orb (동그란 파도 원) — "별로네"
- ❌ 하루안부 캐릭터 이미지 삽입 — "캐릭터 빼줘"
- ❌ 미니 AI 프리뷰 카드 (C안) — "별로다"
- ❌ 시트 bounce + 힌트 텍스트 (D안) — "별로다"
- ❌ 시트 자동 bounce (A안) — "별로다"
- ✅ 최종 해결: 가운데 AI 프롬프트 chip 3개

## 중요 디자인 결정 (잊지 말 것)
- 글래스 왜곡의 초록/핑크 artifact는 **같은 채널 displacement**(R/R)로 해결. 바꾸면 재발함
- 시트에는 왜곡 금지 (가독성), 네비바에는 유지 (심미성)
- 시트 투명도 15%, 색상 `rgba(180,210,250,.15)` — 블루 틴트 유지
- 브랜드 컬러: `#2C7AFC`. 보라색 금지
- 폰트: Pretendard Variable
- 아이콘: Iconify (Fluent filled 우선)

## 개발 서버
```bash
cd /Users/kimjiwook/Downloads/haru-anbu-main/07_디자인/mockup/v9_보호자앱
python3 -m http.server 9091
```
- PC: http://localhost:9091/g-guardian-live.html
- 폰: http://172.25.35.67:9091/g-guardian-live.html

## 커밋 안 된 변경사항
`git status`로 확인. `design/v8-latest-0416` 브랜치에서 작업 중. 아직 커밋/푸시 안 함.

## 다음에 할만한 것 (사용자가 지시한 바는 없음)
- 다른 페이지들도 홈과 동일한 수준의 리팩토링 필요한지 체크
- 성능 측정 (backdrop-filter blur 40px 여러 곳 중첩 시 프레임 드롭 가능)
- 커밋 정리
