"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CustomSelect } from "../ui/CustomSelect";
import Button from "../ui/Button";

interface Question {
  _id?: string;
  order?: number;
  questionText: string;
  type?: string;
  options: Array<{ label: string; _id?: string; value?: string }>;
}

interface QuestionsProps {
  onProgressChange?: (current: number, total: number) => void;
  onComplete?: (
    answers: Array<{ question: string; answer: string | string[] }>,
  ) => void;
  categoryId?: string;
  serviceSelection?: string | null;
  questions?: Question[];
}

export default function Questions({
  onProgressChange,
  onComplete,
  // categoryId,
  // serviceSelection,
  questions: apiQuestions,
}: QuestionsProps) {
  // Use API questions if available, otherwise fall back to empty array
  const questionsData =
    apiQuestions && apiQuestions.length > 0 ? apiQuestions : [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [isFinished, setIsFinished] = useState(false);

  // Early return if no questions are available
  if (!questionsData || questionsData.length === 0) {
    return (
      <div className="space-y-4 lg:space-y-6">
        <p className="text-primaryText">No questions available.</p>
      </div>
    );
  }

  const currentQuestion = questionsData[currentQuestionIndex];
  const totalQuestions = questionsData.length;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isAnswerSelected = !!selectedAnswers[currentQuestionIndex];

  const handleNext = () => {
    if (!isAnswerSelected) {
      return; // Don't proceed if no answer is selected
    }

    if (!isLastQuestion) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      onProgressChange?.(newIndex + 1, totalQuestions);
    } else if (isLastQuestion && isAnswerSelected) {
      // Prepare answered questions in the required format
      const answeredQuestions = questionsData
        .map((question, index) => {
          const selectedAnswer = selectedAnswers[index];
          const answerOption = question.options.find(
            (opt) => (opt.value || opt.label) === selectedAnswer,
          );

          return {
            question: question._id || "",
            answer: answerOption?._id || selectedAnswer,
          };
        })
        .filter((item) => item.question !== "");

      setIsFinished(true);
      onComplete?.(answeredQuestions);
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
                  {questionsData[index].questionText}
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
                      questionsData[index].options.find(
                        (opt) =>
                          (opt.value || opt.label) === selectedAnswers[index],
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
          label={currentQuestion.questionText}
          options={currentQuestion.options.map((opt) => ({
            label: opt.label,
            value: opt.value || opt.label,
          }))}
          placeholder="Choose an option"
          value={selectedAnswers[currentQuestionIndex] || null}
          onChange={(value) =>
            setSelectedAnswers((prev) => ({
              ...prev,
              [currentQuestionIndex]: value,
            }))
          }
        />
        {!isFinished && (
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
        )}
      </div>
    </>
  );
}
