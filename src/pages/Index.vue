<template>
  <q-page class="q-pa-md bg-yellow-1">
    <!-- <Header/>bg-cyan -->
    <div class="q-gutter-y-lg">
      <h3 class="text-center q-pt-lg text-grey text-bold">Peganad App</h3>
      <q-card
        class="learn-card cursor-pointer text-black bg-green-2 q-pa-md"
        @click="() => $router.replace('/learn')"
      >
        <q-card-section class="text-center">
          <div class="text-h5">Maganad Tano!</div>
          <div class="text-h5">Let's Learn</div>
        </q-card-section>
        <q-card-section class="text-center">
          <q-img src="~assets/design/study.png" width="200px" basic></q-img>
        </q-card-section>
      </q-card>

      <q-card
        class="my-card text-black bg-blue-2 text-white q-pa-md q-pb-md"
        @click="() => $router.replace('/game')"
      >
        <q-card-section class="text-center">
          <div class="text-h5">Gitagita Tano!</div>
          <div class="text-h5">Let's Play</div>
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
