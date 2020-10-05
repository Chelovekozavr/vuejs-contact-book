import Vue from 'vue'
import Router from 'vue-router'

import ContactListItemDetails from '@/components/ContactListItemDetails'
import ContactList from '@/components/ContactList'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: ContactList
    },
    {
      path: '/:id',
      component: ContactListItemDetails,
      name: 'ContactListItemDetails',
      props: true
    }
  ]
})
