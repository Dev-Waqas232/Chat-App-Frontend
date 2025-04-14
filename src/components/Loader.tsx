export default function Loader({ className }: { className?: string }) {
  return (
    <div
      className={`w-6 h-6 rounded-full border bg-transparent border-t-0 animate-spin border-primary-100 ${className}`}
    />
  );
}
