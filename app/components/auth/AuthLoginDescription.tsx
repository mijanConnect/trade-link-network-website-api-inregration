interface AuthLoginDescriptionProps {
  header: string;
  description: string;
}

export default function AuthLoginDescription({
  header,
  description,
}: AuthLoginDescriptionProps) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{header}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
