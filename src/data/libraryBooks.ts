/**
 * libraryBooks.ts
 *
 * Canonical source for the 10 InVision Network digital library books.
 * Each book has 8 chapters with real educational content.
 * This data seeds the `books` and `book_content` Supabase tables via
 * the admin seed script and is also used for SSR/pre-render.
 */

export interface BookChapter {
  chapter_number: number;
  chapter_title: string;
  content_html: string;
  page_start: number;
  page_end: number;
}

export interface LibraryBook {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  cover_image: string;
  total_pages: number;
  price: number;
  bulk_price: number;
  category: string;
  tag: string;
  stripe_price_id: string;
  chapters: BookChapter[];
}

// ---------------------------------------------------------------------------
// Helper to wrap chapter content in consistent HTML skeleton
// ---------------------------------------------------------------------------
const ch = (
  chapter_number: number,
  chapter_title: string,
  body: string,
  page_start: number,
  page_end: number
): BookChapter => ({
  chapter_number,
  chapter_title,
  content_html: `<article class="chapter-content"><h2>${chapter_title}</h2>${body}</article>`,
  page_start,
  page_end,
});

// ---------------------------------------------------------------------------
// 1. Digital Self-Defense
// ---------------------------------------------------------------------------
const digitalSelfDefense: LibraryBook = {
  slug: "digital-self-defense",
  title: "Digital Self-Defense",
  subtitle: "Protect Yourself Online in the AI Age",
  description:
    "A practical, step-by-step guide to defending yourself against modern cyber threats. Covers password management, two-factor authentication, device hardening, phishing recognition, and building lasting secure habits.",
  cover_image: "/images/books/digital-self-defense.webp",
  total_pages: 148,
  price: 34.99,
  bulk_price: 24.99,
  category: "cybersecurity",
  tag: "Best Seller",
  stripe_price_id: "price_digital_self_defense",
  chapters: [
    ch(
      1,
      "Why Everyone Is a Target",
      `<p>Cybercriminals do not discriminate. Whether you are a teenager with a school email or a retired grandparent with a tablet, you hold something valuable — your identity, your money, and your trust. In 2024 the FBI's Internet Crime Complaint Center (IC3) recorded over $12.5 billion in reported losses, with ordinary individuals bearing the largest share.</p>
<p>The modern attacker does not need to be sophisticated. Automated tools scrape breached-credential databases, try passwords against hundreds of services simultaneously, and move on within seconds if nothing works. The cost of attack is near zero; the cost of doing nothing is not.</p>
<h3>The Three Pillars of Personal Security</h3>
<ul>
  <li><strong>Identity</strong> — who you are online and how you prove it.</li>
  <li><strong>Access</strong> — what devices and accounts you control.</li>
  <li><strong>Awareness</strong> — knowing what attacks look like before they reach you.</li>
</ul>
<p>This book addresses all three. By the end you will have a personal security plan you can maintain in under 15 minutes per week.</p>`,
      1,
      18
    ),
    ch(
      2,
      "Passwords That Actually Work",
      `<p>The average person reuses the same password across 14 accounts. One breach exposes all 14. The solution is not memorizing complex strings — it is using a <em>password manager</em>.</p>
<h3>Choosing a Password Manager</h3>
<p>Reputable options include Bitwarden (free, open-source), 1Password, and Apple Keychain. All encrypt your vault locally so the provider never sees your passwords.</p>
<h3>Creating a Master Password</h3>
<p>Use a passphrase — four random words strung together — such as <em>pepper-satellite-wrench-oval</em>. It is 30+ characters, easy to remember, and exponentially harder to crack than <em>P@ssw0rd!</em></p>
<h3>Audit Your Existing Accounts</h3>
<ol>
  <li>Export your current passwords into the manager.</li>
  <li>Run the built-in breach report (all major managers include one).</li>
  <li>Replace every reused or breached password with a unique 20-character random string.</li>
</ol>
<p>Rotate high-value accounts (email, bank, healthcare) first. Set a 30-day goal to finish the rest.</p>`,
      19,
      34
    ),
    ch(
      3,
      "Two-Factor Authentication (2FA) Done Right",
      `<p>A password alone is no longer enough. Two-factor authentication adds a second proof-of-identity layer so that a stolen password cannot open your account by itself.</p>
<h3>Types of 2FA — Ranked by Security</h3>
<ol>
  <li><strong>Hardware key (FIDO2/passkey)</strong> — a physical device like a YubiKey. Phishing-proof. Best for email and financial accounts.</li>
  <li><strong>Authenticator app (TOTP)</strong> — apps like Authy or Google Authenticator generate a 6-digit code every 30 seconds. Use this when hardware keys are impractical.</li>
  <li><strong>SMS code</strong> — better than nothing but vulnerable to SIM-swap attacks. Avoid for banking and email if alternatives exist.</li>
</ol>
<h3>SIM-Swap Attacks Explained</h3>
<p>An attacker calls your carrier, impersonates you, and transfers your phone number to a SIM they control. They then receive your SMS codes. Defense: add a PIN or passphrase to your carrier account and request that port-freezing be enabled.</p>`,
      35,
      50
    ),
    ch(
      4,
      "Hardening Your Devices",
      `<p>Your phone and laptop are gateways to everything. Securing them takes less than an hour and dramatically reduces your attack surface.</p>
<h3>Operating System Updates</h3>
<p>Enable automatic updates on every device. Most successful malware exploits vulnerabilities that were patched months or years before the attack. Updating is the single highest-return security action available to non-technical users.</p>
<h3>Disk Encryption</h3>
<p>Enable <strong>FileVault</strong> (macOS), <strong>BitLocker</strong> (Windows), or built-in encryption (iOS/Android) so that a stolen device reveals nothing. Setup takes five minutes; the OS handles everything in the background.</p>
<h3>Screen Lock and Biometrics</h3>
<p>Set a lock timeout of 30 seconds or less. Use a PIN of at least 6 digits — never a 4-digit PIN on a phone that also holds your email. Face ID and fingerprint unlock are convenient and add a useful physical layer.</p>
<h3>Unused Accounts and App Permissions</h3>
<p>Delete apps you have not used in 90 days. Every installed app is a potential entry point. Review app permissions quarterly: revoke location, microphone, and contacts access for apps that have no legitimate need for them.</p>`,
      51,
      68
    ),
    ch(
      5,
      "Recognizing Phishing and Social Engineering",
      `<p>Phishing causes over 90% of successful breaches. It works not by breaking technology but by manipulating people. Understanding the psychological levers attackers pull lets you resist them automatically.</p>
<h3>The Four Emotional Triggers</h3>
<ul>
  <li><strong>Urgency</strong> — "Your account will be closed in 24 hours."</li>
  <li><strong>Authority</strong> — "This is the IRS. You owe back taxes."</li>
  <li><strong>Fear</strong> — "We detected suspicious activity on your account."</li>
  <li><strong>Greed</strong> — "You have been selected for a $500 reward."</li>
</ul>
<p>Attackers deliberately trigger these states because strong emotions impair critical thinking. The moment you feel urgent or afraid, slow down.</p>
<h3>Verification Protocol</h3>
<p>Never call back a number provided in a suspicious email or pop-up. Independently look up the official customer service number on the company's website and call that. Real institutions are never offended by verification.</p>
<h3>Email Header Inspection</h3>
<p>Hover over the sender's address — the display name can say "PayPal Support" while the actual address is <em>noreply@paypa1-secure.xyz</em>. Modern email clients hide this; click "show details" or equivalent to reveal the real origin.</p>`,
      69,
      84
    ),
    ch(
      6,
      "Safe Browsing and Wi-Fi",
      `<p>Your network connection is often the weakest link. Public Wi-Fi in coffee shops, airports, and hotels is unencrypted — anyone on the same network can potentially intercept unencrypted traffic.</p>
<h3>VPNs: What They Do and Don't Do</h3>
<p>A VPN encrypts traffic between your device and the VPN server, hiding it from local eavesdroppers. It does <em>not</em> make you anonymous — the VPN provider can see your traffic. Choose a reputable no-log provider (Mullvad, ProtonVPN). Free VPNs frequently monetize your data.</p>
<h3>HTTPS and Browser Security</h3>
<p>The padlock icon confirms encrypted transport. Browsers now warn on non-HTTPS sites. Install uBlock Origin to block trackers and malicious ads — it is free, lightweight, and blocks the most common vector for drive-by malware.</p>
<h3>Home Router Security</h3>
<ul>
  <li>Change the default admin password immediately after setup.</li>
  <li>Enable WPA3 encryption (or WPA2-AES at minimum).</li>
  <li>Create a separate guest network for IoT devices and visitors.</li>
  <li>Enable automatic firmware updates if your router supports it.</li>
</ul>`,
      85,
      100
    ),
    ch(
      7,
      "Protecting Your Financial Accounts",
      `<p>Financial accounts are the highest-value targets for attackers. A combination of monitoring, strong authentication, and transaction alerts provides robust protection.</p>
<h3>Credit Freezes</h3>
<p>A credit freeze at all three bureaus (Equifax, Experian, TransUnion) costs nothing and prevents new credit lines from being opened in your name. Unfreeze temporarily when you need to apply for credit. This is the most powerful identity-theft prevention tool available.</p>
<h3>Virtual Card Numbers</h3>
<p>Services like Privacy.com generate virtual debit card numbers for online purchases. If the merchant is breached, your real card number is never exposed. Set per-merchant spending limits for additional control.</p>
<h3>Transaction Alerts</h3>
<p>Enable real-time SMS or push notifications for every transaction on every financial account. Review them daily. Any unrecognized charge under $2 may be a "micro-test" — attackers verify a card works before making large purchases.</p>
<h3>Wire Transfer Vigilance</h3>
<p>Verify wire transfer requests via phone — using a number you already have on file, not one provided in an email. Business Email Compromise (BEC) scams redirect legitimate wire transfers by spoofing executive email addresses, costing US businesses over $2.9 billion per year.</p>`,
      101,
      118
    ),
    ch(
      8,
      "Building a Lasting Security Routine",
      `<p>Security is not a one-time project. It is a maintenance habit, like brushing teeth. The goal is not perfection — it is resilience: reducing risk enough that attackers move on to easier targets.</p>
<h3>The Weekly 10-Minute Check</h3>
<ol>
  <li>Review financial transaction alerts for anything unexpected.</li>
  <li>Check for and apply any pending OS/app updates.</li>
  <li>Scan password manager breach report for new alerts.</li>
</ol>
<h3>The Monthly Review</h3>
<ul>
  <li>Review connected apps on major accounts (Google, Facebook, Apple ID) and revoke any you no longer use.</li>
  <li>Rotate the password on your highest-value account.</li>
  <li>Check your credit report at AnnualCreditReport.com (free weekly reports are available).</li>
</ul>
<h3>Emergency Plan</h3>
<p>Write down (on paper, stored securely): your password manager's emergency access contact, your bank's fraud hotline, and the three credit bureau freeze PINs. If you are ever compromised, you will not be searching for these numbers in a panic.</p>
<p>Congratulations — you now have the knowledge and tools to defend yourself against the vast majority of digital threats. Share this book with someone who needs it.</p>`,
      119,
      148
    ),
  ],
};

