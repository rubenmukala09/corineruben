import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import heroResources from "@/assets/hero-resources-new.jpg";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  fullContent: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "How to Spot a Deepfake Voice Call in 5 Seconds",
    excerpt: "AI voice cloning has become so sophisticated that scammers can impersonate your loved ones with startling accuracy. Learn the telltale signs.",
    fullContent: `AI voice cloning has become so sophisticated that scammers can impersonate your loved ones with startling accuracy. In recent months, reports of "grandparent scams" using AI-generated voices have surged by over 400%.

**The 5-Second Test:**

1. **Ask an unexpected question** - Something only the real person would know immediately. Don't accept "I'm stressed" as an excuse for not remembering.

2. **Listen for emotional consistency** - AI voices struggle with rapid emotional shifts. If they sound flat when describing an "emergency," be suspicious.

3. **Test their patience** - Real people in genuine emergencies will show frustration if you ask clarifying questions. AI callers often remain unnaturally calm.

4. **Use your safe word** - Establish family code words that only real family members know.

5. **Hang up and call back** - Always verify by calling the person directly at a known number.

**What to do if you suspect a scam:**
- Hang up immediately
- Contact the person directly using a saved contact
- Report to local authorities
- Submit to InVision ScamShield for analysis

Remember: Legitimate emergencies can wait 5 minutes for verification. Scammers can't.`,
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1200&h=600&fit=crop",
    category: "AI Scams",
    date: "2024-03-15",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The New QR Code Scam Targeting Seniors",
    excerpt: "QR codes are everywhere now, but scammers are exploiting them to steal money and personal information. Here's what you need to know.",
    fullContent: `QR codes have become ubiquitous in our daily lives - from restaurant menus to parking meters. Unfortunately, scammers have discovered that many people, especially seniors, scan these codes without hesitation.

**How the Scam Works:**

Criminals place fake QR code stickers over legitimate ones in public places. When you scan the fake code, it can:
- Direct you to a phishing website
- Download malware to your phone
- Trigger unauthorized payments
- Steal your personal information

**Common Targets:**
- Parking meter payment codes
- Restaurant menu codes
- Store discount codes
- Event tickets
- Package delivery notifications

**How to Protect Yourself:**

1. **Inspect before scanning** - Look for signs of tampering. Is there a sticker on top of a printed code?

2. **Preview the URL** - Most modern phones show you the destination URL before opening. Check that it matches the expected website.

3. **Use official apps** - For parking, payments, and other services, download the official app instead of scanning codes.

4. **Never enter passwords** - Legitimate QR codes for public services should never ask for passwords or personal information.

5. **Be skeptical of urgent messages** - Fake QR codes on "urgent" package delivery notices are common.

**Red Flags:**
- QR code on a sticker (especially over another code)
- Asks for sensitive information after scanning
- URL doesn't match the expected company
- Requests immediate payment or action

If you've scanned a suspicious QR code, disconnect from WiFi/data immediately and run a security scan on your device. Contact your bank if you entered any financial information.`,
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=600&fit=crop",
    category: "Physical Scams",
    date: "2024-03-10",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "What to Do If You Think You've Been Scammed",
    excerpt: "Time is critical when you discover you've been scammed. Follow this step-by-step action plan to minimize damage and recover your losses.",
    fullContent: `Discovering you've been scammed can be devastating, but taking immediate action can significantly reduce the damage. Here's your complete action plan:

**IMMEDIATE ACTIONS (First Hour):**

1. **Stop all contact** - Cease communication with the scammer immediately.

2. **Contact your bank/credit card company** 
   - Report fraudulent charges
   - Freeze affected accounts
   - Request chargebacks if applicable
   - Change all PINs and passwords

3. **Document everything**
   - Save all messages, emails, and call logs
   - Screenshot websites and profile information
   - Note dates, times, and amounts
   - Write down exactly what happened while it's fresh

**WITHIN 24 HOURS:**

4. **File official reports**
   - Local police department
   - FBI Internet Crime Complaint Center (IC3.gov)
   - Federal Trade Commission (ReportFraud.ftc.gov)
   - Your state Attorney General's office

5. **Credit protection**
   - Place fraud alerts with credit bureaus (Equifax, Experian, TransUnion)
   - Consider a credit freeze
   - Request free credit reports

6. **Change ALL passwords**
   - Email accounts first
   - Banking and financial accounts
   - Social media
   - Any account that used the same password

**ONGOING PROTECTION:**

7. **Monitor accounts closely**
   - Check bank and credit card statements daily for 60 days
   - Set up fraud alerts
   - Review credit reports monthly

8. **Warn others**
   - Alert family members
   - Report to the platform where contact occurred
   - Share your experience to help others avoid similar scams

**EMOTIONAL RECOVERY:**

Remember: Being scammed doesn't mean you're foolish. These are professional criminals using sophisticated psychological techniques. Many intelligent people fall victim.

- Don't blame yourself
- Seek support from friends, family, or a counselor
- Consider joining a support group
- Learn from the experience without dwelling on it

**PREVENTION GOING FORWARD:**

- Enroll in ScamShield protection
- Take a scam prevention training course
- Set up family code words
- Enable two-factor authentication everywhere
- Never make decisions under pressure

**When to Seek Legal Help:**

Contact an attorney specializing in consumer fraud if:
- Large sums of money are involved ($10,000+)
- Identity theft has occurred
- You've signed contracts or legal documents
- The scammer has ongoing access to your information

**Resources:**

- InVision ScamShield: 24/7 threat analysis
- AARP Fraud Watch Network: 877-908-3360
- National Elder Fraud Hotline: 833-FRAUD-11

The most important thing is to act quickly. Every minute counts when money or identity is at stake.`,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=600&fit=crop",
    category: "Recovery Guide",
    date: "2024-03-05",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "Social Security Phone Scams: A Complete Guide",
    excerpt: "Scammers impersonating the Social Security Administration have stolen millions. Learn how to recognize and stop these calls.",
    fullContent: `Social Security phone scams are among the most common and costly fraud schemes targeting Americans, especially seniors. Scammers have become increasingly sophisticated, using caller ID spoofing to make it appear they're calling from the real SSA.

**How the Scam Works:**

The caller claims to be from the Social Security Administration and tells you:
- Your Social Security number has been suspended
- There's suspicious activity on your account
- Your benefits will stop unless you act immediately
- You need to verify your SSN to continue receiving benefits
- There's a warrant for your arrest due to SSA fraud
- You're eligible for increased benefits (bait to get information)

**Critical Facts:**

**The SSA will NEVER:**
- Call to threaten your benefits
- Demand immediate payment
- Ask for payment via gift cards, wire transfer, or cryptocurrency
- Ask you to mail cash
- Threaten arrest or legal action over the phone
- Ask you to provide your Social Security number over the phone

**How to Recognize the Scam:**

🚩 **Red Flags:**
- High-pressure tactics and urgency
- Threats of arrest or legal action
- Request for payment in unusual forms
- Caller ID shows "Social Security Administration" (easily spoofed)
- Background noise or call center sounds
- They ask you to confirm your SSN
- They know the last 4 digits of your SSN (often from data breaches)

**What to Do:**

1. **Hang up immediately** - Don't engage, don't press any buttons.

2. **Don't call back** - Even if they leave a "callback number."

3. **Report it:**
   - SSA Office of Inspector General: oig.ssa.gov
   - FTC: ReportFraud.ftc.gov
   - InVision ScamShield for analysis

4. **If you need to contact SSA:**
   - Call the official number: 1-800-772-1213
   - Visit ssa.gov
   - Go to your local SSA office in person

**If You've Already Shared Information:**

- Contact SSA immediately at 1-800-772-1213
- Place a fraud alert with credit bureaus
- File an identity theft report at IdentityTheft.gov
- Monitor your Social Security statement for unauthorized use
- Consider credit monitoring service

**Protecting Yourself:**

✅ **DO:**
- Hang up on unsolicited calls
- Verify by calling official SSA number
- Keep your SSN secure and private
- Register for "my Social Security" account online (prevents scammers from creating fake accounts)

❌ **DON'T:**
- Give your SSN over the phone
- Trust caller ID
- Make immediate decisions under pressure
- Send money via wire transfer or gift cards

**Special Warning for Caregivers:**

If you help an elderly family member, make sure they know:
- SSA communicates primarily by mail
- Any important notices come in writing first
- They should never give out personal information over the phone
- They should always verify with you before taking action on any "official" call

Remember: Government agencies don't operate like telemarketers. They won't cold-call you with threats or demands. If in doubt, hang up and call the official number yourself.`,
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=600&fit=crop",
    category: "Phone Scams",
    date: "2024-02-28",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Romance Scams: Protecting Your Heart and Wallet",
    excerpt: "Online romance scams cost victims over $1.3 billion last year. Learn the warning signs and how to protect yourself while dating online.",
    fullContent: `Romance scams are among the most emotionally and financially devastating frauds. Scammers create fake profiles on dating sites and social media, build relationships over time, then manipulate victims into sending money.

**The Psychology Behind Romance Scams:**

Scammers are master manipulators who:
- Study your profile to tailor their approach
- Move conversations off the platform quickly
- Profess love unusually fast
- Create elaborate backstories (often military, doctors, or working overseas)
- Use stolen photos of attractive people
- Communicate constantly to build emotional dependency

**Common Scenarios:**

1. **The Military Romance**
   - Claims to be deployed overseas
   - Needs money for emergency leave, medical care, or to ship a package home
   - Reality: Military members have access to all necessary resources

2. **The Overseas Professional**
   - Working on an oil rig, in construction, or as a doctor abroad
   - Gets into an emergency requiring money
   - Can't access their own funds due to "complications"

3. **The Cryptocurrency Investor**
   - Introduces you to "amazing" investment opportunities
   - Shows you their "profits"
   - Convinces you to invest on a fake platform
   - You can see the money grow but can't withdraw it

4. **The Inheritance Scam**
   - Has a large inheritance coming
   - Needs money to pay taxes or legal fees to claim it
   - Promises to repay you many times over

**Warning Signs:**

🚩 **Profile Red Flags:**
- Photos look professionally taken or model-quality
- Vague or generic profile information
- Grammar errors or odd phrasing
- Claims to be from one place but is currently in another

🚩 **Behavior Red Flags:**
- Professes love very quickly (within weeks or even days)
- Asks to move to email, text, or messaging apps immediately
- Gives excuses for why they can't video chat
- Their stories don't add up or change over time
- Asks many questions about your finances
- Pressures you to keep the relationship secret

🚩 **Money Red Flags:**
- Any request for money (this is the biggest red flag)
- Stories of emergencies, opportunities, or hardships requiring financial help
- Requests for gift cards, wire transfers, or cryptocurrency
- Asks you to receive/send packages or money on their behalf
- Wants you to open accounts or take loans

**How to Verify Someone:**

1. **Reverse image search** their photos (Google Images, TinEye)
2. **Video call** - insist on live video chat early
3. **Ask specific questions** about their location, job, or daily life
4. **Check their story** - does it make logical sense?
5. **Look them up** on social media - real people have established online presences
6. **Trust your instincts** - if something feels off, it probably is

**If You're a Victim:**

1. **Stop all contact** immediately
2. **Don't send any more money**
3. **Report it:**
   - FBI Internet Crime Complaint Center (IC3.gov)
   - Dating platform where you met
   - FTC (ReportFraud.ftc.gov)
   - Your local police
4. **Contact your bank** about any transfers
5. **Seek support** - Romance scam support groups exist online and locally

**Protecting Yourself:**

✅ **Smart Online Dating:**
- Keep conversations on the platform initially
- Never send money to someone you haven't met
- Don't share financial information
- Be skeptical of sob stories
- Take it slow - real relationships develop naturally
- Tell friends/family about new relationships

❌ **Never:**
- Send money or gift cards
- Share financial account information
- Accept money or packages to forward
- Send intimate photos (blackmail risk)
- Take out loans or open accounts for someone

**For Families:**

If a loved one is involved with someone online:
- Approach with care - they're emotionally invested
- Don't shame them
- Gently ask questions about inconsistencies
- Offer to help verify the person's identity
- Suggest a reverse image search together
- Be supportive - victims often feel embarrassed

**The Bottom Line:**

Legitimate romantic partners will never ask you for money, especially before meeting in person. If someone you've only met online asks for financial help, it's a scam - no matter how genuine the relationship feels.

Remember: Your heart and your wallet both deserve protection. Don't let embarrassment prevent you from seeking help if you suspect you're being scammed.`,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&h=600&fit=crop",
    category: "Online Scams",
    date: "2024-02-20",
    readTime: "12 min read",
  },
  {
    id: 6,
    title: "Email Phishing: How to Spot Fake Messages",
    excerpt: "Phishing emails are getting more sophisticated every day. Learn how to identify fake emails from banks, retailers, and even your own contacts.",
    fullContent: `Email phishing remains one of the most common cybercrimes, with billions of phishing emails sent every day. Modern phishing emails can look nearly identical to legitimate messages, making them increasingly difficult to spot.

**What is Phishing?**

Phishing is when scammers send emails pretending to be from trusted organizations to trick you into:
- Clicking malicious links
- Downloading malware
- Providing passwords or financial information
- Making urgent payments
- Confirming personal details

**Common Phishing Scenarios:**

**1. Bank/Financial Institution**
"Your account has been compromised. Click here to secure it immediately."

**2. Package Delivery**
"Your package is waiting. Confirm your address to schedule delivery."

**3. Tech Support**
"Your Microsoft/Apple account has been locked. Verify your identity to restore access."

**4. Boss/Executive Email (Business Email Compromise)**
"I need you to purchase gift cards for client gifts. Send me the codes ASAP."

**5. Tax/Government**
"You have a tax refund pending. Click to claim."

**6. Social Media**
"Someone tried to log into your account. Change your password immediately."

**How to Identify Phishing Emails:**

🔍 **Check the Sender:**
- Hover over the sender name to see the actual email address
- Look for slight misspellings (amaz0n.com instead of amazon.com)
- Be skeptical of generic greetings ("Dear Customer" instead of your name)

🔍 **Examine the Content:**
- Urgent or threatening language
- Grammar and spelling errors
- Generic greetings
- Requests for personal information
- Too good to be true offers
- Unusual requests from known contacts

🔍 **Inspect Links:**
- Hover over links without clicking (on computer)
- Check if the URL matches the claimed sender
- Look for suspicious domains
- Be wary of shortened URLs (bit.ly, tinyurl, etc.)

🔍 **Check Attachments:**
- Unexpected attachments, especially .zip, .exe, or .scr files
- Documents asking you to "enable macros"
- Invoices you didn't expect
- Files from unknown senders

**Advanced Phishing Techniques:**

**Spear Phishing:**
Targeted attacks using personal information about you:
- References to real projects you're working on
- Names of your colleagues or clients
- Specific details about your life from social media

**Clone Phishing:**
Legitimate emails you've received before, slightly modified:
- Links changed to malicious sites
- Attachments replaced with infected versions
- "Resent" with an excuse for why you're getting it again

**Whaling:**
High-value targets like executives or wealthy individuals:
- Sophisticated and personalized
- May impersonate legal documents
- Often about urgent business matters

**What to Do If You Receive a Phishing Email:**

✅ **DO:**
1. Delete it immediately
2. Report it to your email provider as phishing
3. Forward to the real organization (if claimed to be from them)
4. Notify your IT department (if work-related)
5. Submit to InVision ScamShield for analysis

❌ **DON'T:**
1. Click any links
2. Download attachments
3. Reply to the email
4. Follow instructions in the email
5. Forward it to others (except for reporting)

**If You've Already Clicked:**

**Immediate Actions:**
1. Disconnect from internet
2. Run antivirus/malware scan
3. Change passwords on another device
4. Enable two-factor authentication everywhere
5. Contact your bank if you entered financial information
6. Monitor accounts closely for unusual activity

**How to Verify Legitimate Emails:**

Instead of clicking links in emails:
1. Type the website address yourself
2. Use bookmarks for important sites
3. Call the company using a number from their official website
4. Check your account by logging in directly (not via email link)

**Protecting Yourself:**

**Email Security Best Practices:**
- Use spam filters
- Enable two-factor authentication
- Keep software updated
- Use different passwords for different accounts
- Be skeptical by default

**Red Flags to Never Ignore:**
- Requests for passwords or PINs
- Urgent financial requests
- Threats if you don't act immediately
- Prizes you didn't enter to win
- Requests to verify personal information

**For Businesses:**

Train employees to:
- Verify unusual requests through another channel
- Check email headers on suspicious messages
- Report phishing attempts to IT
- Never share credentials via email
- Use secure file sharing services

**The Bottom Line:**

When in doubt, don't click. Legitimate organizations won't mind if you verify their communication through official channels. It takes 5 minutes to verify an email, but recovering from a phishing attack can take months or years.

Remember: Your inbox is like your front door. You wouldn't let just anyone in, so treat email links and attachments with the same caution.`,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=600&fit=crop",
    category: "Email Security",
    date: "2024-02-15",
    readTime: "11 min read",
  },
];

