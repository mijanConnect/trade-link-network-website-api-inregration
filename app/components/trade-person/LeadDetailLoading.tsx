export default function LeadDetailLoading() {
  return (
    <div className="flex h-[600px] items-center justify-center rounded-lg border border-slate-200 bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        {/* <p className="text-sm text-slate-600">Loading lead details...</p> */}
      </div>
    </div>
  );
}
