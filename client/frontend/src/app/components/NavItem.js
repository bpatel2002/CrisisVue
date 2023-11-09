// import Link from "next/link";
// const NavItem = ({ text, href, active }) => {
//   return (
//     <Link href={href}>
//       {text}
//     </Link>
//   );
// };

// export default NavItem;

// NavItem.js

import Link from "next/link";
import React, { useState } from "react";
import './Navbar.css'

const NavItem = ({ text, href, active, dropdownItems }) => {
  const [dropdownActive, setDropdownActive] = useState(false);

  if (dropdownItems) {
    return (
      <div className={`nav-item dropdown ${active ? "active" : ""}`} onClick={() => setDropdownActive(!dropdownActive)}>
        <div className="dropbtn">
        {text}
        </div>
        {dropdownActive && (
          
          <div className="dropdown-content">
            {dropdownItems.map((item) => (
              <Link legacyBehavior key={item.text} href={item.href}>
                {item.text}
              </Link>
            ))}
          </div>  
        )}
      </div>
    );
  }

  return (
    <Link legacyBehavior href={href}>
      <a className={`nav-item ${active ? "active" : ""}`}>{text}</a>
    </Link>
  );
};

export default NavItem;
