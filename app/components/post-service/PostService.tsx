"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { CustomSelect } from "../ui/CustomSelect";
import QuestionProgressBar from "./QuestionProgressBar";
import Questions from "./Questions";
import Checkbox from "./Checkbox";
import CreateAccount from "./CreateAccount";

export default function PostService() {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(10);
  const [currentSection, setCurrentSection] = useState<
    "initial" | "questions" | "createAccount"
  >("initial");
  const [initialSelection, setInitialSelection] = useState<string | null>(null);

  const handleProgressChange = (current: number, total: number) => {
    setCurrentStep(current);
    setTotalSteps(total);
  };

  const handleInitialNext = () => {
    if (initialSelection) {
      setCurrentSection("questions");
    }
  };

  const handleQuestionsComplete = () => {
    setCurrentSection("createAccount");
  };

  const options = [
    { value: "new-garden", label: "New garden / blank canvas" },
    { value: "garden-redesign", label: "Garden redesign / makeover" },
    { value: "patios-paving", label: "Patios & paving" },
    { value: "decking", label: "Decking (timber or composite)" },
    { value: "fencing", label: "Fencing" },
    { value: "turfing", label: "Turfing / artificial grass" },
    { value: "groundworks-drainage", label: "Groundworks & drainage" },
    { value: "garden-maintenance", label: "Garden maintenance" },
    { value: "tree-surgery", label: "Tree surgery / tree work" },
    { value: "need-advice", label: "Not sure yet – need advice" },
  ];

  return (
    <>
      <div>
        <QuestionProgressBar current={currentStep} total={totalSteps} />
        <div className="max-w-4xl">
          <h3 className="text-[22px] lg:text-[36px] font-bold text-primary leading-7 lg:leading-11 mb-4 lg:mb-8">
            Post an Outdoor & Landscaping <br /> Services Job
          </h3>

          <div className="mb-6 lg:mb-10">
            <CustomSelect
              label="What best describes your Outdoor & landscaping project?"
              options={options}
              header="Select a category"
              placeholder="Choose a service category"
              value={initialSelection}
              onChange={(value) => setInitialSelection(value)}
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
            />
          )}

          {currentSection === "createAccount" && <CreateAccount />}
        </div>
        <Checkbox />
      </div>
    </>
  );
}
