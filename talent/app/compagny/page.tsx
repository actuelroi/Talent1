// import CTASection from "./_components/CTASection";
// import FeaturesSection from "./_components/FeaturesSection";
// import Footer from "./_components/Footer";
// import Header from "./_components/Header";
// import HeroSection from "./_components/HeroSection";
// import TestimonialsSection from "./_components/TestimonialsSection";


// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col">

//       <main className="flex-1">
//         <HeroSection />
//         <FeaturesSection />
//         <TestimonialsSection />
//         <CTASection />
//       </main>
//       <Footer />
//     </div>
//   )
// }



import AudienceSection from "./_components/AudienceSection";
import ClientLogosSection from "./_components/ClientLogosSection";
import ClientTestimonialsSection from "./_components/ClientTestimonialsSection";
import CTASection from "./_components/CTASection";
import EmployerBrandSection from "./_components/EmployerBrandSection";
import FooterSection from "./_components/FooterSection";
import Header from "./_components/Header";
import HeroSection from "./_components/HeroSection";
import IntegrationsSection from "./_components/IntegrationsSection";
import ManagementSection from "./_components/ManagementSection";
import ShowcaseSection from "./_components/ShowcaseSection";
import SolutionsSection from "./_components/SolutionsSection";
import TalentSourcingSection from "./_components/TalentSourcingSection";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        <HeroSection />
        <ManagementSection />
        <ClientLogosSection />
        <TalentSourcingSection />
        <ShowcaseSection />
        <EmployerBrandSection />
        <AudienceSection />
        <SolutionsSection />
        <ManagementSection />
        <IntegrationsSection />
        <ClientTestimonialsSection />
        <CTASection />
      </main>
      <FooterSection />
    </div>
  )
}