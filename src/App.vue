<template>
  <div id="app">
    <img src="./assets/logo.png">
    <TreeSelect 
      class="form-control center"
      v-model="value"
      :searchable="searchable"
      :options="options">
    </TreeSelect>
  </div>
</template>

<script>
import TreeSelect from './components/TreeSelect'

export default {
  name: 'app',
  components: {
    TreeSelect
  },
  data () {
    return {
      value: '2, 5',
      options: [
        {
          id: 1,
          label: '1',
          children: [
            {
              id: 2,
              label: '2'
            },
            {
              id: 3,
              label: '3',
              children: [
                {
                  id: 4,
                  label: '4'
                },
                {
                  id: 5,
                  label: '5'
                }
              ]
            }
          ]
        }
      ],
      searchable: true
    }
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

.center {
  margin: 0 auto;
}

.form-control {
  width: 300px;
}
</style>
