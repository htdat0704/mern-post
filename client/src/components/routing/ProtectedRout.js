import { Navigate } from "react-router-dom";
import NavbarMenu from "../layout/NavBar"

const Protected = ({ user, children }) => {

    if (!user) {
        return <Navigate to="/dashboard" replace />;
    }
    
    return (
        <>
            <NavbarMenu></NavbarMenu>
             {children}
        </>
    )
};  

export default Protected;