// ---------------------------------------------------------------------------
// 2. Scam-Proof: A Complete Guide
// ---------------------------------------------------------------------------
const scamProof: LibraryBook = {
  slug: "scam-proof",
  title: "Scam-Proof",
  subtitle: "A Complete Guide to Recognizing and Avoiding Every Major Scam",
  description:
    "Comprehensive coverage of every major scam type targeting Americans today — phone, email, text, AI voice, romance, investment, tech support, and more. Includes real scripts attackers use and exact rebuttals.",
  cover_image: "/images/books/scam-proof.webp",
  total_pages: 152,
  price: 39.99,
  bulk_price: 27.99,
  category: "scam",
  tag: "Featured",
  stripe_price_id: "price_scam_proof",
  chapters: [
    ch(
      1,
      "How Scams Have Evolved",
      `<p>Fraud is as old as commerce. What is new is scale and sophistication. In the past, a con artist could target dozens of victims per day. Today, automated systems send millions of personalized messages every hour, using data harvested from social media, data-broker files, and past breaches to craft messages that reference your name, your bank, your neighborhood, and your family members.</p>
<p>The Federal Trade Commission reported $10 billion in consumer fraud losses in 2023 — a record. Seniors over 60 lose the most per incident, but adults 30–49 report the highest <em>frequency</em> of fraud attempts. No demographic is safe.</p>
<h3>The Anatomy of a Modern Scam</h3>
<p>Every scam follows a predictable arc: <strong>hook → build trust → create urgency → extract payment → disappear</strong>. Understanding this cycle lets you recognize the pattern regardless of the specific script being used.</p>`,
      1,
      19
    ),
    ch(
      2,
      "Phone and Robocall Scams",
      `<p>Americans receive over 4 billion robocalls per month. Caller ID spoofing makes calls appear to come from local numbers, government agencies, or your own bank.</p>
<h3>IRS and Social Security Impersonation</h3>
<p>The IRS never initiates contact by phone, text, or email. If someone calls claiming to be an IRS agent demanding immediate payment via gift card or wire transfer, hang up. The IRS mails notices; it does not threaten arrest over the phone.</p>
<p>Similarly, the Social Security Administration will not call to tell you your number has been "suspended." That is not a real thing. Hang up.</p>
<h3>One-Ring Scams</h3>
<p>Your phone rings once and stops. The intention is to prompt a callback to a premium-rate international number that charges $20+ per minute. Never call back unrecognized missed calls, especially those starting with +1-473, +1-649, or other Caribbean area codes.</p>
<h3>What to Do</h3>
<ul>
  <li>Register on the Do Not Call Registry (donotcall.gov) — it will not stop scammers but reduces legitimate telemarketing noise.</li>
  <li>Enable your carrier's free scam-blocking feature (AT&amp;T Active Armor, T-Mobile Scam Shield, Verizon Call Filter).</li>
  <li>Let unknown numbers go to voicemail. Legitimate callers leave a message.</li>
</ul>`,
      20,
      38
    ),
    ch(
      3,
      "Email and Text Phishing",
      `<p>Phishing emails have evolved far beyond misspelled Nigerian prince letters. AI-generated messages are now grammatically perfect, visually indistinguishable from legitimate brand communications, and personalized with your actual account details obtained from prior breaches.</p>
<h3>Spear Phishing</h3>
<p>Spear phishing targets specific individuals using researched personal information. An attacker might email you about a recent Amazon order you actually placed, with the correct order number obtained from a breach of a third-party logistics company. The goal is a link to a fake login page that harvests your Amazon credentials.</p>
<h3>Smishing (SMS Phishing)</h3>
<p>Text messages claiming package delivery failures, toll violations, or bank alerts are among the fastest-growing fraud vectors. The links use URL shorteners or lookalike domains (amaz0n.com, usps-delivery.net). Always navigate directly to the official website rather than clicking a link in any unexpected text.</p>
<h3>Red Flags Checklist</h3>
<ul>
  <li>Unexpected request for login credentials or payment</li>
  <li>Urgency or threat ("your account will be suspended")</li>
  <li>Mismatched sender domain on close inspection</li>
  <li>Generic greeting ("Dear Customer") on what claims to be a personalized alert</li>
  <li>Unusual file attachments (.exe, .zip, .docm)</li>
</ul>`,
      39,
      57
    ),
    ch(
      4,
      "AI Voice Cloning and Deepfake Scams",
      `<p>Generative AI has lowered the barrier to voice cloning to near zero. With as little as three seconds of audio — taken from a social media video — attackers can synthesize a convincing copy of any voice. The grandparent scam, historically conducted with voice acting, is now executed with cloned voices of actual grandchildren.</p>
<h3>The Grandparent Scam Script</h3>
<p>A call comes in. The voice sounds exactly like your grandchild: "Grandma, I'm in trouble. I was in a car accident and I need $2,000 in gift cards for bail before the lawyer gets here. Please don't tell Mom and Dad." The voice is AI-generated. Your grandchild is fine.</p>
<h3>Family Code Words</h3>
<p>Establish a secret family code word that only immediate family members know. If anyone claiming to be a family member in distress cannot provide the code word, the call is a scam. Keep the code word off social media and digital devices.</p>
<h3>Video Deepfakes</h3>
<p>Real-time deepfake video exists and is increasingly accessible. During a video call, ask the supposed person to perform an action unlikely to be in their training data: wave with the non-dominant hand, turn sideways, or answer a specific personal question only they would know.</p>`,
      58,
      76
    ),
    ch(
      5,
      "Romance Scams",
      `<p>Romance scams caused $1.14 billion in losses in 2023 — more than any other fraud category. The emotional damage is often worse than the financial loss. Victims describe shame, betrayal, and depression lasting years.</p>
<h3>How Romance Scammers Operate</h3>
<p>Scammers create fake profiles on dating apps and social media, typically using stolen photos of attractive military personnel, doctors, or engineers working abroad. They invest weeks or months building trust before any money request is made. This investment period is called "love bombing."</p>
<h3>The Pivot to Money</h3>
<p>Once trust is established, a crisis emerges: a medical emergency, a business opportunity that requires immediate capital, or customs fees to release a valuable shipment. Each crisis is designed to seem solvable with just one more payment.</p>
<h3>Verification Steps</h3>
<ul>
  <li>Reverse image-search every photo. Stolen military photos appear on multiple profiles with different names.</li>
  <li>Video chat early and often. Scammers avoid real-time video.</li>
  <li>Never send money to someone you have not met in person — regardless of how long you have been talking online.</li>
  <li>Ask a trusted friend or family member to review the relationship objectively.</li>
</ul>`,
      77,
      95
    ),
    ch(
      6,
      "Investment and Crypto Fraud",
      `<p>Investment fraud is the costliest category for victims over 60, with a median loss of $9,000 per reported case. Cryptocurrency's irreversibility makes it ideal for scammers — there is no chargeback once crypto is sent.</p>
<h3>Pig Butchering (Sha Zhu Pan)</h3>
<p>This sophisticated scheme begins with a wrong-number text that leads to a friendly conversation, then a romantic or friendship relationship, followed by an "exclusive" investment tip on a fake crypto platform. The platform shows growing returns until the victim is deeply invested, then becomes unreachable. The FBI estimates pig butchering caused $3.5 billion in US losses in 2023 alone.</p>
<h3>Warning Signs of Investment Fraud</h3>
<ul>
  <li>Guaranteed returns with no risk</li>
  <li>Pressure to invest quickly before the "opportunity closes"</li>
  <li>Difficulty withdrawing your own funds</li>
  <li>Platform only accessible via an app sent to you, not the Apple/Google App Store</li>
  <li>Returns that seem too good — 20–50% per month is not real</li>
</ul>
<h3>Before You Invest</h3>
<p>Verify broker/advisor registration at FINRA BrokerCheck (brokercheck.finra.org) and the SEC's Investment Adviser Public Disclosure database. Unregistered platforms have no regulatory oversight.</p>`,
      96,
      114
    ),
    ch(
      7,
      "Tech Support and Utility Scams",
      `<p>A pop-up appears warning that your computer is infected and to call Microsoft immediately. You call. A polite, accented voice offers to fix the problem remotely — for $299. This is a tech support scam. Microsoft, Apple, and Google never display phone numbers in browser pop-ups.</p>
<h3>Remote Access Danger</h3>
<p>Once a scammer has remote access to your computer via tools like AnyDesk or TeamViewer, they can install malware, access banking websites, and exfiltrate stored passwords — all while you watch and believe they are "fixing" your machine.</p>
<p>If you realize mid-call that something is wrong: close the laptop lid. This terminates most remote sessions. Then change passwords for every account accessed from that device.</p>
<h3>Utility Shutoff Scams</h3>
<p>A caller claims your electricity will be cut off in one hour unless you make an immediate payment by Zelle, Venmo, or gift card. Utility companies send paper notices with a 10–30 day dispute window before disconnection. They do not accept gift cards. Ever.</p>`,
      115,
      133
    ),
    ch(
      8,
      "Reporting, Recovery, and Helping Others",
      `<p>If you have been scammed, you are not stupid or careless. These operations are run by organized criminal enterprises employing professional psychologists and linguists. Reporting is not just about recovering your money — it builds the law-enforcement datasets that dismantle scam networks.</p>
<h3>Where to Report</h3>
<ul>
  <li><strong>FTC</strong>: reportfraud.ftc.gov — the primary US consumer fraud database</li>
  <li><strong>FBI IC3</strong>: ic3.gov — for internet-based crimes including crypto fraud</li>
  <li><strong>CFPB</strong>: consumerfinance.gov/complaint — for financial product complaints</li>
  <li><strong>Your bank/card issuer</strong>: immediately for any fraudulent transactions</li>
</ul>
<h3>Recovery Outlook</h3>
<p>Wire transfers and cryptocurrency are rarely recoverable. Credit card chargebacks and Zelle dispute resolution (if the bank acknowledges fraud) offer partial recovery paths. Act within 60 days for credit card disputes; sooner is better.</p>
<h3>Talking to Loved Ones</h3>
<p>Approach scam conversations with curiosity, not judgment. Say "I read about a scam that works exactly like that — want to see it?" rather than "You almost fell for a scam." Pride and shame keep victims silent. Openness keeps families safe.</p>`,
      134,
      152
    ),
  ],
};

