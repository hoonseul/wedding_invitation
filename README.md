# Wedding Invitation

모바일 청첩장 프로젝트입니다. GitHub Pages에 업로드하면 무료 링크로 공유할 수 있습니다.

## 파일 구조

- `index.html` : 청첩장 내용
- `style.css` : 디자인, 컬러, 여백
- `script.js` : D-day, 지도, BGM, 계좌 복사, 갤러리 확대 기능
- `images/` : 사진 폴더
- `music/bgm.mp3` : 배경음악 파일

## 이미지 파일명

아래 이름으로 이미지를 넣으면 자동 적용됩니다.

- `images/hero.jpg` : 첫 화면 오프닝 이미지
- `images/ending.jpg` : 마지막 엔딩 이미지
- `images/naver-map.jpg` : 네이버 지도 API 키 없을 때 보이는 지도 미리보기 이미지
- `images/timeline01.jpg` ~ `images/timeline04.jpg` : 타임라인 이미지
- `images/gallery01.jpg` ~ `images/gallery06.jpg` : 갤러리 이미지

## 갤러리 확대 기능

갤러리 사진을 누르면 전체 화면으로 크게 보이고, X 버튼 또는 검은 배경을 누르면 닫힙니다.

## 지도

기본은 네이버 지도 API 구조입니다.

`index.html` 상단에서 아래 부분을 네이버 클라우드 Client ID로 바꾸면 확대/축소 가능한 지도가 보입니다.

```html
<script src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=여기에_네이버_CLIENT_ID"></script>
```

키를 넣기 전에는 `images/naver-map.jpg` 이미지 지도 미리보기가 표시됩니다.

지도 버튼 검색어는 `script.js`의 아래 부분에서 수정합니다.

```js
const MAP_SEARCH = "웨딩시그니처";
```

## GitHub Pages 설정

1. GitHub repository에 모든 파일 업로드
2. `Settings` 클릭
3. 왼쪽 `Pages` 클릭
4. Source: `Deploy from a branch`
5. Branch: `main`, Folder: `/root`
6. Save

생성 링크 예시:

`https://hoonseul.github.io/wedding_invitation/`
