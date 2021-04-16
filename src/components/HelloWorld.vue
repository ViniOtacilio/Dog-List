/* eslint-disable no-prototype-builtins */
/* eslint-disable vue/require-v-for-key */
/* eslint-disable vue/require-v-for-key */
/* eslint-disable vue/require-v-for-key */
<template>
  <v-container>
    <v-app>
     <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    <v-data-table
      :headers="headers"
      :items="breeds"
      :items-per-page="95"
      :search="search"
      class="elevation-1"
    ></v-data-table>
     </v-card>
    </v-app>
  </v-container>
</template>

<script>
import DogApiService from "@/services/DogApiService.js";


  export default {
    name: 'HelloWorld',

    data: () => ({
      search: '',
      breedAux: [],
      breeds: [],
      headers: [
        {
          text: "Raça",
          align: 'start',
          value: 'raça'
        },
        {
          text: "Sub-raças",
          align: 'center',
          value: 'sub-raça'
        }
      ]
    }),

    created: function() {
        this.listAllBreeds();
    },

    methods: {
      listAllBreeds: function () {
        var self = this;
        //let breedAux;
        DogApiService.listAll()
        .then(response => {
          console.log(response.data.message);
          self.breedAux = response.data.message;
          for (var key in self.breedAux) {
            // eslint-disable-next-line no-prototype-builtins
            if (self.breedAux.hasOwnProperty(key)) {
              var key1 = key.charAt(0).toUpperCase() + key.slice(1);
              var valueKey = self.breedAux[key];
              var object = {"raça" : key1, "sub-raça": valueKey};
              self.breeds.push(object);
              // self.breeds.push(key, self.breedAux[key]);
              //console.log(key + " -> " + self.breedAux[key]);
            }
          }
        console.log(self.breeds);
        })
        .catch(e => {
          console.log(e);
        })

      }

    }
  }
</script>
