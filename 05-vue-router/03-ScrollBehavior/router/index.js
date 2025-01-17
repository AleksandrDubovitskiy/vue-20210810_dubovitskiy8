import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition || (to.meta.saveScrollPosition && from.meta.saveScrollPosition)) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        el: to.hash,
      };
    }

    return { left: 0, top: 0 };
  },
  history: createWebHistory('/05-vue-router/03-ScrollBehavior'),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/PageMeetups'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      redirect: { name: 'index' },
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      props: true,
      redirect: (to) => ({ name: 'meetup.description', params: to.params }),
      component: () => import('../views/PageMeetup'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup.description',
          props: true,
          component: () => import('../views/PageMeetupDescription'),
        },
        {
          path: 'agenda',
          name: 'meetup.agenda',
          props: true,
          component: () => import('../views/PageMeetupAgenda'),
        },
      ],
    },
  ],
});
