import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FlowingWaves from "@/components/FlowingWaves";
import AIPartnersCarousel from "@/components/AIPartnersCarousel";
import ExpandableArticle from "@/components/ExpandableArticle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Download, Shield, Wifi, KeyRound, Heart, FileText, BookOpen, ShoppingCart } from "lucide-react";

const Resources = () => {
  const guides = [
    { icon: BookOpen, title: "Scam-Proof Playbook", desc: "Complete emergency scripts & protocols", price: "$29.99" },
    { icon: Heart, title: "Caregivers' Security Guide", desc: "Protect vulnerable loved ones from scams", price: "$24.99" },
    { icon: Wifi, title: "Home Wi-Fi Safety Manual", desc: "Secure your network in 15 minutes", price: "$19.99" },
    { icon: KeyRound, title: "Password Creation Workbook", desc: "Offline password storage system", price: "$17.99" },
    { icon: FileText, title: "Grandparent-Text 101 Guide", desc: "Spot fake 'emergency' family texts", price: "$22.99" },
    { icon: Shield, title: "60-Second Pause Protocol Kit", desc: "Printable guides and training materials", price: "$34.99" },
  ];

  const products = [
    { name: "USB Data Blocker (2-pack)", price: "$12.99" },
    { name: "Webcam Privacy Covers (3-pack)", price: "$8.99" },
    { name: "RFID-Blocking Card Sleeves (5-pack)", price: "$14.99" },
    { name: "Password Notebook (Hardcover)", price: "$16.99" },
    { name: "Complete Security Kit (Bundle)", price: "$44.99" },
  ];

  const blogArticles = [
    {
      title: "How to Spot a Deepfake Voice Call in 5 Minutes",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=400&fit=crop",
      preview: "AI-generated voice clones are now sophisticated enough to fool even tech-savvy individuals. Learn the telltale signs that can help you identify a deepfake call before it's too late.",
      fullContent: `AI-generated voice clones are becoming increasingly sophisticated, capable of fooling even tech-savvy individuals. However, there are several telltale signs that can help you identify a deepfake call before it's too late.

**1. Listen for Unnatural Pauses and Breathing (0-30 seconds)**
Real humans have natural speech patterns with varied pauses, breaths, and occasional stumbles. AI voice clones often have:
- Perfectly consistent breathing patterns
- Unnaturally smooth transitions between words
- No "ums," "ahs," or natural hesitations
- Robotic timing in responses

**2. Test with Personal Questions (30-60 seconds)**
Ask questions only the real person would know:
- "What did we talk about last Tuesday?"
- "What's your dog's name?"
- "Where did we meet for lunch last month?"
Deepfake callers will dodge, deflect, or give vague answers.

**3. Listen for Audio Quality Issues (Throughout Call)**
Many deepfake calls exhibit:
- Slight echoing or reverb
- Background noise that doesn't match the claimed location
- Audio quality that's too perfect (no room ambiance)
- Glitchy transitions when the AI generates new speech

**4. Notice Emotional Inconsistencies (1-2 minutes)**
AI struggles with genuine emotion:
- Inappropriate emotional responses
- Flat affect when discussing emotional topics
- Inconsistent tone (e.g., claiming panic but sounding calm)
- Inability to laugh naturally or express surprise

**5. Request Video Verification (Immediately if suspicious)**
If you're suspicious, ask to switch to video. Scammers will:
- Claim their camera is broken
- Say they're in a location without video capability
- Make excuses about poor connectivity
- Refuse or end the call

**The 60-Second Pause Protocol:**
1. STOP: Don't take immediate action
2. VERIFY: Call back using a known number
3. CONFIRM: Ask personal questions
4. REPORT: If it's a scam, report to authorities

**Real Example:**
A 72-year-old woman received a call from her "grandson" claiming he was in jail and needed $8,000 bail money. She noticed:
- His voice sounded "slightly off"
- He couldn't remember her dog's name
- He became agitated when she asked about his recent birthday
- He refused to let her speak to a police officer

She hung up, called her grandson's real number, and discovered he was safe at home. The scammer had used an AI voice clone created from her grandson's social media videos.

**Action Steps:**
- Establish a family safe-word for emergencies
- Never send money based on a phone call alone
- Always verify through a secondary channel
- Trust your instincts—if something feels off, it probably is

Remember: Legitimate emergencies allow time for verification. Scammers create false urgency to bypass your judgment.`
    },
    {
      title: "New QR Code Scams Targeting Seniors",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=400&fit=crop",
      preview: "QR code scams have surged 300% in the past year, with seniors being primary targets. Scammers are placing fake QR codes over legitimate ones in parking meters, restaurants, and even medical facilities.",
      fullContent: `QR code scams have surged 300% in the past year, with seniors being primary targets. Scammers are placing fake QR codes over legitimate ones in parking meters, restaurants, and even medical facilities.

**How the Scam Works:**

**Type 1: Overlay Scams**
Criminals print fake QR codes and place them over legitimate ones:
- Parking meters and parking payment signs
- Restaurant table ordering systems
- Store checkout stations
- Package delivery notices on doors

**Type 2: Phishing QR Codes**
Fraudulent QR codes arrive via:
- Fake utility bills in the mail
- Text messages claiming unpaid tolls or tickets
- Letters appearing to be from Medicare or Social Security
- Fake donation requests after disasters

**Type 3: Banking QR Codes**
Sophisticated scams involving:
- Fake "update your account" QR codes
- Fraudulent peer-to-peer payment requests
- Fake bank security alerts with QR codes

**Warning Signs:**
1. **Physical Tampering**: Look for stickers placed over existing QR codes
2. **Unexpected Communications**: Legitimate companies rarely send QR codes via mail or text
3. **Urgency Language**: "Scan immediately" or "Account will be closed"
4. **No Context**: QR code with no explanation of where it leads
5. **Generic Messages**: "Valued customer" instead of your name

**How to Protect Yourself:**

**Before Scanning:**
- Inspect physical QR codes for signs of stickers or tampering
- Check if the code is printed directly or added afterward
- Look for peeling edges or misalignment
- Verify the source before scanning any code

**While Scanning:**
- Use your phone's built-in camera app, not third-party QR apps
- Preview the URL before opening it
- Look for legitimate domain names (e.g., company.com, not company-secure123.net)
- Don't scan codes from unsolicited mail or texts

**After Scanning:**
- Never enter personal information on pages accessed via QR code
- Don't download apps prompted by QR codes
- Don't make payments through scanned links
- Close suspicious pages immediately

**Real-Life Example:**
An 80-year-old man in Ohio scanned a QR code on what appeared to be a parking meter ticket on his windshield. The code directed him to a fake parking payment site that looked identical to the city's official site. He entered his credit card information and lost $3,200 to fraudulent charges before noticing.

Another case involved fake QR codes placed on donation canisters at a grocery store, appearing to collect for a local charity. The codes actually led to the scammer's personal Venmo account.

**Safe Alternatives:**
- Manually type URLs into your browser
- Call companies directly using official phone numbers
- Use official apps downloaded from legitimate app stores
- Pay in person when possible

**What to Do If You've Been Scammed:**
1. Contact your bank immediately to freeze your accounts
2. File a report with local police
3. Report to the FTC at ReportFraud.ftc.gov
4. Change all passwords for affected accounts
5. Monitor your credit report for suspicious activity

**Bottom Line:**
QR codes are convenient but risky. When in doubt, take the extra time to verify legitimacy through official channels. No legitimate organization will pressure you to scan a QR code immediately.`
    },
    {
      title: "What to Do If You Think You've Been Scammed",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=400&fit=crop",
      preview: "Discovering you've been scammed is devastating, but quick action can minimize damage and help catch the perpetrators. Follow these immediate steps to protect yourself and potentially recover your losses.",
      fullContent: `Discovering you've been scammed is devastating, but quick action can minimize damage and help catch the perpetrators. Follow these immediate steps to protect yourself and potentially recover your losses.

**IMMEDIATE ACTIONS (First 30 Minutes):**

**Step 1: STOP All Communication**
- Do NOT continue talking to the scammer
- Block their phone number and email
- Do not respond to follow-up calls or messages
- Save all communication evidence before blocking

**Step 2: Secure Your Financial Accounts**
If you shared financial information:
- Call your bank/credit card company IMMEDIATELY
- Report the fraud and freeze affected accounts
- Request new cards and account numbers
- Enable fraud alerts on all accounts
- File a dispute for unauthorized charges

If you sent money via:
- **Wire Transfer**: Contact the wire transfer company immediately (Western Union: 1-800-448-1492, MoneyGram: 1-800-926-9400)
- **Gift Cards**: Contact the gift card company with card numbers (though recovery is unlikely)
- **Cryptocurrency**: Contact the exchange platform, but recovery is typically impossible
- **Check**: Contact your bank to stop payment if not yet cleared
- **P2P Apps** (Venmo, Zelle, PayPal): Report immediately, but recovery chances are low

**Step 3: Document Everything**
Collect and save:
- Screenshots of all messages and emails
- Phone call logs with dates and times
- Bank statements showing fraudulent transactions
- Copies of any documents you signed or received
- URLs of websites you visited
- Photos of any physical items involved

**WITHIN 24 HOURS:**

**Step 4: File Official Reports**
Report to multiple agencies:

1. **Federal Trade Commission (FTC)**
   - Visit ReportFraud.ftc.gov
   - Get an official report number
   - Create a recovery plan

2. **Local Police Department**
   - File a police report in person
   - Get a copy of the report for your records
   - Provide all documentation

3. **FBI Internet Crime Complaint Center (IC3)**
   - Visit ic3.gov for online scams
   - Required for scams over $5,000

4. **Your State Attorney General**
   - Find at usa.gov/state-consumer
   - State-specific protections may apply

**Step 5: Protect Your Identity**
If you shared personal information:
- Place fraud alerts with all three credit bureaus (Equifax, Experian, TransUnion)
- Consider a credit freeze
- Get your free credit reports at AnnualCreditReport.com
- Monitor for identity theft signs
- File an identity theft report if necessary

**Step 6: Change All Passwords**
- Banking and financial accounts (priority)
- Email accounts
- Social media accounts
- Shopping accounts
- Any account using the same password

Use strong, unique passwords and enable two-factor authentication everywhere possible.

**ONGOING PROTECTION (First Month):**

**Week 1:**
- Monitor bank accounts daily
- Check credit card statements
- Review credit reports
- Follow up with banks and authorities

**Week 2-4:**
- Continue daily account monitoring
- Watch for new scam attempts (you're on "sucker lists")
- Be alert for "recovery scams" (scammers posing as helpers)
- Consider changing your phone number if harassment continues

**EMOTIONAL RECOVERY:**

Scam victims often experience:
- Shame and embarrassment
- Anger and betrayal
- Depression and anxiety
- Self-blame

Remember:
- You are a victim of a crime
- Scammers are professional criminals
- Anyone can be fooled by sophisticated scams
- Seeking support is a sign of strength, not weakness

**Resources:**
- AARP Fraud Watch Network: 877-908-3360
- National Elder Fraud Hotline: 833-FRAUD-11
- Victim Support Groups: Contact local senior centers

**Prevention Going Forward:**

1. **Establish Verification Protocols**
   - Family safe-words for emergencies
   - Official numbers for all institutions
   - Never make decisions under pressure

2. **Set Up Safeguards**
   - Account alerts for all transactions
   - Two-factor authentication
   - Limited access to funds (separate accounts)

3. **Stay Educated**
   - Attend fraud prevention workshops
   - Subscribe to scam alerts
   - Share your story to help others

**Recovery Scam Warning:**
After being scammed, you may be targeted by "recovery" scammers claiming they can get your money back for an upfront fee. This is ALWAYS a scam. Legitimate law enforcement never charges fees to investigate crimes.

**Your Rights:**
- Right to file complaints without retaliation
- Right to dispute fraudulent charges
- Right to place security freezes
- Right to free credit reports after identity theft
- Right to assistance from consumer protection agencies

**Hope for Recovery:**
While not all scam losses can be recovered, reporting increases the chances of:
- Catching the criminals
- Protecting other potential victims
- Recovering some funds if caught early
- Building a case for insurance or tax deductions

Remember: Taking action quickly is your best defense. Don't let embarrassment stop you from protecting yourself and others.`
    },
  ];

  const faqs = [
    {
      q: "Is this only for seniors?",
      a: "Not at all! While we specialize in adults 40+, anyone who wants AI scam protection is welcome. We've trained ages 35-85.",
    },
    {
      q: "Do you ask for my passwords?",
      a: "NEVER. We teach verification techniques without ever requesting sensitive data. If anyone claiming to be InVision asks for passwords, it's a scam.",
    },
    {
      q: "What if I'm not tech-savvy?",
      a: "Perfect! Our training assumes zero technical knowledge. If you can use email, you're ready.",
    },
    {
      q: "Can family members join my training?",
      a: "Yes! Our Family Small Group plan includes your spouse FREE. Priority Private sessions can include up to 3 people.",
    },
    {
      q: "Do you record Zoom sessions?",
      a: "No. We do NOT record classes to protect your privacy. No login required to attend.",
    },
    {
      q: "What are your rescheduling terms?",
      a: "Single Small Group: Not available. Family Small Group: One free reschedule (14 days notice). Priority Private: Easy reschedule (24hr notice).",
    },
    {
      q: "Do you provide certificates?",
      a: "Yes! Every training includes a digital certificate of completion you can print or share.",
    },
    {
      q: "Do you travel for in-person training?",
      a: "Yes! We serve Dayton metro locally and offer nationwide in-person training. InVision covers all trainer travel costs.",
    },
    {
      q: "How do military/veteran discounts work?",
      a: "Veterans and active military receive 20% off all training. Cancer patients receive 25% off. Contact us with verification.",
    },
    {
      q: "What's your refund policy?",
      a: "We offer a 7-day satisfaction guarantee. If you're not satisfied with your training, contact us within 7 days for a full refund.",
    },
    {
      q: "How long does Scam Shield analysis take?",
      a: "Standard Plan: ≤ 48 hours. Premium Plan: ≤ 24 hours. Unlimited Plan: ≤ 12 hours.",
    },
    {
      q: "Can I submit items in Spanish or French?",
      a: "Yes! We analyze items in English, Spanish, and French. Other languages may take longer.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <Hero
        useRouteBasedImages={true}
        headline="Free Resources & Tools"
        subheadline="Downloadable guides, security tools, and answers to your questions—everything you need to stay safe."
        showScrollIndicator={true}
      />

      {/* Books & Guides Shop */}
      <section className="py-4 bg-background relative">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-6">Books & Guides for Purchase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.map((guide, index) => (
              <Card key={index} className="p-3 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                    <guide.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{guide.title}</h3>
                <p className="text-muted-foreground text-center mb-3">{guide.desc}</p>
                <p className="text-2xl font-bold gradient-text-primary text-center mb-4">{guide.price}</p>
                <Button asChild className="w-full" variant="default">
                  <Link to="/contact">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    PURCHASE NOW
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Tools Shop */}
      <section className="py-4 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-2">Security Tools Shop</h2>
          <p className="text-center text-muted-foreground mb-6 text-lg">
            All profits fund free training for seniors in need.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <Card key={index} className="p-3 hover:shadow-medium transition-all hover:-translate-y-1 flex flex-col rounded-2xl">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-center flex-grow">{product.name}</h3>
                <p className="text-2xl font-bold gradient-text-primary text-center mb-4">{product.price}</p>
                <Button asChild variant="default" className="w-full">
                  <Link to="/contact">BUY NOW</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-4 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-6">Latest Scam Alerts & Protection Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {blogArticles.map((article, index) => (
              <ExpandableArticle
                key={index}
                title={article.title}
                preview={article.preview}
                fullContent={article.fullContent}
                image={article.image}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">VIEW ALL ARTICLES</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-4 bg-muted" id="faq">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-6">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-2xl px-6 border border-border hover:border-primary/50 transition-all shadow-soft hover:shadow-medium">
                  <AccordionTrigger className="text-lg font-bold hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-4 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-accent-foreground mb-8">Still Have Questions?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gold" size="xl">
              <Link to="/contact">CONTACT US</Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/training">BOOK TRAINING</Link>
            </Button>
          </div>
        </div>
      </section>

      <AIPartnersCarousel />

      <Footer />
    </div>
  );
};

export default Resources;
