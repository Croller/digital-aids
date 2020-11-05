import Home from '../components/home'
import Menu from '../components/menu'
import P404 from '../components/template/404'


const components = {
    Home,
    Menu,
    P404, 
}

export const sets = ["robotics", "science", "science-and-robotics"]
export const experimentCategories = ["physics", "biology", "chemistry", "environment", "children"]

export const routes = [
    { exact: true, path: "/" , component: components["Home"]  },
    { exact: true, path: "/:slug" , component: components["Menu"]  },
    { exact: false, path: "*" , component: components["P404"]},
]


export default routes;