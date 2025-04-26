import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center  p-4">
      <div className=" rounded-xl shadow-sm p-8 max-w-6xl w-full flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-bold text-chart-4 mb-4">Page Not Found</h2>
        <Image
          src={"/error-animation.gif"}
          width={600}
          height={700}
          alt="Error gif"
        />
        <div className="flex mt-6 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-chart-4 text-white rounded-lg hover:bg-purple-600 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
