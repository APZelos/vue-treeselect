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
      value: '2, 5, 6',
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
        },
        {
          id: 6,
          label: '6',
          children: [
            {
              id: 7,
              label: '7'
            },
            {
              id: 8,
              label: '8',
              children: [
                {
                  id: 9,
                  label: '9'
                },
                {
                  id: 10,
                  label: '10'
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
