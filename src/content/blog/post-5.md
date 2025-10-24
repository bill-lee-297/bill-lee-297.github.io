---
title: Claude Code에서 Serena 사용하기
description: 'Serena MCP를 사용하여 효율적으로 Claude Code를 운영해보자.'
pubDate: '2025.05.28'
---

Serena는 LLM을 활용하여 코드 기반에서 강력하게 작동하는 코딩 에이전트 툴킷입니다. 
IDE와 유사한 코드 검색 및 편집 도구를 제공하며, 심볼 레벨에서 코드를 이해하고 관계 구조를 활용합니다. 
특정 프레임워크나 인터페이스에 종속되지 않아 다양한 방식으로 사용할 수 있으며, 기존 코딩 에이전트의 토큰 효율성을 향상시킵니다.


**효율성 대폭 향상**
토큰 절약: 필요한 부분만 읽어서 토큰 사용량 60-70% 감소  
속도 향상: 인덱싱으로 빠른 코드 검색 및 분석  
컨텍스트 유지: 긴 대화에서도 맥락 손실 최소화  

**품질 개선**
버그 감소: 프로젝트 전체를 고려한 안전한 수정  
패턴 일관성: 기존 아키텍처를 따르는 구현  
베스트 프랙티스: 현재 모범 사례를 자동 적용  


### 실행 방법
먼저 UV가 설치 되어있어야 한다. [설치가이드](https://docs.astral.sh/uv/getting-started/installation/)

```
claude mcp add serena -- uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context ide-assistant --project $(pwd)

주요 옵션 설명
- `--context ide-assistant`: IDE 통합에 최적화된 컨텍스트를 사용합니다 (Claude Code용으로 권장)
- `--project $(pwd)`: 현재 디렉토리를 프로젝트로 설정합니다

설치 후 사용법
**Claude Code v1.0.52 이상**에서는 Serena의 초기 지침이 자동으로 로드됩니다. 만약 이전 버전을 사용하거나 지침이 로드되지 않으면, 다음 중 하나를 실행하세요:

- "read Serena's initial instructions" 라고 요청
- `/mcp__serena__initial_instructions` 명령어 실행

5. 프로젝트 활성화
Serena를 설치한 후, 다음과 같이 프로젝트를 활성화할 수 있습니다:
"Activate the project /path/to/my_project"

또는 이전에 활성화한 프로젝트라면:
"Activate the project my_project"
```
