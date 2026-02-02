export type LeadHighlight = "Verified Phone" | "Frequent User" | "Urgent";

export type LeadStatus = "locked" | "unlocked" | "hired" | "completed";

export type Lead = {
  id: string;
  customerName: string;
  customerAddress: string;
  customerAvatar: string;
  createdAtLabel: string;
  title: string;
  summary: string;
  budgetLabel: string;
  status: LeadStatus;
  priceLabel: string;
  highlights: LeadHighlight[];
  jobDetails: { label: string; value: string }[];
  responsesCount: number; // Number of tradepeople who responded (0-3)
};

export type TradePersonProfile = {
  businessName: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  tags: string[];
};

export type Review = {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  dateLabel: string;
  text: string;
};

export const tradePersonProfile: TradePersonProfile = {
  businessName: "ABC Company",
  avatar: "/assets/avatar-2.png",
  rating: 5.0,
  reviewCount: 32,
  tags: [
    "Full garden renovation",
    "Patios & paving",
    "Garden redesign / makeover",
    "More…",
  ],
};

export const leadsMock: Lead[] = [
  {
    id: "lead_1",
    customerName: "Vimbi Kai",
    customerAddress: "SW1A 2AB • Downing Street, London",
    customerAvatar: "/assets/avatar.png",
    createdAtLabel: "5h ago",
    title: "Full garden renovation",
    summary: "Small garden / No groundworks or drainage / Apartment",
    budgetLabel: "Under $5000 / Urgent",
    status: "locked",
    priceLabel: "£10.00",
    highlights: ["Verified Phone", "Frequent User", "Urgent"],
    jobDetails: [
      { label: "Garden size?", value: "Small" },
      { label: "Does the project include groundworks or drainage?", value: "Yes" },
      { label: "Property type?", value: "House" },
      { label: "Approximate budget?", value: "House" },
      { label: "Timing?", value: "Urgent" },
    ],
    responsesCount: 0,
  },
  {
    id: "lead_2",
    customerName: "John Smith",
    customerAddress: "E1 6AN • Brick Lane, London",
    customerAvatar: "/assets/avatar.png",
    createdAtLabel: "6h ago",
    title: "Kitchen remodeling",
    summary: "Medium kitchen / New cabinets / House",
    budgetLabel: "$5000-$10000 / Normal",
    status: "locked",
    priceLabel: "£15.00",
    highlights: ["Verified Phone", "Frequent User"],
    jobDetails: [
      { label: "Kitchen size?", value: "Medium" },
      { label: "Does the project include plumbing?", value: "Yes" },
      { label: "Property type?", value: "House" },
      { label: "Approximate budget?", value: "$5000-$10000" },
      { label: "Timing?", value: "Normal" },
    ],
    responsesCount: 1,
  },
  {
    id: "lead_3",
    customerName: "Sarah Johnson",
    customerAddress: "NW1 6XE • Camden, London",
    customerAvatar: "/assets/avatar.png",
    createdAtLabel: "1d ago",
    title: "Bathroom installation",
    summary: "Small bathroom / Full renovation / Apartment",
    budgetLabel: "Under $3000 / Urgent",
    status: "locked",
    priceLabel: "£12.00",
    highlights: ["Verified Phone", "Urgent"],
    jobDetails: [
      { label: "Bathroom size?", value: "Small" },
      { label: "Does the project include tiling?", value: "Yes" },
      { label: "Property type?", value: "Apartment" },
      { label: "Approximate budget?", value: "Under $3000" },
      { label: "Timing?", value: "Urgent" },
    ],
    responsesCount: 2,
  },
  {
    id: "lead_4",
    customerName: "Michael Brown",
    customerAddress: "SW3 4RB • Chelsea, London",
    customerAvatar: "/assets/avatar.png",
    createdAtLabel: "2d ago",
    title: "Patio & paving installation",
    summary: "Large patio / Stone paving / House",
    budgetLabel: "$10000+ / Normal",
    status: "locked",
    priceLabel: "£20.00",
    highlights: ["Verified Phone", "Frequent User"],
    jobDetails: [
      { label: "Patio size?", value: "Large" },
      { label: "Does the project include drainage?", value: "Yes" },
      { label: "Property type?", value: "House" },
      { label: "Approximate budget?", value: "$10000+" },
      { label: "Timing?", value: "Normal" },
    ],
    responsesCount: 3,
  },
  {
    id: "lead_5",
    customerName: "Emma Wilson",
    customerAddress: "N1 9GU • Islington, London",
    customerAvatar: "/assets/avatar.png",
    createdAtLabel: "3h ago",
    title: "Roof repair",
    summary: "Tile replacement / Leak fix / House",
    budgetLabel: "$3000-$5000 / Urgent",
    status: "locked",
    priceLabel: "£18.00",
    highlights: ["Verified Phone", "Urgent"],
    jobDetails: [
      { label: "Roof type?", value: "Tiled" },
      { label: "Does the project include guttering?", value: "Yes" },
      { label: "Property type?", value: "House" },
      { label: "Approximate budget?", value: "$3000-$5000" },
      { label: "Timing?", value: "Urgent" },
    ],
    responsesCount: 0,
  },
  {
    id: "lead_6",
    customerName: "David Lee",
    customerAddress: "SE1 9RT • Southwark, London",
    customerAvatar: "/assets/avatar.png",
    createdAtLabel: "8h ago",
    title: "Electrical rewiring",
    summary: "Full house rewiring / Safety upgrade / House",
    budgetLabel: "$5000-$10000 / Normal",
    status: "locked",
    priceLabel: "£25.00",
    highlights: ["Verified Phone", "Frequent User"],
    jobDetails: [
      { label: "Property size?", value: "Medium" },
      { label: "Does the project include new consumer unit?", value: "Yes" },
      { label: "Property type?", value: "House" },
      { label: "Approximate budget?", value: "$5000-$10000" },
      { label: "Timing?", value: "Normal" },
    ],
    responsesCount: 1,
  },
];

export const reviewsMock: Review[] = Array.from({ length: 8 }).map((_, idx) => ({
  id: `review_${idx + 1}`,
  reviewerName: "Josh Peter",
  reviewerAvatar: "/assets/avatar.png",
  rating: 4,
  dateLabel: "5 February 2026",
  text: "I have used 263 Pros twice now for two completely different services and I've had a fantastic experience both times!",
}));

