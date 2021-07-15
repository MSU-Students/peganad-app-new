<template>
  <q-page class="__backgroud q-pa-md text-center">
    <span class="text-h4 text-white">Game Best Score</span>

    <div class="q-pa-md items-start q-gutter-md">
      <q-card class="__animalCard q-gutter-md" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5">Animal Best Score</div>
            <div class="text-h5 q-mt-md text-left text-grey">
              <span
                ><q-icon name="military_tech" color="yellow-8" size="lg"/></span
              ><span>Danieza 100</span>
              <div>Maryam 500</div>
              <div>Amy</div>
              <div>Kai</div>
              <div>Mar</div>
            </div>
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat color="primary">
            Reset Score
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pa-md items-start q-gutter-md">
      <q-card class="__colorCard q-gutter-md" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5">Color Best Score</div>
            <div class="text-h5 q-mt-md text-left text-grey">
              <span
                ><q-icon name="military_tech" color="yellow-8" size="lg"/></span
              ><span>Danieza 100</span>
              <div>Maryam 500</div>
              <div>Amy</div>
              <div>Kai</div>
              <div>Mar</div>
            </div>
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat color="primary">
            Reserve
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pa-md items-start q-gutter-md">
      <q-card class="__numberCard q-gutter-md" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5">Number Best Score</div>
            <div class="text-h3 text-grey"></div>
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat>
            7:30PM
          </q-btn>
          <q-btn flat color="primary">
            Reserve
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pa-md items-start q-gutter-md">
      <q-card class="my-card q-gutter-md" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5">Word Best Score</div>
            <div class="text-h3 text-grey"></div>
          </q-card-section>
          </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat>
            7:30PM
          </q-btn>
          <q-btn flat color="primary">
            Reserve
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style scoped>
 .__backgroud {
  background: url('../assets/background.jpg');
  background-position: center;
  background-size: cover;
}

/* .__animalCard {
  background: url('../assets/background.jpg');
  background-position: center;
  background-size: cover;
}

.__colorCard {
  background: url('../assets/colorBackground1.jpg');
  background-position: center;
  background-size: cover;
}

.__numberCard {
  background: url('../assets/numberBackground.jpeg');
  background-position: center;
  background-size: cover;
} */

</style>
