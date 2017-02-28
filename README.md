# MIli-GPA

> 一款专为移动端打造的 GPA计算器

## 编译

``` bash
# 安装依赖
npm install

# 服务器搭建在 localhost:8080
npm run dev

# 生成生产环境经过压缩的代码
npm run build
```

## 特点

+ 使用 Vue.js 框架处理逻辑，方便后续的开发


+ 使用饿了么的 Element-UI 组件库，美观稳定
+ 搭配了 Vue-Router 方便管理路由
+ 专门为移动端打造，用户体验很不错，它能很方便的作为子页面嵌入其他地方。

## 路线图

1. 减少Element-UI 的依赖，优化算法
2. 提供更多的GPA计算算法
3. 提供更准确温暖的错误提示
4. 提供更人性化的界面，使用更适合移动端的设计语言

## 当前算法

### 标准四分制

![standMathML](/Users/kilo/GoogleDerive/Development/Git/MIli-GPA/src/components/helpDialog/standMathML.png)

| 成绩      | 绩点   |
| ------- | ---- |
| 90~100  | 4    |
| 80~89.9 | 3    |
| 70~79.9 | 2    |
| 60~69.9 | 1    |
| 60分以下   | 0    |

### 财大四分制

![caidaMathML](/Users/kilo/GoogleDerive/Development/Git/MIli-GPA/src/components/helpDialog/caidaMathML.png)

| 成绩      | 绩点   |
| ------- | ---- |
| 90~100  | 4    |
| 85~89.9 | 3.7  |
| 82~84.9 | 3.3  |
| 78~81.9 | 3    |
| 75~77.9 | 2.7  |
| 72~74.9 | 2.3  |
| 68~71.9 | 2    |
| 66~67.9 | 1.7  |
| 64~65.9 | 1.5  |
| 60~63.9 | 1    |
| 60分以下   | 0    |

### 等级制

![rankMathML](/Users/kilo/GoogleDerive/Development/Git/MIli-GPA/src/components/helpDialog/rankMathML.png)

| 等级   | 成绩点数 |
| ---- | ---- |
| A    | 4    |
| B    | 3    |
| C    | 2    |
| D    | 1    |
| E    | 0    |


