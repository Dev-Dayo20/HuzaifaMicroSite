import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Download,
  Copy,
  Send,
  MessageSquare,
  Building2,
  Briefcase,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import photo1 from "../../src/assets/photo1.jpg";
import disbursify from "../../src/assets/disbursify.jpg";
import hydroiq from "../../src/assets/hydroiq.png";
import kirkira from "../../src/assets/kirkira.jpg";
import startupcaravan from "../../src/assets/startupcaravan.png";
import huzexlogo from "../../src/assets/huzexlogo.png";
import treesense from "../../src/assets/treesense.jpg";

/* ----------------------- helpers: env & normalizers ----------------------- */
const val = (key, fallback = "") => {
  const v = import.meta.env[key];
  return v !== undefined && String(v).trim() !== ""
    ? String(v).trim()
    : fallback;
};

const normalizeEmailHref = (raw) => {
  if (!raw) return "";
  return raw.startsWith("mailto:") ? raw : `mailto:${raw}`;
};
const stripMailto = (mailtoHref) => {
  if (!mailtoHref) return "";
  return mailtoHref.startsWith("mailto:")
    ? mailtoHref.slice("mailto:".length)
    : mailtoHref;
};
const normalizeWhatsappHref = (rawNumberOrUrl) => {
  if (!rawNumberOrUrl) return "";
  if (/^https?:\/\//i.test(rawNumberOrUrl)) return rawNumberOrUrl;
  const digits = rawNumberOrUrl.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
};

/* ----------------------------- env variables ------------------------------ */
const phone = val("VITE_PHONE_NUMBER"); // e.g. +2348039...
const emailHref = normalizeEmailHref(val("VITE_EMAIL_ADDRESS")); // accepts "me@x.com" or "mailto:me@x.com"
const emailPlain = stripMailto(emailHref);
const whatsappHref = normalizeWhatsappHref(
  val("VITE_WHATSAPP_NUMBER") || val("VITE_WHATSAPP_URL")
);
const mapsHref = val(
  "VITE_MAPS_URL",
  "https://maps.google.com/?q=Kirkira%20Innovation%20Hub%2C%20Katsina%2C%20Nigeria"
);
const siteUrl = val("VITE_SITE_URL");
const permalink = val("VITE_MICROSITE_URL", siteUrl);

const LINKS = {
  phone,
  whatsapp: whatsappHref,
  email: emailHref,
  maps: mapsHref,
  site: siteUrl,
  linkedin: val("VITE_LINKEDIN_URL"),
  twitter: val("VITE_TWITTER_URL"),
  facebook: val("VITE_FACEBOOK_URL"),
  instagram: val("VITE_INSTAGRAM_URL"),
  youtube: val("VITE_YOUTUBE_URL"),
  permalink,
};

const LOGOS = {
  bayani: "https://dummyimage.com/80x80/06b6d4/ffffff&text=B",
};

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur">
      {children}
    </span>
  );
}

function LinkTile({ href, title, desc, icon: Icon, logo }) {
  return (
    <a
      href={href || "#"}
      target="_blank"
      rel="noreferrer"
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
    >
      <div className="flex items-center gap-4">
        {logo ? (
          <img
            src={logo}
            alt={title}
            className="h-12 w-12 rounded-xl object-cover ring-1 ring-white/20"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/20 ring-1 ring-white/20">
            <Icon className="h-6 w-6 text-white/80" />
          </div>
        )}
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="text-xs text-white/70">{desc}</div>
        </div>
        <ArrowRight className="ml-auto h-4 w-4 text-white/50 transition group-hover:translate-x-1" />
      </div>
    </a>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wide text-white/80">
        {title}
      </h3>
      {children}
    </section>
  );
}

