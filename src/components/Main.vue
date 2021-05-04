<template>
  <v-container>
    <v-app>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Procurar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          show-select
          :headers="headers"
          :items="breeds"
          :items-per-page="10"
          :search="search"
          :loading="onLoading"
          item-key="raça"
          v-model="selected"
          loading-text="Carregando... Por favor aguarde."
          :footer-props="footerProps"
          class="elevation-1"
        >
        
        </v-data-table>
      </v-card>
    </v-app>
  </v-container>
</template>

<script>
import DogApiService from "@/services/DogApiService.js";

export default {
  name: "HelloWorld",

  data: () => ({
    search: "",
    breeds: [],
    breedAux: [],
    selected: [],
    headers: [
      {
        text: "Raça",
        align: "start",
        value: "raça",
      },
      {
        text: "Sub-raças",
        align: "center",
        value: "sub-raça",
      },
    ],
    footerProps: { 'items-per-page-options': [15], 'items-per-page-text': "" },
    onLoading: true,
  }),

  created: function () {
    this.listAllBreeds();
  },
  watch: {
    selected: function () {
      this.$store.commit('updateFavoriteDogs', this.selected);
    }
  },

  methods: {
    listAllBreeds: function () {
      var self = this;
      self.onLoading = true;
      DogApiService.listAll()
        .then((response) => {
          self.breedAux = response.data.message;
          for (var key in self.breedAux) {
            // eslint-disable-next-line no-prototype-builtins
            if (self.breedAux.hasOwnProperty(key)) {
              var formatBreed = key.charAt(0).toUpperCase() + key.slice(1);
              var subBreed = self.breedAux[key];
              self.breeds.push({ raça: formatBreed, "sub-raça": subBreed });
            }
          }
          self.onLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
</style>