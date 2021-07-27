import { RouteConfig } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import Index from 'pages/Index.vue';
import Learn from 'pages/learn/Learn.vue';
import Game from 'pages/game/Game.vue';
import LearnContent from 'pages/learn/LearnPageContent.vue';
import GameContent from 'pages/game/GamePageContent.vue';
import ScoreBoard from 'pages/ScoreBoard.vue';
import LeaderBoard from 'pages/score/LeaderBoard.vue';
import About from 'pages/About.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Index },
      { path: 'learn', component: Learn },
      { path: 'game', component: Game },
      { path: 'learn/:id', name: 'learn-content', component: LearnContent },
      { path: 'game/:id', name: 'game-content', component: GameContent },
      { path: 'score/:id', name: 'player-score', component: ScoreBoard },
      { path: 'board', name: 'leader-board', component: LeaderBoard },
      { path: 'about', name: 'about-page', component: About }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
