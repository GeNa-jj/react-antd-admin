const { override, fixBabelImports, addLessLoader } = require('customize-cra')


// 不默认开启浏览器
process.env.BROWSER = 'none';
// 不产生source map
process.env.GENERATE_SOURCEMAP = 'false'

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        // '@primary-color': '#1DA57A'
      }
    })
)
