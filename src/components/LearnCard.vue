<template>
  <div class="q-gutter-y-md">
    <q-card
      class="my-card bg-yellow-3 q-pt-xs q-ma-md"
      v-for="(content, index) in contents"
      :key="index"
    >
      <q-card-section class="text-center ">
        <div class="text-h4">{{ content.name }}</div>
        <img :src="content.img" height="250" width="250" />
      </q-card-section>
      <q-card-actions class="column q-gutter-y-xs bg-white" align="center">
        <div class="text-h4">{{ content.translatedName }}</div>
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
import { Vue, Component } from 'vue-property-decorator';
import { IContent } from 'src/interfaces/common-interface';
import helper from 'src/services/helper';

import { mapState, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState('common', ['contents'])
  },
  methods: {
    ...mapActions('common', ['appendContent'])
  }
})
export default class LearnCard extends Vue {
  // Your local data for storing DB datas
  contents!: IContent[];
  appendContent!: (routeParam: string) => Promise<void>;
  showAudioLoader = false;
  tappedIndex = 0;

  async created() {
    await this.fetchContent();
  }

  async fetchContent(): Promise<void> {
    await this.appendContent(this.$route.params.id);
  }

  async playAudio(base64string: string, index: number) {
    this.showAudioLoader = true;
    this.tappedIndex = index;
    let audio: any = await helper.playAudio(base64string);
    this.showAudioLoader = audio.playEnded;
  }
}
</script>

<style></style>
