import { useGetCategoriesQuery } from "@/store/slice/categoriesSlice";
import ServiceList from "../ui/ServiceList";

export default function PopularServices() {
  const { data } = useGetCategoriesQuery({});

  return (
    <>
      <div>
        <div className="mt-6 lg:mt-8">
          <ServiceList categories={data || []} route="services" />
        </div>
      </div>
    </>
  );
}
