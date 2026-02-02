import Image from "next/image";

export default function AuthLogo() {
  return (
    <div className="flex justify-center mb-4 mt-2">
      <Image src="/assets/logo.png" alt="Login Image" width={160} height={58} />
    </div>
  );
}
