# vue3.0-practice-room
vue3.0学习仓，记录，爬坑，实践，分享

## 一、使用vue-cli4.5+安装VUE3.0

1. 首先需要按照原始搭建模式下载vue脚手架

> npm install -g @vue/cli
> vue create vue3.0-practice-room

2. 选择安装3.0版本vue（vue-cli，4.5版本已有此选项，往前版本未测试）

> 在Choose a version of Vue.js that you want to start the project with时候选择3.x

等一路飘完了，开始写代码

## 二、创建我的第一个vue3.0文件
在项目创建完成后，脚手架已经帮我们生成了基础目录和几个示例代码，目录结构和2.0非常相似
我们在views目录下创建第一个页面 MyPage.vue，看起来和vue2.0非常像
```vue
<template>
  <div class="myPage">
　　   <h1>这是我的第一个vue3.0项目</h1>
  </div>
</template>

<script>
 export default {
 }
</script>

<style lang="less" scoped>
.myPage {
  color: blue;
}
</style>

```

然后我们去路由里面添加它，这里就有点不一样了

```js

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/MyPage',
    name: 'MyPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MyPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

```
我们清理掉About相关代码，不去理会

大家可以看到，这里的路由不再是Vue.use这种模式，而是变成了 createRouter createWebHistory 这两个函数

函数内部作用我们后期拆解，这里不做过多介绍，我们可以看到他们一个是创建了基础路由，一个创建了路由所需的配置，createWebHistory接收一个参数为项目路由的baseUrl,我们这里不传


不要忘记修改App.vue根文件里面添加上我们刚才写的路由，一样的把About清理掉

```vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/MyPage">MyPage</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

```

至此，我们可以运行 npm run serve 看看效果了


## 三、新的函数介绍（hook？）

1. 入口方法setup

setup 可以算是一个生命周期，它也替代了之前的 created beforeCreate 等 如果非要研究它的时机，官方给出的是，它在beforeCreate之前调用
并且它提代之前的包裹模式，我们在这里面去声明我们之前在data中写的那些参数，每个setup需要return一个object供其他地方使用。然后还可以使用computed等之前用的方法

我小列一下 下面给出示例

ref 需要return的简单响应式数据
reactive 需要return的深层响应式数据
readonly 需要return的深层只读相应数据
watchEffect 类似于react hooks 这个方法内部的任何依赖发生变化，它都会执行一次
watch vue2的watch
onMounted  挂载完成后的生命周期
onUpdated  组件更新的生命周期
onUnmounted 组件被卸载的生命周期

这里简单说一下 ref和reactive

新手可以理解为 ref为简单数据类型声明 reactive用来做复杂数据类型声明 
从监听层即说的话  ref这里声明的数据 监听层级为浅层  reactive 监听层级为深层
再从代码的风格来说的话 ref为扁平化的 reactive为类似于object这样的

我们上个代码 看看效果

```vue

<template>
  <div class="myPage">
    <h1>这是我的第一个vue3.0项目</h1>
    <h2>{{count}}</h2>
    <h3>{{person.name}}</h3>
    <h3>{{person.sex}}</h3>
    <h3>{{person.age}}</h3>

  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  setup() {
    const count = ref(0);

    console.log(count)   // 建议打印看看内部内容 （template会直接取它的value 在另一个reactive包裹的对象中）这两种情况 不需要自己去count.value  其他地方 一般都要带.value


    const add = () => {count.value++}  //这里是声明方法 一样要return出去


    const person = reactive({ name: "qm", sex: true, age: 18 });

    console.log(person)  // 建议打印看看内部内容
    // return 的属性会暴露给模板，模板中可以直接使用,这里没有 return 的， 无法在模板中使用  (官网说的)
    return {
      count,
      person,
      add
    };
  }
};
</script>

<style lang="less" scoped>
.myPage {
  color: blue;
}
</style>

```


先写这么多 休息去了。。。。。