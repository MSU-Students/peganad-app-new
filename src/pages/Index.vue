<template>
  <q-page class="q-pa-md bg-blue">
    <!-- <Header/>bg-cyan -->
    <div class="q-gutter-y-lg">
      <h3 class="text-center q-pt-lg text-white text-bold">Peganad App</h3>
      <q-card
        class="learn-card cursor-pointer text-black bg-pink-2 q-pa-md"
        @click="() => $router.replace('/learn')"
      >
        <q-card-section>
          <div class="text-h5">Maganad Tano!</div>
          <div class="text-h5">Learn</div>
        </q-card-section>
        <q-card-section class="text-center">
          <q-img src="~assets/design/study.png" width="200px" basic></q-img>
        </q-card-section>
      </q-card>

      <q-card
        class="my-card text-black bg-green-2 text-white q-pa-md"
        @click="() => $router.replace('/game')"
      >
        <q-card-section>
          <div class="text-h5">Gitagita Tano!</div>
          <div class="text-h5">Game</div>
        </q-card-section>
        <q-card-section class="text-center">
          <q-img src="~assets/design/game.png" width="200px" basic></q-img>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style scoped></style>
