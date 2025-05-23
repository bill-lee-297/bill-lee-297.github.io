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



먼저 사용자가 입력한 숫자만큼 반복문을 돌려서 볼을 생성했다.
색상과 위치를 랜덤으로 주었고 하늘에서 떨어져야하기 때문에 공의 크기인 40px에서 그림자 값 2px을 더해 -top:42px로 영역에서는 보이지 않는 위치에 배치했다.

```javascript
function createBall() {
  const ballElement = document.createElement('div');
  const color = getRandomColor();

  ballElement.classList.add('ball');
  ballElement.style.top = -42 + 'px';
  ballElement.style.left = `${Math.random() * innerWidth}px`;
  ballElement.style.backgroundColor = color;
  ballElement.style.boxShadow = `0 1px 2px ${color}`;

  document.querySelector('.container').appendChild(ballElement);
  return ballElement;
}
```

모든 공이 동일하게 떨어질 필요는 없기 때문에 생성과 동시에 떨어트렸다.
공이 떨어지는 순서도 랜덤으로 해야하기 때문에 delay 시간도 랜덤으로 지정했다.
공의 높이가 40px이고 초기 배치는 -50px로 배치 했기 때문에 최종 도착지는 window.innerHeight+10으로 지정했다.

```javascript
function dropBall(ballElement) {
  const delay = Math.random() * 3;

  gsap.to(ballElement, {
    y: window.innerHeight+2,
    duration: 2,
    ease: 'bounce.out',
    delay: delay
  });
}
```

공이 떨어지는 것 같은 애니메이션을 라이브러리 없이 직접 만들려면 많은 시간이 들었을 것이다.
애니메이션을 구현하는데 있어서 GSAP이 강력하다는 것을 다시 한번 깨달았다.   

다음에는 공과 공이 물리법칙으로 상호작용하는 기능도 넣고 싶다. 
지금은 공과 공이 겹쳐서 동작하고 있다. 서로 부딪쳐서 튕겨지고 바닥에 쌓이는 동작을 구현해보고 싶다.