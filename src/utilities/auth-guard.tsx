import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import Scaffold from "@/components/scaffold/scaffold.component";

const AuthGuard = () => {
    const token = useSelector((state: RootState) => state.auth.authData?.accessToken);

    return (
        token == '' || token == undefined ?
            <Navigate replace to={'/login'} /> :
            <Scaffold>
                <Outlet />
            </Scaffold>
    );
}

export default AuthGuard;