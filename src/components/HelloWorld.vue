<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { getCurrentInstance, inject,reactive } from "vue";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(){
    const {ctx} = getCurrentInstance()
    console.log(ctx.msg) // 类似 $emit $parent $refs 等之前那些带$的 都在 ctx上
    const that = getCurrentInstance()
    console.log(that)
    // 类似 render，JSX，createElement等这些都在getCurrentInstance上
    console.log(inject("qm"))
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
