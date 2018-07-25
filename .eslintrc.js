module.exports = {
  env: {
    browser : true,
    amd     : true,
    jquery  : true,
    node    : true,
  },
  parser: "babel-eslint",
  extends: [ 'airbnb' ],
  plugins: [
    'react',
    'jsx-a11y',
    'import'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.dev.js'
      }
    },
  },
  rules: {
    // 版权声明会报错
    'spaced-comment': ['error', 'always', {
      exceptions: ['*']
    }],
    "prefer-destructuring": ["warn", { "array": true, "object": true }, {
      "enforceForRenamedProperties": false
    }],
    // 对齐样式
    // 'key-spacing': ['error', {
    //   'multiLine': {
    //     'beforeColon': false,
    //     'afterColon': true,
    //   },
    //   'align': {
    //     'beforeColon': true,
    //     'afterColon': true,
    //     'on': 'colon',
    //   }
    // }],
    // lodash中_.reducer会导致报错
    'no-param-reassign': ['error', { props: false }],
    // 块代码需要前后是否有空行
    'padded-blocks': ['off', {'blocks': 'always'}],
    "object-shorthand":'error',                  //要求对象字面量简写语法 --> ES6提供了简写的形式去定义对象中的方法和属性
    "no-unused-vars":['warn'],                   //未使用过的变量
    "object-curly-newline": 'off',                //强制在花括号内使用一致的换行符
    'import/prefer-default-export': 'off',       // 在index.js文件中只导出一个组件的时候报错
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "react/jsx-filename-extension": ['warn', { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/anchor-is-valid":'off',
    "no-debugger":'off',
    "arrow-parens": ['error', "as-needed"],
    "lines-between-class-members":'off',
    "react/jsx-one-expression-per-line":'off',
    "comma-dangle": ["error", "never"]
  }
}
