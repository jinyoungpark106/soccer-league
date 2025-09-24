
import { useState, useEffect } from "react"
import { Navbar, NavbarCollapse, NavbarLink } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import {menuItems} from "../utils/helper";

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    openMenu();
  }, [isMenuOpen]);

  return (
    <Navbar fluid rounded className={'h-20'} style={{backgroundColor: '#3f1052'}}>
      <Link to="/" className={'flex'}>
        <img src={'/images/premier-league.png'} alt={'Premier League'}/>
        <div className={'text-xl content-center'}>Premier League</div>
      </Link>

      {/* Desktop Navigation */}
      <NavbarCollapse className={'justify-items-center flex-1 mr-50 hidden'}>
        <NavbarLink href="/matches" active={location.pathname === "/matches" || location.pathname === "/"}><span className={'pr-20'}>MATCHES</span></NavbarLink>
        <NavbarLink href="/standings" active={location.pathname === "/standings"}><span className={'pr-20'}>STANDINGS</span></NavbarLink>
        <NavbarLink href="/stats" active={location.pathname === "/stats"}><span className={'pr-20'}>STATS</span></NavbarLink>
        <NavbarLink href="/players" active={location.pathname === "/players"}>PLAYERS</NavbarLink>
      </NavbarCollapse>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-2xl z-50" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className={"text-white"} />
      </button>

      {/* Mobile Navigation */}
      <nav
        className={`
          fixed md:hidden top-0 right-0 h-full w-[200px]
          flex flex-col items-start
          p-8 gap-6
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          z-50
        `}
        style={{backgroundColor: '#181818'}}
      >
        <button className="text-2xl self-end" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faTimes} className={"text-white"} />
        </button>
        {
          menuItems.map((item, i) => {
            return (
              <Link
                to={item.link}
                key={i}
                className={`
                  text-white-800 hover:text-[#2f405e] font-medium w-full py-2 border-border-gray-200 hover:underline
                  hover:underline-offset-8 hover:decoration-[#2f405e] hover:decoration-4
                `}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })
        }
      </nav>
    </Navbar>
  );
}
