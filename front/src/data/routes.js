import Home from '../components/home'
import Restaurant from '../components/restaurant'
import Cart from '../components/cart'
import P404 from '../components/template/404'


const components = {
    Home,
    Cart, 
    Restaurant,
    P404, 
}

export const sets = ["robotics", "science", "science-and-robotics"]
export const experimentCategories = ["physics", "biology", "chemistry", "environment", "children"]

export const routes = [
    { exact: true, path: "/" , component: components["Home"]  },
    { exact: true, path: "/:slug" , component: components["Restaurant"]  },
    { exact: true, path: "/:slug/cart" , component: components["Cart"]  },
    { exact: false, path: "*" , component: components["P404"]},
]


export default routes;