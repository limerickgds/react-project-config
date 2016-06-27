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
```javascript
"build": "npm run clean && gulp tpl:copy && npm run webpack"
```
1. clean  
  删除原有build目录。
2. tpl:copy  
  将公共ftl移入build目录，这些公共ftl文件是，没有经过html-webpack-plugin打包处理的文件。
3. webpack  
  进行webpack打包，有以下几个优化点：
<<<<<<< HEAD

 公共进行统一打包，externals 配置来忽略 react，react-dom。在entry中配置一个 common chunk来包含这两个库。  

 多页面打包，使用HtmlWebpackPlugin进行多页面打包，由于页面较多，所以将页面统一使用配置文件进行统一配置，然后通过injectHtmlWebpack方法向plugins添加HtmlWebpackPlugin。

 图片配置，限制base64的图片大小为10kb，超过的图片放到../res目录下。

=======
-  公共进行统一打包，externals 配置来忽略 react，react-dom。在entry中配置一个 common chunk来包含这两个库。
-  多页面打包，使用HtmlWebpackPlugin进行多页面打包，由于页面较多，所以将页面统一使用配置文件进行统一配置，然后通过injectHtmlWebpack方法向plugins添加HtmlWebpackPlugin。
-  图片配置，限制base64的图片大小为10kb，超过的图片放到../res目录下。
-  
>>>>>>> origin/master
#### 开发环境
使用了puer-freemarker模板编译服务，webpack-dev-server。输出到assets目录下，步骤如下：
```javascript
"dev": "rimraf ./assets && npm run replace && npm run gulp:dev"
```
1. clean  
  删除assets目录
2. npm run replace  
  将ftl文件中script的src路径代理到webpackDevServer，因为freemarker的服务直接引入的js是找不到webpackDevServer编译后的js，端口不一致，需要修改路径。
3. npm run gulp:dev  
  运行gulp:dev。webpackDevServer和puer-freemarker需要同时启动，所以需要child_process来处理。直接在npm run 两个任务无法同时运行。

## 其它问题
- 端口号问题，大家可以自行修改。
- puer-freemarker这个只是目前使用的一个模板server，大家也可以用tomcat启动其它server，直接将配置中的puer 注释掉即可。
- 在修改ftl源文件后，puer server会崩溃，原因是，源文件在替代assets中生成的新的ftl，会导致puer-freemarker暂时无法找到ftl文件，会产生崩溃，所以在启动puer server后尽量不要修改ftl，或者启动tomcat等server来代替puer-freemarker。
