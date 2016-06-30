# react-project-config
前端采用reactjs前端框架和freemarker模板，项目搭建主要包括以下几个部分
- 构建工具=>gulp,webpack
- 开发效率=>hot-reload,webpack-dev-server,puer-freemarker

## 环境依赖
项目依赖的环境如下：
1. node.js 4.4.3
2. jdk 1.7

## 安装
```sh
    npm install
```
## 部署生产环境
```sh
    npm run build
```
## 开发调试
```sh
    npm run dev
```
## 基本任务
#### 生产环境
主要使用webpack进行了多页面的打包配置，将打包后文件输出到build目录，具体步骤如下：
```js
"build": "gulp build && npm run webpack"
```
1. clean  
  删除原有build目录。
2. tpl:copy  
  将公共ftl移入build目录，这些公共ftl文件是，没有经过html-webpack-plugin打包处理的文件。
3. webpack  
  进行webpack打包，有以下几个优化点：

 公共进行统一打包，externals 配置来忽略 react，react-dom。在entry中配置一个 common chunk来包含这两个库。  

 多页面打包，使用HtmlWebpackPlugin进行多页面打包，由于页面较多，所以将页面统一使用配置文件进行统一配置，然后通过injectHtmlWebpack方法向plugins添加HtmlWebpackPlugin。

 图片配置，限制base64的图片大小为10kb，超过的图片放到../res目录下。

#### 开发环境
使用了puer-freemarker模板编译服务，webpack-dev-server。输出到devbuild目录下，步骤如下：
```js
"dev": "gulp:dev"
```
1. clean  
  删除devbuild目录
2. npm run replace  
  将ftl文件中script的src路径代理到webpackDevServer，因为freemarker的服务直接引入的js是找不到webpackDevServer编译后的js，端口不一致，需要修改路径。
3. npm run gulp:dev  
  运行gulp:dev。webpackDevServer和puer-freemarker需要同时启动，所以需要child_process来处理。直接在npm run 两个任务无法同时运行。

## 开发配置
&emsp;&emsp;所有配置文件都放置于config文件下

name | explain
---|---
var | 基础变量配置文件
gulp.config.js | gulp任务配置文件
webpack.config.js | webpack生产环境配置文件
webpack.server.config.js | webpack开发环境配置文件
puerf | freemarker配置文件包括mock数据

在开发多页面应用时需要我们修改的主要有一下几个地方：  

1. 多页面入口配置  
在var.js中pages就是配置每个页面入口文件，如下所示：
```js
var pages = [
  {
    name: 'index',  //chunk名
    entry: 'index.js', //入口js文件
    ftl: 'index.ftl'  //模板入口
  },{
      name: 'product/index',
      entry: 'product/index.js',
      ftl: 'product/index.ftl'
    }
];
```
当我们添加页面时，就需要手动添加每个页面的相关信息。  

2. 端口号
开发环境启动了两个server，分别是8010端口的webpackServer和8888端口的puerf，大家可以根据需要修改端口号，只需要修改var.js中的posts，如下：
```js
var posts = {
  puerf: 8888,  //puerf 端口号
  webpackDev: 8010 //webpackDev端口号
};
```  

3. 启用其它server服务，可能存在使用tomcat启动server的，不使用puerf，只需要在gulpfile.js注释掉puef任务即可：
```js
gulp.task('dev',function(cb){
  runSequence(
    'clean:dev',
    'tpl:copy:dev',
    'tplreplace',
    'js:serve',
//    'puerf',
    'watch',
    cb);
});
```



## 其它问题
- 端口号问题，大家可以自行修改。
- puer-freemarker这个只是目前使用的一个模板server，大家也可以用tomcat启动其它server，直接将配置中的puer 注释掉即可。
