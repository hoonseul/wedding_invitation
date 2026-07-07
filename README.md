# Wedding Invitation

모바일 청첩장 프로젝트입니다. GitHub Pages에 업로드하면 무료 링크로 공유할 수 있습니다.

## 파일 구조

- `index.html` : 청첩장 내용
- `style.css` : 디자인, 컬러, 여백, 반짝이 효과
- `script.js` : D-day, 지도, BGM, 계좌 복사, 갤러리 확대, 카카오톡 공유
- `images/` : 사진 폴더
- `music/bgm.mp3` : 배경음악 파일

## 이미지 파일명

아래 이름으로 이미지를 넣으면 자동으로 연결됩니다.

- `images/hero.jpg` : 첫 화면 오프닝 이미지
- `images/ending.jpg` : 엔딩 이미지
- `images/naver-map.jpg` : 네이버 지도 API 키가 없을 때 보이는 지도 캡처 이미지
- `images/timeline01.jpg` ~ `images/timeline04.jpg` : 타임라인 이미지
- `images/gallery01.jpg` ~ `images/gallery06.jpg` : 갤러리 이미지

## 카카오톡 공유 버튼

`script.js` 상단의 아래 부분에 카카오 개발자센터에서 발급받은 JavaScript 키를 넣으면 카카오톡 공유가 활성화됩니다.

```js
const KAKAO_JS_KEY = "여기에_카카오_JavaScript_키";
```

키를 비워두면 카카오톡 공유 버튼을 눌렀을 때 링크 복사로 대체됩니다.

## GitHub Pages 배포

1. GitHub Repository에 파일 업로드
2. `Settings` 클릭
3. 왼쪽 메뉴 `Pages` 클릭
4. Source: `Deploy from a branch`
5. Branch: `main`, Folder: `/root`
6. `Save`
7. 1~3분 후 `https://아이디.github.io/wedding_invitation/` 링크 확인
