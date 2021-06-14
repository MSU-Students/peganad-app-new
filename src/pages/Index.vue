<template>
  <q-page class="q-pa-md">
    <!-- <Header/>bg-cyan -->
    <div class="q-gutter-y-lg">
      <h3 class="text-center q-pt-lg">Peganad App</h3>
      <q-card
        class="learn-card cursor-pointer text-white bg-pink text-white q-pa-md"
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
    </div>
  </q-page>
</template>

<script>
export default {
 
};
</script>

<style scoped></style>
