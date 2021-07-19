<template>
  <q-page class="q-px-lg bg-info flex flex-center">
    <GameCard v-if="!isPageLoading && contents.length != 0" />
    <PageLodaer v-else-if="isPageLoading" />
    <NoContent v-else-if="contents.length == 0" />
  </q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {mapState, mapActions} from 'vuex';
import GameCard from 'components/GameCard.vue';
import PageLodaer from 'components/PageLoader.vue';
import NoContent from 'components/NoContent.vue';
import {IContent} from 'src/interfaces/common-interface';

@Component({
  components: {
    GameCard,
    PageLodaer,
    NoContent,
  },
  computed: {
    ...mapState('ui', ['isPageLoading']),
    ...mapState('common', ['contents']),
  },
  methods: {
    ...mapActions('common', ['appendContent', 'resetContentPosition']),
    ...mapActions('ui', ['showLoading']),
    ...mapActions('game', [
      'paginateContents',
      'generateRandomAnswer',
      'resetContentPosition',
    ]),
  },
})
export default class LearnPageContent extends Vue {
  isPageLoading!: boolean;
  contents!: IContent[];
  appendContent!: (param: any) => Promise<void>;
  paginateContents!: (contents: IContent[]) => Promise<void>;
  generateRandomAnswer!: (contents: IContent[]) => Promise<void>;
  resetContentPosition!: () => void;
  showLoading!: (isLoad: boolean) => void;
  async created() {
    await this.fetchContent();
  }

  async fetchContent(): Promise<void> {
    console.log('page loader!');
    this.showLoading(true);
    console.log(this.contents);
    await this.appendContent({
      category: this.$route.params.id,
      path: this.$route.name,
    });
    if (this.contents.length != 0) {
      await this.paginateContents(this.contents);
      await this.generateRandomAnswer(this.contents);
    }
    this.showLoading(false);
  }

  destroyed() {
    this.resetContentPosition();
  }
}
</script>

<style></style>