// ---------------------------------------------------------------------------
// 3. AI for Everyday Life
// ---------------------------------------------------------------------------
const aiForEverydayLife: LibraryBook = {
  slug: "ai-for-everyday-life",
  title: "AI for Everyday Life",
  subtitle: "Use It Safely, Smartly, and Confidently",
  description:
    "A friendly, jargon-free guide for non-technical adults who want to use AI tools like ChatGPT, voice assistants, and smart home devices without getting tricked, tracked, or replaced.",
  cover_image: "/images/books/ai-for-everyday-life.webp",
  total_pages: 136,
  price: 27.99,
  bulk_price: 19.99,
  category: "ai",
  tag: "Beginner Friendly",
  stripe_price_id: "price_ai_everyday_life",
  chapters: [
    ch(1, "What AI Actually Is (and Isn't)", `<p>Artificial intelligence is not a thinking being. It is a statistical pattern-matching system trained on enormous amounts of text, images, or other data. When you ask ChatGPT a question, it does not "know" the answer — it predicts the most statistically likely response based on its training data.</p><p>This distinction matters enormously for safety. An AI chatbot can sound completely confident while being completely wrong. This is called <em>hallucination</em>. Knowing this prevents you from trusting AI output on high-stakes topics — medical decisions, legal advice, financial planning — without independent verification.</p><h3>What AI Is Good At</h3><ul><li>Drafting emails and letters</li><li>Summarizing long documents</li><li>Answering general knowledge questions (with verification)</li><li>Brainstorming ideas</li><li>Explaining complex topics in plain language</li></ul>`, 1, 17),
    ch(2, "Voice Assistants: Alexa, Siri, and Google", `<p>Voice assistants are always listening for their wake word. This means the microphone is active at all times, and clips of your conversations are sometimes sent to company servers for quality improvement.</p><h3>Privacy Settings Worth Changing</h3><ul><li><strong>Alexa</strong>: Settings → Alexa Privacy → Manage Your Alexa Data → Auto-delete voice recordings (3 months)</li><li><strong>Google Assistant</strong>: myaccount.google.com → Data &amp; Privacy → Voice and Audio Activity → Auto-delete</li><li><strong>Siri</strong>: Settings → Siri &amp; Search → Siri History → Delete Siri &amp; Dictation History</li></ul><p>Disable purchasing via voice unless you are the only adult in the home. Children and visitors can make accidental or intentional purchases without a PIN.</p>`, 18, 34),
    ch(3, "Chatbots and AI Writing Tools", `<p>AI writing tools — ChatGPT, Claude, Gemini, Copilot — are genuinely useful but come with important caveats.</p><h3>What Not to Share</h3><p>Never enter into a chatbot: Social Security numbers, passwords, financial account numbers, medical record details, or confidential work information. Most AI providers state in their terms of service that conversations may be used to train future models. Free tiers especially offer fewer privacy guarantees.</p><h3>Fact-Checking AI Output</h3><p>For anything important, treat AI output as a first draft. Verify facts at primary sources: government websites, peer-reviewed research, official company pages. AI tools have training cutoffs and frequently cite non-existent studies or statistics.</p>`, 35, 51),
    ch(4, "Smart Home Devices and Security", `<p>Smart TVs, thermostats, doorbell cameras, and refrigerators all connect to your home network and the internet. Each is a potential entry point for attackers and a source of data collection.</p><h3>Segmenting Your Network</h3><p>Put all IoT devices on a separate guest Wi-Fi network with no access to your main devices. If a smart TV is compromised, it cannot reach your laptop or phone on the separate network.</p><h3>Smart Camera Privacy</h3><p>Doorbell and indoor cameras upload footage to cloud servers. Review the privacy policy of any camera brand. Ring (Amazon), Nest (Google), and Arlo all have data-sharing partnerships with law enforcement. Decide whether you are comfortable with this before installation.</p>`, 52, 68),
    ch(5, "AI Scams Targeting AI Users", `<p>Scammers now impersonate AI tools themselves. Fake ChatGPT apps in app stores steal credentials. Fake "AI investment advisors" use chatbot interfaces to build trust before requesting wire transfers. Search-engine ads for "ChatGPT download" have delivered malware.</p><h3>Verify Before You Download</h3><p>ChatGPT is at chat.openai.com. Claude is at claude.ai. Gemini is at gemini.google.com. These are the official web addresses. Download apps only from links provided on these official websites or from major app stores — and check the developer name carefully (it should be OpenAI, Anthropic, or Google LLC).</p>`, 69, 85),
    ch(6, "Protecting Your Digital Identity from AI", `<p>AI makes identity theft more sophisticated. Attackers can generate synthetic identities, create convincing fake documents, and use language models to pass customer service security questions.</p><h3>What AI Cannot Easily Replicate</h3><ul><li>Your secret code word known only to family</li><li>Multi-factor authentication tied to a physical device</li><li>In-person identity verification with photo ID</li></ul><p>Adding friction at account creation and recovery — requiring physical verification for high-value changes — is now more important than ever.</p>`, 86, 102),
    ch(7, "Teaching AI to Work for You", `<p>Used well, AI tools save hours per week. The key is learning to give clear, specific instructions (called <em>prompts</em>) and developing a habit of verification.</p><h3>Effective Prompting Basics</h3><ul><li>Specify your role: "I am a 65-year-old non-technical user writing a letter to my insurance company..."</li><li>Specify the format: "...give me a bullet-point list of questions I should ask."</li><li>Specify the tone: "Keep the language simple and polite."</li></ul><p>The more context you provide, the more useful the output. Think of it as briefing a very capable but uninformed assistant.</p>`, 103, 119),
    ch(8, "The Future of AI and What It Means for You", `<p>AI capabilities are advancing rapidly. Models that were cutting-edge six months ago are now obsolete. This means the scams, tools, and risks covered in this book will continue to evolve.</p><h3>How to Stay Current</h3><ul><li>Follow the FTC's Consumer Information blog (consumer.ftc.gov/consumer-alerts) for fraud alerts.</li><li>Subscribe to Krebs on Security (krebsonsecurity.com) for plain-English cybersecurity news.</li><li>InVision Network publishes monthly threat briefings at invisionnetwork.org/articles.</li></ul><p>The fundamental principle that protects you will not change: <em>verify before you trust, slow down when you feel pressured, and ask someone you trust when something feels wrong.</em></p>`, 120, 136),
  ],
};

