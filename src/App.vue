<template>
  <div id="app">
    <img src="./assets/logo.png">
    <TreeSelect></TreeSelect>
  </div>
</template>

<script>
import TreeSelect from './components/TreeSelect'

export default {
  name: 'app',
  components: {
    TreeSelect
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
