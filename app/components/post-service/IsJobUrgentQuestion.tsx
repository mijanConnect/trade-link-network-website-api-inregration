import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface IsJobUrgentQuestionProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function IsJobUrgentQuestion({
  value,
  onChange,
}: IsJobUrgentQuestionProps) {
  return (
    <div className="mb-6">
      <h3 className="block text-[18px] font-semibold text-primaryText mb-1">
        Is this job urgent?
      </h3>
      <p className="text-[16px] text-primaryTextLight mb-4">
        This will help us prioritise your job post and get you faster responses
      </p>
      <RadioGroup
        value={value ? "yes" : "no"}
        onValueChange={(val) => onChange(val === "yes")}
        className="flex gap-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="urgent-yes" />
          <label
            htmlFor="urgent-yes"
            className="text-[16px] font-medium cursor-pointer"
          >
            Yes
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="urgent-no" />
          <label
            htmlFor="urgent-no"
            className="text-[16px] font-medium cursor-pointer"
          >
            No
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
