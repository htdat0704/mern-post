import { Navigate } from "react-router-dom";

const ProtectedUpdate = ({ post,user, children }) => {

    if(post !== user ){
        return <Navigate to="/dashboard" replace />;
    }

    
    return (
        <>
             {children}
        </>
    )
};  

export default ProtectedUpdate;