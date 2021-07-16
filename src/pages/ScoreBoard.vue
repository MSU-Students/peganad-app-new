<template>
  <q-page class="bg-blue-2 text-grey-8 flex flex-center q-pa-md">
    <q-card flat class="__border-radius bg-blue-1">
      <q-card-section class="text-h4 text-center">
        <div>
          <span v-if="isNewHighScore" class="q-ml-sm text-weight-bolder"
            >Congratulations!</span
          >
          <span v-else class="q-ml-sm">Thank you for playing!</span>
        </div>
        <div class="text-h6">
          <span v-if="isNewHighScore">New Personal Best!</span>
        </div>
      </q-card-section>
      <q-card-section
        class="text-center q-ma-md"
        style="border: 1px solid grey; border-radius: 10px 10px 10px 10px"
      >
        <div class="text-h5 q-pb-md text-center">
          <div class="items-center">
            <div class="text-uppercase text-weight-bold">Words You Got Right</div>
            <div class="text-h6">
              {{ gamePreference.correctAnswer }}
              <span class="text-subtitle1">of</span> {{ contents.length }}
            </div>
          </div>
        </div>

        <q-separator color="grey-8" />
        <div class="row justify-center q-pt-md">
          <div v-if="gamePreference.correctAnswer == contents.length">
            <q-icon name="grade" color="yellow-8" size="lg" />
            <q-icon name="grade" color="yellow-8" size="lg" />
            <q-icon name="grade" color="yellow-8" size="lg" />
          </div>
          <div
            v-else-if="
              gamePreference.correctAnswer < contents.length &&
              gamePreference.correctAnswer > contents.length / 2
            "
          >
            <q-icon name="grade" color="yellow-8" size="lg" />
            <q-icon name="grade" color="yellow-8" size="lg" />
          </div>
          <q-icon
            v-else-if="gamePreference.correctAnswer < contents.length / 2"
            name="grade"
            color="yellow-8"
            size="lg"
          />
        </div>
        <div class="q-pt-md">
          <div class="text-h6">SCORE</div>
          <div class="text-h3">
            {{ gamePreference.score }}
          </div>
        </div>
        <div>
          <div v-if="isNewHighScore" class="q-py-md">
            <q-input
              v-model="playerName"
              outlined
              dense
              bg-color="white"
              label="Enter your name"
              :rules="[(val) => val.length <= 10 || 'Please use maximum 10 characters']"
            />
          </div>
          <div
            class="text-h6 q-my-md"
            style="border: 1px solid grey; border-radius: 10px 10px 10px 10px"
            v-else-if="isSave"
          >
            <div>Player: {{ playerName }}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="center" class="q-gutter-y-sm q-pt-xl q-pb-md">
        <q-btn
          rounded
          push
          color="green-5"
          :label="isNewHighScore ? 'Save' : 'Play Again?'"
          @click="isNewHighScore ? savePlayerStat() : playAgain()"
          style="width: 60%"
        >
        </q-btn>
        <q-btn rounded push color="red-5" label="Exit Quiz" to="/game" style="width: 60%">
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { IContent } from 'src/interfaces/common-interface';
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import playerService from 'src/services/player.service';
import { IGame } from 'src/interfaces/game-interface';
import { IPlayer } from 'src/interfaces/player.interface';

@Component({
  computed: {
    ...mapState('ui', ['isScoreDialog']),
    ...mapState('common', ['contents']),
    ...mapState('game', ['gamePreference']),
  },
  methods: {
    ...mapActions('game', ['paginateContents', 'generateRandomAnswer']),
    ...mapActions('common', ['appendContent']),
  },
})
export default class ScoreDialog extends Vue {
  isScoreDialog!: boolean;
  contents!: IContent[];
  gamePreference!: IGame;
  appendContent!: (routeParam: string) => Promise<void>;
  paginateContents!: (contents: IContent[]) => Promise<void>;
  generateRandomAnswer!: (contents: IContent[]) => Promise<void>;
  show = false;
  isNewHighScore = false;
  isSave = false;
  playerName = '';

  async created() {
    this.show = this.isScoreDialog;
    await this.checkPlayersStat();
  }

  async playAgain() {
    await this.$router.replace(`/game/${this.$route.params.id}`);
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

  async checkPlayersStat(): Promise<void> {
    console.log('scoreboard: ', this.gamePreference.score);
    const status = await playerService.checkPlayersStat(
      `score-${this.$route.params.id}`,
      this.gamePreference.score
    );
    if (status) {
      this.isNewHighScore = true;
    } else {
      this.isNewHighScore = false;
    }
  }

  async savePlayerStat() {
    const playerStats: IPlayer = {
      score: this.gamePreference.score,
      player: this.playerName,
    };
    await playerService.savePlayerStat(`score-${this.$route.params.id}`, playerStats);
    this.isSave = true;
    this.isNewHighScore = false;
  }
}
</script>
<style scoped></style>
