const path = require("path");

module.exports = {
  entry: "./src/client/js/main.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "assets", "js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
//configuration에는 2가지의 propety (entry, output)가 있다.필수요소이고 이름은 고정.
// 섹시한 자바스크립트 코드를 못생긴 자바스크립트 코드로 변형 (scss ->css)

//enrty : 소스코드를 의미 우리가 처리(변형)하고 싶은파일 / 우리의 경우 main.js
//entry 값 : webpack 파일 기준으로 처리하고 싶은 js 파일 경로를 입력하면된다.

//output : 변형된 결과물
// filename : 결과물의 파일이름
// path : 결과물 저장 위치 (절대경로, 전체경로를 다 입력해야한다.)
// console.log(__dirname) > 파일 까지의 경로전체를 알려준다. /Users/woo/Desktop/frontend/wetube-reloaded
// path.resolve() > 입력된 파트들을 모아서 경로로 만들어주는 함수
// path.resolve(__dirname, "assets", "js") > Users/woo/Desktop/frontend/wetube-reloaded/assets/js

//mode : 모드를 설정하지 않은 기본모드가 production 이다. 이 경우 변형된 코드를 압축하는데 개발중에는 원본 코드를 확인하면서
// 에러를 수정해야 하기 때문에 모드를 development로 해주는게 좋다.

//rules 우리가 각각의 파일 종류에 따라 어떤 전환을 할 건지 결정
//js의 경우 바벨 패키지를 로드하여 변환한다.

//우리가 최신 자바스크립트로 (프론트) 작성할 곳은 client
//브라우저가 파일을 읽는 곳은 assets/js
