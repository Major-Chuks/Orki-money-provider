import Responsive from "@/components/Responsive/Responsive";
import classes from "./Content.module.css";

const Content = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <section>
          <div className={classes.description}>
            This privacy policy (“Policy”) describes how Orki, a.k.a. Orki LLC
            (“Orki” “Company”, “we”, “our”, “us”) collects, uses, shares, and
            stores personal information of users of this website, www.Orki.io
            (the “Site”) and users of the Orki widget and API (together, the
            “Software”), which can be used to interact with various third
            parties that offer fiat-to-cryptocurrency conversion services (“Fiat
            Gateways”). Use of the Orki widget, API, or any of the software
            components built by Orki shall be further referred to as usage of
            the Software. By using the Software, you (the “End User” / “You”)
            accept the terms of this Privacy Policy and our Terms of Use, and
            consent to our processing, use, disclosure, and retention of your
            information as described in this Policy.
          </div>
        </section>
        <section>
          <div className={classes.title}>
            What Personal Information do we collect?
          </div>
          <div className={classes.description}>
            We do not currently collect any personally identifiable information
            from you directly. However, we still collect data that, while it
            doesn’t qualify as personally identifiable information, is treated
            with the highest standard of care. The (categories of) data we may,
            now, or in the future, process are: Transactional Data: information
            about your transaction history with Fiat Gateways, incl. the type of
            virtual financial assets involved, the order volume, price, value,
            and information on which bank is used for a transaction identified
            through the processing of a part of your credit card number. This
            does not include any Personally Identifiable Information.
            Information we collect automatically about how you use our Site
            and/or Software, (“Product Usage Data”), including information on
            the device(s) you may use (“Device Information”) and information on
            when, where and how you use our Site and/or Software, including your
            IP address and info such as your browser type (“Log Data”). For a
            more specific overview of what information is collected
            automatically, see the section named ‘Cookie Policy’ below. The
            processing of any other data inserted by End-users when making use
            of services provided by Fiat Gateways is governed by the privacy
            policies of the individual Fiat Gateway(s) used by the End User.
            With regards to this data, Orki does not act as a data controller.
            While Orki does not collect any personal information from you, the
            Fiat Gateways do, as covered by their privacy policies. Those Fiat
            Gateways may share data with Orki. This can include your phone
            number, country, your email address and your name, but does not
            include credit card numbers or any other PAN or CVC data. To learn
            more about the data processing that occurs when making use of the
            services offered by Fiat Gateways, see Moonpay’s privacy policy,
            BTCDirect’s privacy policy, Coinify’s privacy policy, Indacoin’s
            privacy policy orWyre’s privacy policy, Mercuryo’s privacy policy,
            Utorg’s privacy policy or Xanpool’s privacy policy.
          </div>
        </section>
        <section>
          <div className={classes.title}>What do we use your data for?</div>
          <div className={classes.description}>
            <p>
              We collect and/or process different categories of users’ personal
              data across our Sites. The categories are:
            </p>
            <p>
              We may process Usage Data, Transactional Data, Device Data, and
              Log Data for us to: Perform user analytics to keep track of usage
              and better understand our users; carry out research and
              development to improve our Site and/or Software, Identify IT or
              network issues, Identify mal-intended usage of our Site and/or
              Software, Manage our Site and/or Software, system administration,
              and security, Provide actionable data insights to Business Users,
              Improve the way Fiat Gateways are selected and shown to the users,
              Prevent fraud, money laundering or unauthorized use of our
              Software, and To customize the content and layout of the Websites.
            </p>
          </div>
        </section>

        <section>
          <div className={classes.title}>Cookies</div>
          <div className={classes.description}>
            Our Sites make use of cookies to distinguish you from other visitors
            and to provide you with a better experience while helping us improve
            our services. We also use cookies as part of our Usecoins Services,
            content/advertising measure and to promote trust and Users’ safety.
            By continuing to use our Sites, you are agreeing to our use of
            cookies.
          </div>
        </section>

        <section>
          <div className={classes.title}>
            What is the legal basis for the processing of your data?
          </div>
          <div className={classes.description}>
            The processing of your Product Usage Data, Transactional Data,
            Device Information, and Log Data occurs for the purposes described
            above, based on our legitimate interests. These interests include
            improving, maintaining, providing and enhancing our Site and
            Software, our marketing interests, our need to contact Business
            Users with regards to use of our API/widget, our interests
            concerning ensuring the security of the Software and our Site, as
            well as our legitimate interest in being able to provide data
            insights to Business Users. We limit our collection of processing of
            data to what is necessary for these purposes, and this processing of
            personal information for our legitimate interests is not
            disproportionate to your data-protection interests, fundamental
            rights, and/or freedoms. The processing of personally identifiable
            information, and any other information filled in by the End-User, as
            well as some transactional data, is covered by the privacy policies
            of the various Fiat Gateways. Orki might process information as a
            data processor on behalf of the Fiat Gateway (the data controller).
            To learn more about the data processing that occurs when making use
            of the services offered by Fiat Gateways, see Moonpay’s privacy
            policy, BTCDirect’s privacy policy, Coinify’s privacy policy,
            Indacoin’s privacy policy orWyre’s privacy policy, Mercuryo’s
            privacy policy, Utorg’s privacy policyor Xanpool’s privacy policy.
          </div>
        </section>

        <section>
          <div className={classes.title}>
            Do we share or transfer personal information with or to third
            parties?
          </div>
          <div className={classes.description}>
            In alignment with the purposes of processing, we share or transfer
            data with the following third-parties: Google Analytics Data
            (Product Usage Data) gathered because of your usage of our Site
            might be stored on Google Analytics’ servers. We may provide
            Business Users with access to Transactional Data to provide them
            with actionable data insights. All other data is stored using Amazon
            Web Services, Snowflake and Thoughtspot. Again, note that all data
            processing regarding personal information inputted by End-Users to
            make use of services provided by Fiat Gateways is governed by the
            privacy policies of those individual Fiat Gateway(s) used by the End
            User. As such, even though Orki may act as a data processor for
            those Fiat Gateways, all information regarding that processing of
            data is determined and provided by those Fiat Gateways in their
            privacy policies.
          </div>
        </section>
        <section>
          <div className={classes.title}>
            How is your personal information retained and secured?
          </div>
          <div className={classes.description}>
            Orki does not itself store any cardholder information and does not
            qualify as a processor, merchant, or service provider as described
            under Payment Card Industry Data Security Standards (PCI DSS). While
            Orki does not come under the scope of PCI-DSS, our existing security
            program already addresses many of its concerns. As we evolve our
            security program and processes, we will continue to assess the
            benefits of obtaining compliance. We employ industry-standard
            security measures designed to protect the security of all
            information submitted through the Software. Information gathered to
            use Google Analytics as described in this privacy policy, is stored
            by Google Analytics, which has earned the independent security
            standard ISO 27001 certification. Any information processed on, or
            through, Amazon Web Services are similarly secure by way of
            compliance with applicable industry-standard certifications and best
            practices. AWS has achieved numerous internationally-recognized
            certifications and accreditations, demonstrating compliance with
            rigorous international standards, such as ISO 27017 for cloud
            security, ISO 27701 for privacy information management, and ISO
            27018 for cloud privacy, as well as SOC 2 and SOC 3 compliance.
            Snowflake’s government deployments have achieved Federal Risk &
            Authorization Management Program (FedRAMP) Authorization to Operate
            (ATO) at the Moderate level. In addition, support for ITAR
            compliance, SOC 2 Type 2, PCI DSS compliance, and support for
            HITRUST compliance all validate the level of Snowflake security
            required by industries, and state and federal government.
            ThoughtSpot has successfully completed the Service Organization
            Control (SOC) 2 Type II audit. The SOC 2 report verifies the
            suitability of the design and operating effectiveness of
            ThoughtSpot’s information security practices, policies, procedures,
            and operations to meet the standards for security, availability, and
            confidentiality. The ISO/IEC 27001:2013 certification specifies
            security management best practices and controls for establishing,
            implementing, maintaining and continually improving an information
            security management system (ISMS) – the aim of which is to help
            organizations make the information assets they hold more secure. It
            ensures that our ISMS is fine-tuned to keep pace with changes to
            security threats, essential in the fast-paced world of IT security.
            ThoughtSpot submits to a re-certification audit every third year,
            inclusive of an annual surveillance audit. ThoughtSpot’s certificate
            can be found here. We are not responsible for any interception or
            interruption of any communications through the internet or for
            changes to or losses of data. Users of the Software are responsible
            for maintaining the security of any password or another form of
            authentication involved in obtaining access to password protected.
            To protect you and your data, we may suspend your use of any of the
            Software, without notice, pending an investigation, if any breach of
            security is suspected.
          </div>
        </section>

        <section>
          <div className={classes.title}>For how long is my data retained?</div>
          <div className={classes.description}>
            There’s no personally identifiable data collected by Orki itself.
            All personal data that is shared with Orki by Fiat Gateways will be
            retained for a maximum of 24 months, or shorter where such data are
            no longer required for the purposes for which they are processed.
          </div>
        </section>

        <section>
          <div className={classes.title}>
            What are my rights relating to my data?
          </div>
          <div className={classes.description}>
            Under the European General Data Protection Regulation, you have
            certain rights regarding your personal information. You may ask us
            to take the following actions concerning your personal information
            that we hold: Opt-out. Stop sending you direct marketing
            communications which you have previously consented to receive. We
            may continue to send you important Service-related and other
            non-marketing communications. Access. Provide you with information
            about our processing of your personal information and give you
            access to your personal information. Correct. Update or correct
            inaccuracies in your personal information. Delete. Delete your
            personal information. Transfer. Transfer a machine-readable copy of
            your personal information to you or a third party of your choice.
            Restrict. Restrict the processing of your personal information.
            Object. Object to our reliance on our legitimate interests as the
            basis of our processing of your personal information that impacts
            your rights. You can submit these requests by email to
            compliance@Orki.com. We may request specific information from you to
            help us confirm your identity and process your request. Applicable
            law may require or permit us to decline your request. If we decline
            your request, we will tell you why subject to legal restrictions. If
            you would like to submit a complaint about our use of your personal
            information or response to your requests regarding your personal
            information, you may contact us at compliance@Orki.com or submit a
            complaint to the data protection regulator in your jurisdiction.
          </div>
        </section>

        <section>
          <div className={classes.title}>Cross-Border Data Transfer</div>
          <div className={classes.description}>
            Please be aware that your data might be transferred to, processed,
            and stored in the United States or other non-EEA jurisdictions.
            Whenever we transfer your personal information out of the EEA to the
            U.S. or countries not deemed by the European Commission to provide
            an adequate level of personal information protection, the transfer
            will be based on a data transfer mechanism recognized by the
            European Commission as providing adequate protection for personal
            information.
          </div>
        </section>
      </div>
    </Responsive>
  );
};

export default Content;
