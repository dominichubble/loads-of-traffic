import Link from "next/link";
import ContactForm from "@/components/contact-form";

const ContactPage = () => {
  return (
    <main className="contact bg-accent px-6 pb-[--pages-header-height] pt-[calc(var(--pages-header-height)+var(--container-padding-y))] sm:px-[var(--container-padding-x)] xl:pb-[6rem]">
      <section className="contact-section">
        <div className="m:gap-0 mb-[2rem] flex flex-col items-start justify-between gap-[3rem] xl:mb-[6rem] xl:gap-[6rem]">
          <div className="md:max-w-[50%]">
            <h2 className="text-[1.6rem] font-bold xl:text-[2.4rem]">
              Want to know what your market trends are, or where your
              competitors get their traffic from?
            </h2>
          </div>
          <h1 className="flex items-center gap-4 self-start text-[2rem] font-bold md:text-[2rem] xl:text-[3rem]">
            <span className="inline-block h-[0.8rem] w-[0.8rem] rounded-full bg-white xl:h-[1.2rem] xl:w-[1.2rem]"></span>
            Contact
          </h1>
        </div>
        <div className="mb-[2rem] flex flex-col gap-8 overflow-hidden rounded-2xl bg-primary p-6 text-primary text-white sm:p-8 xl:mb-[4rem]">
          <div className="flex w-full flex-shrink flex-col justify-between gap-2 text-[1.4rem] sm:gap-6 md:text-[1.6rem] xl:text-[2.6rem]">
            <p className="font-bold md:max-w-[80%]">
              Let’s connect and explore how we can help your business grow.
            </p>
            <span className="inline-block text-[0.8rem] md:text-[1.2rem]">
              <span className="mb-2 inline-block">
                All we need to know to begin helping you build your industry
                knowledge and brand presence is:
              </span>
              <ul className="ml-8 list-disc">
                <li>What services can we help you with?</li>
                <li>How much help do you want?</li>
                <li>What do you see as the next steps?</li>
              </ul>
            </span>
          </div>
          <div className="flex w-full flex-col justify-between gap-2 text-[0.8rem] text-white sm:gap-6 md:text-[1.6rem]">
            <p>
              <span className="font-bold">Email: </span>
              <Link
                className="underline"
                href="mailto:Enquiries@loadsoftraffic.com"
              >
                Enquiries@loadsoftraffic.com
              </Link>
            </p>
            <div className="flex flex-col items-start">
              <p>
                <span className="font-bold">Address: </span>
                Loads of Traffic Ltd, Floor 2, Hillary House, Prospect Hill,
                Douglas, IM1 1EQ
              </p>
            </div>
          </div>
        </div>
      </section>
      <ContactForm />
    </main>
  );
};

export default ContactPage;
