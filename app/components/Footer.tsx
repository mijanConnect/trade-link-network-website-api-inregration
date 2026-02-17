"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoNav } from "./Svg";
import Button from "./ui/Button";
import ContactUs from "./ui/ContactUs";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <footer className="bg-white">
      <div className="container mx-auto flex flex-col gap-6 px-4 py-8 md:py-8 sm:py-12 lg:py-12 bg-[url('/assets/watermark.png')] bg-contain bg-center bg-no-repeat">
        <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="font-semibold text-primary text-[22px]">
                Contact
              </h3>
              <ul className="flex flex-col gap-1 text-primary text-[16px] items-center md:items-start mt-2 lg:mt-4">
                <li className="flex items-center gap-2">
                  <p>Phone :</p>
                  <a href="tel:+61234567890">+61 234 567 890</a>
                </li>
                <li className="flex items-center gap-2">
                  <p>Email :</p>
                  <a href="mailto:tradelinknetwork@gmail.com">
                    tradelinknetwork@gmail.com
                  </a>
                </li>
              </ul>

              <Button
                variant="outline"
                className="mt-4 lg:mt-6 px-10! font-semibold!"
                onClick={() => setIsContactOpen(true)}
              >
                Contact Us
              </Button>
            </div>

            <div className="mt-12 hidden md:block">
              <Link href="/">
                <LogoNav />
              </Link>
            </div>
          </div>
          <div className="mt-4 lg:mt-0">
            <div className="flex flex-col items-center md:items-end text-center md:text-right justify-between">
              <ul className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3 text-primary text-[16px] font-medium">
                <li>
                  <Link
                    href="/services"
                    className="hover:underline transform transition-all"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/areas"
                    className="hover:underline transform transition-all"
                  >
                    Area Covered
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="hover:underline transform transition-all"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:underline transform transition-all"
                  >
                    Privacy/ Terms
                  </Link>
                </li>
              </ul>
              <ul className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3 text-primary text-[16px] font-medium mt-3 lg:mt-4">
                <li>
                  <Link
                    href="/review-policy"
                    className="hover:underline transform transition-all"
                  >
                    Review Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/code-of-conduct"
                    className="hover:underline transform transition-all"
                  >
                    Code of Conduct
                  </Link>
                </li>
              </ul>
              <div className="flex flex-col items-center lg:items-end">
                <div>
                  <h4 className="text-[18px] lg:text-[24px] font-semibold text-primary mt-4 lg:mt-10">
                    Are you a tradesperson?
                  </h4>
                </div>
                <Link href="/register" className="inline-block mt-4 lg:mt-4">
                  <Button className="px-10! font-semibold! inline-block">
                    Sign Up
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col items-center lg:items-end mt-6 lg:mt-6">
                <h4 className="text-[16px] font-semibold text-primary mb-3">
                  Follow Us
                </h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/people/Trade-Link-Network/61586599067439/?mibextid=wwXIfr&rdid=IxZ1r3LNOSKscqVJ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CMH837Yup%2F%3Fmibextid%3DwwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/70 transition-colors"
                    aria-label="Instagram"
                  >
                    <Facebook />
                  </a>
                  <a
                    href="https://www.instagram.com/accounts/login/?next=%2Ftradelink2026&source=omni_redirect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/70 transition-colors"
                    aria-label="Facebook"
                  >
                    <Instagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="text-center py-4 text-sm text-primary border-t border-primary/20 flex flex-col gap-1">
          {/* <span>
            © {new Date().getFullYear()} Trade Link Network. All rights reserved
          </span> */}
          <span>Trade Link Network Ltd — Registered in England & Wales</span>
          <span>Company No: 16989421</span>
        </div>
      </div>
      <ContactUs
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </footer>
  );
}
