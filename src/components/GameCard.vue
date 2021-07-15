<template>
  <div class="q-gutter-y-sm text-h5 text-bold text-center text-white">
    <p>What is the Meranaw meaning of this {{ $route.params.id }}?</p>
    <q-btn label="Show Score" @click="uiPrefrence.showScoreDialog = true" />
    <q-card
      v-for="(content, index) in displayContents"
      :key="index"
      class="my-card bg-purple-3 text-center"
    >
      <q-card-section>
        <div class="text-h6 row text-center">
          <div class="col-4">
            <div class="text-subtitle1">Question</div>
            <div class="text-h5">{{ game.questionCounter }}/10</div>
          </div>
          <div class="col-4">
            <div class="text-subtitle1">Time</div>
            <div class="text-h5">:{{ game.timer }}</div>
          </div>
          <div class="col-4">
            <div class="text-subtitle1">Score</div>
            <div class="text-h5">{{ game.score }}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        {{ content.name }}
      </q-card-section>
      <q-card-section class="text-center bg-white">
        <img :src="content.img" height="250" width="250" />
      </q-card-section>
      <q-card-actions class="row q-col-gutter-md q-pa-lg">
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
            :text-color="
              index == game['selectedAnswer'].index ? 'white' : 'white'
            "
            :color="
              index == game['selectedAnswer'].index ? 'purple-10' : 'grey'
            "
            :label="answer"
            :disable="uiPrefrence.isAnswerCheck"
            @click="selectAnswer({ index, answer })"
          />
        </div>
      </q-card-actions>
    </q-card>
    <q-btn
      class="full-width q-mt-md" 
      size="lg"
      rounded
      push
      :text-color="
        !uiPrefrence['isAnswerSelect']
          ? 'white'
          : uiPrefrence.selectedBtnTextColor
      "
      :color="
        !uiPrefrence['isAnswerSelect'] ? 'grey' : uiPrefrence.selectedBtnColor
      "
      :label="!uiPrefrence['isAnswerCheck'] ? 'Check' : 'Continue'"
      :disable="!uiPrefrence['isAnswerSelect']"
      @click="
        !uiPrefrence['isAnswerCheck']
          ? checkSelectedAnswer()
          : continueAnswering()
      "
    />
    <q-dialog v-model="uiPrefrence.showScoreDialog" persistent @hide="showScoreDialog = false">
      <q-card>
        <q-card-section class="text-h4 text-center">
          <span class="q-ml-sm"
            >Congratulations!</span
          >
          <q-card-section class="text-center">
          <div class="text-h5">New Personal Best!</div>
        </q-card-section>
        </q-card-section>
         <q-card class="text-center q-ma-lg bg-red-2">
        <q-card-section>
          <div class="text-h5 q-pb-md">Words You Got Right: 5/10</div>
           <div class="text-h5 q-pb-md">SCORE: 50</div>
          <div class="text-h6">enter your name</div>
          <div>
            <q-btn rounded color="grey" label="SAVE"></q-btn>
          </div>
        </q-card-section>
      </q-card>  
        <q-card-section class="q-gutter-md q-pt-xl">
      <div>
        <q-btn
          class="full-width"
          size="lg"
          rounded
          color="grey"
          label="Play Again?"
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
        >
        </q-btn>
      </div>
      </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { IContent } from 'src/interfaces/common-interface';
import {
  IGame,
  IGameAnswer,
  IUiPreference
} from 'src/interfaces/game-interface';
import { mapState, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState('common', ['contents']),
    ...mapState('game', ['displayContents', 'gameAnswer'])
  },
  methods: {
    ...mapActions('game', [
      'paginateContents',
      'generateRandomAnswer',
      'changeContentPosition'
    ])
  }
})
export default class GameCard extends Vue {
  contents!: IContent[];
  displayContents!: IContent[];
  gameAnswer!: IGameAnswer;
  paginateContents!: (contents: IContent[]) => Promise<void>;
  generateRandomAnswer!: (contents: IContent[]) => Promise<void>;
  changeContentPosition!: (position: number) => void;
  game: IGame = {
    currentTime: 0,
    timer: 10,
    questionCounter: 1,
    score: 0,
    selectedAnswer: {
      index: undefined,
      answer: ''
    }
  };
  uiPrefrence: IUiPreference = {
    showScoreDialog: false,
    isAnswerSelect: false,
    isAnswerCheck: false,
    selectedBtnColor: '',
    selectedBtnTextColor: ''
  };

  async created() {
    await this.showContent();
  }

  async showContent(): Promise<void> {
    await this.paginate();
    await this.generateAnswers();
  }

  async paginate(): Promise<void> {
    await this.paginateContents(this.contents);
    this.startTimer();
  }

  async generateAnswers(): Promise<void> {
    await this.generateRandomAnswer(this.contents);
    this.uiPrefrence.selectedBtnColor = 'grey';
    this.uiPrefrence.selectedBtnTextColor = 'white';
  }

  selectAnswer(selectedOptions: { [key: string]: any }): void {
    this.game.selectedAnswer.index = selectedOptions.index;
    this.game.selectedAnswer.answer = selectedOptions.answer;
    this.uiPrefrence.isAnswerSelect = true;
    this.uiPrefrence.selectedBtnColor = 'purple-10';
    this.uiPrefrence.selectedBtnTextColor = 'white';
  }

  checkSelectedAnswer(): void {
    this.uiPrefrence.isAnswerCheck = true;
    this.uiPrefrence.selectedBtnColor = 'purple-10';
    this.uiPrefrence.selectedBtnTextColor = 'white';
    if (this.game.selectedAnswer.answer == this.gameAnswer.correctAnswer) {
      let score = 0;
      score = this.game.timer + 10;
      this.game.score += score;
      this.uiPrefrence.selectedBtnColor = 'green';
      this.uiPrefrence.selectedBtnTextColor = 'white';
    } else {
      this.uiPrefrence.selectedBtnColor = 'red-5';
      this.uiPrefrence.selectedBtnTextColor = 'white';
    }
  }

  async continueAnswering(): Promise<void> {
    this.game.timer = 10;
    this.game.questionCounter += 1;
    this.game.selectedAnswer.index = undefined;
    this.game.selectedAnswer.answer = '';
    this.uiPrefrence.isAnswerSelect = false;
    this.uiPrefrence.isAnswerCheck = false;
    this.changeContentPosition(1);
    await this.showContent();
    clearTimeout(this.game.currentTime);
  }

  startTimer(): void {
    this.countDownTimer();
  }

  countDownTimer(): void {
    this.game.currentTime = setTimeout(() => {
      this.game.timer -= 1;
      if (this.game.timer == 0) {
        this.game.timer = 10;
      }
      this.countDownTimer();
    }, 1000) as any;
  }
}
</script>

<style></style>
