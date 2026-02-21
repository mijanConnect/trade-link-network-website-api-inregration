// import { Budget, File, Phone, Plus, Prople } from "../Svg";
import { Building, File, IdCard, Phone, User2, Verified } from "lucide-react";
import WhyUse from "../ui/WhyUse";

const icons = {
  Verified: <Verified size={40} />,
  IdCard: <IdCard size={40}   />,
  Building: <Building size={40}   />,
  User2: <User2 size={40}   />,
  Phone: <Phone size={40}   />,
  File: <File size={40}   />,
};

const useUsData = [
  {
    id: 1,
    icon: "Verified",
    title: "Verified professionals",
  },


  {
    id: 2,
    icon: "IdCard",
    title: "ID Checked & vetted trades",
  },
  {
    id: 3,
    icon: "Building",
    title: "Compare up to 3 quotes",
  },
  {
    id: 4,
    icon: "User2",
    title: "Local professionals only",
  },
  {
    id: 5,
    icon: "File",
    title: "Trades see full job details upfront",
  },
  {
    id: 6,
    icon: "Phone",
    title: "No endless phone calls",
  },
 
];

export default function UseUs() {
  return (
    <WhyUse
      title="Why use Us?"
      subtitle="Why homeowners trust Trade Link Network"
      items={useUsData}
      icons={icons}
    />
  );
}
