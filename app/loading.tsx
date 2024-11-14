import { RxReload } from "react-icons/rx";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <RxReload className="w-10 h-10 animate-spin text-carbon" />
    </div>
  );
}
