import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom/cjs/react-router-dom";

//* componenents
import Home from "../src/pages/home/Home";
import Login from "../src/pages/login/Login";
import Signup from "../src/pages/signup/Signup";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div>
            <BrowserRouter>
				<Navbar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
