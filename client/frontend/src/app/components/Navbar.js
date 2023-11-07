"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logo from "./logo";
import NavItem from "./NavItem";
import { auth } from "../firebase";
const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "Visualization", href: "../visual" },
  { text: "Timeline", href: "../timeline" },
];
const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });

    // Make sure to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <header>
      <nav className={`nav`}>
        <Link href="/">
          <Logo />
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
          {user && (
            <>
              {/* Submit */}
              <div
                onClick={() => {
                  setActiveIdx(MENU_LIST.length); // Assuming "Submit" is next in the order
                  setNavActive(false);
                }}
              >
                <NavItem
                  active={activeIdx === MENU_LIST.length}
                  text="Submit"
                  href="/submit"
                />
              </div>
              {/* Logout */}
              <div
                onClick={() => {
                  setActiveIdx(MENU_LIST.length + 1); // Assuming "Logout" is after "Submit"
                  setNavActive(false);
                }}
              >
                <NavItem
                  active={activeIdx === MENU_LIST.length + 1}
                  text="Logout"
                  href="/logout"
                />
              </div>
            </>
          )}
          {!user && (
            <div
              onClick={() => {
                setActiveIdx(MENU_LIST.length); // Assuming "Login" takes the place of "Submit" when logged out
                setNavActive(false);
              }}
            >
              <NavItem
                active={activeIdx === MENU_LIST.length}
                text="Login"
                href="/login"
              />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
