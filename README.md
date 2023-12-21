# 2024 학교종이 프론트엔드 채용 과제

- [과제링크](https://schoolbell-e.notion.site/2024-a8374e5a9b704118be3256b6fb919854)

## How To Run

- install

```bash
npm install
```

- Run Each Question

```bash
# Run Q1.
npm run Q1

# Run Q2. starting at 8430 Port
npm run Q2

# Run Q3. starting at 5173 Port
npm run Q3
```

실행에 문제 발생시 [Ruderud0055@gmail.com](https://rudbeckiaz.com/about#:~:text=Ruderud0055%40gmail.com)로 연락바랍니다.

## Docs

- Q1

```bash
npm run Q1

배열을 입력하세요. (ex - [1,3,5,7,9]): [1,3,4,7,9]
숫자를 한 번 씩만 사용해서 만든 두 숫자의 곱의 최대값:  69843
```

위와같이 실행시, 숫자를 담은 배열을 입력하면 문제의 조건에 따라 계산한 결과를 출력합니다.

계산 과정은 다음과 같습니다.

1. 입력된 배열을 이용해서 만들 수 있는 모든 두가지 숫자를 담은 배열을 `permutations`함수를 통해 생성.
2. `maxMuliplied`함수에서 모든 두가지 숫자의 조합들에 대한 곱의 최대값을 계산, 최대값을 출력.

- Q2

`./Q2/index.js` 코드참조.

문제의 요구조건인 `removeClass`, `addClass`, `css`, `fadeOut`을 `FakejQuery`클래스 내부에 구현.
(이때, method chaining기능 구현을 위해 각 메서드는 자신을 반환케함.)

querySelector를 입력받아 사용하는 `FakejQuery` 생성자 함수인 `$`를 선언하여, 기 작성된 코드가 jQuery라이브러리 사용시와 동일하게 작동 되도록 함.

- Q3

React-typescript 환경에서 과제내용 구현.

사용라이브러리 (react, react-dom등 기본 구현을 위한 라이브러리는 제외.)

1. `vite`: SPA React 기본 세팅을 위한 라이브러리.
2. `React-hook-form`: form 구현에 필요한 여러 hook들을 제공. (ex - inputValue validation등)
3. `tailwindcss`: css 스타일링 라이브러리.

제공된 사용예시 중 Validation에 대한 즉각적인 반응 요구사항이 있기에, 기본 `react-hook-form`의 `register.options.validation`내에서 문자열 길이 및 중복처리에 대한 validation 구현을 하지않음.

대신 사용자의 입력 이벤트 발생시 입력사항을 즉각적으로 관찰가능한 `watch`메서드를 사용, 직접 전체 입력 데이터를 가져와서 이름의 중복(`checkNameDuplicated`), 이름의 최소길이(`checkNameLength`), 비밀번호의 최소길이(`checkPasswordLength`)를 체크하여 직접 에러를 발생시키도록 기능을 구현함.

추가로 에러사항이 있거나 입력되지 않은 input tag존재시 Confirm 버튼을 비활성화 시키도록 하였음.