// ---------------------------------------------------------------------------
// 4. Securing Your Home Network
// ---------------------------------------------------------------------------
const securingHomeNetwork: LibraryBook = {
  slug: "securing-home-network",
  title: "Securing Your Home Network",
  subtitle: "From Router to Smart Doorbell — Complete Coverage",
  description:
    "A room-by-room guide to locking down your home network. Covers router configuration, Wi-Fi security, smart home devices, parental controls, VPNs, and detecting when your network has been breached.",
  cover_image: "/images/books/securing-home-network.webp",
  total_pages: 130,
  price: 29.99,
  bulk_price: 21.99,
  category: "cybersecurity",
  tag: "Practical",
  stripe_price_id: "price_securing_home_network",
  chapters: [
    ch(1, "Understanding Your Home Network", `<p>Your home network is a small internet. At its center is a router — a device that connects all your gadgets to your internet service provider (ISP) and to each other. Understanding this basic architecture is the foundation of home network security.</p><p>Every device on your network gets an IP address — a unique number the router uses to route traffic. Your router also has a public IP address (visible to the internet) and a private address range (visible only inside your home, typically 192.168.1.x or 10.0.0.x).</p><h3>The Threat Model</h3><p>Home networks face threats from two directions: the internet (external attackers) and compromised devices within the network (a smart TV running outdated firmware that becomes a pivot point for attackers). Both vectors require attention.</p>`, 1, 16),
    ch(2, "Router Hardening Step by Step", `<h3>Access Your Router's Admin Interface</h3><p>Open a browser and navigate to 192.168.1.1 or 192.168.0.1 (check the sticker on your router for the exact address). Log in with the admin credentials — if you have never changed these, they are the factory defaults printed on the sticker.</p><h3>Critical Settings to Change</h3><ol><li><strong>Admin password</strong>: Change to a unique 20+ character password stored in your password manager. Default passwords are published online.</li><li><strong>Router admin username</strong>: Change from "admin" to something unique.</li><li><strong>Disable remote management</strong>: This allows admin access from outside your home. Unless you specifically need this, disable it.</li><li><strong>Disable UPnP</strong>: Universal Plug and Play automatically opens ports for devices that request it. Many IoT devices abuse this. Disable and open ports manually only when needed.</li><li><strong>Enable automatic firmware updates</strong>: Router firmware patches critical security vulnerabilities.</li></ol>`, 17, 33),
    ch(3, "Wi-Fi Encryption and Network Segmentation", `<p>Wi-Fi encryption scrambles the traffic between your devices and your router so nearby eavesdroppers cannot read it. The current standard is WPA3; WPA2-AES is acceptable; WEP and WPA (TKIP) are obsolete and should never be used.</p><h3>Network Segmentation in Practice</h3><p>Create three separate Wi-Fi networks:</p><ul><li><strong>Primary</strong>: Your phones, laptops, tablets — trusted devices only</li><li><strong>IoT</strong>: Smart TVs, thermostats, cameras, speakers, appliances</li><li><strong>Guest</strong>: Visitors. Access to internet only, no local network access</li></ul><p>This limits blast radius. If your smart TV is compromised, the attacker is isolated in the IoT network and cannot reach your laptop.</p>`, 34, 50),
    ch(4, "Smart Home Device Security", `<p>The average US home has 22 connected devices. Each one runs software that can have vulnerabilities. Unlike phones and laptops, most smart home devices receive infrequent security updates — or none at all after the first two years.</p><h3>Before You Buy</h3><p>Check whether the manufacturer provides security updates and for how long. Research any known vulnerabilities at the National Vulnerability Database (nvd.nist.gov). Brands with poor security track records include no-name imports sold exclusively on Amazon or eBay.</p><h3>Ongoing Maintenance</h3><ul><li>Enable auto-updates on every device that offers it.</li><li>Replace devices when security support ends (typically 3–5 years).</li><li>Change default passwords on every smart device immediately after setup.</li><li>Disable features you do not use (remote access, cloud backup, microphones).</li></ul>`, 51, 67),
    ch(5, "Parental Controls and Family Safety", `<p>Modern routers and DNS services offer content filtering, screen-time scheduling, and per-device internet access controls that work regardless of VPNs or private browsing.</p><h3>DNS-Level Filtering</h3><p>Change your router's DNS server to Cloudflare for Families (1.1.1.3 for malware-blocking, 1.1.1.2 for malware and adult content blocking) or Cisco OpenDNS FamilyShield (208.67.222.123). This blocks access to known malicious and inappropriate domains before any traffic ever leaves your network.</p><h3>Router-Level Parental Controls</h3><p>Most modern routers (eero, Google Wifi, Netgear Orbi) have companion apps with per-device time limits and content filters. These work across all devices including gaming consoles and smart TVs.</p>`, 68, 84),
    ch(6, "VPNs for Home Use", `<p>A home VPN router encrypts all outbound traffic from every device on your network without requiring per-device installation. This is particularly valuable when you travel and connect from hotels or airports.</p><h3>Choosing a Home VPN</h3><p>Look for: no-logs policy independently audited, WireGuard protocol support (faster and more secure than OpenVPN), kill switch (blocks all traffic if the VPN connection drops), and servers in multiple countries. Mullvad and ProtonVPN have the strongest audited no-logs track records.</p><h3>What a VPN Does Not Do</h3><p>A VPN does not make you anonymous, does not protect against malware you download, and does not prevent websites from tracking you via cookies or browser fingerprinting. It encrypts transit only.</p>`, 85, 101),
    ch(7, "Detecting a Breach on Your Network", `<p>Signs that your home network has been compromised include: unexplained slowdowns, devices connecting to unfamiliar IP addresses, your ISP contacting you about unusual traffic, or your router admin password no longer working.</p><h3>Network Scanning Tools</h3><p>Fing (free, iOS/Android) scans your network and lists every connected device with manufacturer, MAC address, and IP. Run a scan monthly. Any device you do not recognize warrants investigation — it may be a neighbor using your Wi-Fi, or something worse.</p><h3>What to Do If You Find an Intruder</h3><ol><li>Disconnect from the internet (unplug the router from the modem).</li><li>Change the router admin password from a different network.</li><li>Change the Wi-Fi password.</li><li>Factory-reset any device that was connected when the breach occurred.</li><li>Contact your ISP if the breach may have originated from their infrastructure.</li></ol>`, 102, 117),
    ch(8, "Maintaining Network Health Long-Term", `<p>Network security is not set-and-forget. Devices age, firmware goes unpatched, and your threat model changes as you add new devices.</p><h3>Annual Network Audit</h3><ul><li>List every device connected to your network. Remove or replace devices that no longer receive security updates.</li><li>Review router firmware version and update if behind.</li><li>Test Wi-Fi password strength — if you set it more than three years ago, update it.</li><li>Review port forwarding rules. Close any you no longer need.</li></ul><h3>When to Upgrade Your Router</h3><p>Consumer routers typically reach end-of-security-support in 5–7 years. Wi-Fi 6E and Wi-Fi 7 routers offer both improved performance and improved security features. Budget $150–300 for a router from a brand with a strong security track record (Asus, Netgear Orbi, eero Pro).</p>`, 118, 130),
  ],
};

// ---------------------------------------------------------------------------
// 5. Privacy in the Digital Age
// ---------------------------------------------------------------------------
const privacyDigitalAge: LibraryBook = {
  slug: "privacy-digital-age",
  title: "Privacy in the Digital Age",
  subtitle: "Take Back Control of Your Personal Data",
  description:
    "How corporations, data brokers, advertisers, and governments collect your personal information — and the specific, actionable steps you can take to minimize your data footprint and reclaim your privacy.",
  cover_image: "/images/books/privacy-digital-age.webp",
  total_pages: 142,
  price: 32.99,
  bulk_price: 23.99,
  category: "privacy",
  tag: "Essential",
  stripe_price_id: "price_privacy_digital_age",
  chapters: [
    ch(1, "The Data Economy", `<p>Your personal data is a commodity worth more per year than most people realize. Data brokers — companies whose entire business model is buying, aggregating, and selling personal information — hold files on nearly every American adult containing name, address history, phone numbers, email addresses, relatives, estimated income, political affiliation, consumer behavior, and health indicators.</p><p>You did not consent to most of this. Data brokers assemble their files from public records (voter registrations, property deeds, court records), loyalty program purchases, browser tracking pixels, and purchases from apps and websites that sell data.</p>`, 1, 18),
    ch(2, "Browser Privacy", `<p>Your web browser is one of the most significant data collection surfaces you interact with daily. Chrome, by far the most popular browser, is made by Google — an advertising company that profits from understanding your interests.</p><h3>Browser Recommendations by Privacy Level</h3><ul><li><strong>Maximum privacy</strong>: Tor Browser (routes traffic through 3 relays; slowest)</li><li><strong>Strong privacy</strong>: Firefox with uBlock Origin + Privacy Badger extensions</li><li><strong>Good privacy</strong>: Brave (Chromium-based; built-in ad/tracker blocking)</li><li><strong>Avoid for sensitive browsing</strong>: Chrome, Edge (both Google/Microsoft data-collection heavy)</li></ul><h3>Browser Fingerprinting</h3><p>Even in incognito mode, websites can identify you via browser fingerprinting — a combination of your screen resolution, installed fonts, browser plugins, timezone, and dozens of other attributes. Brave and Tor actively randomize fingerprinting attributes.</p>`, 19, 36),
    ch(3, "Social Media Data and How to Reduce It", `<p>Social media platforms are engineered for maximum data extraction. Every like, pause, share, and search is recorded and used to build a behavioral profile sold to advertisers.</p><h3>Data Minimization on Existing Accounts</h3><ul><li>Remove your phone number from Facebook/Instagram profile (it becomes a targeting vector even if hidden from other users).</li><li>Disable "Off-Facebook Activity" data collection in Settings → Your Facebook Information.</li><li>Revoke app permissions to your social accounts that you no longer actively use.</li></ul><h3>The Nuclear Option</h3><p>Deleting a social media account permanently removes your public profile and stops active data collection. Archived data retention periods vary by platform (Facebook retains data for 90 days after deletion; Google for up to 180 days depending on the service).</p>`, 37, 54),
    ch(4, "Data Brokers: Opting Out", `<p>Data broker opt-outs are tedious but effective. Each broker has its own removal process, and most require a separate request. The major brokers include Spokeo, Whitepages, BeenVerified, Intelius, Radaris, PeopleFinder, MyLife, and dozens more.</p><h3>Automated Opt-Out Services</h3><p>Services like DeleteMe ($10–13/month) submit opt-out requests on your behalf across 750+ brokers and resubmit when your data reappears (which it will — brokers constantly re-acquire data from new sources). This is the most practical option for thorough data removal.</p><h3>Manual Opt-Out for the Most Dangerous Brokers</h3><p>Prioritize opt-outs from brokers that include phone numbers and home address: Spokeo (spokeo.com/opt_out), Whitepages (whitepages.com/suppression_requests), and BeenVerified (beenverified.com/opt-out). These are frequently used by stalkers and scammers to locate targets.</p>`, 55, 72),
    ch(5, "Email Privacy and Anonymous Communication", `<p>Email providers scan message content for advertising purposes (Gmail historically did; they now claim not to for advertising but do scan for security purposes). Every email you send leaks metadata: your IP address, device, email client, and timing.</p><h3>Privacy-Respecting Email Providers</h3><ul><li><strong>ProtonMail</strong> (proton.me): End-to-end encrypted, Switzerland jurisdiction, no IP logging, free tier available</li><li><strong>Tutanota</strong>: Similar to ProtonMail, Germany jurisdiction</li><li><strong>Fastmail</strong>: Not encrypted but strong privacy policies and no advertising</li></ul><h3>Email Alias Services</h3><p>SimpleLogin (simplelogin.io) and Apple's Hide My Email generate unique forwarding addresses per website. You receive the email, the website never gets your real address, and you can disable an alias if it starts receiving spam.</p>`, 73, 90),
    ch(6, "Mobile Privacy: Location and Apps", `<p>Your smartphone is a location-tracking device that also makes calls. Your carrier has continuous access to your location via tower triangulation. Apps with location permission can track you with GPS precision.</p><h3>Location Permission Audit</h3><p>iPhone: Settings → Privacy → Location Services. Android: Settings → Apps → each app → Permissions → Location. Change everything non-essential to "While Using" or "Deny." Disable "Precise Location" for apps that do not genuinely need it (a weather app needs city-level; it does not need your home address).</p><h3>Advertising Identifier</h3><p>iPhone: Settings → Privacy → Tracking → disable "Allow Apps to Request to Track" and set "Personalized Ads" to off. Android: Settings → Google → Ads → Delete Advertising ID. This does not eliminate tracking but severs the most widely used cross-app tracking identifier.</p>`, 91, 108),
    ch(7, "Financial Privacy", `<p>Financial institutions are legally required to share data with credit bureaus and are permitted to share with affiliated companies and, in some cases, third-party marketers (you can opt out of this).</p><h3>Opt Out of Financial Data Sharing</h3><p>Under federal law (Gramm-Leach-Bliley Act), financial institutions must provide an annual privacy notice with an opt-out for sharing with non-affiliated third parties. Find the opt-out in your bank's privacy policy page or call customer service directly.</p><h3>Prepaid Cards and Cash</h3><p>For purchases where you do not want a behavioral record, cash remains the most private option. Prepaid debit cards (not linked to your identity) are a reasonable alternative for online purchases where physical cash is not accepted.</p>`, 109, 125),
    ch(8, "Building Your Personal Privacy Plan", `<p>Privacy is a spectrum, not a binary. The goal is not invisibility — it is proportionality. Protect high-stakes data (SSN, location, financial accounts) aggressively. Accept reasonable trade-offs for convenience in lower-stakes areas.</p><h3>Your 90-Day Privacy Sprint</h3><ul><li>Week 1: Browser switch + install uBlock Origin</li><li>Week 2: Password manager + 2FA on all critical accounts</li><li>Week 3: Data broker opt-outs (start with Spokeo, Whitepages, BeenVerified)</li><li>Week 4: Email alias for new signups</li><li>Month 2: Social media data cleanup + location permission audit</li><li>Month 3: Financial opt-outs + credit freezes at all three bureaus</li></ul><p>By the end of 90 days you will have materially reduced your data footprint without sacrificing your digital life.</p>`, 126, 142),
  ],
};

