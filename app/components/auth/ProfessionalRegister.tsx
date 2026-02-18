"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/ui/InputField";
import TextareaField from "@/app/components/ui/TextareaField";
import Button from "@/app/components/ui/Button";
import { CustomSelect } from "@/app/components/ui/CustomSelect";
import { Upload } from "lucide-react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  useUpdateMyProfileMutation,
  ProfessionalDocumentType,
} from "@/store/slice/myProfileSlice";
import { getImageUrl } from "@/app/components/ui/ImageURL";
import {
  useGetCategoriesQuery,
  useGetCategoriesServicesQuery,
} from "@/store/slice/categoriesSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import AuthLogo from "./AuthLogo";

export default function ProfessionalRefister() {
  return (
    <div className="bg-background shadow-sm p-4 lg:p-8 rounded-lg w-full max-w-[550px] border border-gray-200 mt-12 mb-12">
      <div className="border-b border-stroke mb-2">
        <AuthLogo />
      </div>
      <div className="flex flex-col  md:flex-row">
        {/* Right Column - Edit Form */}
        <div className="w-full flex-1 space-y-6 md:w-2/3 bg-background">
          <h1 className="text-[18px] font-medium text-primaryText md:text-[24px] text-center">
            Register as a Professional
          </h1>
          <AboutForm />
        </div>
      </div>
    </div>
  );
}

function AboutForm() {
  const router = useRouter();
  // professional is no longer needed since we're not fetching profile data

  // Fetch categories
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({});
  const categories = useMemo(
    () => (categoriesData as Array<{ _id: string; name: string }>) || [],
    [categoriesData],
  );

  // Initialize selected services as objectIds
  const initialSelectedServices = useMemo(() => {
    return [];
  }, []);

  const [businessName, setBusinessName] = useState("");
  const [businessImagePreview, setBusinessImagePreview] = useState<string>("");
  const [businessImageFile, setBusinessImageFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [serviceRadiusKm, setServiceRadiusKm] = useState("");
  const [postcode, setpostcode] = useState("");

  // Store selected services as objectIds
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>(
    initialSelectedServices,
  );

  // Initialize professionCategory - use first category if available, or empty string
  const [professionCategory, setProfessionCategory] = useState<string>("");

  const [phone, setPhone] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  // const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [documentType, setDocumentType] = useState<
    ProfessionalDocumentType | ""
  >("");

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
  const getServiceName = (serviceId: string) => {
    const service = availableServices.find((s) => s._id === serviceId);
    if (service) return service.name;
    return serviceId; // Fallback to ID if name not found
  };

  // Update professionCategory when categories are loaded (only once)
  // Using a ref to track initialization to avoid linter warnings
  useEffect(() => {
    // Keep professionCategory empty - user must select
  }, [categories]);

  const handleRemoveProfession = (serviceId: string) => {
    setSelectedProfessions((prev) => prev.filter((p) => p !== serviceId));
  };

  const handleAddProfession = (serviceId: string) => {
    if (!selectedProfessions.includes(serviceId)) {
      setSelectedProfessions((prev) => [...prev, serviceId]);
    }
  };

  // Reset selected services when category changes
  const handleCategoryChange = (categoryId: string) => {
    setProfessionCategory(categoryId);
    // Optionally clear selected services when category changes
    // setSelectedProfessions([]);
  };

  const handleSave = async () => {
    // Clear previous errors
    const newErrors: typeof errors = {};

    // Validate required fields
    if (!businessName.trim()) {
      newErrors.businessName = "Business Name is required";
    }
    if (!postcode.trim()) {
      newErrors.postcode = "Postcode is required";
    }
    if (!serviceRadiusKm.trim()) {
      newErrors.serviceRadiusKm = "Service radius is required";
    }
    if (!professionCategory.trim()) {
      newErrors.professionCategory = "Please select a profession category";
    }
    if (selectedProfessions.length === 0) {
      newErrors.selectedProfessions = "Please select at least one profession";
    }
    if (!documentType) {
      newErrors.documentType = "Please select a document type";
    }
    if (!documentFile) {
      newErrors.documentFile = "Please upload a document";
    }

    // If there are errors, show them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    setErrors({});

    try {
      await updateMyProfile({
        businessName,
        serviceRadiusKm,
        documentType: documentType || undefined,
        address: officeAddress,
        postcode: postcode,
        services: selectedProfessions,
        phone,
        // email,
        website,
        about,
        businessImageFile: businessImageFile ?? undefined,
        verificationDocumentFile: documentFile ?? undefined,
      }).unwrap();

      toast.success("Profile updated successfully");

      // Check if token exists, if yes, user is already logged in - redirect to home
      const authToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (authToken) {
        router.push("/trade-person");
      } else {
        // No token, redirect to login
        router.push("/login");
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || error?.message || "Failed to update profile";
      toast.error(errorMessage);
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

  const handleServiceRadiusChange = (value: string) => {
    // Only allow non-negative numbers
    if (value === "") {
      setServiceRadiusKm("");
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setServiceRadiusKm(value);
      }
    }
  };

  return (
    <div className="max-w-2xl border rounded-sm p-4">
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
          <div>
            <InputField
              title="Business Name"
              placeholder="Enter business name"
              initialValue={businessName}
              onChange={(val) => {
                setBusinessName(val);
                if (errors.businessName) {
                  setErrors({ ...errors, businessName: undefined });
                }
              }}
              required
            />
            {errors.businessName && (
              <p className="text-red-500 text-[14px]">
                {errors.businessName}
              </p>
            )}
          </div>
          <div>
            <InputField
              title="postcode"
              placeholder="Enter postcode"
              initialValue={postcode}
              onChange={(val) => {
                setpostcode(val);
                if (errors.postcode) {
                  setErrors({ ...errors, postcode: undefined });
                }
              }}
              required
            />
            {errors.postcode && (
              <p className="text-red-500 text-[14px]">
                {errors.postcode}
              </p>
            )}
          </div>
          <div>
            <InputField
              title="Service radius (km)"
              placeholder="Enter service radius (km)"
              type="number"
              initialValue={serviceRadiusKm}
              onChange={(val) => {
                handleServiceRadiusChange(val);
                if (errors.serviceRadiusKm) {
                  setErrors({ ...errors, serviceRadiusKm: undefined });
                }
              }}
              required
            />
            {errors.serviceRadiusKm && (
              <p className="text-red-500 text-[14px]">
                {errors.serviceRadiusKm}
              </p>
            )}
          </div>
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
                  handleAddProfession(value);
                  if (errors.selectedProfessions) {
                    setErrors({ ...errors, selectedProfessions: undefined });
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
          <p className="text-red-500 text-[14px] mt-2">{errors.documentFile}</p>
        )}
      </div>

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
          {/* <InputField
            title="Email"
            placeholder="Enter email"
            initialValue={email}
            onChange={setEmail}
            type="email"
          /> */}
          <InputField
            title="Website (Optional)"
            placeholder="Enter web address"
            initialValue={website}
            onChange={setWebsite}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8">
        <Button
          fullWidth
          variant="primary"
          onClick={handleSave}
          loading={isUpdating}
        >
          {isUpdating ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}
