import { RouteConfig } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import Index from 'pages/Index.vue';
import Learn from 'pages/learn/Learn.vue';
import Game from 'pages/game/Game.vue';
import LearnContent from 'pages/learn/LearnPageContent.vue';
import GameContent from 'pages/game/GamePageContent.vue';
import ScoreBoard from 'pages/ScoreBoard.vue';
import HomePage from 'pages/HomePage.vue';
import LeaderBoard from 'pages/score/LeaderBoard.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Index },
      { path: 'home', component: HomePage },
      { path: 'learn', component: Learn },
      { path: 'game', component: Game },
      { path: 'learn/:id', name: 'learn-content', component: LearnContent },
      { path: 'game/:id', name: 'game-content', component: GameContent },
      { path: 'score/:id', component: ScoreBoard },
      { path: 'board', component: LeaderBoard }
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
