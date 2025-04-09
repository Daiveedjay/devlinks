import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-background p-4">
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-purple-primary mb-4">
          User Not Found
        </h2>
        <p className="text-gray-medium mb-6">
          We couldn&apos;t find the user profile you&apos;re looking for. The
          user may not exist or the profile might have been removed.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-purple-primary text-white rounded-lg hover:bg-purple-600 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
