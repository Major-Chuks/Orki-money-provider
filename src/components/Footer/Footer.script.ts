import { routes } from "@/services/routes";

export const footerData = {
  Company: [
    {
      link: routes.contactUs,
      name: "Contact us",
    },
    {
      link: routes.aboutUs,
      name: "About us",
    },
    {
      link: routes.faqs,
      name: "FAQ",
    },
    {
      link: routes.careers,
      name: "Careers",
    },
  ],
  Products: [
    {
      link: routes.widget,
      name: "Widget",
    },
    {
      link: routes.api,
      name: "API",
    },
    ,
    {
      link: routes.offramp,
      name: "Offramps",
    },
  ],
  Resources: [
    {
      link: routes.blogs,
      name: "Blogs",
    },
    {
      link: routes.docs,
      name: "Docs",
    },
    {
      link: routes.mediakit,
      name: "Media Kit",
    },
  ],
  Legal: [
    {
      link: routes.privacyPolicy,
      name: "Privacy Policy",
    },
    {
      link: routes.termsOfUse,
      name: "Terms of Usage",
    },
    {
      link: routes.cookiePolicy,
      name: "Cookie Policy",
    },
  ],
};
