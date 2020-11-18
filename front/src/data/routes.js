import Home from '../components/home'
import Restaurant from '../components/restaurant'
import Cart from '../components/cart'
import Details from '../components/restaurant/details'
import Options from '../components/restaurant/hamburger-menu'
import Lang from '../components/restaurant/language'
import P404 from '../components/template/404'


const components = {
    Home,
    Cart, 
    Lang,
    Restaurant,
    Details,
    Options,
    P404, 
}

export const sets = ["robotics", "science", "science-and-robotics"]
export const experimentCategories = ["physics", "biology", "chemistry", "environment", "children"]

export const routes = [
    { exact: true, path: "/" , component: components["Home"]  },
    { exact: true, path: "/:slug" , component: components["Restaurant"]  },
    { exact: true, path: "/:slug/cart" , component: components["Cart"]  },
    { exact: true, path: "/:slug/language" , component: components["Lang"]  },
    { exact: true, path: "/:slug/details" , component: components["Details"]  },
    { exact: true, path: "/:slug/options" , component: components["Options"]  },
    { exact: false, path: "*" , component: components["P404"]},
]


export default routes;