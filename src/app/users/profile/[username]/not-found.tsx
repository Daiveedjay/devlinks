import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="bg-sidebar-border rounded-xl shadow-sm p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          User Not Found
        </h2>
        <p className="text-foreground mb-6">
          We couldn&apos;t find the user profile you&apos;re looking for. This
          could mean the profile has been removed or the username has been
          changed. Please verify the username or try again.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="px-6 py-3 dark:bg-chart-4 bg-purple-primary text-white rounded-lg hover:bg-purple-600 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
