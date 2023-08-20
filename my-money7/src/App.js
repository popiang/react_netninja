import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
import { useAuthContext } from "./hooks/useAuthcontext";

// components & pages
import Home from "../src/pages/home/Home";
import Signup from "../src/pages/signup/Signup";
import Login from "../src/pages/login/Login";
import Navbar from "./components/Navbar";

function App() {
    const { user, isAuthReady } = useAuthContext();

    return (
        <div>
            {isAuthReady && (
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <Route exact path="/">
                            {!user && <Redirect to="/login" />}
                            {user && <Home />}
                        </Route>
                        <Route path="/signup">
                            {user && <Redirect to="/" />}
                            {!user && <Signup />}
                        </Route>
                        <Route path="/login">
                            {user && <Redirect to="/" />}
                            {!user && <Login />}
                        </Route>
                    </Switch>
                </BrowserRouter>
            )}
        </div>
    );
}

export default App;
