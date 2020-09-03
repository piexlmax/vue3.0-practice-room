<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {setup,provide} from 'vue'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup(){
    provide("qm", "我是奇淼挂在provide的属性")
  }
}
</script>
