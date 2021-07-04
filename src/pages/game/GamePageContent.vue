<template>
  <q-page class="q-px-lg bg-info flex flex-center">
    <GameCard v-if="!isPageLoading" />
    <PageLodaer v-else />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import GameCard from 'components/GameCard.vue';
import PageLodaer from 'components/PageLoader.vue';

@Component({
  components: {
    GameCard,
    PageLodaer
  },
  computed: {
    ...mapState('ui', ['isPageLoading'])
  },
  methods: {
    ...mapActions('common', ['appendContent']),
    ...mapActions('ui', ['showLoading'])
  }
})
export default class LearnPageContent extends Vue {
  isPageLoading!: boolean;
  appendContent!: (routeParam: string) => Promise<void>;
  showLoading!: (isLoad: boolean) => void;

  async created() {
    await this.fetchContent();
  }

  async fetchContent(): Promise<void> {
    console.log('page loader!');
    this.showLoading(true);
    await this.appendContent(this.$route.params.id);
    this.showLoading(false);
  }
}
</script>

<style></style>
