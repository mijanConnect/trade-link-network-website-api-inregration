import TextareaField from "../ui/TextareaField";

interface JobDescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescriptionField({
  value,
  onChange,
}: JobDescriptionFieldProps) {
  return (
    <div className="mb-6">
      <h3 className="block text-[18px] font-semibold text-primaryText mb-1">
        Description
      </h3>
      <p className="text-[16px] text-primaryTextLight mb-4">
        Please provide details about your job requirements
      </p>
      <TextareaField
        placeholder="Describe the work you need done..."
        rows={5}
        onChange={(val: string) => onChange(val)}
        value={value}
      />
    </div>
  );
}
