import React, { useState, useEffect } from "react";
import { summarize, arrow } from "../assets";
import { NavLink } from "react-router-dom";
import styles from "../style";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [active, setActive] = useState("");
  

  const handleResize = () => {
    if (window.innerWidth <= 1060) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItem = [
    {
      title: "Summarization",
      path: "/",
      icon: summarize,
    },
  ];

  return (
    <div className="flex h-full">
      <div style={{ width: isOpen ? "325px" : "0px"}} className="md:flex hidden flex-col">
        <div className="flex items-center mb-10 gap-2">
          <h1
            style={{ display: isOpen ? "block" : "none" }}
            className={`${styles.heading2} text-Light`}
          >
            GrammarGenie
          </h1>
          {!isOpen && <h1 className={`${styles.heading2} text-Light flex items-center justify-center w-full`}>G</h1>}
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="flex gap-2 px-[10px] py-[20px] bg-BlackPearl rounded-[15px]"
            activeclassName=""
          >
            <div className="icon">
              <img src={item.icon} alt="" />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={`${styles.paraLarge} text-Light`}
            >
              {item.title}
            </div>
          </NavLink>
        ))}
      </div>
      <main className="w-full md:ml-[14px] ml-0 bg-BlackPearl p-[24px] rounded-[15px]">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
