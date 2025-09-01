import React from 'react'
import { Phone, Mail, MapPin, Linkedin, Facebook, Twitter, Instagram, Youtube, Download, Copy, Send, MessageSquare, Building2, Briefcase, Globe, ArrowRight, QrCode } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const LINKS = {
  phone: '+2348039254849',
  whatsapp: 'https://wa.me/2348039254849?text=Hello%20Huzaifa%2C%20I%27d%20like%20to%20connect.',
  email: 'mailto:huzaifa@huzex.ng',
  maps: 'https://maps.google.com/?q=Kirkira%20Innovation%20Hub%2C%20Katsina%2C%20Nigeria',
  site: 'https://huzex.ng',
  linkedin: 'https://www.linkedin.com/in/huzaifayakub/',
  twitter: 'https://x.com/',
  facebook: 'https://facebook.com/',
  instagram: 'https://instagram.com/',
  youtube: 'https://youtube.com/',
  permalink: 'https://huzex.ng/huzaifa',
}

const LOGOS = {
  avatar: 'https://dummyimage.com/160x160/0b1220/ffffff&text=HY',
  kirkira: 'https://dummyimage.com/80x80/0ea5e9/ffffff&text=K',
  huzex: 'https://dummyimage.com/80x80/22c55e/ffffff&text=H',
  caravan: 'https://dummyimage.com/80x80/f97316/ffffff&text=SC',
  disbursify: 'https://dummyimage.com/80x80/6366f1/ffffff&text=D',
  bayani: 'https://dummyimage.com/80x80/06b6d4/ffffff&text=B',
  hydroiq: 'https://dummyimage.com/80x80/84cc16/ffffff&text=HQ',
}

function Badge({ children }) {
  return (
    <span className='inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur'>
      {children}
    </span>
  )
}

function LinkTile({ href, title, desc, icon: Icon, logo }) {
  return (
    <a href={href} target='_blank' rel='noreferrer' className='group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10'>
      <div className='flex items-center gap-4'>
        {logo ? (
          <img src={logo} alt={title} className='h-12 w-12 rounded-xl object-cover ring-1 ring-white/20' />
        ) : (
          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-black/20 ring-1 ring-white/20'>
            <Icon className='h-6 w-6 text-white/80' />
          </div>
        )}
        <div>
          <div className='text-sm font-semibold text-white'>{title}</div>
          <div className='text-xs text-white/70'>{desc}</div>
        </div>
        <ArrowRight className='ml-auto h-4 w-4 text-white/50 transition group-hover:translate-x-1' />
      </div>
    </a>
  )
}

function Section({ title, children }) {
  return (
    <section className='space-y-3'>
      <h3 className='text-sm font-bold uppercase tracking-wide text-white/80'>{title}</h3>
      {children}
    </section>
  )
}

