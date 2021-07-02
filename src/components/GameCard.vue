<template>
  <div class="q-gutter-y-sm text-h5 text-bold text-center text-white">
    <p>What is the Meranaw meaning of this {{ $route.params.id }}?</p>
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
          v-for="(answer, index) in game['gameAnswers']"
          :key="index"
          class="col-6"
        >
          <q-btn
            class="full-width"
            size="md"
            rounded
            push
            :text-color="
              index == game['selectedAnswer'].index ||
              (index == game['selectedAnswer'].index &&
                uiPrefrence['isAnswerCheck'])
                ? 'white'
                : game.selectedBtnTextColor
            "
            :color="
              index == game['selectedAnswer'].index ||
              (index == game['selectedAnswer'].index &&
                uiPrefrence['isAnswerCheck'])
                ? 'purple-10'
                : game.selectedBtnColor
            "
            :label="answer"
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
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import firestore from 'src/services/firestore';

interface IContent {
  name: string;
  translatedName: string;
  img: string;
  audio: string;
}

interface IGame {
  contentPosition: number;
  currentTime: number;
  timer: number;
  questionCounter: number;
  score: number;
  correctAnswer: string;
  selectedAnswer: {
    index: number | undefined;
    answer: string;
  };
  gameAnswers: string[];
}

interface IUiPreference {
  isAnswerSelect: boolean;
  isAnswerCheck: boolean;
  selectedBtnColor: string;
  selectedBtnTextColor: string;
}

@Component({})
export default class GameCard extends Vue {
  storeContents: IContent[] = [];
  displayContents: IContent[] = [];
  game: IGame = {
    contentPosition: 1,
    currentTime: 0,
    timer: 10,
    questionCounter: 1,
    score: 0,
    correctAnswer: '',
    selectedAnswer: {
      index: undefined,
      answer: ''
    },
    gameAnswers: []
  };
  uiPrefrence: IUiPreference = {
    isAnswerSelect: false,
    isAnswerCheck: false,
    selectedBtnColor: '',
    selectedBtnTextColor: ''
  };

  async created() {
    await this.fetchContent();
  }

  async fetchContent(): Promise<void> {
    const animals = await firestore.getAnimals();
    const colors = await firestore.getColors();
    const numbers = await firestore.getNumbers();
    const words = await firestore.getWords();
    if (animals.length != 0 && this.$route.params.id == 'animals') {
      this.storeContents.push(...animals);
    } else if (colors.length != 0 && this.$route.params.id == 'colors') {
      this.storeContents.push(...colors);
    } else if (numbers.length != 0 && this.$route.params.id == 'numbers') {
      this.storeContents.push(...numbers);
    } else if (words.length != 0 && this.$route.params.id == 'words') {
      this.storeContents.push(...words);
    }
    this.paginateContents();
    this.generateRandomAnswer();
  }

  paginateContents(): void {
    let extractContent = this.storeContents;
    const paginate = (array: [], index: number, size: number) => {
      // transform values
      index = typeof index == 'string' ? Math.abs(parseInt(index)) : index;
      index = index > 0 ? index - 1 : index;
      size = typeof size == 'string' ? parseInt(size) : size;
      size = size < 1 ? 1 : size;
      // filter
      return [
        ...extractContent.filter((value, n) => {
          return n >= index * size && n < (index + 1) * size;
        })
      ];
    };
    if (this.game.contentPosition <= extractContent.length) {
      let transform = paginate(extractContent, this.game.contentPosition, 1);
      this.displayContents = transform;
      console.log(transform);
    }
    this.startTimer();
  }

  generateRandomAnswer(): void {
    const extractContent = this.storeContents;
    let answersArr = [];

    extractContent.forEach((content: IContent) => {
      answersArr.unshift(content.translatedName);
    });

    this.game.correctAnswer = this.displayContents[0].translatedName; // store correct answer
    let newAnsArr: IContent[] = answersArr.filter(
      item => item != this.game.correctAnswer
    ); // Remove answer in array
    newAnsArr.length = 3; // Limit length
    newAnsArr.unshift(this.game.correctAnswer); // Add answer array
    newAnsArr.sort(() => Math.random() - 0.5); // random the new elements
    this.game.gameAnswers = newAnsArr;
    this.game.selectedBtnColor = 'grey';
    this.game.btnTextColor = 'white';
  }

  selectAnswer(selectedOptions: { [key: string]: string }): void {
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
    if (this.game.selectedAnswer.answer == this.game.correctAnswer) {
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

  continueAnswering(): void {
    this.game.timer = 10;
    this.game.questionCounter += 1;
    this.game.contentPosition += 1;
    this.game.selectedAnswer.index = undefined;
    this.game.selectedAnswer.answer = '';
    this.uiPrefrence.isAnswerSelect = false;
    this.uiPrefrence.isAnswerCheck = false;
    this.paginateContents();
    this.generateRandomAnswer();
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
    }, 1000);
  }
}
</script>

<style></style>
