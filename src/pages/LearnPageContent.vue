<template>
  <q-page class="q-pa-md bg-info">
    <LearnCard />    
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import LearnCard from 'components/LearnCard.vue';

@Component({
  components: {
    LearnCard
  }
})
export default class LearnPageContent extends Vue {}
</script>

<style></style>
