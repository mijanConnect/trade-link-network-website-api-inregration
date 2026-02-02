import Image from "next/image";
import Button from "@/app/components/ui/Button";
import Stars from "@/app/components/trade-person/Stars";
import type { TradePersonProfile } from "@/lib/trade-person/mock";

type Props = {
  profile: TradePersonProfile;
};

export default function TradePersonProfileCard({ profile }: Props) {
  return (
    <aside className=" p-10 ">
      <div className="flex flex-col items-center text-center">
        <div className="h-[160px] w-[160px] overflow-hidden rounded-full border border-slate-200">
          <Image
            src={profile.avatar}
            alt={`${profile.businessName} avatar`}
              width={160}
            height={160}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="mt-4 text-[18px] font-semibold text-primaryText">
          {profile.businessName}
        </h2>
        <div className="mt-2 flex items-center gap-2">
          <Stars rating={profile.rating} />
          <span className="text-[13px] text-slate-600">
            ({profile.rating.toFixed(1)})
          </span>
        </div>

        <div className=" flex flex-wrap justify-center p-6 gap-2 w-96">
          {profile.tags.map((t) => (
            <span
              key={t}
              className="rounded bg-slate-100 border border-primary/40 px-2 py-1 text-[12px] text-slate-700"
            >
              {t}
            </span>
          ))}
        </div>

        <div className=" w-full flex justify-center">
          <Button variant="primary" size="md" >
            Contact
          </Button>
        </div>
      </div>
    </aside>
  );
}