// ---------------------------------------------------------------------------
// 6. Cybersecurity for Small Business
// ---------------------------------------------------------------------------
const cybersecuritySmallBusiness: LibraryBook = {
  slug: "cybersecurity-small-business",
  title: "Cybersecurity for Small Business",
  subtitle: "Protect Your Business Without a Full-Time IT Team",
  description:
    "Practical cybersecurity guidance designed specifically for small business owners with 1–50 employees. Covers employee training, access control, backup strategy, vendor risk, incident response, and compliance basics.",
  cover_image: "/images/books/cybersecurity-small-business.webp",
  total_pages: 158,
  price: 49.99,
  bulk_price: 34.99,
  category: "business",
  tag: "Professional",
  stripe_price_id: "price_cybersecurity_small_business",
  chapters: [
    ch(1, "Why Small Businesses Are Prime Targets", `<p>Small businesses are attacked more frequently than large enterprises, not less. Attackers know that small businesses typically lack dedicated security staff, have more permissive access controls, and often hold data connected to larger supply chains. The Verizon Data Breach Investigations Report consistently finds that 43–46% of all breaches target small businesses.</p><p>The average cost of a data breach for a small business is $120,000 — enough to close many businesses permanently. Ransomware attacks that encrypt business data and demand payment to decrypt it are the leading cause of small business closures following a cyber incident.</p>`, 1, 20),
    ch(2, "Building a Security Culture", `<p>Technology alone cannot protect a business. 82% of breaches involve a human element — phishing clicks, weak passwords, misconfigured systems. The most cost-effective security investment a small business can make is training its people.</p><h3>Monthly Security Awareness Training</h3><p>15 minutes per month is sufficient for foundational training. Cover one topic per session: phishing recognition, password hygiene, physical security (clean desk policy, screen locking), and incident reporting. KnowBe4 and Proofpoint offer small business training platforms starting around $25/user/year.</p><h3>Simulated Phishing Tests</h3><p>Send simulated phishing emails to employees to measure click rates and identify who needs additional training. This is not punitive — it is calibration. Employees who click simulated phishing links are the most grateful for the training that follows.</p>`, 21, 40),
    ch(3, "Access Control and Least Privilege", `<p>Every employee should have access to exactly the systems and data required for their job — nothing more. This principle, called <em>least privilege</em>, limits the damage any single compromised account can cause.</p><h3>Role-Based Access Control (RBAC)</h3><p>Define roles (sales, operations, finance, admin) with associated access rights. When an employee joins, assign a role rather than manually granting individual permissions. When they leave, deactivating one role removes all access atomically.</p><h3>Offboarding Checklist</h3><p>Employee termination is a high-risk moment. Have a same-day checklist: disable all system accounts, revoke cloud access (Google Workspace, Microsoft 365, Slack, CRM), change shared passwords the employee knew, and retrieve physical devices and access cards. Failure to offboard properly is a common cause of data theft by disgruntled former employees.</p>`, 41, 60),
    ch(4, "Email and Communication Security", `<p>Business email compromise (BEC) — where attackers impersonate executives or vendors to redirect payments — caused $2.9 billion in US losses in 2023. This exceeds all other cybercrime categories combined.</p><h3>Email Authentication (SPF, DKIM, DMARC)</h3><p>These three DNS records tell receiving mail servers how to verify email genuinely comes from your domain. Without them, anyone can send email that appears to come from your-business.com. Setting up DMARC with a reject policy prevents most spoofing of your domain.</p><h3>Wire Transfer Verification Protocol</h3><p>Establish a standing policy: any wire transfer request, regardless of who it appears to come from, requires verbal confirmation via a phone call to a number already on file — not a number provided in the request. This single policy prevents the majority of BEC attacks.</p>`, 61, 80),
    ch(5, "Backup Strategy: The 3-2-1 Rule", `<p>Ransomware is only effective if the victim has no clean backup to restore from. A working backup strategy is the single most important ransomware defense for small businesses.</p><h3>The 3-2-1 Backup Rule</h3><ul><li><strong>3</strong> copies of important data</li><li><strong>2</strong> different storage media types (e.g., cloud + external drive)</li><li><strong>1</strong> copy offsite (physically separate from your business location)</li></ul><h3>Immutable Backups</h3><p>Ransomware increasingly targets and encrypts backup files. Use a backup service that supports immutable storage — backups that cannot be modified or deleted for a set retention period. Veeam, Acronis, and Backblaze B2 all offer immutable backup options at small business price points.</p><h3>Backup Testing</h3><p>A backup you have never tested is not a backup. Quarterly, restore a sample of files from backup and verify they are intact and accessible.</p>`, 81, 100),
    ch(6, "Vendor and Supply Chain Risk", `<p>Your security is only as strong as your weakest vendor. The SolarWinds breach of 2020 compromised 18,000 organizations by attacking a single software vendor. Small businesses are increasingly targeted as stepping stones to larger clients.</p><h3>Vendor Security Assessment</h3><p>Before giving any vendor access to your systems or data, ask: Do they have cyber insurance? Have they had a breach in the last 3 years? What is their employee security training program? Do they offer multi-factor authentication on accounts? You do not need a formal questionnaire — a 15-minute phone call covers the basics.</p><h3>Contractual Protections</h3><p>Include data processing agreements in vendor contracts that specify: how data is stored and secured, breach notification timeframes (72 hours is the GDPR standard), data deletion upon contract termination, and indemnification for breaches caused by vendor negligence.</p>`, 101, 120),
    ch(7, "Incident Response Planning", `<p>The question is not whether your business will face a cyber incident — it is when and how prepared you will be when it happens. Businesses with an incident response plan recover 40% faster and at 60% lower cost than those without one.</p><h3>Your 1-Page Incident Response Plan</h3><ol><li><strong>Identify</strong>: Who notices the incident and what do they see?</li><li><strong>Contain</strong>: Isolate affected systems from the network immediately.</li><li><strong>Communicate</strong>: Who in the company needs to know? Which customers/partners? What are your legal notification obligations?</li><li><strong>Eradicate</strong>: Remove the attacker, malware, or unauthorized access.</li><li><strong>Recover</strong>: Restore from clean backup. Test before returning to production.</li><li><strong>Learn</strong>: Document what happened and what changes prevent recurrence.</li></ol>`, 121, 140),
    ch(8, "Cyber Insurance and Compliance Basics", `<p>Cyber insurance has become essential for small businesses. A typical policy covers breach response costs (forensics, notification, credit monitoring), ransomware payments and recovery costs, business interruption losses, and legal liability for breaches of customer data.</p><h3>What Insurers Require</h3><p>To qualify for coverage — and to keep premiums reasonable — most insurers now require: multi-factor authentication on email and remote access, regular backup with tested recovery, employee security training, and an endpoint detection and response (EDR) tool on all workstations. These requirements align with best practices regardless of insurance.</p><h3>PCI-DSS Basics for Payment Processing</h3><p>If you accept credit cards, you are bound by PCI-DSS. For most small businesses, using a compliant payment processor (Stripe, Square, PayPal) and never storing raw card numbers satisfies the most critical requirements. Use SAQ-A self-assessment annually to document compliance.</p>`, 141, 158),
  ],
};

