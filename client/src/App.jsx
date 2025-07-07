import { Loader } from "lucide-react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setOnlineUsers } from "./store/slices/authSlice";
import { connectSocket, disconnectSocket } from "./lib/socket";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";

const App = () => {

    const { authUser, isCheckingAuth } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [getUser]);


    useEffect(() => {
        if (authUser) {
            const socket = connectSocket(authUser._id);

            socket.on("getOnlineUsers", (users) => {
                dispatch(setOnlineUsers(users));
            });

            return () => disconnectSocket();
        }
    }, [authUser]);

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex items-center justify-center h-screenc">
                <Loader className="size-10" aniimate-spin />
            </div>
        );
    }

    return <>
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={authUser ? <Home /> : <Navigate to={"/login"} />}
                />
                <Route
                    path="/register"
                    element={!authUser ? <Register /> : <Navigate to={"/"} />}
                />
                <Route
                    path="/register"
                    element={!authUser ? <Login /> : <Navigate to={"/"} />}
                />
                <Route
                    path="/profile"
                    element={authUser ? <Profile /> : <Navigate to={"/login"} />}
                />
            </Routes>
            <ToastContainer />
        </Router>
    </>;

};

export default App;
