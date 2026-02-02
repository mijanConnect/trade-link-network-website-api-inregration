import { Budget, File, Phone, Plus, Prople } from "../Svg";
import WhyUse from "../ui/WhyUse";

const icons = {
  File: <File />,
  Phone: <Phone />,
  Budget: <Budget />,
  Users: <Prople />,
  Plus: <Plus />,
};

const useUsData = [
  {
    id: 1,
    icon: "File",
    title: "Trades see full job details upfront",
  },
  {
    id: 2,
    icon: "Phone",
    title: "No endless phone calls",
  },
  {
    id: 3,
    icon: "Budget",
    title: "Compare up to 3 quotes",
  },
  {
    id: 4,
    icon: "Users",
    title: "Local professionals only",
  },
  {
    id: 5,
    icon: "Plus",
    title: "Free to post a job",
  },
];

export default function UseUs() {
  return (
    <WhyUse
      title="Why use Us?"
      subtitle="Why homeowners use us"
      items={useUsData}
      icons={icons}
    />
  );
}
