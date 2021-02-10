import Home from '../components/home'
import Restaurant from '../components/restaurant'
import RestaurantBase from '../components/main/Restaurant'
import Cart from '../components/cart'
import Details from '../components/restaurant/details'
import Options from '../components/restaurant/hamburger-menu'
import Reglament from '../components/restaurant/reglament'
import Insider from '../components/restaurant/insider'
import Lang from '../components/restaurant/language'
import Test from '../components/test'
import P404 from '../components/template/404'


const components = {
    Home,
    Cart, 
    Lang,
    Restaurant,
    RestaurantBase,
    Details,
    Options,
    Reglament,
    Test,
    Insider,
    P404, 
}

export const routes = [
    { exact: true, path: "/" , component: components["Home"]  },
    { exact: true, path: "/test" , component: components["Test"]  },
    // { exact: true, path: "/:slug" , component: components["RestaurantBase"]  },
    { exact: true, path: "/:slug/:page(cart|language|details|options|reglament-1169|insider)?" , component: components["RestaurantBase"]  },
    { exact: true, path: "/:slug/:menu?/:category?" , component: components["RestaurantBase"]  },
    // { exact: true, path: "/:slug/cart" , component: components["Cart"]  },
    // { exact: true, path: "/:slug/language" , component: components["Lang"]  },
    // { exact: true, path: "/:slug/details" , component: components["Details"]  },
    // { exact: true, path: "/:slug/options" , component: components["Options"]  },
    // { exact: true, path: "/:slug/reglament-1169" , component: components["Reglament"] },
    // { exact: true, path: "/:slug/insider" , component: components["Insider"] },
    { exact: false, path: "*" , component: components["P404"]},
]


export default routes;