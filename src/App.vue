<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1 class="title">TreeSelect</h1>
    <TreeSelect 
      class="form-control center"
      v-model="value"
      :searchable="searchable"
      :hasDeleteButton="hasDeleteButton"
      :hasClearButton="hasClearButton"
      :options="options">
    </TreeSelect>
    <div class="options center">
      <fieldset>
        <legend>Options</legend>
        <label>
          Is Searchable
          <input 
            type="checkbox"
            v-model="searchable">
        </label>
        <label>
          Has Delete Button
          <input 
            type="checkbox"
            v-model="hasDeleteButton">
        </label>
        </label>
        <label>
          Has Clear Button
          <input 
            type="checkbox"
            v-model="hasClearButton">
        </label>
        <label>
          Value
          <textarea 
            type="text"
            v-model="value">
          </textarea>
        </label>
      </fieldset>
    </div>
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
      options: [ // Last id 87
        {
          id: 1,
          label: 'Annelida',
          children: [
            {
              id: 2,
              label: 'Polychaetes'
            },
            {
              id: 3,
              label: 'Clitellates',
              children: [
                {
                  id: 4,
                  label: 'Oligochaetes'
                },
                {
                  id: 5,
                  label: 'Hirudinea'
                }
              ]
            }
          ]
        },
        {
          id: 6,
          label: 'Nematoda',
          children: [
            {
              id: 7,
              label: 'Dorylaimida'
            },
            {
              id: 87,
              label: 'Enoplia'
            },
            {
              id: 8,
              label: 'Secernentea',
              children: [
                {
                  id: 9,
                  label: 'Rhabditia'
                },
                {
                  id: 10,
                  label: 'Spiruria'
                }
              ]
            }
          ]
        },
        {
          id: 11,
          label: 'Arthropoda',
          children: [
            {
              id: 12,
              label: 'Chelicerates',
              children: [
                {
                  id: 13,
                  label: 'Merostomata'
                },
                {
                  id: 14,
                  label: 'Arachnida'
                }
              ]
            },
            {
              id: 15,
              label: 'Crustaceans',
              children: [
                {
                  id: 16,
                  label: 'Branchiopoda'
                },
                {
                  id: 17,
                  label: 'Remipedia'
                },
                {
                  id: 18,
                  label: 'Cephalocarida'
                },
                {
                  id: 19,
                  label: 'Maxillopoda'
                },
                {
                  id: 20,
                  label: 'Ostracoda'
                },
                {
                  id: 21,
                  label: 'Malacostraca'
                }
              ]
            },
            {
              id: 22,
              label: 'Labiatae',
              children: [
                {
                  id: 23,
                  label: 'Centipede'
                },
                {
                  id: 24,
                  label: 'Millipede'
                }
              ]
            }
          ]
        },
        {
          id: 25,
          label: 'Platyhelminthes',
          children: [
            {
              id: 26,
              label: 'Turbellaria'
            },
            {
              id: 27,
              label: 'Trematoda'
            },
            {
              id: 28,
              label: 'Cestoda '
            }
          ]
        },
        {
          id: 29,
          label: 'Echinodermata',
          children: [
            {
              id: 30,
              label: ' Eleutherozoa',
              children: [
                {
                  id: 31,
                  label: 'Asteroidea'
                },
                {
                  id: 32,
                  label: 'Ophiuroidea'
                },
                {
                  id: 33,
                  label: 'Echinoidea'
                },
                {
                  id: 34,
                  label: 'Holothuroidea'
                }
              ]
            },
            {
              id: 35,
              label: 'Pelmatozoa'
            }
          ]
        },
        {
          id: 36,
          label: 'Chordata',
          children: [
            {
              id: 37,
              label: 'Cephalochordata',
              children: [
                {
                  id: 38,
                  label: 'Amphioxus'
                }
              ]
            },
            {
              id: 39,
              label: 'Olfactores',
              children: [
                {
                  id: 40,
                  label: 'Haikouella'
                },
                {
                  id: 41,
                  label: 'Tunicata',
                  children: [
                    {
                      id: 42,
                      label: 'Appendicularia'
                    },
                    {
                      id: 43,
                      label: 'Thaliacea'
                    },
                    {
                      id: 44,
                      label: 'Ascidiacea'
                    }
                  ]
                },
                {
                  id: 45,
                  label: 'Vertebrata',
                  children: [
                    {
                      id: 46,
                      label: 'Myllokunmingia fengjiaoa'
                    },
                    {
                      id: 47,
                      label: 'Zhongjianichthys rostratus'
                    },
                    {
                      id: 48,
                      label: 'Conodonta'
                    },
                    {
                      id: 49,
                      label: 'Cephalaspidomorphi'
                    },
                    {
                      id: 50,
                      label: 'Hyperoartia'
                    },
                    {
                      id: 51,
                      label: 'Pteraspidomorphi'
                    },
                    {
                      id: 52,
                      label: 'osteostracan'
                    },
                    {
                      id: 53,
                      label: 'Gnathostomata',
                      children: [
                        {
                          id: 54,
                          label: 'Placodermi'
                        },
                        {
                          id: 55,
                          label: 'Osteichthyes',
                          children: [
                            {
                              id: 56,
                              label: 'Actinopterygii'
                            },
                            {
                              id: 57,
                              label: 'Sarcopterygii',
                              children: [
                                {
                                  id: 58,
                                  label: 'Onychodontidae'
                                },
                                {
                                  id: 59,
                                  label: 'Actinistia'
                                },
                                {
                                  id: 60,
                                  label: 'Rhipidistia',
                                  children: [
                                    {
                                      id: 61,
                                      label: 'Styloichthys changae'
                                    },
                                    {
                                      id: 62,
                                      label: 'Dipnomorpha'
                                    },
                                    {
                                      id: 63,
                                      label: 'Tetrapoda',
                                      children: [
                                        {
                                          id: 64,
                                          label: 'Amphibia'
                                        },
                                        {
                                          id: 65,
                                          label: 'Amniota',
                                          children: [
                                            {
                                              id: 66,
                                              label: 'Mammalia'
                                            },
                                            {
                                              id: 67,
                                              label: 'Sauropsida',
                                              children: [
                                                {
                                                  id: 68,
                                                  label: 'Lepidosauromorpha'
                                                },
                                                {
                                                  id: 69,
                                                  label: 'Archosauromorpha'
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 70,
          label: 'Cnidaria',
          children: [
            {
              id: 71,
              label: 'Anthozoa'
            },
            {
              id: 72,
              label: 'Scyphozo'
            },
            {
              id: 74,
              label: 'Cubozoa'
            },
            {
              id: 75,
              label: 'Hydrozoa'
            }
          ]
        },
        {
          id: 76,
          label: 'Mollusca',
          children: [
            {
              id: 77,
              label: 'Caudofoveata'
            },
            {
              id: 78,
              label: 'Solenogastres'
            },
            {
              id: 79,
              label: 'Polyplacophora'
            },
            {
              id: 80,
              label: 'Monoplacophora'
            },
            {
              id: 81,
              label: 'Gastropoda'
            },
            {
              id: 82,
              label: 'Cephalopoda'
            },
            {
              id: 83,
              label: 'Bivalvia'
            },
            {
              id: 84,
              label: 'Scaphopoda'
            },
            {
              id: 85,
              label: 'Rostroconchia'
            },
            {
              id: 86,
              label: 'Helcionelloida'
            }
          ]
        }
      ],
      searchable: true,
      hasDeleteButton: false,
      hasClearButton: false
    }
  }
}
</script>

<style lang="scss">
@import "./assets/variables.scss";

* {
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.center {
  margin: 0 auto;
}

.options,
.form-control {
  width: 300px;
}

.title {
  color: $color-main;
}

.options {
  margin-top: $space--l;
  margin-bottom: $space--l;

  fieldset {
    border: 1px solid $color-lightGrey;
    border-radius: $space;

    label,
    input[type="text"],
    textarea {
      display: block;
      width: 100%;
      font-size: $font-size;
      line-height: $line-height;
    }

    label {
      margin-bottom: $space--l;
      text-align: left;
      &:last-child {
        margin-bottom: 0;
      }
    }

    input[type="text"],
    textarea {
      padding: $space $space--l;
      border: 1px solid $color-lightGrey;
      border-radius: $space;
    }

    textarea {
      resize: vertical;
      min-height: #{ $line-height + (2 * $space--l)};

    }
  }

  legend {
    color: $color-darkGrey;
    text-align: left;
  }
}
</style>
