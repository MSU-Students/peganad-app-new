<template>
  <div class="flex flex-center">
    <div class="text-center">
      <div class="text-h4 text-weight-bold text-white">Peganad App</div>
      <q-spinner-hourglass color="white" size="5em" />
      <div class="text-white text-overline">
        <span v-if="!noContent">Loading</span>
        <span v-else>Downloading</span>
        <q-spinner-dots class="q-pl-xs" color="white" size="1em" />
      </div>
      <div v-if="noContent">
        <q-linear-progress
          v-if="docSize != 0"
          :value="progress / docSize"
          :buffer="progress"
          track-color="grey-8"
          color="white"
          class="q-mt-sm"
        />
        <q-linear-progress v-else indeterminate color="white" class="q-mt-sm" />
        <div v-if="docSize != 0" class="text-white q-pt-sm">
          {{ progress }} / {{ docSize }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {localbaseService} from 'src/services/localbase.service';
import {Vue, Component} from 'vue-property-decorator';
import {mapState, mapActions} from 'vuex';

@Component({
  computed: {
    ...mapState('ui', ['progress', 'docSize']),
  },
})
export default class PageLoader extends Vue {
  progress!: number;
  docSize!: number;
  noContent = false;
  async created() {
    let localContent = await localbaseService.getContents(this.$route.params.id);
    if (!localContent) {
      this.noContent = true;
    }
  }
}
</script>
