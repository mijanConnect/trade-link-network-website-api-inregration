import InputField from "../ui/InputField";

interface JobPostcodeFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobPostcodeField({
  value,
  onChange,
}: JobPostcodeFieldProps) {
  return (
    <div>
      <h3 className="block text-[18px] font-semibold text-primaryText mb-1">
        Postcode for the job
      </h3>
      <p className="text-[16px] text-primaryTextLight mb-4">
        To find tradespeople near you we need to know where the job is
      </p>
      <InputField
        placeholder="Eg. SW1A 2AB"
        onChange={(val: string) => onChange(val)}
        value={value}
      />
    </div>
  );
}
