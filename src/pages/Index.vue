<template>
  <q-page>
    <q-card-section class="q-gutter-lg">
      <h3 class="q-no-margin q-padding-horizontal">Meranaw Learning App</h3>
      <q-card class="my-card text-white bg-blue-grey text-white q-pa-md">
        <q-card-section>
          <div class="text-h4">Learn</div>
          <div class="text-subtitle2">Maganad Tano!</div>
        </q-card-section>
      </q-card>

      <q-card class="my-card text-white bg-teal-5 text-white q-pa-md">
        <q-card-section>
          <div class="text-h4">Game</div>
          <div class="text-subtitle2">Gitagita Tano!</div>
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
