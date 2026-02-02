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
    title: "Clear budgets & timelines",
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

export default function WhyUs() {
  return (
    <WhyUse
      title="Why Homeowners use Us?"
      subtitle=""
      items={useUsData}
      icons={icons}
    />
  );
}
