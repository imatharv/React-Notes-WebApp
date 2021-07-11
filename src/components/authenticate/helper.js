export const isAuthenticated = (data) => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("token")) {
        return true;
    } else {
        return false;
    }
//   if (typeof window !== "undefined") {
//     if(localStorage.getItem("token")) {
//         return true;
//     }
//   }
//   return false;
};
