/* eslint-disable react/no-unescaped-entities */
import Responsive from "@/components/Responsive/Responsive";
import classes from "./Content.module.css";

const Content = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <section>
          <div className={classes.description}>
            For the processing of Product Usage Data, Device Data and Log Data,
            and the use thereof as described above, we may use cookies. Cookies
            are small files that are stored on a user’s computer. They are
            designed to hold a modest amount of data specific to a particular
            client or website and can potentially be accessed by us, as well as
            your personal computer. Cookies could allow us to collect data
            automatically (some of which might be considered personal
            information. Cookies are either “session” cookies which are deleted
            when you end your browser session, or “persistent” cookies, which
            remain until their deletion by you (discussed below) or the party
            who served the cookie. Some Cookies are necessary for certain uses
            of the Site, and without such Cookies, we would not be able to
            provide you with functional access to the Site and/or Service. These
            ‘Necessary Cookies’ could, for example, enable us to remember your
            previous actions within the same browsing session and secure our
            Sites. They could also allow us to, for instance, deliver a page
            tailored to a user, based on the device you are using and the
            location you are in. Specifically, they allow us to save your cookie
            preferences! Aside from this functional purpose, we mainly use
            cookies for the analytical purposes described in the section on ‘How
            we use your personal information above’. These ‘Analytical Cookies’,
            which allow us to use Google Analytics, may process and store
            information such as a user’s Internet Protocol (IP) address,
            internet service provider, device and browser type, browser version
            and settings, language preference, cache preferences, operating
            system, platform, device identifier, device type and manufacturer,
            location information, demographics, the pages or features of our
            Site and/or Service to which a user browsed and the time spent on
            those pages or features, the frequency with which the Site and/or
            Service is used by a user, search terms, the links on our Site that
            a user clicked on or used, timestamps and other statistics. We may
            also use Google Analytics to help us offer you a better-optimized
            user experience. You can find more information about Google
            Analytics’ use of your data here. Necessary cookies are crucial for
            the basic functions of the website and the website will not work in
            its intended way without them. These cookies do not store any
            personally identifiable data.
          </div>
        </section>
        <section>
          <div className={classes.title}>How to disable Cookies?</div>
          <div className={classes.description}>
            Most internet browsers are initially set up to automatically accept
            cookies. If you do not want our websites to store cookies on your
            device, you can change your browser settings so that you receive a
            warning before certain cookies are stored. You can also adjust your
            settings so that your browser refuses most of our cookies or only
            certain cookies from third parties. You can also withdraw your
            consent to cookies by deleting the cookies that have already been
            stored. If you disable the cookies that we use, this may impact your
            experience while on the Unilever website, for example, you may not
            be able to visit certain areas of a website or you may not receive
            personalized information when you visit a website. If you use
            different devices to view and access the Site and/or Software (e.g.,
            your computer, smartphone, tablet) you will need to ensure that each
            browser on each device is adjusted to suit your cookie preferences.
            The procedures for changing your settings and cookies differ from
            browser to browser. If necessary, use the help function on your
            browser or click on one of the links below to go directly to the
            user manual for your browser. Internet Explorer Mozilla Firefox
            Google Chrome Safari Opera To find out more about cookies, including
            how to see what cookies have been set on your PC and how to manage
            and delete them, visit www.allaboutcookies.org.
          </div>
        </section>
      </div>
    </Responsive>
  );
};

export default Content;
