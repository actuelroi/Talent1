import CompanyHeader from "./_components/CompanyHeader";
import Navigation from "./_components/Navigation";





export default function LorealPage() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <main className="flex-1 w-full">
        <CompanyHeader />
        <Navigation />
      </main>
    </div>
  );
}
