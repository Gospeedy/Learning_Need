import React, { useState } from "react";
import ReorderIcon from "@mui/icons-material/Reorder";
import SearchBar from "./Searchbar";
import "./Header.css";
import CartIcon from "./CartIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from '@mui/icons-material/Call';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModel";

function Header() {
  const history = useHistory();
  const { isAuthenticated, user } = useSelector((state) => state.userData);

  const [searchBarActive, setSearchBarActive] = useState(false);

  const [sideMenu, setSideMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // this is for handle sideBar
  const handleSideBarMenu = () => {
    setSideMenu(!sideMenu);
  };

  // this is for country selection
  

  // this is for Search Button toggle
  const handleSearchButtonClick = () => {
    setSearchBarActive(!searchBarActive);
  };

  // this is for input value of Search bar.
  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // this is for handle searching ...
  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim()) {
      history.push(`/products/${searchValue}`);
    } else {
      history.push("/products");
    }
  };

  // this is for sideBar Toggle Button
  const handleCrossButtonClick = () => {
    setSearchValue("");
    setSearchBarActive(!searchBarActive);
  };

  return (
    <>
      <div className="header">
        <div className="headerTop">
          <div className="headerTopLeft">
          <span>
                <CallIcon className="headerRetailer_Svg" />
              </span>
            <span>9007022228 , 8240554890</span>
          </div>
          <div className="headerTopRight">
            <div className="headerRetailer">
              <span>
                <LocationOnIcon className="headerRetailer_Svg" />
              </span>
              <span>info@learningneeds.in</span>
            </div>

            {/* <div className="headerFlag">
              <span>
                <FlagSelect value={country} onChange={handleCountryChange} />
              </span>
            </div> */}

            <div className="headerLogin">
              {isAuthenticated ? (
                <Link
                  to="/account"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button className="account_box">
                  <LockPersonIcon className="headerRetailer_Svg2" />
                    <span>My Account</span>
                    <span>
               
              </span>
                    </button>
                </Link>
              ) : (
                <Link
                  to="/signup"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button>Sign Up</button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* nav */}
        <div className="headerBottom">
          <div className="headerBottom__logo">
            <div className="header_mobile_menu">
              <span>
                <ReorderIcon
                  onClick={() => setSideMenu(!sideMenu)}
                  sx={{
                    fontSize: 29,
                    color: "black",
                    "&:hover": {
                      color: "#e7070f",
                      cursor: "pointer",
                    },
                  }}
                />
                {sideMenu && (
                  <Sidebar
                    handleSideBarMenu={handleSideBarMenu}
                    isAuthenticated={isAuthenticated}
                    user={user}
                  />
                )}
              </span>
              <span>
                <SearchBar
                  searchBarActive={searchBarActive}
                  searchValue={searchValue}
                  handleCrossButtonClick={handleCrossButtonClick}
                  handleSearchButtonClick={handleSearchButtonClick}
                  handleSearchInputChange={handleSearchInputChange}
                  handleSearchFormSubmit={handleSearchFormSubmit}
                />
              </span>
            </div>
          </div>
          {!searchBarActive && (
            <Link to="/">
              <img
                src={require("../../../Image/LN.png")}
                alt="logo"
                className="headerBottom__logo_main"
              />
            </Link>
          )}

          {/* navmenu */}

          {!searchBarActive && (
            <div className="headerBottom_navMenu">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about_us">About</Link>
                </li>

                <li>
                  <Link to="/products">Product</Link>
                </li>
                <li>
                  <Link to="/service">Service</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                
                
              </ul>
            </div>
          )}

          {/* icons */}

          <div className="headerBotttom_icons">
            <div className="search_Bar">
              <SearchBar
                searchBarActive={searchBarActive}
                searchValue={searchValue}
                handleCrossButtonClick={handleCrossButtonClick}
                handleSearchButtonClick={handleSearchButtonClick}
                handleSearchInputChange={handleSearchInputChange}
                handleSearchFormSubmit={handleSearchFormSubmit}
              />
            </div>
            <span>
              <Link
                to="/cart"
                style={{ color: "none", textDecoration: "none" }}
              >
                <CartIcon />
              </Link>
            </span>
            <span>
              <ProfileModal user={user} isAuthenticated={isAuthenticated} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
