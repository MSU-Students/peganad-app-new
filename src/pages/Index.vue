<template>
  <q-page class="q-pa-md bg-yellow-1">
    <!-- <Header/>bg-cyan -->
    <div class="q-gutter-y-lg">
      <h3
        class="text-center q-pt-xs text-grey-9 text-bold animate__animated animate__fadeInDown"
      >
        Phaganad App
      </h3>
      <q-card
        class="learn-card cursor-pointer text-grey-9 bg-green-2 animate__animated animate__fadeInLeft"
        @click="() => $router.replace('/learn')"
      >
        <q-card-section class="text-center">
          <div class="text-h5 text-weight-bold">Maganad Tano!</div>
          <div class="text-body1">Let's Learn</div>
        </q-card-section>
        <q-card-section class="text-center">
          <q-img src="~assets/design/study.png" basic></q-img>
        </q-card-section>
      </q-card>

      <q-card
        class="game-card text-black bg-blue-2 text-grey-9 q-pb-md animate__animated animate__fadeInRight"
        @click="() => $router.replace('/game')"
      >
        <q-card-section class="text-center">
          <div class="text-h5 text-weight-bold">Gitagita Tano!</div>
          <div class="text-body1">Let's Play</div>
        </q-card-section>
        <q-card-section class="text-center">
          <q-img src="~assets/design/game.png" basic></q-img>
        </q-card-section>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="white" text-color="black" icon="help_outline" to="/about" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {};
</script>

<style scoped>
.q-img {
  width: 200px;
}

@media only screen and (max-height: 732px) {
  /* All Mobile Manipulation */
  .sub-header-container {
    background-size: 200px;
  }

  .q-card {
    height: 280px;
  }

  .q-img {
    width: 170px;
  }
}
</style>
