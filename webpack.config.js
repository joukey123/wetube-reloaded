const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const BASE_JS = "./src/client/js/";

module.exports = {
  entry: {
    main: BASE_JS + "main.js",
    videoPlayer: BASE_JS + "videoPlayer.js",
    recorder: BASE_JS + "recorder.js",
    commentSection: BASE_JS + "commentSection.js",
  },
  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
  mode: "development",
  watch: true,
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
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

      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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

// ======== scss 를 변활할 때 필요한 loader 3가지
// 1. 이상하게 생긴 css를 브라우저가 이해할 수 있는 일반적인 css로 변환 loader : sass-loader
// 2. 폰트같은 것을 불러올때 유용하게 사용하는 loader, import나 url() 등을 풀어서 해석해주는 loader : css-loader
// 3. 바뀐 css를 웹사이트에 적용 loader : style-loader
//로더는 실행 순서 역순으로 작성한다. 제일 처음 실행되는게 제일 마지막에 위치

//style-loader 는 자바스크립트 안에 css가 포함되어 있어 분리하고 싶다. : MiniCssExtractPlugin
//  https://webpack.kr/plugins/mini-css-extract-plugin/

// 폴더경로를 바꿔줌 js/main.js css/styles.css 파일이름 변경하는 옵션이 있다.
// 자바스크립트 코드에서 분리전에는 css코드가 있고 Pug에서 main.js(자바스크립트 코드)를 불러와서 배경색이 레드로 변경
// 분리 후에는 Pug가 css를 인식하지 못해서 연결해줘야 된다.
// pug에서 css파일을 연결 link(rel="stylesheets", href="/static/css/styles.css")

//client는 webpack에 의해서만 로딩!

//asset 폴더를 수동으로 삭제할 경우 오래된 데이터를 남겨둘 수 있고 계속 삭제버튼을 누르기가 귀찮아 자동으로 해주도록 바꿔준다. : watch:true
//npm run asset 명령을 입력해도 종료되지 않는다.
//수정될 경우 자동으로 업데이트!
// 단 백엔드와 동시에 시작해줘야한다. npm run dev , npm run assets 동시에 실행해야한다.

//output 폴더를  시작하기 전에 clean하게 해주는 것>?! : clean:true

// 여기서 자바스크립트 (프론트엔드) 변경되면 백엔드가 재시작된다.
// webpack.config.js파일을 저장할 때마다 nodemon이 파일을 저장하는 줄 알고 벡앤드를 재시작한다.
// nodemon에게 폴더 및 파일을 무시하는 방법을 알려줘야한다.
// 방법 1 : package json에서 명령문을 수정 - 너무 길어짐
// 방법 2. nodemon 설정파일을 생성 (추천!)
//https://www.npmjs.com/package/nodemon

//    "assets": "webpack --config webpack.config.js"
//    "assets": "webpack"
// webpack이 실행될 때 기본적으로 찾는 파일이 congin 설정파일이기 때문에 위에 처럼 간략하게 적어도된다.
