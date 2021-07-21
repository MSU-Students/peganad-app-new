<template>
  <div class="q-gutter-y-sm text-h5 text-bold text-center text-white">
    <p>What is the Meranaw meaning of this {{ $route.params.id }}?</p>

    <q-card class="my-card bg-purple-3 text-center" style="height: 556.6px">
      <transition
        appear
        :enter-active-class="showElement ? 'animated fadeInLeft' : ''"
        :leave-active-class="showElement ? 'animated fadeOutRight' : ''"
      >
        <template v-if="showElement">
          <div v-for="(content, index) in displayContents" :key="index">
            <q-card-section class="q-pa-sm">
              <div class="text-h6 row text-center">
                <div class="col-4">
                  <div class="text-subtitle2">Question</div>
                  <div class="text-h6">
                    {{ game.questionCounter }}
                    /{{ contents.length }}
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-subtitle2">Time</div>
                  <div class="text-h6">
                    :<span :class="uiPrefrence.counterTextColor">
                      {{ game.timer }}
                    </span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-subtitle2">Score</div>
                  <div class="text-h6">{{ game.score }}</div>
                </div>
              </div>
            </q-card-section>

            <q-separator inset color="white" />

            <q-card-section class="text-center q-py-none">
              <div
                v-if="uiPrefrence.isWrong"
                class="__border-radius bg-green text-white q-py-xs q-my-sm"
              >
                <div class="q-pa-none text-caption text-capitalize">Correct Answer:</div>
                {{ gameAnswer.correctAnswer }}
              </div>
              <div v-else class="q-py-lg" style="height: 76px">
                {{ content.name }}
              </div>
            </q-card-section>

            <q-card-section class="text-center bg-white">
              <img
                :src="`data:image/jpeg;base64,${content.img}`"
                height="250"
                width="250"
              />
            </q-card-section>
            <q-card-actions class="row q-col-gutter-md q-pa-md">
              <div
                v-for="(answer, index) in gameAnswer['answers']"
                :key="index"
                class="col-6"
              >
                <q-btn
                  class="full-width"
                  size="md"
                  rounded
                  push
                  :text-color="index == game['selectedAnswer'].index ? 'white' : 'white'"
                  :color="index == game['selectedAnswer'].index ? 'purple-10' : 'grey'"
                  :label="answer"
                  :disable="uiPrefrence.isAnswerCheck"
                  @click="selectAnswer({index, answer})"
                />
              </div>
            </q-card-actions>
          </div>
        </template>
      </transition>
    </q-card>
    <q-btn
      class="full-width q-mt-md"
      :class="btnAnimation()"
      size="lg"
      rounded
      push
      :text-color="
        !uiPrefrence['isAnswerSelect'] ? 'white' : uiPrefrence.selectedBtnTextColor
      "
      :color="!uiPrefrence['isAnswerSelect'] ? 'grey' : uiPrefrence.selectedBtnColor"
      :label="!uiPrefrence['isAnswerCheck'] ? 'Check' : 'Continue'"
      :icon-right="btnIcon()"
      :disable="!uiPrefrence['isAnswerSelect']"
      @click="!uiPrefrence['isAnswerCheck'] ? checkSelectedAnswer() : continueAnswering()"
    />
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {IContent} from 'src/interfaces/common-interface';
import {IGame, IGameAnswer, IUiPreference} from 'src/interfaces/game-interface';
import {mapState, mapActions} from 'vuex';
import helperService from 'src/services/helper.service';

@Component({
  computed: {
    ...mapState('common', ['contents']),
    ...mapState('game', ['displayContents', 'gameAnswer', 'contentPosition']),
  },
  methods: {
    ...mapActions('game', [
      'paginateContents',
      'generateRandomAnswer',
      'changeContentPosition',
      'savePreferences',
    ]),
  },
})
export default class GameCard extends Vue {
  contents!: IContent[];
  displayContents!: IContent[];
  gameAnswer!: IGameAnswer;
  contentPosition!: number;
  audio!: HTMLAudioElement;
  paginateContents!: (contents: IContent[]) => Promise<void>;
  generateRandomAnswer!: (contents: IContent[]) => Promise<void>;
  changeContentPosition!: (position: number) => void;
  savePreferences!: (save: any) => void;
  game: IGame = {
    currentTime: 0,
    timer: 10,
    questionCounter: 1,
    correctAnswer: 0,
    score: 0,
    selectedAnswer: {
      index: undefined,
      answer: '',
    },
  };
  uiPrefrence: IUiPreference = {
    isAnswerSelect: false,
    isAnswerCheck: false,
    isWrong: false,
    isCorrect: false,
    selectedBtnColor: '',
    selectedBtnTextColor: '',
    counterTextColor: 'text-white',
  };
  showElement = false;

  async created() {
    this.showElement = true;
    await this.showContent();
  }

