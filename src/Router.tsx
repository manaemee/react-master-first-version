import {BrowserRouter, Routes, Route} from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";


interface IRouterProps {
    toggleDark: () => void;
}


function Router({toggleDark}: IRouterProps){
return (<BrowserRouter>
    <Routes>
        <Route path="/:coinId/*" element={ <Coin/>}>
        </Route>
        <Route path={`${process.env.PUBLIC_URL}/`} toggleDark={toggleDark} element={<Coins/>}>
        </Route>
    </Routes>
</BrowserRouter>)
}
export default Router;