export default function VBCMicrosite() {
  const [isCopied, setIsCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setStatusMessage("Sending...");

    try {
      const response = await fetch("https://formspree.io/f/xrblvlrz", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatusMessage("Message sent successfully!");
        e.target.reset();
      } else {
        setStatusMessage(
          "There was a problem sending your message. Please try again."
        );
      }
    } catch (error) {
      // console.error("Network error:", error);
      setStatusMessage("A network error occurred. Please try again.");
    }
  };

  const vcf = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Musa;Huzaifa Yakubu;;;",
    "FN:Huzaifa Yakubu Musa",
    "TITLE:Founder/CEO",
    "ORG:Kirkira Innovation Hub;Huzex Nigeria Ltd;Startup Caravan",
    phone ? `TEL;TYPE=CELL:${phone}` : null,
    emailPlain ? `EMAIL:${emailPlain}` : null,
    siteUrl ? `URL:${siteUrl}` : permalink ? `URL:${permalink}` : null,
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n");
  const vcfHref = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcf)}`;

  const copyLink = async () => {
    try {
      if (!LINKS.permalink) throw new Error("No permalink set");
      await navigator.clipboard.writeText(LINKS.permalink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      alert("Copy failed – please check that VITE_MICROSITE_URL is set.");
    }
  };

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-700 via-indigo-900 to-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.35)_0%,rgba(15,23,42,0)_55%)]" />
      <div className="mx-auto max-w-md px-4 py-8 sm:max-w-lg">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <img
              src={photo1}
              alt="Huzaifa avatar"
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-white/20"
            />
            <div className="space-y-1">
              <CardTitle>Huzaifa Yakubu Musa</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge>Founder/CEO · Kirkira Innovation Hub</Badge>
                <Badge>Huzex Nigeria Ltd</Badge>
                <Badge>Startup Caravan</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button asChild disabled={!phone}>
                <a href={phone ? `tel:${phone}` : "#"}>
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              </Button>
              <Button asChild disabled={!LINKS.whatsapp}>
                <a href={LINKS.whatsapp || "#"}>
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild disabled={!LINKS.email}>
                <a href={LINKS.email || "#"}>
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </Button>
              <Button asChild disabled={!LINKS.maps}>
                <a href={LINKS.maps || "#"}>
                  <MapPin className="h-4 w-4" />
                  Locate
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="h-20 w-20 overflow-hidden rounded-xl ring-1 ring-white/20">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                    "https://huzaifa-micro-site.vercel.app/" || ""
                  )}`}
                  alt="QR to share"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Share my smart card</div>
                <div className="text-xs text-white/70">
                  Scan the QR or copy link to share instantly.
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <Button onClick={copyLink} disabled={!LINKS.permalink}>
                    <Copy className="h-4 w-4" />
                    {isCopied ? "Copied!" : "Copy Link"}
                  </Button>
                  <a
                    href={vcfHref}
                    download="HuzaifaYakubuMusa.vcf"
                    className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-white/90"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Save Contact
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 space-y-6">
          <Section title="About">
            <p className="leading-relaxed text-white/80">
              Entrepreneur, product builder, and ecosystem catalyst based in
              Katsina & Abuja. I lead innovation programs, agritech ventures,
              and digital transformation initiatives across Northern Nigeria and
              beyond. Let’s collaborate on impactful, scalable solutions.
            </p>
          </Section>

          <Section title="Ventures & Projects">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <LinkTile
                href="https://kirkirahub.com.ng"
                title="Kirkira Innovation Hub"
                desc="Incubation · Startup Studio"
                icon={Building2}
                logo={kirkira}
              />
              <LinkTile
                href="https://huzex.ng"
                title="Huzex Nigeria Ltd"
                desc="Agribusiness · Logistics"
                icon={Briefcase}
                logo={huzexlogo}
              />
              <LinkTile
                href="#"
                title="Startup Caravan"
                desc="Founder Upskilling · Media"
                icon={Globe}
                logo={startupcaravan}
              />
              <LinkTile
                href="#"
                title="Disbursify"
                desc="Data · Disbursement Tech"
                icon={Globe}
                logo={disbursify}
              />
              {/* <LinkTile
                href="#"
                title="BayānAI"
                desc="AI Islamic EdTech"
                icon={Globe}
                logo={LOGOS.bayani}
              /> */}
              <LinkTile
                href="#"
                title="HydroIQ"
                desc="Smart Greenhouse / IoT"
                icon={Globe}
                logo={hydroiq}
              />
              <LinkTile
                href="#"
                title="TreeSense"
                desc=" An integrated SaaS platform: - IoT sensors"
                icon={Globe}
                logo={treesense}
              />
            </div>
          </Section>

          <Section title="Socials">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              <a
                href={LINKS.linkedin || "#"}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href={LINKS.twitter || "#"}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10"
              >
                <Twitter className="h-4 w-4" />
                <span className="hidden sm:inline">X</span>
              </a>
              <a
                href={LINKS.facebook || "#"}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10"
              >
                <Facebook className="h-4 w-4" />
                <span className="hidden sm:inline">Facebook</span>
              </a>
              <a
                href={LINKS.instagram || "#"}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10"
              >
                <Instagram className="h-4 w-4" />
                <span className="hidden sm:inline">Instagram</span>
              </a>
              <a
                href={LINKS.youtube || "#"}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10"
              >
                <Youtube className="h-4 w-4" />
                <span className="hidden sm:inline">YouTube</span>
              </a>
            </div>
          </Section>

          <Section title="Quick Message">
            <Card>
              <CardContent className="pt-6">
                <form className="space-y-3" onSubmit={onSubmit}>
                  {statusMessage && <p>{statusMessage}</p>}
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                  />
                  <Textarea placeholder="Short message" rows={4} required />

                  <div className="flex gap-3 flex-wrap">
                    <Button type="submit">
                      <Send className="h-4 w-4" />
                      send
                    </Button>
                    <a
                      href={vcfHref}
                      download="HuzaifaYakubuMusa.vcf"
                      className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
                    >
                      <Download className="mr-2 h-4 w-4" /> Download vCard
                    </a>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Section>

          <div className="pb-16 pt-4 text-center text-xs text-white/50">
            © {new Date().getFullYear()} Huzaifa Yakubu Musa · Smart Card ·
            Built with ❤️
          </div>
        </div>
      </div>
    </div>
  );
}
