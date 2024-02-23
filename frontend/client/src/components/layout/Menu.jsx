import React from "react";
import { Link } from "react-router-dom";
import {
  HeartMenuIcon,
  HomeIcon,
  KarzinaMenu,
  UserMenuIcon
} from "../../assets/icons";

function Menu() {
  return (
    <div>
      <div className="responsive-mobile-phone">
        <div className="container">
          <div className="menu">
            <Link to={"/"}>
              <button>
                <HomeIcon />
              </button>
            </Link>

   

            <Link to={"/favorites"}>
              <button>
                <HeartMenuIcon />
              </button>
            </Link>

            <Link to={"/karzina"}>
              <button>
                <KarzinaMenu />
              </button>
            </Link>

            <button >
              <UserMenuIcon/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
