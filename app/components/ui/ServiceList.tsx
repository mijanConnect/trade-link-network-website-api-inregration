import Link from "next/link";

type Item = { _id: number; name: string; slug: string };

type ServiceListProps = {
  categories?: Item[];
  locations?: Item[];
  route: string;
};

const ServiceList: React.FC<ServiceListProps> = ({
  categories,
  locations,
  route,
}) => {
  const items = categories || locations || [];

  return (
    <>
      <div>
        <ul className="flex flex-wrap justify-between gap-y-4 md:gap-y-8">
          {items.map((item) => (
            <li
              key={item._id}
              className="w-full sm:basis-[48%] lg:basis-[30%] "
            >
              <Link
                href={`/${route}/${item.slug}`}
                className="block w-full text-[18px] lg:text-[22px] font-medium text-center text-[#0088FF] my-0 lg:my-4 transform transition-all duration-200 px-8 pb-2 lg:pb-4 border-b border-blue-200 hover:border-[#0088FF] hover:scale-105"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ServiceList;
