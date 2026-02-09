"use client";

import { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Button from "../ui/Button";
import { CustomSelect } from "../ui/CustomSelect";
import QuestionProgressBar from "./QuestionProgressBar";
import Questions from "./Questions";
import CreateAccount from "./CreateAccount";
import { skipToken } from "@reduxjs/toolkit/query/react";
import {
  useGetCategoriesQuery,
  useGetCategoriesServicesQuery,
  useGetCategoriesServicesQuestionsQuery,
} from "@/store/slice/categoriesSlice";

export default function PostService() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery({});
  const serviceId = params?.id as string | undefined;

  const categories = categoriesData || [];
  const selectedCategory = categories.find(
    (c: { slug: string; name: string; _id: string }) => c.slug === serviceId,
  );

  // Ensure we have a valid ObjectId, not a slug
  const categoryId = selectedCategory?._id;

  console.log("Category Id: " + categoryId);

  // Only fetch services if we have a valid categoryId - use skipToken to skip the query
  const { data: servicesData } = useGetCategoriesServicesQuery(
    categoryId || skipToken,
  );

  const services = (servicesData as unknown[] | undefined) || [];

  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(10);
  const [currentSection, setCurrentSection] = useState<
    "initial" | "questions" | "createAccount"
  >("initial");
  const [initialSelection, setInitialSelection] = useState<string | null>(
    searchParams.get("service"),
  );
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Array<{ question: string; answer: string | string[] }>
  >([]);

  const handleProgressChange = (current: number, total: number) => {
    setCurrentStep(current);
    setTotalSteps(total);
  };

  const handleInitialNext = () => {
    if (initialSelection) {
      setCurrentSection("questions");
    }
  };

  const handleQuestionsComplete = (
    answers: Array<{ question: string; answer: string | string[] }>,
  ) => {
    setAnsweredQuestions(answers);
    setCurrentSection("createAccount");
  };

  const handleSelectionChange = (value: string | null) => {
    setInitialSelection(value);
    if (value) {
      router.push(`?service=${value}`);
      // Find and set the serviceId for the selected service
      const selectedService = (
        services as Array<{ _id: string; slug: string; name: string }>
      ).find((service) => service.slug === value);
      if (selectedService) {
        setSelectedServiceId(selectedService._id);
      }
    }
  };

  const options =
    (services as Array<{ _id: string; slug: string; name: string }>).map(
      (service) => ({
        serviceId: service._id,
        value: service.slug,
        label: service.name,
      }),
    ) || [];

  const { data: questionsData } = useGetCategoriesServicesQuestionsQuery(
    selectedServiceId || skipToken,
  );

  console.log("questionsData", questionsData);

  return (
    <>
      <div>
        <QuestionProgressBar current={currentStep} total={totalSteps} />
        <div className="max-w-4xl">
          <h3 className="text-[22px] lg:text-[36px] font-bold text-primary leading-7 lg:leading-11 mb-4 lg:mb-8">
            Post{" "}
            {isCategoriesLoading
              ? "Loading"
              : isCategoriesError
                ? "Service"
                : selectedCategory?.name || "Service"}{" "}
            <br /> Services Job
          </h3>

          <div className="mb-6 lg:mb-10">
            <CustomSelect
              label={`What best describes your ${selectedCategory?.name || "service"} project?`}
              options={options}
              header="Select a service category"
              placeholder="Choose a service category"
              value={initialSelection}
              onChange={handleSelectionChange}
            />
            {currentSection === "initial" && (
              <div className="mt-4 lg:mt-8 flex gap-4">
                <Button
                  variant="primary"
                  className="w-[100px]"
                  onClick={handleInitialNext}
                  disabled={!initialSelection}
                >
                  Next
                </Button>
              </div>
            )}
          </div>

          {(currentSection === "questions" ||
            currentSection === "createAccount") && (
            <Questions
              onProgressChange={handleProgressChange}
              onComplete={handleQuestionsComplete}
              categoryId={categoryId}
              serviceSelection={initialSelection}
              questions={questionsData}
            />
          )}

          {currentSection === "createAccount" && (
            <CreateAccount
              categoryId={categoryId}
              serviceSelection={selectedServiceId}
              answeredQuestions={answeredQuestions}
            />
          )}
        </div>
      </div>
    </>
  );
}
