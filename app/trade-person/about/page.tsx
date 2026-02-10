 "use client";

import { useState } from "react";
import TradePersonProfileCard from "@/app/components/trade-person/TradePersonProfileCard";
import InputField from "@/app/components/ui/InputField";
import SelectField from "@/app/components/ui/SelectField";
import Button from "@/app/components/ui/Button";
import { tradePersonProfile } from "@/lib/trade-person/mock";
import { Upload } from "lucide-react";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  ProfessionalDocumentType,
} from "@/store/slice/myProfileSlice";
import type { MyProfileUser } from "@/store/slice/myProfileSlice";

export default function AboutPage() {
  const { data: profileData, isLoading } = useGetMyProfileQuery();

  if (isLoading || !profileData?.data) {
    return (
      <div className="flex h-[calc(100vh-120px)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col  md:flex-row">
      {/* Left Column - Profile Card */}
      <aside className="w-full md:w-1/3  container mx-auto">
        <TradePersonProfileCard profile={tradePersonProfile} />
      </aside>

      {/* Right Column - Edit Form */}
      <div className="w-full flex-1 space-y-6 md:w-2/3 bg-background p-12 ">
        <h1 className="text-2xl font-bold text-primaryText md:text-[32px]">About</h1>
        <AboutForm user={profileData.data} />
      </div>
    </div>
  );
}

type AboutFormProps = {
  user: MyProfileUser;
};

function AboutForm({ user }: AboutFormProps) {
  const professional = user.professional;

  const [businessName, setBusinessName] = useState(
    professional?.businessName ?? "",
  );
  const [businessImage, setBusinessImage] = useState(
    professional?.businessImage ?? "",
  );
  const [serviceRadiusKm, setServiceRadiusKm] = useState(
    professional?.serviceRadiusKm !== undefined &&
      professional?.serviceRadiusKm !== null
      ? String(professional.serviceRadiusKm)
      : "",
  );
  const [postcode, setPostcode] = useState(professional?.postCode ?? "");
  const [professionCategory, setProfessionCategory] = useState("outdoor");
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>(
    Array.isArray(professional?.services)
      ? professional.services.map(String)
      : [],
  );
  const [phone, setPhone] = useState(user.phone ?? "");
  const [officeAddress, setOfficeAddress] = useState(
    professional?.address ?? "",
  );
  const [email, setEmail] = useState(user.email ?? "");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState(professional?.about ?? "");
  const [documentType, setDocumentType] = useState<
    ProfessionalDocumentType | ""
  >(professional?.verificationDocuments?.[0]?.documentType ?? "");

  const [updateMyProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();

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

  const handleSave = async () => {
    try {
      await updateMyProfile({
        businessName,
        businessImage,
        serviceRadiusKm,
        documentType: documentType || undefined,
        address: officeAddress,
        postCode: postcode,
        services: selectedProfessions,
        phone,
        about,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <div className="max-w-2xl border rounded-sm p-4">
      {/* Business Photos */}
      <div className="rounded-sm p-4">
        <h2 className="mb-4 text-[14px] font-semibold text-primaryText">
          Add your business photos
        </h2>
        <div className="flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-slate-300">
          <div className="text-center">
            <Upload size={32} className="mx-auto text-slate-400" />
            <p className="mt-2 text-[14px] text-slate-600">Upload Image</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="rounded-sm p-4">
        <h2 className="mb-4 text-[14px] font-semibold text-primaryText">
          Profile Details
        </h2>
        <div className="space-y-4">
          <InputField
            title="Business Name"
            initialValue={businessName}
            onChange={setBusinessName}
          />
          <InputField
            title="Postcode"
            initialValue={postcode}
            onChange={setPostcode}
          />
          <InputField
            title="Service radius (km)"
            type="number"
            initialValue={serviceRadiusKm}
            onChange={setServiceRadiusKm}
          />
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
          <InputField title="About" initialValue={about} onChange={setAbout} />
        </div>
      </div>

      {/* Documents */}
      <div className="rounded-sm p-4">
        <h2 className="mb-4 text-[14px] font-semibold text-primaryText">
          Add your business/personal documents
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex h-[150px] items-center justify-center rounded-lg border-2 border-dashed border-slate-300">
            <div className="text-center">
              <Upload size={32} className="mx-auto text-slate-400" />
              <p className="mt-2 text-[14px] text-slate-600">
                Upload documents
              </p>
            </div>
          </div>
          <SelectField
            title="Document type"
            value={documentType}
            options={[
              {
                label: "Driving licence",
                value: ProfessionalDocumentType.DRIVING_LICENSE,
              },
              {
                label: "Passport",
                value: ProfessionalDocumentType.PASSPORT,
              },
              {
                label: "Insurance",
                value: ProfessionalDocumentType.INSURANCE,
              },
            ]}
            onChange={(e) =>
              setDocumentType(e.target.value as ProfessionalDocumentType)
            }
          />
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-sm p-4">
        <h2 className="mb-4 text-[14px] font-semibold text-primaryText">
          Contact
        </h2>
        <div className="space-y-4">
          <InputField
            title="Phone number"
            initialValue={phone}
            onChange={setPhone}
            type="tel"
          />
          <InputField
            title="Office address"
            initialValue={officeAddress}
            onChange={setOfficeAddress}
          />
          <InputField
            title="Email"
            initialValue={email}
            onChange={setEmail}
            type="email"
          />
          <InputField
            title="Website (Optional)"
            initialValue={website}
            onChange={setWebsite}
          />
        </div>
      </div>

      {/* Save Button */}
      <div>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={isUpdating}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
