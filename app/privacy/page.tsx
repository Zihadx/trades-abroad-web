import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function Page() {
  return <LegalPage title="Privacy Policy" sections={[
    { h: "What we collect", p: "Information you submit through our forms, such as your name, email address, role and message, plus basic technical data needed to operate and secure the site." },
    { h: "How we use it", p: "To respond to your enquiry, send updates you subscribed to, operate and improve the site, and protect against abuse." },
    { h: "Sharing", p: "We do not sell personal data. We may share it with service providers who help us run the site, under appropriate safeguards, or where the law requires." },
    { h: "Your choices", p: "You can ask to access, correct or delete your information, and unsubscribe from emails at any time. Contact us using the details on the Contact page." },
    { h: "Retention and security", p: "We keep information only as long as needed for the purposes above and use reasonable technical and organisational measures to protect it." },
  ]} />;
}
