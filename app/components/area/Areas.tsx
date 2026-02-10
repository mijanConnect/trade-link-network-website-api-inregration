"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ServiceList from "../ui/ServiceList";
import { locations } from "./Location";

export default function Areas() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      offset: 50,
      mirror: false,
    });
  }, []);
  return (
    <>
      <div>
        <h2
          data-aos="fade-up"
          className="text-[24px] lg:text-[48px] font-semibold text-primaryText mb-4 lg:mb-12 text-center"
        >
          Area Covered
        </h2>

        <h3
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-[20px] lg:text-[32px] font-bold text-center text-primaryTextLight"
        >
          Areas we cover for Services
        </h3>

        <div className="mt-4 lg:mt-8" data-aos="fade-up" data-aos-delay="200">
          <ServiceList
            locations={locations.map(({ id, name, slug }) => ({
              _id: id,
              name,
              slug,
            }))}
            route="areas"
          />
        </div>
      </div>
    </>
  );
}
