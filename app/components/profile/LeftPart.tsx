import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function LeftPart() {
  return (
    <>
      <div className="max-w-sm min-w-full lg:min-w-[400px] p-4 lg:p-6 border rounded-lg border-stroke">
        <Image
          src="/assets/avatar.png"
          alt="Left Part Image"
          width={150}
          height={150}
          className="rounded-full object-cover"
        />
        <h2 className="text-[22px] text-primaryText font-semibold mt-4">
          ABC Company
        </h2>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex gap-3 items-center">
            <Mail className="w-5 h-5 text-primaryTextLight" />
            <p>contact@abccompany.com</p>
          </div>
          <div className="flex gap-3 items-center">
            <Phone className="w-5 h-5 text-primaryTextLight" />
            <p className="text-[16px] text-primaryText">+44 789 *** *** 24</p>
          </div>
          <div className="flex gap-3 items-center">
            <MapPin className="w-5 h-5 text-primaryTextLight" />
            <p className="text-[16px] text-primaryText">London, UK</p>
          </div>
        </div>
      </div>
    </>
  );
}
