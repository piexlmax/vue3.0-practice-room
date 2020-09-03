<template>
  <div class="myPage">
    <h1>这是我的第一个vue3.0项目</h1>
    <h2>{{count}}</h2>
    <h3>{{person.name}}</h3>
    <h3>{{person.sex}}</h3>
    <h3>{{person.age}}</h3>
    <h4>{{username}}</h4>
    <button @click="add">+</button>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUpdated, onUnmounted, watchEffect ,watch, getCurrentInstance,computed } from "vue";
import { useStore } from 'vuex';
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
    console.log(ctx.$store,useStore()) // 这里是获取到vuex  两种方案都可以 剩下的操作就一样了 暂时不知道怎么用辅助函数 mapGetters ... 等等
   const username = computed(()=>ctx.$store.getters["user/getUsername"])
   console.log(ctx.$store.getters)  // dispatch commit 等都一样
   return {
      count,
      person,
      username,
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