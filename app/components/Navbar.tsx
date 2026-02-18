"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Button from "./ui/Button";
import { LogoNav, LogoNavMobile } from "./Svg";
import ShowProfileModal from "./profile/ShowProfileModal";

const navbarStyles = `
  .nav-link {
    position: relative;
    z-index: 1;
    text-decoration: none;
    transition: color 0.25s ease, -webkit-text-stroke 0.25s ease;
    -webkit-text-stroke: 0 currentColor;
  }

  .nav-link:hover,
  .nav-link.active {
    color: #1e3a5f;
    -webkit-text-stroke: 0.3px currentColor;
  }

  .hamburger-icon {
    transition: transform 0.3s ease;
  }

  .mobile-menu {
    animation: slideDown 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .mobile-menu.closing {
    animation: slideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
      max-height: 0;
    }
    to {
      opacity: 1;
      transform: translateY(0);
      max-height: 500px;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
      max-height: 500px;
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
      max-height: 0;
    }
  }
`;

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setOpen(false);
    setTimeout(() => {
      setIsClosing(false);
    }, 500);
  };

  const toggleMenu = () => {
    if (open) {
      handleClose();
    } else {
      setOpen(true);
    }
  };

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  const handleScrollToCategory = useCallback(() => {
    if (pathname !== "/") {
      // Navigate to home first, then scroll
      router.push("/");
      // Set a flag to scroll after navigation
      localStorage.setItem("scrollToCategory", "true");
    } else {
      // Already on home, scroll immediately
      const target = document.getElementById("browse-category");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [pathname, router]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle scroll to category when navigated from another route
  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined") {
      const shouldScroll = localStorage.getItem("scrollToCategory");
      if (shouldScroll === "true") {
        localStorage.removeItem("scrollToCategory");
        const target = document.getElementById("browse-category");
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    }
  }, [pathname]);

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <>
      <style>{navbarStyles}</style>
      <header
        className={`sticky top-0 z-20 w-full transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          background: "white",
          boxShadow: "0 3px 5px rgba(0,0,0,0.05)",
        }}
      >
        <div className="container mx-auto flex items-center justify-between py-3 gap-4 px-4">
          <div>
            <div className="hidden lg:block">
              <Link href="/">
                <LogoNav />
              </Link>
            </div>
            <div className="lg:hidden">
              <Link href="/">
                <LogoNavMobile />
              </Link>
            </div>
          </div>

          <nav className="hidden lg:flex lg:flex-1 items-center justify-center gap-12">
            <Link
              href="/"
              className={`nav-link py-1 transform transition-all text-[16px] font-normal ${
                isActive("/") ? "text-blue active" : "text-primaryTextLight"
              }`}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/services"
              className={`nav-link py-1 transform transition-all text-[16px] font-normal ${
                isActive("/services")
                  ? "text-blue active"
                  : "text-primaryTextLight"
              }`}
              onClick={() => setOpen(false)}
            >
              Services
            </Link>

            <Link
              href="/areas"
              className={`nav-link py-1 transform transition-all text-[16px] font-normal ${
                isActive("/areas")
                  ? "text-blue active"
                  : "text-primaryTextLight"
              }`}
              onClick={() => setOpen(false)}
            >
              Area Covered
            </Link>

            <Link
              href="/faq"
              className={`nav-link py-1 transform transition-all text-[16px] font-normal ${
                isActive("/faq")
                  ? "text-blue active"
                  : "text-primaryTextLight"
              }`}
              onClick={() => setOpen(false)}
            >
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 ml-auto">
            {isLoggedIn && (
              <div className="hidden lg:flex items-center gap-2 lg:gap-6">
                <Link
                  href="/my-jobs"
                  className={`nav-link text-[14px] sm:text-[16px] font-bold text-primary transition-all ${
                    isActive("/my-jobs") ? "active" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  My Jobs
                </Link>
              </div>
            )}

            {!isLoggedIn && (
              <div className="hidden lg:flex items-center gap-2 lg:gap-6">
                <button
                  onClick={handleScrollToCategory}
                  className="nav-link text-[14px] sm:text-[16px] font-bold text-primary transition-all cursor-pointer"
                >
                  Post a Job
                </button>

                <Link
                  href="/login"
                  className={`nav-link text-[14px] sm:text-[16px] font-bold text-primary transition-all ${
                    isActive("/login") ? "active" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}

            {!isLoggedIn && (
              <Button
                onClick={() => router.push("/register")}
                variant="primary"
                size="sm"
                className="font-semibold whitespace-nowrap text-[12px] sm:text-[14px] lg:text-[16px] px-2 sm:px-3 lg:px-4"
              >
                Join as Tradeperson
              </Button>
            )}

            {isLoggedIn && (
              <ShowProfileModal
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}

            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-md text-primary hover:bg-blue-200 transition-colors p-2"
              aria-label="Toggle navigation"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6 hamburger-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  transform: open ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {(open || isClosing) && (
          <>
            <div
              className={`lg:hidden fixed inset-0 bg-black z-30 transition-opacity duration-500 ${
                isClosing ? "opacity-0" : "opacity-0"
              }`}
              onClick={handleClose}
              style={{
                pointerEvents: isClosing ? "none" : "auto",
              }}
            />

            <div
              className={`lg:hidden fixed top-[63px] left-0 right-0 bg-white z-40 max-h-[calc(100vh-88px)] overflow-y-auto ${
                isClosing ? "mobile-menu closing" : "mobile-menu"
              }`}
            >
              <nav className="container mx-auto px-4 py-2 flex flex-col text-center">
                <Link
                  href="/"
                  className={`nav-link py-4 text-[16px] font-normal transition-all border-b ${
                    isActive("/") ? "text-blue active" : "text-primaryTextLight"
                  }`}
                  onClick={handleClose}
                >
                  Home
                </Link>

                <Link
                  href="/services"
                  className={`nav-link py-4 text-[16px] font-normal transition-all border-b ${
                    isActive("/services")
                      ? "text-blue active"
                      : "text-primaryTextLight"
                  }`}
                  onClick={handleClose}
                >
                  Services
                </Link>

                <Link
                  href="/areas"
                  className={`nav-link py-4 text-[16px] font-normal transition-all ${
                    isActive("/areas")
                      ? "text-blue active"
                      : "text-primaryTextLight"
                  }`}
                  onClick={handleClose}
                >
                  Area Covered
                </Link>

                <Link
                  href="/faq"
                  className={`nav-link py-4 text-[16px] font-normal transition-all ${
                    isActive("/faq")
                      ? "text-blue active"
                      : "text-primaryTextLight"
                  }`}
                  onClick={handleClose}
                >
                  FAQ
                </Link>
              </nav>

              <div className="flex items-center gap-2 lg:gap-6">
                {isLoggedIn && (
                  <Link
                    href="/my-jobs"
                    className="bg-primary p-2 text-white font-semibold text-center flex-1"
                    onClick={() => setOpen(false)}
                  >
                    My Jobs
                  </Link>
                )}

                {!isLoggedIn && (
                  <>
                    <button
                      onClick={() => {
                        handleScrollToCategory();
                        setOpen(false);
                      }}
                      className="bg-primary p-2 text-white font-semibold text-center flex-1"
                    >
                      Post a Job
                    </button>

                    <Link
                      href="/login"
                      className="bg-primary p-2 text-white font-semibold text-center flex-1"
                      onClick={() => setOpen(false)}
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
