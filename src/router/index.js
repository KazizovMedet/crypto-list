import { createRouter, createWebHistory } from "vue-router"
import HomePage from "../pages/HomePage.vue"
import DetailsPage from "../pages/DetailsPage.vue"


const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/details/:id", name: "Details", component: DetailsPage },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router