export default function VBCMicrosite() {
  const vcf = `BEGIN:VCARD\nVERSION:3.0\nN:Musa;Huzaifa Yakubu;;;\nFN:Huzaifa Yakubu Musa\nTITLE:Founder/CEO\nORG:Kirkira Innovation Hub;Huzex Nigeria Ltd;Startup Caravan\nTEL;TYPE=CELL:${LINKS.phone}\nEMAIL:${LINKS.email.replace('mailto:','')}\nURL:${LINKS.site}\nEND:VCARD`
  const vcfHref = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcf)}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.permalink)
      alert('Link copied to clipboard')
    } catch (e) {
      alert('Copy failed – your browser may block clipboard access.')
    }
  }

  return (
    <div className='min-h-screen text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-700 via-indigo-900 to-slate-950'>
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.35)_0%,rgba(15,23,42,0)_55%)]' />
      <div className='mx-auto max-w-md px-4 py-8 sm:max-w-lg'>
        <Card>
          <CardHeader className='flex flex-row items-center gap-4'>
            <img src={LOGOS.avatar} alt='Huzaifa avatar' className='h-16 w-16 rounded-2xl object-cover ring-2 ring-white/20' />
            <div className='space-y-1'>
              <CardTitle>Huzaifa Yakubu Musa</CardTitle>
              <div className='flex flex-wrap gap-2'>
                <Badge>Founder/CEO · Kirkira Innovation Hub</Badge>
                <Badge>Huzex Nigeria Ltd</Badge>
                <Badge>Startup Caravan</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-3'>
              <Button asChild><a href={`tel:${LINKS.phone}`}><Phone className='h-4 w-4' />Call</a></Button>
              <Button asChild><a href={LINKS.whatsapp}><MessageSquare className='h-4 w-4' />WhatsApp</a></Button>
              <Button asChild><a href={LINKS.email}><Mail className='h-4 w-4' />Email</a></Button>
              <Button asChild><a href={LINKS.maps}><MapPin className='h-4 w-4' />Locate</a></Button>
            </div>
            <div className='flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='h-20 w-20 overflow-hidden rounded-xl ring-1 ring-white/20'>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(LINKS.permalink)}`}
                  alt='QR to share'
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='flex-1'>
                <div className='text-sm font-medium'>Share my smart card</div>
                <div className='text-xs text-white/70'>Scan the QR or copy link to share instantly.</div>
                <div className='mt-2 flex gap-2 flex-wrap'>
                  <Button onClick={copyLink}><Copy className='h-4 w-4' />Copy Link</Button>
                  <a href={vcfHref} download='HuzaifaYakubuMusa.vcf' className='inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-white/90'>
                    <Download className='h-4 w-4 mr-2'/>Save Contact
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='mt-6 space-y-6'>
          <Section title='About'>
            <p className='leading-relaxed text-white/80'>
              Entrepreneur, product builder, and ecosystem catalyst based in Katsina & Abuja. I lead
              innovation programs, agritech ventures, and digital transformation initiatives across
              Northern Nigeria and beyond. Let’s collaborate on impactful, scalable solutions.
            </p>
          </Section>

          <Section title='Ventures & Projects'>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              <LinkTile href='https://kirkirahub.com.ng' title='Kirkira Innovation Hub' desc='Incubation · Startup Studio' icon={Building2} logo={LOGOS.kirkira} />
              <LinkTile href='https://huzex.ng' title='Huzex Nigeria Ltd' desc='Agribusiness · Logistics' icon={Briefcase} logo={LOGOS.huzex} />
              <LinkTile href='https://startupcaravan.ng' title='Startup Caravan' desc='Founder Upskilling · Media' icon={Globe} logo={LOGOS.caravan} />
              <LinkTile href='#' title='Disbursify' desc='Data · Disbursement Tech' icon={Globe} logo={LOGOS.disbursify} />
              <LinkTile href='#' title='BayānAI' desc='AI Islamic EdTech' icon={Globe} logo={LOGOS.bayani} />
              <LinkTile href='#' title='HydroIQ' desc='Smart Greenhouse / IoT' icon={Globe} logo={LOGOS.hydroiq} />
            </div>
          </Section>

          <Section title='Socials'>
            <div className='grid grid-cols-3 gap-3 sm:grid-cols-5'>
              <a href={LINKS.linkedin} className='flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10'><Linkedin className='h-4 w-4' /><span className='hidden sm:inline'>LinkedIn</span></a>
              <a href={LINKS.twitter} className='flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10'><Twitter className='h-4 w-4' /><span className='hidden sm:inline'>X</span></a>
              <a href={LINKS.facebook} className='flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10'><Facebook className='h-4 w-4' /><span className='hidden sm:inline'>Facebook</span></a>
              <a href={LINKS.instagram} className='flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10'><Instagram className='h-4 w-4' /><span className='hidden sm:inline'>Instagram</span></a>
              <a href={LINKS.youtube} className='flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10'><Youtube className='h-4 w-4' /><span className='hidden sm:inline'>YouTube</span></a>
            </div>
          </Section>

          <Section title='Quick Message'>
            <Card>
              <CardContent className='pt-6'>
                {/* Replace action URL with your Formspree form endpoint */}
                <form action='https://formspree.io/f/your_form_id' method='POST' className='space-y-3'>
                  <Input name='name' placeholder='Your name' required />
                  <Input type='email' name='email' placeholder='Your email' required />
                  <Textarea name='message' placeholder='Short message' rows={4} required />
                  <div className='flex gap-3 flex-wrap'>
                    <Button asChild><button type='submit'><Send className='h-4 w-4'/>Send</button></Button>
                    <a href={vcfHref} download='HuzaifaYakubuMusa.vcf' className='inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10'>
                      <Download className='mr-2 h-4 w-4' /> Download vCard
                    </a>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Section>

          <div className='pb-16 pt-4 text-center text-xs text-white/50'>
            © {new Date().getFullYear()} Huzaifa Yakubu Musa · Smart Card · Built with ❤️
          </div>
        </div>
      </div>
    </div>
  )
}
