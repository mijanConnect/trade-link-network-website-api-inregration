"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CustomSelect } from "../ui/CustomSelect";
import Button from "../ui/Button";

const questions = [
  {
    order: 1,
    question: "What type of garden service do you need?",
    options: [
      { value: "new-garden", label: "New garden / blank canvas" },
      { value: "garden-redesign", label: "Garden redesign / makeover" },
      { value: "patios-paving", label: "Patios & paving" },
      { value: "decking", label: "Decking (timber or composite)" },
    ],
  },
  {
    order: 2,
    question: "Which outdoor service are you looking for?",
    options: [
      { value: "fencing", label: "Fencing" },
      { value: "turfing", label: "Turfing / artificial grass" },
      { value: "groundworks-drainage", label: "Groundworks & drainage" },
      { value: "garden-maintenance", label: "Garden maintenance" },
    ],
  },
  {
    order: 3,
    question: "Do you need advice on your garden project?",
    options: [
      { value: "need-advice", label: "Not sure yet – need advice" },
      { value: "patios-paving", label: "Patios & paving" },
      { value: "tree-surgery", label: "Tree surgery / tree work" },
      { value: "garden-redesign", label: "Garden redesign / makeover" },
    ],
  },
];

interface QuestionsProps {
  onProgressChange?: (current: number, total: number) => void;
  onComplete?: () => void;
  categoryId?: string;
  serviceSelection?: string | null;
}

export default function Questions({
  onProgressChange,
  onComplete,
  // categoryId,
  // serviceSelection,
}: QuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isAnswerSelected = !!selectedAnswers[currentQuestionIndex];

  const handleNext = () => {
    if (!isLastQuestion) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      onProgressChange?.(newIndex + 1, totalQuestions);
    } else if (isLastQuestion && isAnswerSelected) {
      onComplete?.();
    }
  };

  const handleBack = () => {
    if (!isFirstQuestion) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      onProgressChange?.(newIndex + 1, totalQuestions);
    }
  };

  return (
    <>
      <div className="space-y-4 lg:space-y-6">
        {/* Show all previously answered questions */}
        {currentQuestionIndex > 0 && (
          <div className="space-y-4">
            {Array.from({ length: currentQuestionIndex }).map((_, index) => (
              <div key={index} className="space-y-2">
                <p className="block text-[16px] lg:text-[18px] font-semibold text-primaryText mb-3">
                  {questions[index].question}
                </p>
                <div
                  className="w-full px-5 py-3 text-[14px] lg:text-[16px] text-left border border-primaryTextLight rounded-sm bg-transparent text-primaryText cursor-pointer hover:bg-gray-300 hover:bg-opacity-5 transition-colors flex items-center justify-between"
                  onClick={() => {
                    setCurrentQuestionIndex(index);
                    onProgressChange?.(index + 1, totalQuestions);
                  }}
                >
                  <span>
                    {
                      questions[index].options.find(
                        (opt) => opt.value === selectedAnswers[index],
                      )?.label
                    }
                  </span>
                  <ChevronDown size={20} className="text-primaryText" />
                </div>
              </div>
            ))}
          </div>
        )}

        <CustomSelect
          key={currentQuestionIndex}
          label={currentQuestion.question}
          options={currentQuestion.options}
          placeholder="Choose a service category"
          value={selectedAnswers[currentQuestionIndex] || null}
          onChange={(value) =>
            setSelectedAnswers((prev) => ({
              ...prev,
              [currentQuestionIndex]: value,
            }))
          }
        />
        <div className="flex gap-4">
          {!isFirstQuestion && (
            <Button
              variant="outline"
              className="w-[100px]"
              onClick={handleBack}
            >
              Back
            </Button>
          )}
          <Button
            variant="primary"
            className="w-[100px]"
            onClick={handleNext}
            disabled={!isAnswerSelected}
          >
            {isLastQuestion ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </>
  );
}
