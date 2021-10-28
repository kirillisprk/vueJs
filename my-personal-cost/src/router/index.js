import Vue from 'vue'
import Router from 'vue-router'
import PaymentsDisplay from "@/components/PaymentsDisplay";
import PageAbout from "@/components/PageAbout";
import Page404 from "@/components/Page404";

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/dashboard/:page/',
      name: 'dashboard',
      component: PaymentsDisplay
    },
    {
      path: '/dashboard*',
      redirect: '/dashboard/1'
    },
    {
      path: '/about*',
      name: 'about',
      component: PageAbout
    },
    {
      path: '/add/payment/:category',
      name: 'addPayment'
    },

    {
      path: '/404',
      name: 'NotFound',
      component: Page404
    }
  ],
})





