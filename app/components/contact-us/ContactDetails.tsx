import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  PhoneCall,
  Twitter,
} from "lucide-react";

export default function ContactDetails() {
  return (
    <>
      <div className="border border-stroke rounded-md py-4 lg:py-16 px-4 lg:px-8">
        <h2 className="text-[20px] font-medium mb-2 lg:mb-4">
          Contact details
        </h2>
        <p className="mb-4 lg:mb-6 text-[16px] text-primaryTextLight leading-7.5">
          Explore further, stay longer, and travel better with vehicles designed
          to keep your adventures smooth and stress-free.
        </p>

        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex items-start gap-3">
            <div className="">
              <MapPin height={24} className="pt-1" />
            </div>
            <div>
              <p className="text-[18px] text-primaryText font-medium mb-2">
                Address
              </p>
              <p className="text-[18px] text-primaryText mb-1">
                123 Queensberry Street, North
              </p>
              <p className="text-[18px] text-primaryText">
                Melbourne VIC 3051, Australia
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="">
              <Mail height={24} className="pt-1" />
            </div>
            <div>
              <p className="text-[18px] text-primaryText font-medium mb-2">
                Email
              </p>
              <p className="text-[18px] text-primaryText mb-1">
                example@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="">
              <PhoneCall height={24} className="pt-1" />
            </div>
            <div>
              <p className="text-[18px] text-primaryText font-medium mb-2">
                Phone
              </p>
              <p className="text-[18px] text-primaryText mb-1">
                +76 956 123 456
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div>
              <p className="text-[18px] text-primaryText font-medium mb-2">
                Follow Us
              </p>
              <div>
                <ul className="flex gap-4">
                  <a
                    href="#"
                    className="hover:bg-gray-100 p-1 rounded-sm transform translate"
                  >
                    <li className="text-[18px] text-primaryText">
                      <Facebook fill="#2A2A2A" />
                    </li>
                  </a>
                  <a
                    href="#"
                    className="hover:bg-gray-100 p-1 rounded-sm transform translate"
                  >
                    <li className="text-[18px] text-primaryText">
                      <Twitter fill="#2A2A2A" />
                    </li>
                  </a>
                  <a
                    href="#"
                    className="hover:bg-gray-100 p-1 rounded-sm transform translate"
                  >
                    <li className="text-[18px] text-primaryText">
                      <Instagram fill="#2A2A2A" stroke="white" />
                    </li>
                  </a>
                  <a
                    href="#"
                    className="hover:bg-gray-100 p-1 rounded-sm transform translate"
                  >
                    <li className="text-[18px] text-primaryText">
                      <Linkedin fill="#2A2A2A" />
                    </li>
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
