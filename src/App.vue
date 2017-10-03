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
        },
        {
          id: 11,
          label: '11',
          children: [
            {
              id: 12,
              label: '12'
            },
            {
              id: 13,
              label: '13',
              children: [
                {
                  id: 14,
                  label: '14'
                },
                {
                  id: 15,
                  label: '15'
                }
              ]
            }
          ]
        },
        {
          id: 16,
          label: '16',
          children: [
            {
              id: 17,
              label: '17'
            },
            {
              id: 18,
              label: '18',
              children: [
                {
                  id: 19,
                  label: '19'
                },
                {
                  id: 20,
                  label: '20'
                }
              ]
            }
          ]
        },
        {
          id: 21,
          label: '21',
          children: [
            {
              id: 22,
              label: '22'
            },
            {
              id: 23,
              label: '23',
              children: [
                {
                  id: 24,
                  label: '24'
                },
                {
                  id: 25,
                  label: '25'
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
