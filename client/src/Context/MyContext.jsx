import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [LoginDetails, setLoginDetails] = useState({
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    login:localStorage.getItem("timeStamp")
  });
  return (
    <UserContext.Provider value={[LoginDetails]}>
      {props.children}
    </UserContext.Provider>
  );
};
