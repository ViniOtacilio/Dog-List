<template>
  <v-container>
    <v-app>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Procurar"
            color="deep-purple"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="breeds"
          :search="search"
          :loading="onLoading"
          :footer-props="footerProps"
          loading-text="Carregando... Por favor aguarde."
          show-select
          item-key="raça"
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
  name: "Main",

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
    footerProps: { "items-per-page-options": [15], "items-per-page-text": "" },
    onLoading: true,
  }),

  created: function () {
    this.listAllBreeds();
  },
  watch: {
    selected: function () {
      this.$store.commit("updateFavoriteDogs", this.selected);
    },
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
              var formatSubBreed = self.breedAux[key].map(
                (item) =>
                  item.charAt(0).toUpperCase() + item.substr(1).toLowerCase()
              );
              self.breeds.push({
                raça: formatBreed,
                "sub-raça": formatSubBreed,
              });
            }
          }
          self.onLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
        self.selected= self.$store.state.favoriteDogs;
    },
  },
};
</script>
<style lang="scss">
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 18px !important;
}
.theme--light.v-icon {
  color: #6200ea!important;
}
.v-input--selection-controls__ripple.green--text {
   color: #6200ea!important;
}
</style>