import Image from "next/image";

export default function Maps() {
  return (
    <>
      <div className="bg-white py-8 lg:py-32 px-4">
        <div className="container mx-auto">
          <h1 className="text-[18px] lg:text-3xl text-center font-bold mb-4 lg:mb-12 max-w-3xl mx-auto">
            We connect customers with trusted local professionals across
            England, Scotland, Wales and Northern Ireland.
          </h1>
          <div className="flex justify-center">
            <Image
              src="/assets/map.png"
              alt="Map of the UK showing our coverage"
              width={400}
              height={300}
              className="h-auto rounded-lg shadow-md max-w-full"
              unoptimized
            />
          </div>
        </div>
      </div>
    </>
  );
}
