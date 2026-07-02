import {useEffect, useState} from 'react'
import {navLinks} from "../constants/index.js";

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("#hero");

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 20);
            const links = navLinks.map((item) => item.link);
            const active = links.reduce((current, link) => {
                const section = document.querySelector(link);
                if (!section) return current;
                if (section.offsetTop <= scrollY + 180) {
                    return link;
                }
                return current;
            }, "#hero");
            setActiveLink(active);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  return (
      <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
          <div className="inner">
              <a className="logo" href="#hero">
                  Yishak W
              </a>

              <nav className="desktop">
                  <ul>
                      {navLinks.map(({link, name})=> (
                          <li key={name} className={activeLink === link ? "active" : ""}>
                              <a href={link}>
                                  <span>{name}</span>
                                  <span className="underline" />
                              </a>
                          </li>
                      ))}
                  </ul>
              </nav>

              <a href="#contact" className="contact-btn group">
                  <div className="inner">
                      <span>Contact me</span>
                  </div>
              </a>
          </div>
      </header>
  )
}

export default NavBar