---
title: 'Next.js standalone으로 배포하기'
description: 'Next.js는 node_modules의 일부 파일을 포함하여 프로덕션 배포에 필요한 파일만 복사하는 독립 실행형 폴더를 자동으로 생성할 수 있다.'
pubDate: '2023.08.16'
---

Next.js는 node_modules의 일부 파일을 포함하여 프로덕션 배포에 필요한 파일만 복사하는 독립 실행형 폴더를 자동으로 생성할 수 있다.

 

이 기능을 사용하기 위해서는 next.config.js에서 아래와 같이 활성화를 해주면 된다.

```javascript
module.exports = {
  output: 'standalone',
}
```

이렇게 하면 .next/standalone에 폴더가 생성되며, 이 폴더는 node_modules를 설치하지 않고도 자체적으로 배포할 수 있다.

 

또한 next start 대신 사용할 수 있는 server.js 파일도 생성된다. 이 서버는 기본적으로 public 또는 .next/static 폴더를 복사하지 않는다. 이러한 폴더는 CDN에서 처리하는 것이 이상적이지만, 이러한 폴더를 standalone/public 및 standalone/.next/static 정적 폴더에 수동으로 복사할 수 있으며, 그 후에는 server.js 파일이 자동으로 해당 폴더를 서비스한다.

 

운영 서버에 npm run build를 통해 생성된 .next/standalone 폴더만 업로드 하면 되고 node server.js로 실행하면 된다. 

 

추가적으로 .next/static을 CDN으로 처리를 하려 한다. 

next.config.js에서 assetPrefix 옵션에 CDN의 URL을 추가해주면 CDN 안에서 .next/static 를 찾게 된다.

```javascript
module.exports = {
    output: 'standalone',
    reactStrictMode: false,
    swcMinify: true,
    assetPrefix: 'https://cdn.mydomain.com'
};
```


아래 보면 cdn 폴더 경로를 보면 .next가 아닌 _next로 찾게 되기 때문에 폴더명을 변경해줘야한다.



<img src="/blog/post-3/1.png" alt="cdn path image" width="70%">
