<template>
  <q-page class="__background flex flex-center">
    <div class="text-center bg-white shadow-10 q-pa-md">
      <div>
        <q-btn color="yellow-8" label="Download Content" @click="downloadContent()" />
      </div>
      <div>
        <q-circular-progress
          show-value
          font-size="16px"
          class="text-red q-ma-md"
          :value="progress * 10"
          size="100px"
          :thickness="0.05"
          color="red"
          track-color="grey-3"
        >
          {{ progress }} / 10
        </q-circular-progress>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import contentService from 'src/services/content.service';
import {Vue, Component} from 'vue-property-decorator';
import {mapActions} from 'vuex';

@Component({
  methods: {
    ...mapActions('common', ['startDownload']),
  },
})
export default class HomePage extends Vue {
  progress = 9;
  startDownload!: () => Promise<void>;
  async downloadContent() {
    await this.startDownload();
  }
}
</script>

<style scope>
.__background {
  background: url('../assets/background.jpg');
  background-position: center;
  background-size: cover;
}
</style>