// ---------------------------------------------------------------------------
// 7. Social Media Safety
// ---------------------------------------------------------------------------
const socialMediaSafety: LibraryBook = {
  slug: "social-media-safety",
  title: "Social Media Safety",
  subtitle: "Protect Your Reputation, Privacy, and Mental Health Online",
  description:
    "Complete guide to staying safe on Facebook, Instagram, TikTok, X, LinkedIn, and YouTube. Covers privacy settings, scams, harassment, account recovery, protecting children, and managing your digital reputation.",
  cover_image: "/images/books/social-media-safety.webp",
  total_pages: 126,
  price: 26.99,
  bulk_price: 18.99,
  category: "social",
  tag: "Trending",
  stripe_price_id: "price_social_media_safety",
  chapters: [
    ch(1, "The Social Media Privacy Paradox", `<p>Social media platforms are free because you and your data are the product. Every post, like, follow, message, and even the amount of time you linger on a video is recorded and used to build a behavioral model that is sold to advertisers. Understanding this business model is the first step to using social media on your own terms.</p><p>This does not mean you should quit social media. For many people, social media provides genuine community, entertainment, and business value. It means you should use it with clear eyes about what you are exchanging for those benefits.</p>`, 1, 16),
    ch(2, "Privacy Settings on Every Platform", `<h3>Facebook / Instagram (Meta)</h3><ul><li>Audience selector → set default post audience to "Friends" not "Public"</li><li>Profile → Edit → Contact and Basic Info → remove phone number and email from public view</li><li>Settings → Privacy → Future and Past Posts → "Friends"</li><li>Settings → Location Services → disable</li></ul><h3>TikTok</h3><ul><li>Settings → Privacy → Private Account</li><li>Settings → Privacy → Location → off</li><li>Settings → Privacy → Suggest account to others → off</li></ul><h3>LinkedIn</h3><ul><li>Settings → Visibility → disable "Profile viewing options" for full name when viewing others</li><li>Remove phone number and personal email from contact info</li></ul>`, 17, 33),
    ch(3, "Scams on Social Platforms", `<p>Social media has become the highest-volume fraud delivery channel in the United States. FTC data shows social media fraud costs consumers more than any other contact method, including phone calls.</p><h3>Fake Giveaway Scams</h3><p>Posts claiming you won a prize from a brand you follow are almost always fake. Legitimate brand giveaways do not require payment, gift card submission, or clicking off-platform to claim. Report and block — the accounts are controlled by scammers.</p><h3>Account Takeover via Phishing</h3><p>DMs from friends' accounts saying "OMG did you see this photo of you?" with a link are classic phishing. Your friend's account was already compromised. Clicking the link compromises yours. Never enter your social media credentials via a link in a DM — always navigate directly to the platform's app or website.</p>`, 34, 50),
    ch(4, "Harassment, Stalking, and Blocking", `<p>Online harassment is alarmingly common. 41% of American adults have experienced online harassment; 25% have experienced severe harassment including stalking, sexual harassment, or sustained bullying.</p><h3>Immediate Response Playbook</h3><ol><li>Do not engage with harassing content — engagement can escalate.</li><li>Screenshot everything for documentation before blocking.</li><li>Block and report via the platform's tools.</li><li>If harassment involves credible threats, report to law enforcement.</li></ol><h3>Preventing Stalking via Social Media</h3><p>Do not post your home address, daily routine, or real-time location. "Back from vacation!" posts announce an empty home. Disable location tagging in photos (iPhone: Settings → Privacy → Photos → location off; Android: Camera settings → location tags off).</p>`, 51, 67),
    ch(5, "Protecting Children on Social Media", `<p>The minimum age for most social platforms is 13 (enforced poorly via self-reported birthdays). Children are the most vulnerable social media users — more likely to share personal information, more susceptible to manipulation, and less likely to recognize grooming behavior.</p><h3>The Conversation First</h3><p>Rules without education create workarounds. Before restricting access, have an honest conversation about why: that some adults online pretend to be children, that embarrassing posts can circulate forever, and that it is always safe to come to you with uncomfortable online experiences without fear of punishment.</p><h3>Technical Controls</h3><p>Instagram's Family Center lets parents link accounts and monitor time spent. TikTok's Family Pairing links parent and child accounts for content filtering and screen time limits. Neither is a substitute for ongoing conversation.</p>`, 68, 84),
    ch(6, "Your Digital Reputation and Online Identity", `<p>Before hiring, dating, or partnering with anyone, people Google them. Your social media profiles, comments, and posts form your permanent digital record. Content that seemed funny at 19 can cost you a job at 35.</p><h3>Audit Your Current Digital Footprint</h3><p>Google your full name in quotes. Review every result on the first three pages. Search Google Images for your name. Search your username across platforms using a tool like Namechk to find old accounts you may have forgotten.</p><h3>Content You Cannot Delete</h3><p>The Wayback Machine (web.archive.org) archives web pages indefinitely. Deleted posts may have been screenshotted and recirculated. The most reliable protection is not posting anything you would be embarrassed by in a job interview.</p>`, 85, 101),
    ch(7, "Account Recovery and Compromise Response", `<p>If your account is compromised, time matters. Attackers immediately change email, phone, and password to lock you out permanently.</p><h3>Recovery Steps by Platform</h3><p>Facebook: facebook.com/hacked → "I think my account was hacked." Instagram: instagram.com/accounts/password/reset. If email was changed: check the notification Meta sent to your old address — it contains a "revert this change" link valid for 30 minutes.</p><h3>Prevention: Backup Codes</h3><p>Every major platform generates downloadable backup codes for 2FA. Print or write these down and store in a fireproof document safe. They are the recovery path when you lose access to your authenticator app or phone number.</p>`, 102, 117),
    ch(8, "Healthy Social Media Habits", `<p>Beyond security and privacy, social media use has measurable mental health impacts. Studies consistently link passive scrolling with increased anxiety and depression, while active, intentional use correlates with neutral or positive outcomes.</p><h3>Intentional Use Principles</h3><ul><li>Turn off all social media notifications. Check on your schedule, not theirs.</li><li>Use grayscale mode (accessibility settings) to reduce the dopamine reward of bright notifications.</li><li>Set a daily time limit in Screen Time (iOS) or Digital Wellbeing (Android).</li><li>Audit your follows annually: unfollow anyone who consistently leaves you feeling worse about yourself.</li></ul><p>The goal is not to demonize social media. It is to use it as a tool you control, rather than a tool that controls you.</p>`, 118, 126),
  ],
};

