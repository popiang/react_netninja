import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "../src/pages/home/Home";
import Login from "../src/pages/login/Login";
import Signup from "../src/pages/signup/Signup";
import Navbar from "./components/Navbar";

function App() {
    const { isAuthReady, user } = useAuthContext();

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
                        <Route path="/login">
                            {user && <Redirect to="/" />}
                            {!user && <Login />}
                        </Route>
                        <Route path="/signup">
                            {user && <Redirect to="/" />}
                            {!user && <Signup />}
                        </Route>
                    </Switch>
                </BrowserRouter>
            )}
        </div>
    );
}

export default App;
