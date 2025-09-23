import Header from "@/components/Header";
import CompanyHeader from "./_components/CompanyHeader";
import Navigation from "./_components/Navigation";
import CompanyStats from "./_components/CompanyStats";
import EmployeeTestimonials from "./_components/EmployeeTestimonials";
import CompanyPresentation from "./_components/CompanyPresentation";
import CompanyLookingFor from "./_components/CompanyLookingFor";
import JobOpenings from "./_components/JobOpenings";
import CompanyBenefits from "./_components/CompanyBenefits";
import LocationCard from "./_components/LocationCard";
import FooterSection from "@/app/compagny/_components/FooterSection";


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