// ---------------------------------------------------------------------------
// 8. Understanding AI Threats
// ---------------------------------------------------------------------------
const understandingAiThreats: LibraryBook = {
  slug: "understanding-ai-threats",
  title: "Understanding AI Threats",
  subtitle: "How Artificial Intelligence Is Used Against You — and How to Fight Back",
  description:
    "A comprehensive technical-but-accessible overview of how AI is weaponized for cybercrime: deepfakes, voice cloning, automated phishing, adversarial attacks, AI-generated disinformation, and synthetic identity fraud.",
  cover_image: "/images/books/understanding-ai-threats.webp",
  total_pages: 156,
  price: 37.99,
  bulk_price: 26.99,
  category: "ai",
  tag: "Expert Level",
  stripe_price_id: "price_understanding_ai_threats",
  chapters: [
    ch(1, "The AI Arms Race", `<p>For every defensive AI application — spam filters, fraud detection, malware classifiers — there is an offensive counterpart. We are in an AI arms race where defenders and attackers each use the same foundational tools. Understanding the attacker's toolkit is the prerequisite for effective defense.</p><p>The pace of AI development has outrun regulation and most organizational security programs. Capabilities that required nation-state resources in 2020 are now available to individual attackers for less than $100/month via consumer AI services.</p>`, 1, 19),
    ch(2, "Deepfakes: How They Work and How to Spot Them", `<p>A deepfake is media — video, audio, or image — in which a person's likeness has been replaced or manipulated using a generative AI model. The underlying technique, a generative adversarial network (GAN) or diffusion model, learns to produce outputs indistinguishable from real media.</p><h3>Detection Methods</h3><ul><li><strong>Blinking</strong>: Early deepfakes rarely blinked. Current models blink, but the cadence may be irregular.</li><li><strong>Lighting inconsistencies</strong>: The face's light sourcing may not match the background.</li><li><strong>Edge artifacts</strong>: Hair, ears, and glasses frequently show blurring or distortion at boundaries.</li><li><strong>Unnatural head movement</strong>: Deepfake faces tend to drift when the subject moves vigorously.</li></ul><h3>AI Detection Tools</h3><p>Microsoft's Video Authenticator and Hive Moderation's deepfake detector analyze video frame-by-frame. No tool is 100% accurate — treat detection as probabilistic, not definitive.</p>`, 20, 38),
    ch(3, "Voice Cloning and Audio Deepfakes", `<p>Modern voice cloning requires as little as 3 seconds of audio. The cloned voice can read arbitrary text with the original speaker's timbre, accent, and speech patterns — indistinguishable to most listeners in casual interaction.</p><h3>Defense Against Voice Cloning</h3><ul><li>Family/business code words known only to trusted parties</li><li>Callback verification to numbers already on file</li><li>Video verification for high-stakes decisions (hiring, wire transfers)</li><li>Awareness that emotional urgency is a manipulation signal regardless of the voice's authenticity</li></ul>`, 39, 57),
    ch(4, "AI-Generated Phishing and Spear Phishing", `<p>Language models can now generate unlimited personalized phishing emails with zero typos, culturally appropriate writing style, and context-specific details drawn from public information about the target. Volume is no longer a constraint — a single attacker with a $20/month API subscription can run thousands of personalized campaigns simultaneously.</p><h3>AI-Powered Spear Phishing Workflow</h3><ol><li>Scrape target's LinkedIn, social media, company website, news mentions</li><li>Feed profile to language model: "Write an email from [target's boss] to [target] requesting urgent review of this document"</li><li>Host malicious document or credential-harvesting page</li><li>Send; monitor clicks</li></ol><p>Defense is the same as for manual phishing — verify the requester via a separate channel — but the urgency and plausibility of AI-generated attacks are significantly higher.</p>`, 58, 76),
    ch(5, "AI-Generated Disinformation", `<p>AI makes disinformation cheap, fast, and scalable. A single operator can generate thousands of synthetic social media personas, each with a coherent posting history, profile photo (generated by image AI), and consistent political/social stance — all in hours.</p><h3>Indicators of Synthetic Accounts</h3><ul><li>Profile photo that appears AI-generated: unnaturally smooth skin, asymmetric jewelry, blurred background edges</li><li>Account created recently (within the last year) with very high posting volume</li><li>Engagement that does not match follower count</li><li>Posts that never reference personal experience, only political content</li></ul><h3>Checking Profile Photos</h3><p>Drag the profile photo into Google Images or use ThisPersonDoesNotExist.com to familiarize yourself with what AI faces look like. The site generates one new AI face with each refresh.</p>`, 77, 95),
    ch(6, "Synthetic Identity Fraud", `<p>Synthetic identity fraud combines real identity elements (often a legitimate Social Security number, sometimes of a child or deceased person) with fabricated information to create a new, artificial identity used to open credit accounts.</p><p>Unlike traditional identity theft, synthetic fraud often goes undetected for years — the victim's credit is unaffected until the fraudster "busts out" (maxes out all synthetic accounts and disappears). Children and elderly people are disproportionate victims because their credit files are rarely monitored.</p><h3>Protection</h3><ul><li>Monitor children's credit — they should have none. Any credit file for a minor is a red flag.</li><li>Credit freezes at all three bureaus for all family members, including children.</li></ul>`, 96, 114),
    ch(7, "AI in Malware and Ransomware", `<p>Security researchers have demonstrated AI-assisted malware that modifies its own code to evade antivirus detection, identifies the most valuable files for encryption based on content analysis, and selects ransom amounts calibrated to the victim's estimated ability to pay. These capabilities are now appearing in criminal toolkits, not just research labs.</p><h3>AI-Powered Endpoint Detection and Response (EDR)</h3><p>The defense is also AI. Modern EDR tools (CrowdStrike, SentinelOne, Microsoft Defender for Endpoint) use behavioral AI to detect malware based on what it does, not what it looks like. This catches novel malware that signature-based antivirus misses. Small businesses should budget for EDR — it is now affordable at $5–10/endpoint/month.</p>`, 115, 133),
    ch(8, "Staying Ahead of AI Threats", `<p>The AI threat landscape will continue to evolve faster than any book can capture. The principles that protect you will remain stable even as specific attack methods change.</p><h3>Durable Defense Principles</h3><ul><li><strong>Verify identity independently</strong> — voice, text, and video can all be faked; use separate channels</li><li><strong>Slow down under pressure</strong> — urgency is a manipulation signal, not a legitimate communication style</li><li><strong>Minimize your data surface</strong> — less public data means less ammunition for targeted attacks</li><li><strong>Keep software updated</strong> — AI-powered exploits target known vulnerabilities first</li><li><strong>Use strong 2FA</strong> — passkeys and hardware keys resist AI-powered credential stuffing</li></ul><p>InVision Network's threat intelligence team monitors emerging AI attack vectors and publishes monthly briefings at invisionnetwork.org/articles. Subscribe to stay current.</p>`, 134, 156),
  ],
};

// ---------------------------------------------------------------------------
// 9. Seniors' Guide to Safe Computing
// ---------------------------------------------------------------------------
const seniorsGuideSafeComputing: LibraryBook = {
  slug: "seniors-guide-safe-computing",
  title: "Seniors' Guide to Safe Computing",
  subtitle: "Confidence, Security, and Peace of Mind at Every Age",
  description:
    "Written specifically for adults 60+. Covers the most common scams targeting seniors, simple security habits that don't require technical knowledge, and how to get help from family members without feeling dependent.",
  cover_image: "/images/books/seniors-guide-safe-computing.webp",
  total_pages: 122,
  price: 24.99,
  bulk_price: 17.99,
  category: "seniors",
  tag: "For Seniors",
  stripe_price_id: "price_seniors_guide",
  chapters: [
    ch(1, "You Are Not the Problem — The Scammers Are", `<p>If you have ever nearly fallen for a scam — or did fall for one — please hear this: you are not gullible, careless, or getting too old to use technology. The people behind these scams are professional criminals who have refined their techniques over decades. They study psychology. They script their calls. They know exactly which words to say to create panic or excitement.</p><p>Adults over 60 are not targeted because they are easier to fool. Research shows older adults are targeted because they are more likely to have savings, own their home, have good credit, and answer phone calls from unknown numbers. The targeting is economic, not intellectual.</p><p>This book is for you. Every chapter is written in plain language, without technical jargon, and with the specific scams and safety steps most relevant to your life.</p>`, 1, 15),
    ch(2, "The Scams That Target Seniors Most", `<p>While all the scam types covered in other InVision books apply to seniors, these categories account for the majority of senior fraud losses.</p><h3>Medicare and Health Insurance Fraud</h3><p>Callers offer free medical equipment, testing, or supplements in exchange for your Medicare number — which is then billed for hundreds of thousands of dollars in services never rendered. Your Medicare number is as valuable as your Social Security number. Guard it accordingly: never give it to unsolicited callers, and review your Medicare Summary Notice for services you did not receive.</p><h3>Grandparent Scam</h3><p>"Grandma, it's me, I'm in trouble" — followed by a request for bail money via gift cards. The voice may be AI-cloned from your grandchild's social media videos. Establish a family code word. If the caller cannot provide it, hang up and call your grandchild directly.</p><h3>Lottery and Prize Fraud</h3><p>You won a prize you never entered. To collect, you must pay taxes or fees upfront via wire transfer or gift card. Legitimate prizes do not require upfront payment. Hang up.</p>`, 16, 32),
    ch(3, "Gift Cards: The Red Flag of Fraud", `<p>Here is the most important single fact in this book: <em>No legitimate business, government agency, or person you owe money to will ever ask you to pay with gift cards.</em></p><p>This applies to the IRS, Social Security, your utility company, the police, the court system, Medicare, your bank, Microsoft, Apple, and every other institution. Gift cards are untraceable and irreversible — they are only useful as a payment method for criminals.</p><h3>What to Say at the Register</h3><p>Many grocery stores and pharmacies now post warnings near gift card displays and train cashiers to ask about large gift card purchases. If a cashier asks, it is because they are trying to protect you. Tell them the truth — they may have seen this before and can help.</p>`, 33, 46),
    ch(4, "Simple Security Habits That Actually Work", `<p>You do not need to understand how computers work to be safe. These habits protect you without requiring any technical knowledge.</p><h3>The Three Simple Rules</h3><ol><li><strong>When in doubt, hang up and call back</strong> — independently look up the number, not the one given to you by the caller. Your bank's number is on the back of your card.</li><li><strong>Never give remote access to your computer</strong> — if someone calls and asks to "fix" your computer by controlling it remotely, hang up. Real tech support does not call you unsolicited.</li><li><strong>Tell someone before you send money</strong> — any time you are about to wire money, send gift cards, or pay someone in cryptocurrency, call a family member or friend first. A second opinion is free and prevents most fraud losses.</li></ol>`, 47, 63),
    ch(5, "Working with Family on Digital Safety", `<p>Many seniors are reluctant to ask family members for help with technology for fear of appearing dependent or incompetent. This reluctance creates a safety gap. The goal of this chapter is to make that conversation easier on both sides.</p><h3>For Seniors: How to Ask for Help</h3><p>Framing matters. Instead of "I don't understand this computer thing," try: "I read that setting up this password manager reduces scam risk — could you help me set it up this weekend?" You are not asking to be taken care of. You are collaborating on a practical goal.</p><h3>For Family Members Reading This With a Loved One</h3><p>Patience is the entire job. What takes you 30 seconds may take 10 minutes for someone learning new software for the first time. The pace does not reflect intelligence — it reflects exposure. Celebrate progress; never express frustration.</p>`, 64, 80),
    ch(6, "Email and Internet Safety Basics", `<p>Email is the most common starting point for fraud targeting seniors. A few habits dramatically reduce risk.</p><h3>Before You Click Any Link</h3><ul><li>Were you expecting this email? Unexpected emails about your bank account, a package, or a prize are almost always scams.</li><li>Does the email address look right? "paypa1.com" is not "paypal.com." Look carefully at every letter.</li><li>Is there urgency or a threat? Real organizations do not threaten immediate consequences in emails.</li></ul><h3>Safe Browsing Habits</h3><p>When searching for a company's customer service number, type the company name plus ".com" directly into the browser address bar. Do not call numbers that appear in search ads — scammers pay for these ads specifically to intercept people looking for legitimate company phone numbers.</p>`, 81, 97),
    ch(7, "Managing Your Accounts and Passwords", `<p>You may have dozens of online accounts. Remembering a different strong password for each one is genuinely impossible without help. The solution is a password manager — a program that remembers all your passwords and fills them in automatically.</p><h3>Getting Started with a Password Manager</h3><p>For seniors who prefer simplicity, iCloud Keychain (built into all Apple devices) and Google Password Manager (built into Chrome and Android) offer password management without a separate subscription. They are not perfect for advanced users but are dramatically better than reusing the same password everywhere.</p><h3>Writing Down Passwords Safely</h3><p>Despite what you may have heard, writing down passwords is not necessarily bad. A physical notebook kept in a locked drawer, used as a backup to your password manager, is a reasonable safety net. What is dangerous is a sticky note on your monitor, or a list in an email draft.</p>`, 98, 112),
    ch(8, "Building Your Support Network", `<p>No one is an island when it comes to digital safety. Having one or two trusted people you can call before sending money, clicking a suspicious link, or giving remote access to your computer is the most powerful safety net available.</p><h3>Your Digital Safety Circle</h3><p>Identify two people in your life — a family member, neighbor, or friend — who you trust to give you a second opinion on digital safety questions. Put their phone numbers in your phone's favorites. Tell them you would like to call them occasionally for a quick reality check on something that seems off. Most people are honored to be asked.</p><h3>InVision Network Community</h3><p>InVision Network offers free monthly online safety workshops specifically for seniors in Southwest Ohio. In-person sessions in the Dayton area are available for groups and senior centers. Call (407) 446-5749 or visit invisionnetwork.org/training for the current schedule.</p>`, 113, 122),
  ],
};

