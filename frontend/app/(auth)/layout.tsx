import AuthShowcase from "@/components/AuthShowcase";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F8F6F2] p-6">

      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl gap-8">

        <AuthShowcase />

        <div className="flex flex-1 items-center justify-center">

          {children}

        </div>

      </div>

    </main>
  );
}