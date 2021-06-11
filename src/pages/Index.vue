<template>
  <q-page class="q-pa-md bg-blue">
    <!-- <Header/>bg-cyan -->
    <div class="q-gutter-y-lg">
      <h3 class="text-center text-white q-pt-lg">Peganad App</h3>
      <q-card
        class="learn-card cursor-pointer text-black bg-pink-2 text-white q-pa-md"
        @click="() => $router.replace('/learn')"
      >
        <q-card-section>
          <div class="text-h4">Learn</div>
          <div class="text-h6">Maganad Tano!</div>
        </q-card-section>
        <q-card-section class="text-center">
          <q-img src="~assets/design/study.png" width="200px"></q-img>
        </q-card-section>
      </q-card>

      <q-card class="my-card text-black bg-green-2 text-white q-pa-md">
        <q-card-section>
          <div class="text-h4">Game</div>
          <div class="text-h6">Gitagita Tano!</div>
        </q-card-section>
        <q-card-section class="text-center">
          <q-img src="~assets/design/game.png" width="200px"></q-img>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class PageIndex extends Vue {}
</script>