// ---------------------------------------------------------------------------
// 10. Ransomware and Data Recovery
// ---------------------------------------------------------------------------
const ransomwareDataRecovery: LibraryBook = {
  slug: "ransomware-data-recovery",
  title: "Ransomware & Data Recovery",
  subtitle: "Prevention, Response, and Getting Your Files Back",
  description:
    "Everything you need to know about ransomware — how it spreads, how to prevent it, what to do in the first 60 minutes after an attack, and how to recover your data with or without paying the ransom.",
  cover_image: "/images/books/ransomware-data-recovery.webp",
  total_pages: 144,
  price: 36.99,
  bulk_price: 25.99,
  category: "cybersecurity",
  tag: "Critical",
  stripe_price_id: "price_ransomware_recovery",
  chapters: [
    ch(1, "What Ransomware Is and How It Spreads", `<p>Ransomware is malicious software that encrypts your files — documents, photos, databases — and demands payment (the "ransom") in exchange for the decryption key. Modern ransomware operations are run by professional criminal organizations with customer service portals, negotiation teams, and revenue-sharing affiliate programs.</p><h3>Primary Infection Vectors</h3><ul><li><strong>Phishing email attachments</strong> (60%+ of cases): malicious Word document, PDF, or ZIP file</li><li><strong>Remote Desktop Protocol (RDP) brute force</strong>: attackers scan for exposed RDP ports and try common passwords</li><li><strong>Software vulnerabilities</strong>: unpatched operating systems and applications</li><li><strong>Malicious downloads</strong>: pirated software, fake browser updates, compromised legitimate websites</li></ul>`, 1, 18),
    ch(2, "The First 60 Minutes After an Attack", `<p>How you respond in the first hour after discovering ransomware determines whether the attack affects one device or your entire network.</p><h3>Immediate Response Checklist</h3><ol><li><strong>Disconnect immediately</strong>: Unplug the affected device's ethernet cable. If on Wi-Fi, disable the Wi-Fi adapter. Do not shut down the device yet — volatile memory may contain decryption keys or attacker artifacts useful for forensics.</li><li><strong>Isolate, don't power off</strong>: Shut down only if you cannot disconnect from the network another way.</li><li><strong>Alert your network</strong>: Tell every other user on the network to watch for ransomware note or encrypted files. The infection may already be spreading laterally.</li><li><strong>Preserve evidence</strong>: Photograph the ransom note. Note the time you first noticed the encryption. This documentation aids law enforcement and insurance claims.</li><li><strong>Contact cyber incident response</strong>: Call your cyber insurer's hotline or a ransomware incident response firm before making any decisions about payment.</li></ol>`, 19, 37),
    ch(3, "To Pay or Not to Pay", `<p>The FBI recommends against paying ransoms. Payment funds criminal operations, incentivizes future attacks, and does not guarantee a working decryptor. In practice, about 70% of victims who pay receive a decryptor. 30% do not, or receive a broken one.</p><h3>Before Deciding</h3><ul><li>Check No More Ransom (nomoreransom.org) — a free database of ransomware decryptors contributed by law enforcement and security companies. As of 2024, free decryptors exist for 165+ ransomware families.</li><li>Identify the ransomware strain — most display their name or a unique extension. Submit a sample file to ID Ransomware (id-ransomware.malwarehunterteam.com) for identification.</li><li>Assess your backup situation — if clean backups exist, payment is unnecessary.</li></ul><h3>If You Decide to Pay</h3><p>Engage a ransomware negotiation firm (Coveware, Kivu) if the ransom exceeds $50,000. They have direct relationships with ransomware groups, know going rates, and can verify working decryptors before final payment.</p>`, 38, 56),
    ch(4, "Backup Strategies That Survive Ransomware", `<p>Ransomware has adapted to destroy backups. Modern variants actively search for and encrypt backup files before triggering the visible encryption of user files. A backup strategy that survives ransomware has specific requirements.</p><h3>Immutable Backup Requirements</h3><ul><li>Backups must be inaccessible from the infected machine at the time of attack (offline, air-gapped, or write-protected)</li><li>Cloud backups must use versioning with immutability — so even if the infected machine's cloud client can access backups, it cannot overwrite older versions</li><li>Test restoration quarterly — not annually</li></ul><h3>Recommended Stack</h3><ul><li>Local: NAS (network-attached storage) with Veeam immutable snapshots</li><li>Cloud: Backblaze B2 with Object Lock (immutable), or AWS S3 with Glacier Vault Lock</li><li>Offsite physical: quarterly USB drive shipped to a trusted off-site location</li></ul>`, 57, 75),
    ch(5, "Recovery Without Paying: Step by Step", `<p>If you have clean backups, recovery is a methodical process. If you do not, partial recovery may still be possible via file carving, volume shadow copies, and free decryptors.</p><h3>Clean Recovery Process</h3><ol><li>Wipe and reimage the affected device — do not attempt to clean the malware from an infected system. Rebuild from scratch.</li><li>Verify the rebuild is clean before connecting to any network.</li><li>Restore from the most recent clean backup (verified prior to the attack date).</li><li>Change every credential that could have been exposed from the infected device.</li><li>Investigate the infection vector and remediate before returning to normal operations.</li></ol><h3>Volume Shadow Copy Recovery (Windows)</h3><p>Windows automatically creates shadow copies of files at restore points. If ransomware did not explicitly delete shadow copies (many variants do), you can recover previous file versions via right-click → Properties → Previous Versions.</p>`, 76, 94),
    ch(6, "Preventing the Next Attack", `<p>Post-incident is the best time to harden your defenses — the pain is fresh and leadership is motivated. Use this window.</p><h3>High-Impact Prevention Controls</h3><ul><li><strong>Patch everything</strong>: 85% of successful ransomware attacks exploit known, patched vulnerabilities. Enable automatic updates across the board.</li><li><strong>Disable RDP if unused</strong>: If you do not need Remote Desktop Protocol, disable it. If you do, put it behind a VPN and use MFA.</li><li><strong>Email filtering</strong>: Enable sandbox analysis for email attachments. Microsoft Defender for Office 365 and Proofpoint both offer this at small business price points.</li><li><strong>Least privilege</strong>: Users should not have local admin rights on their workstations. Ransomware running under a standard user account has limited ability to propagate.</li><li><strong>Network segmentation</strong>: VLAN-separate servers, workstations, and backups so lateral movement is harder.</li></ul>`, 95, 113),
    ch(7, "Legal, Insurance, and Notification Obligations", `<p>A ransomware attack may trigger legal notification obligations you are unaware of. Understanding these in advance allows you to respond appropriately rather than discover obligations after the window has closed.</p><h3>Data Breach Notification Laws</h3><p>If the ransomware attack resulted in unauthorized access to personal information (names, SSNs, health data, financial accounts), most US states require notification to affected individuals within 30–90 days. The specific timeline depends on your state and the type of data involved. Consult legal counsel as soon as you determine whether personal data was accessed.</p><h3>Cyber Insurance Claims</h3><p>Report to your cyber insurer immediately — most policies have notification requirements within 72 hours. Your insurer's incident response team can provide forensic assistance, legal guidance, and negotiation support. Delayed reporting can void coverage.</p>`, 114, 130),
    ch(8, "Building Ransomware Resilience", `<p>True resilience is the ability to recover from ransomware quickly and cheaply regardless of whether backups survived, whether the decryptor works, or whether the payment was made. It requires investment in both prevention and recovery capability.</p><h3>The Resilience Maturity Model</h3><ul><li><strong>Level 1 (Basic)</strong>: Regular backups + tested restore, email filtering, patch management</li><li><strong>Level 2 (Intermediate)</strong>: Immutable cloud backups, EDR on all endpoints, MFA on all accounts, incident response plan</li><li><strong>Level 3 (Advanced)</strong>: Air-gapped offline backups, network segmentation, deception technology, cyber insurance with sub-$50K deductible, tested IR tabletop exercises</li></ul><p>Most small businesses should target Level 2. Most are currently at Level 0. Close that gap before the next incident.</p>`, 131, 144),
  ],
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export const LIBRARY_BOOKS: LibraryBook[] = [
  digitalSelfDefense,
  scamProof,
  aiForEverydayLife,
  securingHomeNetwork,
  privacyDigitalAge,
  cybersecuritySmallBusiness,
  socialMediaSafety,
  understandingAiThreats,
  seniorsGuideSafeComputing,
  ransomwareDataRecovery,
];

export const getBookBySlug = (slug: string): LibraryBook | undefined =>
  LIBRARY_BOOKS.find((b) => b.slug === slug);
