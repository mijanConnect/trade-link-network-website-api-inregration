import { Mail, MapPin, Phone, Star } from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";

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
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < 4
                    ? "fill-yellow-500 text-yellow-500"
                    : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-[20px] font-semibold text-primaryText">(4.0)</p>
        </div>
        <div className="mt-4">
          <ul className="flex gap-2 items-center flex-wrap">
            <li className="border px-2 py-1 inline-block rounded-sm border-stroke">
              Full garden renovation
            </li>
            <li className="border px-2 py-1 inline-block rounded-sm border-stroke">
              Full renovation
            </li>
            <li className="border px-2 py-1 inline-block rounded-sm border-stroke">
              Full garden
            </li>
          </ul>
        </div>
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
        <Button variant="primary" size="md" className="mt-6">
          Contact
        </Button>
      </div>
    </>
  );
}
