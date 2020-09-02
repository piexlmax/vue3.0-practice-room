<template>
  <div class="myPage">
    <h1>这是我的第一个vue3.0项目</h1>
    <h2>{{count}}</h2>
    <h3>{{person.name}}</h3>
    <h3>{{person.sex}}</h3>
    <h3>{{person.age}}</h3>
    <button @click="add">+</button>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUpdated, onUnmounted, watchEffect ,watch, getCurrentInstance } from "vue";
export default {
  setup() {
  
    const count = ref(0);
    const add = () =>{count.value++}
    console.log(count)
    const person = reactive({ name: "qm", sex: true, age: 18 }); 
    console.log(person)
    // return 的属性会暴露给模板，模板中可以直接使用,这里没有 return 的， 无法在模板中使用  (官网说的)
    onMounted(()=>{
      console.log(123)
    })
    onUpdated(()=>{
      console.log(456)
    })
    onUnmounted(()=>{
      console.log(789)
    })
    watchEffect(()=>{
      console.log(count.value)
    })
    watch(() => count.value, val => {
      console.log(`当前的count值${val}`)
    })   // watch 单条监听
    watch(() => [count.value,person.age], (val, age) => {
      console.log(`当前的count值${val},当前的age值${age}`)
    })   // watch 多条监听

    const { ctx } = getCurrentInstance()
    console.log(getCurrentInstance())   //分析一下内部的东西有什么
    console.log(ctx.$router)   // 找一下方法 找一下$route  (currentRoute)
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