import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom/cjs/react-router-dom.min";

// pages & components
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
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
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
