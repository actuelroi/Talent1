
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputWithDescription from "./InputWithDesc";
import SiteInput from "./SiteInput";
import Phone from "./Phone";
import CreationDate from "./CreatedCompagny";
import Localisation from "./Localisation";
import { Employees } from "./Employee";
import Linkedin from "./Linkedin";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const SecondPart = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Creation de compte</h1>
      <p className="mb-6">
        We&apos;d love to hear from you. Please fill out the form below and
        we&apos;ll get back to you as soon as possible.
      </p>
      <form className="space-y-4">
        <div className='flex flex-row items-center justify-center gap-4 p-6'>
            <Avatar className='w-18 h-18 cursor-pointer' >
              <AvatarImage src={'/images/im4.jpg'} />
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
            <InputWithDescription />
          </div>
          <SiteInput/>
          <Localisation />
          <div className="space-y-0.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <Phone/>
        <Linkedin/>
        <CreationDate/>
        <Employees/>
        <div className="space-y-0.5">
          <Label htmlFor="message " className="text-2xl font-semibold">Description de votre entreprise</Label>
          <Textarea
            id="message"
            name="message"
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
            required
          />
        </div>
        <Link href={'/compte-compagny'}>
        <Button
          type="submit"
          className=" px-6 py-3 rounded-md text-sm font-semibold hover:bg-darkColor hoverEffect cursor-pointer"
        >
          Créer votre compte 
        </Button>
        </Link>
        
      </form>
    </div>
  );
};
export default SecondPart;