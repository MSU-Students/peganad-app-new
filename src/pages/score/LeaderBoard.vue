<template>
  <q-page class="__background q-pa-md text-center">
    <div class="text-h4 text-grey q-py-md">Leaderboards</div>

    <q-card class="q-ma-md text-grey-9" flat bordered>
      <q-card-section>
        <div class="text-h5 q-pb-md">Animal Best Score</div>
        <q-separator />
        <div class="row justify-center q-mt-md q-py-sm text-h6">
          <div class="col-3">
            <q-icon name="military_tech" color="yellow-8" size="lg" />
          </div>
          <div class="col-6">Danieza</div>
          <div class="col-3">
            <q-chip color="yellow-8" text-color="white" label="100" />
          </div>
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions>
        <q-btn flat color="primary"> Reset Score </q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="bg-red-2 q-ma-md text-grey-9" flat bordered>
      <q-card-section>
        <div class="text-h5">Animal Best Score</div>
        <div class="row justify-center q-mt-md q-py-sm bg-white text-h6">
          <div class="col-3">
            <q-icon name="military_tech" color="yellow-8" size="lg" />
          </div>
          <div class="col-6">Danieza</div>
          <div class="col-3">100</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat color="primary"> Reset Score </q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="bg-red-2 q-ma-md text-grey-9" flat bordered>
      <q-card-section>
        <div class="text-h5">Animal Best Score</div>
        <div class="row justify-center q-mt-md q-py-sm bg-white text-h6">
          <div class="col-3">
            <q-icon name="military_tech" color="yellow-8" size="lg" />
          </div>
          <div class="col-6">Danieza</div>
          <div class="col-3">100</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat color="primary"> Reset Score </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class Learderboard extends Vue {}
</script>

<style scoped>
.__background {
  background: url('../../assets/background.jpg');
  background-position: center;
  background-size: cover;
}
</style>
