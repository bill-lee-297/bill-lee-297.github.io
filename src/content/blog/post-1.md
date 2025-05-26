---
title: 'Github Action을 활용하여 도커에 환경변수를 주입하는 방법'
description: 'Next.js를 AWS의 ECR에 이미지로 생성할 때 Github Action을 활용하여 도커에 환경변수를 주입하는 방법'
pubDate: '2023.03.27'
---

Next.js를 사용하면서 정적페이지로 배포하는 것이 아니기 때문에 서버에 배포하는 과정에서 도커를 사용하기로 하였고 코드를 dev, stage, main에 병합이 되는 순간 AWS의 ECR에 이미지가 생성이 되도록 하였다.

 

그 과정에서 환경변수(.env)를 어떻게 관리 해야되나 고민했다. Repo에 민감한 정보가 있는 .env를 올리는 것도 아닌거 같고 서버 안에서 .env 생성하여 컨테이너가 그 환경변수를 바라보게 하는 것도 뭔가 좋아보이지 않았다.

 

그래서 생각한 방법이 Github Action에서 도커 이미지를 생성할 때 옵션 값으로 환경변수(.env)를 넣기로 하였고 방법을 찾아봤다.

 

맞는 방법인지는 모르겠지만 CI/CD를 하는 방법을 아래와 같은 흐름으로 진행하기로 했다.

<img src="/blog/post-1/1.png" alt="CI/CD process flow" width="100%">

먼저 Github Action에서 Secrets를 설정하는 방법을 살펴보면 Settings -> Security -> Secrets and variables -> Actions에서 만들 수 있다.

<img src="/blog/post-1/2.png" alt="github setting page" width="100%">

브랜치별로 환경변수를 다르게 할 필요가 없다면 Repository secrets에 환경변수를 등록하면 되지만, main, stage, dev의 환경변수를 다 다르게 설정을 해줘야했다. 그래서 Environment secrets을 활용하기로 했다.

 
환경에 대한 이름을 지어주고 
<img src="/blog/post-1/3.png" alt="github setting page environment" width="100%">


아래와 같이 Selected branches를 해서 원하는 브랜치 명을 입력해줬다.

<img src="/blog/post-1/4.png" alt="github setting page environment" width="100%">

아래에서 Add secret을 입력해줬다. 

<img src="/blog/post-1/5.png" alt="github setting page environment" width="100%">

이런 방식으로 dev, stage, main에 환경변수명과 값을 넣어주면 된다. 이제 이 secrets 값을 github action 스크립트 파일(yml)에서 도커로 주입을 해줘야한다. 환경별로 다른 secrets을 넣기 위해서는 어떤 환경인지 선언을 해줘야한다.

```yml
jobs:
    build:
        environment: dev // main 혹은 stage
```


```yml
run: |
  docker build \
  --build-arg "NEXT_PUBLIC_API_URL=${{ secrets.NEXT_PUBLIC_API_URL}}" \
  --build-arg "NEXT_PUBLIC_API_KEY=${{ secrets.NEXT_PUBLIC_API_KEY}}" \
  --build-arg "NAVER_CLIENT_ID=${{ secrets.NAVER_CLIENT_ID}}" \
  --build-arg "KAKAO_REST_API_KEY=${{ secrets.KAKAO_REST_API_KEY}}" \
  --build-arg "NEXT_PUBLIC_TOSS_CLIENTKEY=${{ secrets.NEXT_PUBLIC_TOSS_CLIENTKEY}}" \
  --build-arg "NEXT_PUBLIC_ORIGIN_URL=${{ secrets.NEXT_PUBLIC_ORIGIN_URL}}" \
  --build-arg "NEXT_PUBLIC_TEST_API_URL=${{ secrets.NEXT_PUBLIC_TEST_API_URL}}" \
  -t $ECR_REPOSITORY:$IMAGE_TAG .
```


Dockerfile을 통해서 빌드명령어를 실행 시킬 때 --build-arg에 다음과 같이 secrets을 넣어준다. 앞에서 environment: dev 로 설정해줬기 때문에 github에서 dev 환경에 해당하는 secrets 값이 들어가게 된다.

 

이제 Dockerfile이 실행되고 --build-arg로 넘겨줬던 변수를 받아서 env로 넣는 과정이 필요하다. DockerFile 안에 다음과 같이 넣었다.

```yml
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_KEY
ARG NAVER_CLIENT_ID
ARG KAKAO_REST_API_KEY
ARG NEXT_PUBLIC_TOSS_CLIENTKEY
ARG NEXT_PUBLIC_ORIGIN_URL
ARG NEXT_PUBLIC_TEST_API_URL

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_API_KEY=${NEXT_PUBLIC_API_KEY}
ENV NAVER_CLIENT_ID=${NAVER_CLIENT_ID}
ENV KAKAO_REST_API_KEY=${KAKAO_REST_API_KEY}
ENV NEXT_PUBLIC_TOSS_CLIENTKEY=${NEXT_PUBLIC_TOSS_CLIENTKEY}
ENV NEXT_PUBLIC_ORIGIN_URL=${NEXT_PUBLIC_ORIGIN_URL}
ENV NEXT_PUBLIC_TEST_API_URL=${NEXT_PUBLIC_TEST_API_URL}
```


코드가 자동으로 병합 됐을 때 다음과 같이 실행되는걸 볼 수 있다.


<img src="/blog/post-1/6.png" alt="github setting page environment" width="100%">


```yml
jobs:
    build:
        environment: dev
```

이 부분만 빠르게 찾았다면 쉽게 했을 작업인데 한참 걸렸다. 이런 방법으로 도커를 배포하는게 좋은 방법인지는 더 찾아봐야되지만 Github Action에서 브랜치별로 secrets를 주입하는 기능에 대해서 이해하고 활용했다는 점에서 경험치를 쌓았다고 생각한다.

