import { RouteObject,createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/ActivityDashboard";
import ActivityForm from "../../features/activities/ActivityForm";
import ActivityDetails from "../../features/activities/ActivityDetails";
import LoginForm from "../../features/Users/LoginForm";

export const routes: RouteObject[] = [{
    path:'/',
    element:<App/>,
    children:[
        {path:'',element:<HomePage/>},
        {path:'activities',element:<ActivityDashboard/>},
        {path:'createActivity/:id?',element:<ActivityForm key='createActivity'/>},
        {path:'activities/:id',element:<ActivityDetails/>},
        {path:'login',element:<LoginForm/>},
    ]
},{
    path:'/test',
    element:<ActivityForm key='createActivity'/>,
}];

export const router = createBrowserRouter(routes);
