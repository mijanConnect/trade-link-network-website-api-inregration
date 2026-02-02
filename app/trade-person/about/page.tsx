"use client";

import { useState } from "react";
import TradePersonProfileCard from "@/app/components/trade-person/TradePersonProfileCard";
import TradePersonPanel from "@/app/components/trade-person/TradePersonPanel";
import InputField from "@/app/components/ui/InputField";
import SelectField from "@/app/components/ui/SelectField";
import Button from "@/app/components/ui/Button";
import { tradePersonProfile } from "@/lib/trade-person/mock";
import { Upload } from "lucide-react";

export default function AboutPage() {
  const [businessName, setBusinessName] = useState("ABC Company");
  const [postcode, setPostcode] = useState("EM22");
  const [professionCategory, setProfessionCategory] = useState("outdoor");
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([
    "Full garden renovation",
    "Garden redesign / makeover",
  ]);
  const [phone, setPhone] = useState("123456789");
  const [officeAddress, setOfficeAddress] = useState("12 Street, London");
  const [email, setEmail] = useState("exmample.email@gmail.com");
  const [website, setWebsite] = useState("website.com");

  const professionOptions = [
    { label: "Outdoor & Landscaping", value: "outdoor" },
    { label: "Plumbing", value: "plumbing" },
    { label: "Electrical", value: "electrical" },
  ];

  const availableProfessions = [
    "Full garden renovation",
    "Patios & paving",
    "Garden redesign / makeover",
    "Lawn care",
    "Tree services",
  ];

  const handleRemoveProfession = (prof: string) => {
    setSelectedProfessions((prev) => prev.filter((p) => p !== prof));
  };

  const handleAddProfession = (prof: string) => {
    if (!selectedProfessions.includes(prof)) {
      setSelectedProfessions((prev) => [...prev, prof]);
    }
  };

  return (
    <div className="flex flex-col  md:flex-row">
      {/* Left Column - Profile Card */}
      <aside className="w-full md:w-1/3  container mx-auto">
        <TradePersonProfileCard profile={tradePersonProfile} />
      </aside>

      {/* Right Column - Edit Form */}
      <div className="w-full flex-1 space-y-6 md:w-2/3 bg-background p-12 ">
        <h1 className="text-2xl font-bold text-primaryText md:text-[32px]">About</h1>

        <div className="max-w-2xl border rounded-sm p-4">
          {/* Business Photos */}
          <div className="rounded-sm   p-4">
            <h2 className="text-[14px] font-semibold text-primaryText mb-4">Add your business photos</h2>
            <div className="flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-slate-300 ">
              <div className="text-center">
                <Upload size={32} className="mx-auto text-slate-400" />
                <p className="mt-2 text-[14px] text-slate-600">Upload Image</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="rounded-sm   p-4">
            <h2 className="text-[14px] font-semibold text-primaryText mb-4">Profile Details</h2>
            <div className="space-y-4">
              <InputField
                title="Business Name"
                initialValue={businessName}
                onChange={setBusinessName}
              />
              <InputField title="Postcode" initialValue={postcode} onChange={setPostcode} />
              <SelectField
                title="Select profession category"
                value={professionCategory}
                options={professionOptions}
                onChange={(e) => setProfessionCategory(e.target.value)}
              />
              <div>
                <label className="text-[16px] font-semibold text-primaryText">
                  Select profession
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedProfessions.map((prof) => (
                    <span
                      key={prof}
                      className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-[13px] text-primary"
                    >
                      {prof}
                      <button
                        type="button"
                        onClick={() => handleRemoveProfession(prof)}
                        className="hover:text-primary/70"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <select
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-[14px]"
                  onChange={(e) => {
                    if (e.target.value) handleAddProfession(e.target.value);
                  }}
                  defaultValue=""
                >
                  <option value="">Select profession...</option>
                  {availableProfessions
                    .filter((p) => !selectedProfessions.includes(p))
                    .map((prof) => (
                      <option key={prof} value={prof}>
                        {prof}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="rounded-sm   p-4">
            <h2 className="text-[14px] font-semibold text-primaryText mb-4">Add your business/personal documents</h2>
            <div className="flex h-[150px] items-center justify-center rounded-lg border-2 border-dashed border-slate-300 ">
              <div className="text-center">
                <Upload size={32} className="mx-auto text-slate-400" />
                <p className="mt-2 text-[14px] text-slate-600">Upload documents</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-sm   p-4">
            <h2 className="text-[14px] font-semibold text-primaryText mb-4">Contact</h2>
            <div className="space-y-4">
              <InputField title="Phone number" initialValue={phone} onChange={setPhone} type="tel" />
              <InputField
                title="Office address"
                initialValue={officeAddress}
                onChange={setOfficeAddress}
              />
              <InputField title="Email" initialValue={email} onChange={setEmail} type="email" />
              <InputField
                title="Website (Optional)"
                initialValue={website}
                onChange={setWebsite}
              />
            </div>
          </div>

          {/* Save Button */}
          <div>
            <Button variant="primary" size="lg" fullWidth>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
