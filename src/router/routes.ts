import { RouteConfig } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      { path: 'learn', component: () => import('pages/learn/Learn.vue') },
      { path: 'game', component: () => import('pages/game/Game.vue') },
      { path: 'learn/:id', name: 'learn-content', component: () => import('pages/learn/LearnPageContent.vue') },
      { path: 'game/:id', name: 'game-content', component: () => import('pages/game/GamePageContent.vue') },
      { path: 'score/:id', name: 'player-score', component: () => import('pages/ScoreBoard.vue') },
      { path: 'board', name: 'leader-board', component: () => import('pages/score/LeaderBoard.vue') },
      { path: 'about', name: 'about-page', component: () => import('pages/About.vue') },
      { path: 'credit', name: 'credit-page', component: () => import('pages/Credit.vue') }
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
