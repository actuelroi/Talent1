
import CompanyHeader from "./_components/CompanyHeader";
import Navigation from "./_components/Navigation";



export default function LorealPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <CompanyHeader />
        <Navigation />
      </main>
    </div>
  );
}