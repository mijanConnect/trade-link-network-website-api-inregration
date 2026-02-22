"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import TradePersonProfileCard from "@/app/components/trade-person/TradePersonProfileCard";
import InputField from "@/app/components/ui/InputField";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import TextareaField from "@/app/components/ui/TextareaField";
import Button from "@/app/components/ui/Button";
import { Upload } from "lucide-react";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  ProfessionalDocumentType,
} from "@/store/slice/myProfileSlice";
import type { MyProfileUser } from "@/store/slice/myProfileSlice";
import { getImageUrl } from "@/app/components/ui/ImageURL";
import {
  useGetCategoriesQuery,
  useGetCategoriesServicesQuery,
} from "@/store/slice/categoriesSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { CustomSelect } from "@/app/components/ui/CustomSelect";

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
        <TradePersonProfileCard />
      </aside>

      {/* Right Column - Edit Form */}
      <div className="w-full flex-1 space-y-6 md:w-2/3 bg-background p-4 lg:p-12 ">
        <h1 className="text-2xl font-bold text-primaryText md:text-[32px]">
          About
        </h1>
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

  // Fetch categories
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({});
  const categories = useMemo(
    () => (categoriesData as Array<{ _id: string; name: string }>) || [],
    [categoriesData],
  );

  // Initialize selected services as objectIds
  const initialSelectedServices = useMemo(() => {
    if (!Array.isArray(professional?.services)) return [];
    return professional.services
      .map((s: string | { _id: string; name: string }) =>
        typeof s === "string" ? s : (s?._id ?? ""),
      )
      .filter(Boolean);
  }, [professional]);

  const [businessName, setBusinessName] = useState(
    professional?.businessName ?? "",
  );
  const initialImageUrl = getImageUrl(professional?.businessImage);
  const [businessImagePreview, setBusinessImagePreview] =
    useState<string>(initialImageUrl);
  const [businessImageFile, setBusinessImageFile] = useState<File | null>(null);
  const [serviceRadiusKm, setServiceRadiusKm] = useState(
    professional?.serviceRadiusKm !== undefined &&
      professional?.serviceRadiusKm !== null
      ? String(professional.serviceRadiusKm)
      : "",
  );
  const [postcode, setpostcode] = useState(professional?.postcode ?? "");

  const [documentType, setDocumentType] = useState<
    ProfessionalDocumentType | ""
  >("");

  // Store selected services as objectIds
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>(
    initialSelectedServices,
  );

  // Initialize professionCategory - use first category if available, or empty string
  const [professionCategory, setProfessionCategory] = useState<string>("");
  const categoryInitialized = useRef(false);

  const [phone, setPhone] = useState(user.phone ?? "");
  const [officeAddress, setOfficeAddress] = useState(
    professional?.address ?? "",
  );
  const [website, setWebsite] = useState(professional?.website ?? "");
  const [about, setAbout] = useState(professional?.about ?? "");
  // const [documentType] = useState<ProfessionalDocumentType | "">(
  //   professional?.verificationDocuments?.[0]?.documentType ?? "",
  // );
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const [updateMyProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();

  // Fetch services for selected category
  const { data: servicesData, isLoading: isServicesLoading } =
    useGetCategoriesServicesQuery(
      professionCategory ? professionCategory : skipToken,
    );
  const availableServices =
    (servicesData as Array<{ _id: string; name: string }>) || [];

  // Create profession options from categories
  const professionOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat._id,
  }));

  // Get service names for display from selected objectIds
  // This will try to find the service in availableServices, or return a fallback
  const getServiceName = (serviceId: string) => {
    const service = availableServices.find((s) => s._id === serviceId);
    if (service) return service.name;
    // If service not found in current category, check if it's in professional data
    if (professional?.services) {
      const existingService = professional.services.find(
        (s: string | { _id: string; name: string }) =>
          (typeof s === "string" ? s : s?._id) === serviceId,
      );
      if (existingService && typeof existingService === "object") {
        return existingService.name || serviceId;
      }
    }
    return serviceId; // Fallback to ID if name not found
  };

  // Update professionCategory when categories are loaded (only once)
  // Using a ref to track initialization to avoid linter warnings
  useEffect(() => {
    if (categories.length > 0 && !categoryInitialized.current) {
      categoryInitialized.current = true;
      // Use requestAnimationFrame to defer state update
      requestAnimationFrame(() => {
        setProfessionCategory(categories[0]._id);
      });
    }
  }, [categories]);

  const handleRemoveProfession = (serviceId: string) => {
    setSelectedProfessions((prev) => prev.filter((p) => p !== serviceId));
  };

  const handleAddProfession = (serviceId: string | null) => {
    if (!serviceId) return;
    setSelectedProfessions((prev) => {
      if (!prev.includes(serviceId)) {
        return [...prev, serviceId];
      }
      return prev;
    });
  };

  // Reset selected services when category changes
  const handleCategoryChange = (categoryId: string) => {
    setProfessionCategory(categoryId);
    // Optionally clear selected services when category changes
    // setSelectedProfessions([]);
  };

  // State to control select dropdown reset
  // const [selectKey, setSelectKey] = useState(0);

  // const handleAddProfessionWithReset = (serviceId: string) => {
  //   handleAddProfession(serviceId);
  //   // Reset select dropdown
  //   setSelectKey((prev) => prev + 1);
  // };

  // Error states
  const [errors, setErrors] = useState<{
    businessName?: string;
    postcode?: string;
    serviceRadiusKm?: string;
    professionCategory?: string;
    selectedProfessions?: string;
    documentType?: string;
    documentFile?: string;
  }>({});

  const handleSave = async () => {
    try {
      await updateMyProfile({
        businessName,
        serviceRadiusKm,
        documentType: documentType || undefined,
        address: officeAddress,
        postcode: postcode,
        services: Array.isArray(selectedProfessions) ? selectedProfessions : [],
        phone,
        website,
        about,
        businessImageFile: businessImageFile ?? undefined,
        verificationDocumentFile: documentFile ?? undefined,
      }).unwrap();

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setBusinessImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setBusinessImagePreview(previewUrl);
  };

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setDocumentFile(file);
  };

  return (
    <div className="max-w-2xl border rounded-sm p-4 lg:p-8">
      {/* Business Photos */}
      <div className="rounded-sm">
        <h2 className="mb-2 text-[20px] font-semibold text-primaryText">
          Add your business photos
        </h2>
        <label className="flex h-[200px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white hover:bg-slate-50">
          {businessImagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={getImageUrl(businessImagePreview)}
              alt="Business"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-center">
              <Upload size={32} className="mx-auto text-slate-400" />
              <p className="mt-2 text-[14px] text-slate-600">
                Click to upload image
              </p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>

      {/* Profile Details */}
      <div className="rounded-sm mt-6">
        <h2 className="mb-2 text-[20px] font-semibold text-primaryText">
          Profile Details
        </h2>
        <div className="space-y-4">
          <InputField
            title="Business Name"
            placeholder="Enter business name"
            initialValue={businessName}
            onChange={setBusinessName}
          />
          <InputField
            title="Postcode"
            placeholder="Enter postcode"
            initialValue={postcode}
            onChange={setpostcode}
          />
          <InputField
            title="Service radius (km)"
            placeholder="Enter service radius (km)"
            type="number"
            initialValue={serviceRadiusKm}
            onChange={setServiceRadiusKm}
          />
          <div>
            <div className="block text-[14px] lg:text-[16px] font-medium text-primaryText mb-1">
              Select profession category <span className="text-red-500">*</span>
            </div>
            <CustomSelect
              value={professionCategory}
              options={professionOptions}
              onChange={(val) => {
                handleCategoryChange(val);
                if (errors.professionCategory) {
                  setErrors({ ...errors, professionCategory: undefined });
                }
              }}
              disabled={isCategoriesLoading}
              required
              placeholder={
                isCategoriesLoading
                  ? "Loading categories..."
                  : "Select category"
              }
            />
            {errors.professionCategory && (
              <p className="text-red-500 text-[14px]">
                {errors.professionCategory}
              </p>
            )}
          </div>
          <div>
            <div className="block text-[14px] lg:text-[16px] font-medium text-primaryText">
              Select profession
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedProfessions.map((serviceId) => (
                <span
                  key={serviceId}
                  className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-[13px] text-primary"
                >
                  {getServiceName(serviceId)}
                  <button
                    type="button"
                    onClick={() => handleRemoveProfession(serviceId)}
                    className="hover:text-primary/70"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {isServicesLoading ? (
              <div className="mt-2 text-sm text-slate-500">
                Loading services...
              </div>
            ) : (
              <CustomSelect
                placeholder={
                  !professionCategory
                    ? "Select a category first..."
                    : "Select profession..."
                }
                options={availableServices
                  .filter((s) => !selectedProfessions.includes(s._id))
                  .map((service) => ({
                    label: service.name,
                    value: service._id,
                  }))}
                value={null}
                onChange={(value) => {
                  if (value) {
                    handleAddProfession(value);
                    if (errors.selectedProfessions) {
                      setErrors({ ...errors, selectedProfessions: undefined });
                    }
                  }
                }}
                disabled={!professionCategory || availableServices.length === 0}
              />
            )}
            {errors.selectedProfessions && (
              <p className="text-red-500 text-[14px]">
                {errors.selectedProfessions}
              </p>
            )}
          </div>
          <TextareaField
            title="About"
            initialValue={about}
            onChange={setAbout}
            rows={6}
            placeholder="Tell us about your business..."
          />
        </div>
      </div>

      {/* Documents */}
      {(!user.isProfileCompleted || !user.hasDocuments) && (
        <div className="rounded-sm mt-6">
          <h2 className="mb-2 text-[20px] font-semibold text-primaryText">
            Add your business/personal documents
          </h2>
          <div className="block text-[14px] lg:text-[16px] font-medium text-primaryText mb-1">
            Select document type <span className="text-red-500">*</span>
          </div>
          <CustomSelect
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
            onChange={(value) => {
              setDocumentType(value as ProfessionalDocumentType);
              if (errors.documentType) {
                setErrors({ ...errors, documentType: undefined });
              }
            }}
          />
          {errors.documentType && (
            <p className="text-red-500 text-[14px]">{errors.documentType}</p>
          )}
          <label
            className={`mt-4 flex h-[150px] items-center justify-center rounded-lg border-2 border-dashed transition-all ${
              errors.documentFile
                ? "border-red-500 bg-red-50"
                : documentType
                  ? "border-slate-300 bg-white hover:bg-slate-50 cursor-pointer"
                  : "border-gray-200 bg-gray-50 cursor-not-allowed"
            }`}
          >
            <div className="text-center">
              <Upload
                size={32}
                className={`mx-auto ${
                  errors.documentFile
                    ? "text-red-400"
                    : documentType
                      ? "text-slate-400"
                      : "text-gray-300"
                }`}
              />
              <p
                className={`mt-2 text-[14px] ${
                  errors.documentFile
                    ? "text-red-600"
                    : documentType
                      ? "text-slate-600"
                      : "text-gray-400"
                }`}
              >
                {documentFile ? documentFile.name : "Upload document"}
              </p>
              {!documentType && (
                <p className="mt-1 text-[12px] text-gray-400">
                  Select document type first
                </p>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              onChange={(event) => {
                handleDocumentChange(event);
                if (errors.documentFile) {
                  setErrors({ ...errors, documentFile: undefined });
                }
              }}
              disabled={!documentType}
              accept=".pdf"
            />
          </label>
          {errors.documentFile && (
            <p className="text-red-500 text-[14px] mt-2">
              {errors.documentFile}
            </p>
          )}
        </div>
      )}

      {/* Contact */}
      <div className="rounded-sm mt-6">
        <h2 className="mb-2 text-[20px] font-semibold text-primaryText">
          Contact
        </h2>
        <div className="space-y-4">
          <div>
            <p className="mb-2">Phone Number</p>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              countries={["GB"]}
              defaultCountry="GB"
              value={phone}
              onChange={(value) => setPhone(value || "")}
              placeholder="Enter your phone number"
              className="phone-input-no-focus"
              style={{
                height: 58,
                border: "1px solid #1f2933",
                borderRadius: "6px",
                paddingLeft: "12px",
                fontSize: "16px",
                fontFamily: "inherit",
              }}
            />
          </div>
          <InputField
            title="Office address"
            placeholder="Enter office address"
            initialValue={officeAddress}
            onChange={setOfficeAddress}
          />
          <InputField
            title="Website (Optional)"
            placeholder="Enter web address"
            initialValue={website}
            onChange={setWebsite}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 lg:mt-8">
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
