<template>
  <q-page class="bg-pink-2 q-px-md">
    <div class="sub-header-container q-pt-sm">
      <div
        class="flex flex-center text-center text-h2"
        :style="$q.screen.height <= 731 ? 'height: 150px' : 'height: 200px'"
      >
        <div
          class="text-h3 animate__animated animate__fadeInDown"
          :class="$q.screen.height <= 731 ? 'text-h4' : 'text-h3'"
        >
          Ready To Learn?
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-md q-pt-md">
      <div class="col-6 animate__animated animate__fadeInTopLeft">
        <q-card
          class="card bg-deep-purple-5"
          @click="() => $router.replace('/learn/animals')"
        >
          <q-img img-class="q-ma-sm" src="~assets/design/animals.png" basic></q-img>
          <q-card-section>
            <div class="text-h6 text-center text-white">Animals</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 animate__animated animate__fadeInTopRight">
        <q-card class="card bg-green-5" @click="() => $router.replace('/learn/colors')">
          <q-img img-class="q-ma-sm" src="~assets/design/colors.png" basic></q-img>
          <q-card-section>
            <div class="text-h6 text-center text-white">Colors</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 animate__animated animate__fadeInBottomLeft">
        <q-card class="card bg-blue-5" @click="() => $router.replace('/learn/numbers')">
          <q-img img-class="q-ma-sm" src="~assets/design/numbers.png" basic></q-img>
          <q-card-section>
            <div class="text-h6 text-center text-white">Numbers</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 animate__animated animate__fadeInBottomRight">
        <q-card class="card bg-orange-5" @click="() => $router.replace('/learn/words')">
          <q-img img-class="q-ma-sm" src="~assets/design/words.png" basic></q-img>
          <q-card-section>
            <div class="text-h6 text-center text-white">Words</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class Learn extends Vue {}
</script>

<style scoped>
.sub-header-container {
  background: url('../../assets/design/study1.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 250px;
}

.card {
  height: 100%;
}
@media only screen and (max-height: 732px) {
  /* All Mobile Manipulation */
  .sub-header-container {
    background-size: 200px;
  }
  .card {
    height: 90%;
  }
  .q-img {
    height: 75%;
  }
}
</style>
