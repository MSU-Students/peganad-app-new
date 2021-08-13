<template>
  <div class="q-gutter-y-md text-center" style="width: 100%">
    <q-btn
      v-if="hasNewContent"
      rounded
      push
      color="green"
      icon="download"
      label="New Content"
      :loading="loading"
      @click="updateNewContent()"
    />
    <q-card
      class="my-card bg-yellow-3 q-pt-xs q-ma-md"
      v-for="(content, index) in contents"
      :key="index"
    >
      <q-card-section class="text-center">
        <div class="text-h4">{{ content.name }}</div>
        <img :src="content.img" height="250" width="250" />
      </q-card-section>
      <q-card-actions class="column q-gutter-y-xs bg-white" align="center">
        <div class="text-h4">{{ content.translatedName }}</div>
        <div class="text-subtitle1 text-grey-8 q-pb-md">
          ['{{ content.orthography }}']
        </div>
        <q-btn
          class="full-width"
          size="lg"
          rounded
          push
          color="cyan-10"
          icon="volume_off"
          :loading="showAudioLoader && index == tappedIndex ? true : false"
          @click="playAudio(content.audio, index)"
        >
          <template v-slot:loading>
            <q-spinner-audio v-if="showAudioLoader" />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {IAppendContentParam, IContent} from 'src/interfaces/common-interface';
import helperService from 'src/services/helper.service';
import {mapState, mapActions} from 'vuex';
import {localbaseService} from 'src/services/localbase.service';
import {Loading} from 'quasar';

@Component({
  computed: {
    ...mapState('common', ['contents']),
    ...mapState('ui', ['hasNewContent']),
  },
  methods: {
    ...mapActions('common', ['checkNewContent', 'updateContent']),
    ...mapActions('ui', ['showLoading', 'showUpdateContent']),
  },
})
export default class LearnCard extends Vue {
  // Your local data for storing DB datas
  contents!: IContent[];
  checkNewContent!: (param: IAppendContentParam) => Promise<void>;
  updateContent!: (param: IAppendContentParam) => Promise<void>;
  showLoading!: (isLoad: boolean) => void;
  showUpdateContent!: (isLoad: boolean) => void;
  hasNewContent!: boolean;
  showAudioLoader = false;
  loading = false;
  tappedIndex = 0;
  localContent: IContent[] = [];

  async playAudio(audioBase64: string, index: number) {
    this.showAudioLoader = true;
    this.tappedIndex = index;
    const audio = helperService.playAudio(audioBase64);
    await audio.play();
    audio.onended = () => {
      this.showAudioLoader = false;
    };
  }

  async created() {
    if (navigator.onLine) {
      await this.checkNewContent({
        category: this.$route.params.id,
        path: this.$route.name,
      });
    }
  }

  async updateNewContent() {
    this.loading = true;
    await this.updateContent({
      category: this.$route.params.id,
      path: this.$route.name,
    });
    this.showUpdateContent(false);
    this.loading = false;
  }
}
</script>

<style></style>
