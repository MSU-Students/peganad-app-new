<template>
  <q-page class="bg-green-3 q-pa-md">
    <div class="sub-header-container q-mt-am">
      <div class="flex flex-center text-h2" style="height: 250px">
        <span class="text-h3 animate__animated animate__fadeInDown">Choose Game</span>
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-6 animate__animated animate__fadeInTopLeft">
        <q-card
          class="card bg-deep-purple-5"
          @click="() => $router.replace('/game/animals')"
        >
          <q-img img-class="q-ma-sm" src="~assets/design/animals.png" basic></q-img>
          <q-card-section>
            <div class="text-h6 text-center text-white">Animals</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 animate__animated animate__fadeInTopRight">
        <q-card class="card bg-green-5" @click="() => $router.replace('/game/colors')">
          <q-img img-class="q-ma-sm" src="~assets/design/colors.png" basic></q-img>
          <q-card-section>
            <div class="text-h6 text-center text-white">Colors</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 animate__animated animate__fadeInBottomLeft">
        <q-card class="card bg-blue-5" @click="() => $router.replace('/game/numbers')">
          <q-img img-class="q-ma-sm" src="~assets/design/numbers.png" basic></q-img>
          <q-card-section>
            <div class="text-h6 text-center text-white">Numbers</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 animate__animated animate__fadeInBottomRight">
        <q-card class="card bg-orange-5" @click="() => $router.replace('/game/words')">
          <q-img img-class="q-ma-sm" src="~assets/design/words.png" basic></q-img>
          <q-card-section>
            <div class="text-h6 text-center text-white">Words</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style scoped>
.sub-header-container {
  background: url('../../assets/design/game1.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 250px;
}
</style>
