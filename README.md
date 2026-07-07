# Wedding Invitation

## 파일 구조

- `index.html` : 청첩장 내용
- `style.css` : 디자인, 컬러, 여백
- `script.js` : D-day, 지도, BGM, 계좌 복사 등 기능
- `images/` : 사진 폴더
- `music/bgm.mp3` : 배경음악 파일

## 이미지 파일명

아래 이름 그대로 넣으면 자동 적용됩니다.

- hero.jpg
- ending.jpg
- timeline01.jpg
- timeline02.jpg
- timeline03.jpg
- timeline04.jpg
- gallery01.jpg
- gallery02.jpg
- gallery03.jpg
- gallery04.jpg
- gallery05.jpg
- gallery06.jpg

## 네이버 지도 API

`index.html` 안의 아래 부분을 수정하세요.

```html
<script src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=여기에_네이버_CLIENT_ID"></script>
```

`여기에_네이버_CLIENT_ID`를 네이버 클라우드에서 발급받은 Client ID로 교체하면 확대 가능한 네이버 지도가 작동합니다.
