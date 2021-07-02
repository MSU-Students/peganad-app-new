<template>
  <q-page class="q-px-lg bg-info flex flex-center">
    <GameCard />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import GameCard from 'components/GameCard.vue';

@Component({
  components: {
    GameCard
  }
})
export default class LearnPageContent extends Vue {}
</script>

<style></style>
