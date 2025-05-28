---
title: 하늘에서 떨어지는 별똥별을 그리기
description: '하늘에서 별똥별이 떨어지는 모습을 구현하기 위해 겪었던 시행 착오와 구현 방법을 정리해봤다.'
pubDate: '2025.05.28'
---

우리는 밤하늘에 별똥별을 볼 때면 소원을 빌곤 한다. 인생을 살면서 별똥별을 볼 수 있는 기회가 얼마나 될까?
언제든지 밤하늘에서 떨어지는 별똥별을 보며 소원을 빌 수 있는 서비스를 만들어 봤다.그리고 그 과정에서 별똥별의 모습을 어떻게 구현했는지 기록해볼까 한다.

<div style="text-align: center;">
  <video width="100%" autoplay muted loop>
    <source src="/blog/post-4/shootingStar.mp4" type="video/mp4">
    브라우저가 비디오 태그를 지원하지 않습니다.
  </video>
  <p style="margin-top:-1.5rem">[완성된 모습]</p>
</div>

먼저 별똥별의 몸통과 꼬리 부분으로 나눴다.

```css
// 몸통 부분
.shootingStar {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 10;
  opacity: 0;
  box-shadow: 0 0 0 4px rgba(255,255,255,0.1),
              0 0 0 8px rgba(255,255,255,0.1),
              0 0 20px rgba(255,255,255,0.1);
}

.shootingStar::after{
  content:'';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg,#fff,transparent);
}

```

<img src="/blog/post-4/1.png" alt="shootingStar image" width="100%">

내가 아는 별똥별은 대각선으로 떨어지기 때문에 시작점과 끝점을 대각선으로 그려봤다.
먼저 오른쪽 상단에서 시작해서 왼쪽 하단에서 끝나도록 랜덤으로 좌표를 구해봤다.

```javascript
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const convertPercentageToPixels = (percentage: number, viewport: 'width' | 'height') => {
  return percentage * (viewport === 'width' ? window.innerWidth : window.innerHeight) / 100;
}

const startX = convertPercentageToPixels(getRandom(75, 85), 'width'); // 시작 x
const startY = convertPercentageToPixels(getRandom(15, 25), 'height'); // 시작 y
const endX = convertPercentageToPixels(getRandom(20, 30), 'width'); // 끝 x
const endY = convertPercentageToPixels(getRandom(50, 60), 'height'); // 끝 y
```

시작 좌표는 가로축은 화면에서 75%~85%, 세로축은 화면에서 15%~25%에 랜덤으로 배치되고 
종료 좌표는 가로축은 20%~30%, 세로축은 50%~60%에 랜덤으로 좌표가 찍히도록 하였다.


여기서 퍼센테이지를 픽셀로 다시 변환하는 이유는 별똥별 꼬리의 기울기 때문이다.
퍼센테이지로 값을 구할 경우 정확한 좌표값이 아니기 때문에 기울기에 오류가 발생한다.

이제 시작점과 끝점의 기울기를 구하고 그것을 각도로 변환한다.

```javascript
const dx = endX - startX;
const dy = endY - startY;
const slope = dy / dx;
```
기울기는 보통 위와 같이 구할 수 있지만 각도를 완벽히 알 수가 없다.
그래서 두 값을 넣으면 방향(각도)을 정확하게 계산해주는 Math.atan2()를 사용한다.


> Math.atan2() 정적 메서드는 Math.atan2(y, x)에 대해 양의 x축과 (0, 0)에서 (x, y)점까지의 광선 사이의 평면 각도(라디안 단위)를 반환합니다.   [MDN Web Docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)


```javascript
const dy = endY - startY;
const dx = endX - startX;
const angleRadians = Math.atan2(dy, dx)

const angleDegrees = (angleRadians * 180 / Math.PI);
```

꼬리를 rotate 시키기 위해서 라디안을 <strong>도(degree)</strong>로 바꿔줘야 한다.

$$
\text{1 radian} = \frac{180^\circ}{\pi} {\times} degrees
$$

추가적으로 현재 상태에서는 180도 정도 반대방향으로 꼬리가 향해져있다.
브라우저 좌표계를 맞추기 위해서 angleDegrees에 180을 더해줬다.
```javascript
const angleDegrees = (angleRadians * 180 / Math.PI)+180;
```

<img src="/blog/post-4/2.png" alt="shootingStar image" width="100%">

```javascript
starRef.current.style.transform = `rotate(${angleDegrees}deg)`;
```
별똥별 꼬리의 기울기가 제대로 적용되었다. 이제 움직임을 위해서 위의 코드는 삭제하고 GSAP 라이브러리를 사용한다.


```javascript
gsap.fromTo(
  starRef.current,
  {
    left: startX,
    top: startY,
    opacity: 1,
    rotate: angleDegrees,
  },
  {
    left: endX,
    top: endY,
    opacity: 0,
    duration,
    ease: 'none',
  }
);
```

<video width="100%" controls autoplay muted loop>
  <source src="/blog/post-4/shootingStar.mp4" type="video/mp4">
  브라우저가 비디오 태그를 지원하지 않습니다.
</video>

이렇게 시작점과 끝점의 기울기를 통해서 별똥별의 꼬리를 만들어봤다. 
학창시절에는 수학을 배워서 어디에 써먹는지 궁금했지만 개발을 하면서 배웠던 내용들을 활용하는 점이 매번 신기하고 흥미롭다.