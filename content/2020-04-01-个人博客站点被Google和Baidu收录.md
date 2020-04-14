---
templateKey: blog-post
id: 
title: 个人博客站点被Google和Baidu收录
slug: /2020/04/01/个人博客站点被Google和Baidu收录
date: 2020-04-01T21:05:03.125Z
description: Gatsby个人博客站点被百度谷歌收录，增加百度谷歌搜索引擎验证
headerImage: 
tags:
  - JavaScript
  - 前端
  - Gatsby
---
<font color=red>This is a stub that needs to be expanded further.</font>

个人博客，百度搜不到、谷歌搜不到，没有人看，没有流量怎么办？<br>

详见<br>
- [Hexo个人博客站点被百度谷歌收录](https://blog.csdn.net/qq_32454537/article/details/79482914)<br>

## [谷歌搜索控制台网址](https://search.google.com/search-console)  


## [百度搜索资源平台](https://ziyuan.baidu.com/site/index#/)  


## 提交站点地图

&emsp;在谷歌和百度搜索资源平台提交网址并验证所有权后，需要向谷歌或者百度提交Sitemap（站点地图）。sitemap一般为XML文件，在其中列出网址以及关于子页面的元数据（上次更新的时间、更改的频率以及相对于网站上其他网址的重要程度为何等），以便搜索引擎可以更加智能地抓取网站。<br>

&emsp;Gatsby有生成sitemap的插件的—— gatsby-plugin-site<br>

&emsp;这个插件仅会在production模式下生成sitemap文件，run:``` gatsby build && gatsby serve```<br>

&emsp;安装后,在配置文件加上即可，sitemap将会输出在根目录。
```js
// In your gatsby-config.js
siteMetadata: {
  siteUrl: `https://www.example.com`,
},
plugins: [`gatsby-plugin-sitemap`]
```

&emsp;生成之后，将生成的xml文件上传到google和baidu即可。即在google或者百度的sitemap上传网址输入
```py
https://www.dyuzz.club/sitemap.xml
```

###后记

&emsp;在向Baidu和Google提交网站信息和链接的过程中，不禁在想，Baidu完全与Google不在一个重量级。向GOogle提交站点地图，秒成功且爬取成功，而百度，第一次爬取失败，第二次到现在还在处理中（**已经6天**）。Baidu到现在没破产，全得得益于Google被屏蔽，以及其昧着良心赚黑钱。
