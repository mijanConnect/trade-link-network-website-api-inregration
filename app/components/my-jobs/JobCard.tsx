import Button from "../ui/Button";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { formatDateTime } from "@/app/utils/TimeDateFormat";

type JobAction = {
  id?: string;
  label: string;
  variant: "primary" | "outline";
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
};

type JobCardProps = {
  id?: string;
  title: string;
  postedOn: string;
  description: string;
  actions?: JobAction[];
};

export default function JobCard({
  id,
  title,
  postedOn,
  description,
  actions,
}: JobCardProps) {
  const router = useRouter();

  const defaultViewDetailsAction = id
    ? {
        label: "View Details",
        variant: "primary" as const,
        onClick: () => {
          router.push(`/my-jobs/details/${id}`);
        },
      }
    : { label: "View Details", variant: "primary" as const };

  const finalActions: JobAction[] =
    actions && actions.length > 0
      ? actions.map((action) =>
          action.label === "View Details" && id
            ? {
                ...action,
                variant: "primary" as const,
                onClick: () => router.push(`/my-jobs/details/${id}`),
              }
            : action,
        )
      : [
          {
            label: "Create Post",
            variant: "outline",
            className:
              "border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
          },
          defaultViewDetailsAction,
        ];

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-primary bg-white hover:bg-gray-100 p-4 md:p-6 lg:gap-8 hover:shadow-[0_0_10px_rgba(0,0,0,0.10)] transform transition duration-300">
      <div>
        <h1 className="text-[22px] text-primaryText lg:text-[24px] font-semibold">
          {title}
        </h1>
        <p className="mt-0 text-[14px] text-gray-400 lg:mt-2 lg:text-[16px]">
          {"Posted on " + formatDateTime(postedOn)}
        </p>
        <p className="mt-4 text-[14px] text-primaryText lg:mt-4 lg:text-[16px]">
          {description}
        </p>
      </div>

      <div className="flex justify-end">
        <div className="flex w-full gap-4 md:w-auto md:gap-6">
          {finalActions.map((action) => {
            const button = (
              <Button
                key={action.id ?? action.label}
                variant={action.variant}
                size="md"
                className={`w-1/2 md:w-auto ${action.className ?? ""}`.trim()}
                onClick={action.onClick}
              >
                <span
                  className={`flex items-center justify-center ${
                    action.icon ? "gap-2" : "gap-0"
                  }`}
                >
                  {action.icon ? (
                    <div className="-mt-1">{action.icon}</div>
                  ) : null}
                  <span>{action.label}</span>
                </span>
              </Button>
            );

            return button;
          })}
        </div>
      </div>
    </div>
  );
}
