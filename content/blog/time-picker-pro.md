---
title: TimePickerPro使用教程
date: "2025-11-15"
category: "Npm"
tags: ["Npm", "TimePickerPro", "Element UI二次封装", "组件使用"]
excerpt: "介绍TimePickerPro如何进行组件安装、引入和使用，包括配置说明。"
---

# 如何安装和使用

这篇文章将详细介绍TimePickerPro如何进行组件安装、引入和使用，包括配置说明。

## 📋介绍

针对element-ui [TimePicker](https://element.eleme.cn/#/zh-CN/component/time-picker) 二次封装。基于原组件进行一些扩展，原组件的所有属性、方法、插槽可继续按原方式使用。  
当前组件`TimePickerPro`拓展新增了两个属性`custom-minute-step`和`custom-second-step`进行分钟数和秒钟数自定义步距。

>**注意**：当前组件内部有引用element-ui进行拓展，引用该组件时，项目需要安装并引入element-ui

## 🔧组件安装

npm 或者 yarn 安装 `date-time-picker-pro`
>**注意**：当前组件集成在date-time-picker-pro中，需要将其安装，再按需引入TimePickerPro组件

```bash
npm install date-time-picker-pro -S
```
```bash
yarn add date-time-picker-pro -S
```

## 🛠️引入组件

```javascript
import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { TimePickerPro } from 'date-time-picker-pro' // 按需引入

Vue.use(ElementUI)
Vue.use(TimePickerPro)
```

## 🚀使用组件

```html
<template>
  <!-- 单个时间 -->
  <time-picker-pro
    v-model="singleTime1"
    :custom-minute-step="20"
    :custom-second-step="10"
    placeholder="请选择时间"
  ></time-picker-pro>
  <!-- 时间范围 -->
  <time-picker-pro
    v-model="multipleTime1"
    is-range
    :custom-minute-step="20"
    :custom-second-step="10"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围"
  ></time-picker-pro>
</template>

<script>
  export default {
    data() {
      return {
        singleTime1: '',
        multipleTime1: [],
      };
    }
  }
</script>

```

## 🎨Attributes

| 参数               | 说明                                      | 类型           | 可选值 | 默认值 |
| ------------------ | ----------------------------------------- | -------------- | ------ | ------ |
| custom-minute-step | 分钟数自定义步距，若大于`59`，则只显示`0` | string、number | 自然数 | 1      |
| custom-second-step | 秒钟数自定义步距，若大于`59`，则只显示`0` | string、number | 自然数 | 1      |

>其他选项可以参照element-ui [TimePicker](https://element.eleme.cn/#/zh-CN/component/time-picker)

## 🖥️Demo  
[TimePickerPro 在线预览](https://ducrong.com/ducrong-ui/components/element/timePickerPro.html)