function Articles() {
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  const toggleArticle = (id: number) => {
    setExpandedArticle(expandedArticle === id ? null : id);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        backgroundImage={heroResources}
        headline="Scam Prevention Articles & News"
        subheadline="Stay informed about the latest scam threats and protection strategies"
      />

      <TrustBar />

      {/* Articles Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-strong transition-all duration-500 rounded-2xl"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary">{article.category}</Badge>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold mb-4">{article.title}</h2>

                  <p className="text-muted-foreground text-lg mb-6">
                    {article.excerpt}
                  </p>

                  {expandedArticle === article.id && (
                    <div className="prose prose-lg max-w-none mb-6 text-foreground">
                      {article.fullContent.split("\n\n").map((paragraph, idx) => (
                        <p key={idx} className="mb-4 whitespace-pre-line">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  <Button
                    onClick={() => toggleArticle(article.id)}
                    variant="default"
                    size="lg"
                  >
                    {expandedArticle === article.id ? (
                      "Show Less"
                    ) : (
                      <>
                        Read Full Article
                        <ArrowRight className="ml-2 w-4 h-4 arrow-icon" />
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Card className="p-8 max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10">
              <h3 className="text-2xl font-bold mb-4">
                Stay Protected from Scams
              </h3>
              <p className="text-muted-foreground mb-6">
                Get expert analysis of suspicious messages, calls, and links with
                ScamShield protection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="default" size="lg">
                  <Link to="/training#scamshield">
                    Learn About ScamShield
                    <ArrowRight className="ml-2 w-4 h-4 arrow-icon" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/training#training">View Training Programs</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Articles;
