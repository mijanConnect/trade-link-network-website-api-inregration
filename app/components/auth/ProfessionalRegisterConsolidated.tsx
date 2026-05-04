"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/ui/InputField";
import TextareaField from "@/app/components/ui/TextareaField";
import Button from "@/app/components/ui/Button";
import { CustomSelect } from "@/app/components/ui/CustomSelect";
import { Upload } from "lucide-react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  useGetCategoriesQuery,
  useGetCategoriesServicesQuery,
} from "@/store/slice/categoriesSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { ProfessionalDocumentType } from "@/store/slice/myProfileSlice";
import AuthLogo from "./AuthLogo";
import AuthLoginDescription from "./AuthLoginDescription";

export default function ProfessionalRegisterConsolidated() {
  return (
    <div className="bg-background shadow-sm p-4 lg:p-8 rounded-lg w-full max-w-5xl border border-gray-200 mt-12 mb-12 mx-auto">
      <div className="border-b border-stroke mb-6">
        <AuthLogo />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full flex-1 space-y-6 bg-background">
          <h1 className="text-[18px] font-medium text-primaryText md:text-[24px] text-center">
            Register as a Professional
          </h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

function RegisterForm() {
  const router = useRouter();

  // Fetch categories
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({});
  const categories = useMemo(() => {
    if (Array.isArray(categoriesData)) return categoriesData;
    return [];
  }, [categoriesData]);

  // ============ Signup Fields ============
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ============ Professional Profile Fields ============
  const [businessName, setBusinessName] = useState("");
  const [businessImagePreview, setBusinessImagePreview] = useState<string>("");
  const [businessImageFile, setBusinessImageFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [serviceRadiusKm, setServiceRadiusKm] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [documentType, setDocumentType] = useState<
    ProfessionalDocumentType | ""
  >("");

  // ============ Services & Categories ============
  const [professionCategory, setProfessionCategory] = useState<string>("");
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [userAddedServiceNames, setUserAddedServiceNames] = useState<
    Record<string, string>
  >({});

  // ============ Error States ============
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    businessName?: string;
    postcode?: string;
    serviceRadiusKm?: string;
    professionCategory?: string;
    selectedProfessions?: string;
    documentType?: string;
    documentFile?: string;
    general?: string;
  }>({});

  // Fetch services for selected category
  const { data: servicesData, isLoading: isServicesLoading } =
    useGetCategoriesServicesQuery(
      professionCategory ? professionCategory : skipToken,
    );
  const availableServices = useMemo(() => {
    if (Array.isArray(servicesData)) return servicesData;
    return [];
  }, [servicesData]);

  // Create profession options from categories
  const professionOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat._id,
  }));

  // Merged id->name map for display
  const serviceIdToNameMap = useMemo(() => {
    const map: Record<string, string> = { ...userAddedServiceNames };
    if (Array.isArray(availableServices)) {
      availableServices.forEach((s) => {
        map[s._id] = s.name;
      });
    }
    return map;
  }, [availableServices, userAddedServiceNames]);

  const getServiceName = (serviceId: string) =>
    serviceIdToNameMap[serviceId] ?? serviceId;

  // ============ Handlers ============
  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must include at least 1 uppercase letter";
    }
    if (!/[a-z]/.test(pwd)) {
      return "Password must include at least 1 lowercase letter";
    }
    if (!/[0-9]/.test(pwd)) {
      return "Password must include at least 1 number";
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
      return "Password must include at least 1 special character";
    }
    return null;
  };

  const handleRemoveProfession = (serviceId: string) => {
    setSelectedProfessions((prev) => prev.filter((p) => p !== serviceId));
  };

  const handleAddProfession = (serviceId: string | null) => {
    if (!serviceId) return;
    const service = availableServices.find((s) => s._id === serviceId);
    if (service) {
      setUserAddedServiceNames((prev) => ({
        ...prev,
        [serviceId]: service.name,
      }));
    }
    setSelectedProfessions((prev) => {
      if (!prev.includes(serviceId)) {
        return [...prev, serviceId];
      }
      return prev;
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    setProfessionCategory(categoryId);
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
    if (value === "") {
      setServiceRadiusKm("");
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setServiceRadiusKm(value);
      }
    }
  };

  const handleRegister = async () => {
    const newErrors: typeof errors = {};

    // ============ Validate Signup Fields ============
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else {
      const pwdError = validatePassword(password);
      if (pwdError) {
        newErrors.password = pwdError;
      }
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // ============ Validate Professional Fields ============
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    setErrors({});

    try {
      // Create FormData for multipart submission
      const formData = new FormData();

      // Signup fields as text
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      // Professional fields as text
      formData.append("phone", phone);
      formData.append("businessName", businessName);
      formData.append("services", JSON.stringify(selectedProfessions));
      formData.append("serviceRadiusKm", serviceRadiusKm);
      formData.append("postcode", postcode);
      formData.append("address", address);
      formData.append("documentType", documentType);
      formData.append("about", about);
      formData.append("website", website);

      // Files
      if (businessImageFile) {
        formData.append("businessImage", businessImageFile);
      }
      if (documentFile) {
        formData.append("doc", documentFile);
      }

      // Send to backend
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      const response = await fetch(`${baseUrl}/professionals/register`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to register. Please try again.",
        );
      }

      const data = await response.json();

      toast.success("Registration successful! Please verify your email.");

      if (typeof window !== "undefined") {
        localStorage.setItem("otpContext", "signup");
        localStorage.setItem("signupEmail", email);
      }

      router.push("/verify-register-otp");
    } catch (error: unknown) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "Failed to register. Please try again.";
      setErrors({ general: errorMessage });
      toast.error(errorMessage);
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="max-w-4xl border rounded-sm p-4 space-y-6 mx-auto">
      {/* ============ SIGNUP SECTION ============ */}
      <div className="rounded-sm">
        <h2 className="mb-4 text-[18px] font-semibold text-primaryText">
          Account Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <InputField
              title="Full Name"
              type="text"
              placeholder="Enter your full name"
              initialValue={name}
              onChange={(value) => {
                setName(value);
                if (errors.name) {
                  setErrors({ ...errors, name: undefined });
                }
              }}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-[14px] mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <InputField
              title="Email"
              type="email"
              placeholder="Enter your email"
              initialValue={email}
              onChange={(value) => {
                setEmail(value);
                if (errors.email) {
                  setErrors({ ...errors, email: undefined });
                }
              }}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-[14px] mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <InputField
              title="Password"
              type="password"
              placeholder="Enter your password"
              initialValue={password}
              onChange={(value) => {
                setPassword(value);
                if (errors.password) {
                  setErrors({ ...errors, password: undefined });
                }
                const validation = validatePassword(value);
                setPasswordError(validation || "");
              }}
              required
            />
            {passwordError && (
              <p className="text-red-600 text-[12px] mt-1">{passwordError}</p>
            )}
            {errors.password && (
              <p className="text-red-500 text-[14px] mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <InputField
              title="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              initialValue={confirmPassword}
              onChange={(value) => {
                setConfirmPassword(value);
                if (errors.confirmPassword) {
                  setErrors({ ...errors, confirmPassword: undefined });
                }
              }}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-[14px] mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ============ CONTACT SECTION ============ */}
      <div className="rounded-sm">
        <h2 className="mb-4 text-[18px] font-semibold text-primaryText">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-2 font-medium text-primaryText">
              Phone Number <span className="text-red-500">*</span>
            </p>
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
                height: 50,
                border: "1px solid #1f2933",
                borderRadius: "6px",
                paddingLeft: "12px",
                fontSize: "16px",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div>
            <InputField
              title="Office Address"
              placeholder="Enter your office address"
              initialValue={address}
              onChange={setAddress}
            />
          </div>

          <div className="md:col-span-2">
            <InputField
              title="Website (Optional)"
              placeholder="Enter your website"
              initialValue={website}
              onChange={setWebsite}
            />
          </div>
        </div>
      </div>

      {/* ============ BUSINESS INFORMATION SECTION ============ */}
      <div className="rounded-sm">
        <h2 className="mb-4 text-[18px] font-semibold text-primaryText">
          Business Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <InputField
              title="Business Name"
              placeholder="Enter your business name"
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
              <p className="text-red-500 text-[14px] mt-1">
                {errors.businessName}
              </p>
            )}
          </div>

          <div>
            <InputField
              title="Postcode"
              placeholder="Enter your postcode"
              initialValue={postcode}
              onChange={(val) => {
                setPostcode(val);
                if (errors.postcode) {
                  setErrors({ ...errors, postcode: undefined });
                }
              }}
              required
            />
            {errors.postcode && (
              <p className="text-red-500 text-[14px] mt-1">{errors.postcode}</p>
            )}
          </div>

          <div>
            <InputField
              title="Service Radius (km)"
              placeholder="Enter service radius in kilometers"
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
              <p className="text-red-500 text-[14px] mt-1">
                {errors.serviceRadiusKm}
              </p>
            )}
          </div>

          <div>
            <div className="block text-[14px] lg:text-[16px] font-medium text-primaryText mb-1">
              Profession Category <span className="text-red-500">*</span>
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
              <p className="text-red-500 text-[14px] mt-1">
                {errors.professionCategory}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <div className="block text-[14px] lg:text-[16px] font-medium text-primaryText mb-2">
              Professions <span className="text-red-500">*</span>
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
                      setErrors({
                        ...errors,
                        selectedProfessions: undefined,
                      });
                    }
                  }
                }}
                disabled={!professionCategory || availableServices.length === 0}
              />
            )}
            {errors.selectedProfessions && (
              <p className="text-red-500 text-[14px] mt-2">
                {errors.selectedProfessions}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <TextareaField
              title="About Your Business"
              initialValue={about}
              onChange={setAbout}
              rows={6}
              placeholder="Tell us about your business..."
            />
          </div>
        </div>
      </div>

      {/* ============ MEDIA SECTION ============ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Business Photo */}
        <div className="rounded-sm">
          <h2 className="mb-2 text-[18px] font-medium text-primaryText">
            Business Photo
          </h2>
          <label className="flex h-[299px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white hover:bg-slate-50">
            {businessImagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={businessImagePreview}
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

        {/* Document Upload */}
        <div className="rounded-sm">
          <h2 className="mb-2 text-[18px] font-medium text-primaryText">
            Verification Document
          </h2>
          <p className="text-[11px] text-gray-500 mb-3">
            Only PDF, JPG, JPEG, PNG files accepted
          </p>
          <div className="space-y-3">
            <div>
              <div className="block text-[14px] lg:text-[16px] font-medium text-primaryText mb-1">
                Document Type <span className="text-red-500">*</span>
              </div>
              <CustomSelect
                dropdownLayout="overlay"
                value={documentType}
                options={[
                  { label: "Driving Licence", value: "DRIVING_LICENSE" },
                  { label: "Passport", value: "PASSPORT" },
                  { label: "Insurance", value: "INSURANCE" },
                ]}
                onChange={(value) => {
                  setDocumentType(value as ProfessionalDocumentType);
                  if (errors.documentType) {
                    setErrors({ ...errors, documentType: undefined });
                  }
                }}
              />
              {errors.documentType && (
                <p className="text-red-500 text-[14px] mt-1">
                  {errors.documentType}
                </p>
              )}
            </div>
            <label
              className={`flex h-[180px] items-center justify-center rounded-lg border-2 border-dashed transition-all ${
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
                accept=".pdf, .jpg, .jpeg, .png, .heic, .heif"
              />
            </label>
            {errors.documentFile && (
              <p className="text-red-500 text-[14px]">{errors.documentFile}</p>
            )}
          </div>
        </div>
      </div>

      {/* ============ ERROR MESSAGE ============ */}
      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-[14px]">
          {errors.general}
        </div>
      )}

      {/* ============ SUBMIT BUTTON ============ */}
      <div className="mt-8">
        <Button fullWidth variant="primary" size="md" onClick={handleRegister}>
          Complete Registration
        </Button>
      </div>

      {/* ============ LOGIN LINK ============ */}
      <div className="text-center mt-6">
        <p className="text-[15px]">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="font-semibold text-primary cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
