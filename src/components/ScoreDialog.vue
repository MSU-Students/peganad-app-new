<template>
  <q-dialog v-model="show" persistent @hide="hideDialog()">
    <q-card class="__border-radius">
      <q-card-section class="text-h4 text-center">
        <span v-if="isNewHighScore" class="q-ml-sm">Congratulations!</span>
        <span v-else class="q-ml-sm">Thank you for playing!</span>
      </q-card-section>
      <q-card class="__border-radius text-center q-ma-lg bg-red-2">
        <q-card-section>
          <div class="text-h5 q-pb-md">
            Words You Got Right: 5/{{ contents.length }}
          </div>
          <div class="text-h5">SCORE: {{ gamePreference.score }}</div>
          <div v-if="isNewHighScore" class="q-pt-md">
            <div class="text-subtitl1 text-grey-8">Enter your name</div>
            <q-input v-model="isNewHighScore" outlined dense bg-color="white" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="text-center">
          <span v-if="isNewHighScore" class="text-h5">New Personal Best!</span>
          <span v-else class="text-h5">Personal Best!</span>
        </q-card-section>
      </q-card>
      <q-card-section class="q-gutter-md q-pt-xl">
        <div>
          <q-btn
            class="full-width"
            size="lg"
            rounded
            color="grey"
            :label="isNewHighScore ? 'Save' : 'Play Again?'"
            @click="playAgain()"
          >
          </q-btn>
        </div>
        <div>
          <q-btn
            class="full-width"
            size="lg"
            rounded
            color="grey"
            label="Exit Quiz"
            to="/game"
          >
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { IContent } from 'src/interfaces/common-interface';
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import playerService from 'src/services/player.service';
import { IGame } from 'src/interfaces/game-interface';

@Component({
  computed: {
    ...mapState('ui', ['isScoreDialog']),
    ...mapState('common', ['contents']),
    ...mapState('game', ['gamePreference'])
  },
  methods: {
    ...mapActions('ui', ['showScoreDialog']),
    ...mapActions('game', [
      'paginateContents',
      'generateRandomAnswer',
    ]),
    ...mapActions('common', ['appendContent'])
  }
})
export default class ScoreDialog extends Vue {
  isScoreDialog!: boolean;
  contents!: IContent[];
  gamePreference!: IGame;
  showScoreDialog!: (isShow: boolean) => void;
  appendContent!: (routeParam: string) => Promise<void>;
  paginateContents!: (contents: IContent[]) => Promise<void>;
  generateRandomAnswer!: (contents: IContent[]) => Promise<void>;
  show = false;
  isNewHighScore = false;
  playerName = '';

  mounted() {
    this.show = this.isScoreDialog;
    this.player();
  }

  async playAgain() {
    await this.appendContent(this.$route.params.id);
    await this.showContent();
    this.showScoreDialog(false);
  }

  async showContent(): Promise<void> {
    await this.paginate();
    await this.generateAnswers();
  }

  async paginate(): Promise<void> {
    await this.paginateContents(this.contents);
  }

  async generateAnswers(): Promise<void> {
    await this.generateRandomAnswer(this.contents);
  }

  player() {
    // let playerInfo: any = {
    //   score: this.gamePreference.score,
    //   player: this.playerName
    // };
    // let playerArr = [];
    // playerArr.push(playerInfo);
    // const player = await playerService.playScore(
    //   `score-${this.$route.params.id}`,
    //   playerArr
    // );
  }
}
</script>

<style></style>
