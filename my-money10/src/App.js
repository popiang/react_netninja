import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & componenets
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
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