  async showContent(): Promise<void> {
    await this.paginateContents(this.contents);
    await this.generateRandomAnswer(this.contents);
    this.startTimer();
    this.uiPrefrence.selectedBtnColor = 'grey';
    this.uiPrefrence.selectedBtnTextColor = 'white';
  }

  selectAnswer(selectedOptions: {[key: string]: any}): void {
    this.game.selectedAnswer.index = selectedOptions.index;
    this.game.selectedAnswer.answer = selectedOptions.answer;
    this.uiPrefrence.isAnswerSelect = true;
    this.uiPrefrence.selectedBtnColor = 'purple-10';
    this.uiPrefrence.selectedBtnTextColor = 'white';
  }

  async checkSelectedAnswer(): Promise<void> {
    this.uiPrefrence.isAnswerCheck = true;
    this.uiPrefrence.selectedBtnColor = 'purple-10';
    this.uiPrefrence.selectedBtnTextColor = 'white';
    if (this.game.selectedAnswer.answer == this.gameAnswer.correctAnswer) {
      let score = 0;
      score = this.game.timer + 10;
      this.game.score += score;
      this.game.correctAnswer += 1;
      this.uiPrefrence.selectedBtnColor = 'green';
      this.uiPrefrence.selectedBtnTextColor = 'white';
      this.uiPrefrence.isWrong = false;
      this.uiPrefrence.isCorrect = true;
      const audio: HTMLAudioElement = await helperService.playAudio(
        require('src/assets/game-audio/correct.wav')
      );
      await audio.play();
    } else {
      this.uiPrefrence.selectedBtnColor = 'red-5';
      this.uiPrefrence.selectedBtnTextColor = 'white';
      this.uiPrefrence.isWrong = true;
      this.uiPrefrence.isCorrect = false;
      const audio: HTMLAudioElement = await helperService.playAudio(
        require('src/assets/game-audio/wrong.wav')
      );
      await audio.play();
    }
    clearTimeout(this.game.currentTime);
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  async continueAnswering(): Promise<void> {
    this.showElement = false;
    if (this.contentPosition < this.contents.length) {
      this.game.questionCounter += 1;
      this.changeContentPosition(1);
      this.savePreferences({
        score: this.game.score,
        correctAnswer: this.game.correctAnswer,
        curretTime: this.game.currentTime,
      });
      clearTimeout(this.game.currentTime);
      await this.showContent();
    } else if (this.contentPosition == this.contents.length) {
      this.savePreferences({
        score: this.game.score,
        correctAnswer: this.game.correctAnswer,
      });
      await this.$router.replace(`/score/${this.$route.params.id}`);
    }
    this.game.timer = 10;
    this.game.selectedAnswer.index = undefined;
    this.game.selectedAnswer.answer = '';
    this.uiPrefrence.isAnswerSelect = false;
    this.uiPrefrence.isAnswerCheck = false;
    this.uiPrefrence.isWrong = false;
    this.uiPrefrence.isCorrect = false;
    this.uiPrefrence.counterTextColor = 'text-white';
    setTimeout(() => {
      this.showElement = true;
    }, 500);
  }

  startTimer(): void {
    setTimeout(() => {
      this.countDownTimer();
    }, 500);
  }

  countDownTimer() {
    this.game.currentTime = setTimeout(async () => {
      if (this.game.timer > 0) {
        this.game.timer -= 1;
        if (this.game.timer == 4) {
          this.uiPrefrence.counterTextColor = 'text-red';
          const audio: HTMLAudioElement = await helperService.playAudio(
            require('src/assets/game-audio/countdown.wav')
          );
          this.audio = audio;
          await audio.play();
        } else if (this.game.timer == 0) {
          this.uiPrefrence.selectedBtnColor = 'red-5';
          this.uiPrefrence.selectedBtnTextColor = 'white';
          this.uiPrefrence.isAnswerCheck = true;
          this.uiPrefrence.isAnswerSelect = true;
          this.uiPrefrence.isWrong = true;
          const audio: HTMLAudioElement = await helperService.playAudio(
            require('src/assets/game-audio/wrong.wav')
          );
          await audio.play();
          clearTimeout(this.game.currentTime);
        }
      }
      this.countDownTimer();
    }, 1000) as any;
  }

  btnAnimation() {
    if (this.uiPrefrence.isWrong) {
      return 'animate__animated animate__shakeX';
    } else if (this.uiPrefrence.isCorrect) {
      return 'animate__animated animate__pulse';
    } else {
      return;
    }
  }

  btnIcon() {
    if (this.uiPrefrence.isWrong) {
      return 'close';
    } else if (this.uiPrefrence.isCorrect) {
      return 'check';
    } else {
      return;
    }
  }

  destroyed() {
    console.log('exit game card!');
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.savePreferences({
      score: 0,
    });
    clearTimeout(this.game.currentTime);
  }
}
</script>

<style scoped></style>
