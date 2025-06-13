import { React, useContext } from "react";
import { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Option({ deletedata, get }) {
  const { setAccount } = useContext(LoginContext);
  const BASE_URL = process.env.REACT_APP_BASE_URL;


  const removedata = async () => {
    try {
      const res = await fetch(`${BASE_URL}/remove/${deletedata}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      if (res.status === 400 || !data) {
        console.log("error");
      } else {
        setAccount(data);
        toast.success("Item removed from cart", {
          position: "top-center",
        });
        get();
      }
    } catch (error) {
      console.log("error deleting item");
    }
  };

  return (
    <>
      <div className="add_remove_select">
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <div className="option_actions">
          <p onClick={removedata}>Delete</p>
          <span>|</span>
          <p className="forremovemedia">Save for Later</p>
          <span>|</span>
          <p className="forremovemedia">See More Like This</p>
        </div>
      </div>
    </>
  );
}

export default Option;
