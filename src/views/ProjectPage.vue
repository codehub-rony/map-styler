<template>
  <v-container width="500">
    <v-row class="justify-center">
      <v-col cols="6">
        <h3>Projects</h3>
        <p>blalbalblal lblorem ipsum biusm</p>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="4" v-for="(item, i) in items" :key="i">
        <!-- <div class="d-flex flex-row justify-space-around"> -->
        <v-card max-width="344" class="">
          <v-img
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            cover
          ></v-img>

          <v-card-title> {{ item.name }} </v-card-title>

          <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange-lighten-2" text="Explore"></v-btn>

            <v-spacer></v-spacer>

            <v-btn icon="'mdi-chevron-down'" @click="show = !show"></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than
                he could deliver. You won't have time for sleeping, soldier, not
                with all the bed making you'll be doing. Then we'll go with that
                data file! Hey, you add a one and two zeros to that or we walk!
                You're going to do his laundry? I've got to find a way to
                escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
        <!-- </div> -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: "test" },
        { id: 2, name: "best" },
        { id: 3, name: "tesdfdfd" },
      ],
    };
  },
};
</script>
