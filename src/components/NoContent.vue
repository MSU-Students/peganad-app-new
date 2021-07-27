<template>
  <div class="flex flex-center">
    <div>
      <div class="text-h3 text-center text-white text-weight-regular">NO CONTENT!</div>
      <div
        v-if="isOnline || docSize == 0"
        class="text-center text-subtitle1 text-white q-px-md"
      >
        <div>Please connect to internet to download the content.</div>
        <q-icon class="animate__animated animate__pulse" name="wifi_off" size="xl" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {mapState, mapActions} from 'vuex';

@Component({
  computed: {
    ...mapState('ui', ['docSize']),
  },
})
export default class NoContent extends Vue {
  docSize!: number;
  isOnline = false;

  created() {
    this.isOnline = navigator.onLine;
  }
}
</script>
