// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";



// export const useAuthContext = () => {
//     const context = useContext(AuthContext);
//     if(!context) {
//         throw Error('useAuthContext must be used inside the AuthContexProvider')
//     }
//     return context;
// }

// export const getUserFromStorage = () => {
//     const stored = localStorage.getItem("user");
//     return stored ? { user: JSON.parse(stored) } : { user: {} };
// };
