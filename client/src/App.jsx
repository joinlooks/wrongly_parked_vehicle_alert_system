import "./App.css";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import UserDashboard from "./components/UserDashboard";

export default function App() {
    return (
        <div className="App">
            {/* <RegisterPage /> */}
            {/* <LoginPage /> */}
            {/* <UserDashboard /> */}
            {/* <div>hello</div> */}

            <AdminDashboard />
        </div>
    );
}
