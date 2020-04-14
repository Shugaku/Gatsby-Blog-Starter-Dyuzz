---
templateKey: blog-post
id: 
title: Gatsby网站生成MarkDown的章节目录索引
slug: /2020/04/03/Gatsby生成MarkDownd的章节目录索引
date: 2020-04-03T14:30:03.125Z
description: 为Gatsby.Js搭建的个人静态Blog生成Markdown的文章目录索引
headerImage: 
tags:
  - JavaScript
  - 前端
  - Gatsby
---

&emsp;目前使用Gatsby搭建的本Blog已初具雏形，下一个头号问题是为基于MardDown生成的Blog文章生成章节目录索引。本来以为要自己解析.md文件，提取索引，没想到Gatsby自带插件，可实现此功能<br>

## 安装gatsby-transformer-remark插件

&emsp;首先使用[**gatsby-transformer-remark**][1]插件获取章节目录数据，安装代码：<br>
```bash
npm install --save gatsby-transformer-remark
```
&emsp;安装后在**gatsby-config.js**文件中引用插件<br>
```JavaScript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      // CommonMark mode (default: true)
      commonmark: true,
      // Footnotes mode (default: true)
      footnotes: true,
      // Pedantic mode (default: true)
      pedantic: true,
      // GitHub Flavored Markdown mode (default: true)
      gfm: true,
      // Plugins configs
      plugins: [],
    },
  },
],
```
&emsp;上述代码中相关中的commonmark、footnotes等可选参数可具体参考[remark-parse's documentation][2]。在Gatsby官方Blog中，也有许多使用Remark插件处理Markdown文件的[案例][3]<br>

&emsp;典型的使用**MarkDownRemark**的GraphQL查询代码如下，相信大家在CratePage和Node的过程中都使用过。
```JavaScript
{
  allMarkdownRemark {
    edges {
      node {
        html
        headings {
          depth
          value
        }
        frontmatter {
          # Assumes you're using title in your frontmatter.
          title
        }
      }
    }
  }
}
```
##提取MarkDown章节目录信息

### tableOfContents设置

&emsp;为生成章节目录索引，首先要提取章节目录信息。获取方法为在GraphQL查询代码（上述代码）中插入**tableOfContents**,如以下所示：
```js
{
  allMarkdownRemark {
    edges {
      node {
        html
        tableOfContents(
          absolute: true
          pathToSlugField: "frontmatter.path"
          heading: "仅从此标题开始显示目录"
          maxDepth: 3
        )
        frontmatter {
          # Assumes you're using path in your frontmatter.
          path
        }
      }
    }
  }
}
```

&emsp;默认情况下，**tableOfContents**使用字段**slug**生成绝对URL。但是，也可以使用pathToSlugField参数提供另一个字段。要注意的是，提供一个不存在的字段将导致结果为空。也可以设置**absolute:false**来生成相对路径。如果给定**hearding**（字符串），则将忽略匹配的第一个标题，并且从相同深度的下一个h1开始生成toc，即仅从**heading**标题之后开始显示目录。**maxDepth**（最大为6）的值为设置目录的最大深度，即，如果maxDepth设置为3，则目录中只会显示h1到h3标题。<br>

### Excerpts设置

&emsp;除了上述设置外，还可以设置**Excerpts**的最大长度和格式。<br>

```js
{
  allMarkdownRemark {
    edges {
      node {
        html
        excerpt(pruneLength: 500)
        excerpt(format: PLAIN)
      }
    }
  }
}
```
&emsp;如，设置excerpts的最大字节长度（默认为140字节），设置格式为Plain、HTML和MARKDOWN等。<br>

##注入标题头id
&emsp;使用remark插件可生成MarkDown的标题头url，但是该url并没有添加标题头id，因此，需要为标题头元素插入id，可以通过**gatsby-remark-autolink-headers**实现。
```bash
npm install --save gatsby-remark-autolink-headers
```
&emsp;安装后，只需在gatsby-config.js中进行以下配置。在这里，需要注意的是，[prismjs插件和autolink插件有冲突(2020年4月)][5]，若使用prismjs插件必须将其添加在autolink之后。
```js
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
        ],
      },
    },
```
## 显示目录

&emsp;通过以上，提取的MarkDown文件中带有标题头的Hearding链接信息保存到tableOfContents中，提取的标题信息一般如下图所示：<br>

![][4]

&emsp;为将页面显示在，在blog-post.js中获取tableContexts后，添加如下代码：
```js
    <div
    className="css-toc"
    dangerouslySetInnerHTML={{
        __html: '<div>目录</div>' + post.tableOfContents,
    }}
    />
```
##样式调整

&emsp;toc目录的样式可通css样式表设置，常见的css-toc配置如下所示：
```js
.css-toc {
  color: black;
  padding: 15px;
  background: #fcfaf2;
  margin-bottom: 25px;
  > ul {
    padding-left: 16px;
  }
  ul {
    list-style-type: square;
    list-style-position: outside;
    margin-bottom: 0;
    p {
      vertical-align: top;
      display: inline-block;
    }
  }
  li {
    margin-bottom: 0;
  }
  li > p {
    margin-bottom: 0;
  }
  li > ul {
    margin-top: 0;
  }
}

@media screen and (min-width: 1045px) {
  .css-toc {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 200px;
    max-height: 400px;
    overflow: scroll;
    font-size: 14px;
    li > ul {
      margin-left: 1rem;
    }
  }
}
```
##效果图
![][6]

##参考文献
```
https://ssshooter.com/2019-01-30-gatsby-blog-7/
https://aping-dev.com/gatsby-content-table/ 
https://blog.mytyiluo.cn/Other/%E5%8D%9A%E5%AE%A2TOC%E7%9B%AE%E5%BD%95/
```

<!--此文档图像文件夹编号：2-->
[1]:https://www.gatsbyjs.org/packages/gatsby-transformer-remark
[2]:https://github.com/remarkjs/remark/tree/master/packages/remark-parse#processoruseparse-options
[3]:https://using-remark.gatsbyjs.org/
[4]:/ImagesAll/2/1.png
[5]:https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/
[6]:/ImagesAll/2/2.png