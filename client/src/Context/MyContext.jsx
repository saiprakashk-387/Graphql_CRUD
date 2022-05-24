import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [LoginDetails, setLoginDetails] = useState({
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
  });
  return (
    <UserContext.Provider value={[LoginDetails]}>
      {props.children}
    </UserContext.Provider>
  );
};
