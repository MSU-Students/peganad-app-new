<template>
  <q-page class="q-pa-md bg-info flex flex-center">
    <LearnCard v-if="!isPageLoading && contents.length != 0" />
    <PageLodaer v-else-if="isPageLoading" />
    <NoContent v-else-if="contents.length == 0" />
  </q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import LearnCard from 'components/LearnCard.vue';
import PageLodaer from 'components/PageLoader.vue';
import NoContent from 'components/NoContent.vue';
import {mapState, mapActions} from 'vuex';
import {IAppendContentParam, IContent} from 'src/interfaces/common-interface';

@Component({
  components: {
    LearnCard,
    NoContent,
    PageLodaer,
  },
  computed: {
    ...mapState('ui', ['isPageLoading']),
    ...mapState('common', ['contents']),
  },
  methods: {
    ...mapActions('common', ['appendContent']),
    ...mapActions('ui', ['showLoading']),
  },
})
export default class LearnPageContent extends Vue {
  isPageLoading!: boolean;
  contents!: IContent[];
  appendContent!: (param: IAppendContentParam) => Promise<void>;
  showLoading!: (isLoad: boolean) => void;
  async created() {
    this.showLoading(true);
    await this.fetchContent();
    this.showLoading(false);
  }

  async fetchContent(): Promise<void> {
    await this.appendContent({
      category: this.$route.params.id,
      path: this.$route.name,
    });
  }
}
</script>

<style></style>
