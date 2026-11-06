# ESCAPE: SCHOOL

TypeScript + Phaser 3 + Vite / Node Express / Vercel API. 코드로 그린 픽셀 학교에서 세 학생을 안내하는 단일 맵 MVP입니다.

## 실행

Node 22 이상에서 `npm install`, `npm run dev`를 실행하고 http://127.0.0.1:5188 을 엽니다. WASD/방향키 이동, E 대화/교사 보고, ESC 메뉴입니다. 친구와 대화 후 닫기를 누르면 동행합니다. 남쪽 집결지 오른쪽 교사에게 보고하면 결과가 표시됩니다.

`npm run build`: 타입 검사 및 dist 생성. `npm test`: 경로와 점수 규칙 검사.

## Gemini

`.env.example`을 `.env`로 복사하고 `GEMINI_API_KEY`를 서버 환경에 설정합니다. `GEMINI_MODEL`로 모델을 변경할 수 있습니다. 기본값 gemini-3.5-flash는 Google 모델 목록의 Stable 표시를 기준으로 선택했습니다. 실제 계정에서 이용 가능한 모델인지 확인하세요. 키가 없으면 Mock, API 실패 시 Fallback으로 표시합니다. 키는 VITE_ 변수로 지정하지 마세요. Vercel에도 동일한 서버 환경변수를 등록하고 Vite 프로젝트로 배포합니다.

- 모델: https://ai.google.dev/gemini-api/docs/models
- 교육 규칙 근거: https://www.usfa.fema.gov/gallery/pictographs/escape-planning.html
- 실종자 보고: https://www.ready.marines.mil/Stay-Informed/Technological-Hazards/Home-Fires/

## 구조

- src/main.ts: Phaser 맵, 캐릭터, 조작, 대화, 동행, 미션 및 결과 UI
- src/data.ts: 맵, BFS 최단 경로, 교육 규칙과 출처, 행동 기반 점수
- src/style.css: 화면과 대화창
- api/dialogue.ts: 입력/응답 검증, 타임아웃, Mock, Gemini, 요청 제한
- server.ts: 로컬 API 서버

## 범위와 제한

현재 한 스테이지이며 통행 제한은 시작부터 적용됩니다. BFS는 동일 비용 타일에서 최단 안전 경로를 찾습니다. 교사 도움 요청은 대화창의 무전 보고로 처리하며 NPC가 직접 동행합니다. 음성, 저장, 여러 층, 본격적인 보행 프레임 애니메이션은 없습니다. 모든 학생을 집결지로 안내해야 결과를 볼 수 있습니다. API 대화 이력은 브라우저 메모리에 유지되며 요청 제한은 서버 인스턴스 메모리 기준으로 분산 환경에서 공유되지 않습니다. 배포 운영 전 공유 저장소 기반 제한과 서버 권한의 세션 상태가 필요합니다.

자유 생성 대사는 완전한 안전 검증기가 아니므로 교육기관 배포 전 검토가 필요합니다. 게임의 위험 통로는 항상 충돌로 차단됩니다. 외부 연결 없이도 교사 도움 요청으로 완료할 수 있습니다.

후속 우선순위: 브라우저 전체 플레이 자동화, 교사 도움 시나리오 확장, 서버 세션/분산 제한, 국내 학교별 검증된 대피 자료 적용, 추가 스테이지 및 스프라이트 애니메이션.

## 이번 작업의 검증 기록

Node 내장 TypeScript 실행으로 차단 타일, 세 학생의 집결지 도달 경로, 만점 계산 검사를 통과했습니다. 환경에서 registry.npmjs.org DNS 조회가 실패하여 npm install을 완료하지 못했습니다. npm run build는 tsc 미설치로 실패했습니다. 브라우저 플레이, Gemini 실계정 호출, Vercel 배포는 검증하지 못했습니다. 따라서 현재 코드는 실행 검증 전 구현 초안입니다.

## 연결 문제 해결 후 재검증

2026-11-05: 제한된 실행 환경의 DNS 접근 거부가 원인이었습니다. 권한 확장 환경에서 npm 설치를 완료했고 Gemini 모델 조회 및 실제 응답 생성이 HTTP 200으로 성공했습니다. 빌드와 테스트 3개가 통과했습니다. Zod는 취약점 수정 버전으로 갱신했습니다. 브라우저 전체 플레이와 Vercel 배포 검증은 여전히 남아 있습니다.

