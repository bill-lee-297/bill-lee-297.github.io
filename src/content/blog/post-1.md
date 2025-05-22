---
title: 'Drop The Ball - GSAP Animation bounce'
description: 'GSAP 라이브러리의 애니메이션 기능을 활용하여 공이 하늘에서 떨어지는 모습을 구현해보았다.'
pubDate: '2024.05.22'
---

GSAP 라이브러리를 살펴보는 중에 Easing에서 bounce.out의 그래프를 보게 되었다.
공이 튕기는 것과 동일하게 애니메이션의 동작 그래프가 그려졌다.

<img src="/blog/post-1-bounce.gif" alt="bounce animation" width="50%">

공이 튕기는 것과 관련된 재밌는 것을 만들어 보고 싶었다. 예전에 봤던 하늘에서 눈이 내리는 애니메이션에서 아이디어를 얻어서
하늘에서 공이 떨어지는 것을 만들어보기로 했다.

첫번째로 공의 개수를 사용자에게 입력을 받도록 했다.   
두번째로 공의 위치와 색, 떨어지는 시간을 랜덤하게 했다.

<p class="codepen" data-height="500" data-default-tab="result" data-slug-hash="yyymxXg" data-pen-title="[GSAP]DropTheBall" data-user="kukjin-lee" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/kukjin-lee/pen/yyymxXg">
  [GSAP]DropTheBall</a> by kukjin (<a href="https://codepen.io/kukjin-lee">@kukjin-lee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>