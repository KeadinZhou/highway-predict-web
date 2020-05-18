import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login"
import Main from "@/views/Main"

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'login-page',
  component: Login
}, {
  path: '/main',
  name: 'main-page',
  component: Main
}]

const router = new VueRouter({
  routes
})

export default router
