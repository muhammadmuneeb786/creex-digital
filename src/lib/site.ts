/**
 * Site-wide content and settings. Edit here — every page reads from this file.
 */

/**
 * Public site URL. Priority: NEXT_PUBLIC_SITE_URL → Vercel's production domain → fallback.
 * Tolerates values typed without a protocol or with a trailing slash.
 */
function resolveSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || "https://www.creexdigital.com";
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return "https://www.creexdigital.com";
  }
}

export const SITE = {
  name: "Creex Digital",
  tagline: "Social media marketing & graphic design studio",
  description:
    "Creex Digital plans, designs and manages social media for brands: designed posts, reels, ads management, monthly planners and reporting. Packages from Rs. 35k/month.",
  url: resolveSiteUrl(),

  // TODO: replace with the studio's real contact details
  email: "hello@creexdigital.com",
  phoneDisplay: "+92 300 0000000",
  whatsappNumber: "923000000000", // digits only, with country code
  whatsappGreeting: "Hi Creex Digital! I'd like to talk about social media marketing for my brand.",
  location: "Lahore, Pakistan",

  socials: [
    { name: "Facebook", href: "https://www.facebook.com/", icon: "fb" },
    { name: "Instagram", href: "https://www.instagram.com/", icon: "ig" },
    { name: "TikTok", href: "https://www.tiktok.com/", icon: "tt" },
    { name: "LinkedIn", href: "https://www.linkedin.com/", icon: "li" },
    { name: "YouTube", href: "https://www.youtube.com/", icon: "yt" },
  ],
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text ?? SITE.whatsappGreeting)}`;

export const NAV = [
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/#packages" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const PLATFORMS = [
  { name: "Facebook", icon: "fb" },
  { name: "Instagram", icon: "ig" },
  { name: "TikTok", icon: "tt" },
  { name: "X (Twitter)", icon: "x" },
  { name: "LinkedIn", icon: "li" },
  { name: "Pinterest", icon: "pin2" },
  { name: "YouTube", icon: "yt" },
] as const;

export type PackageId = "basic" | "standard" | "premium";

export interface Package {
  id: PackageId;
  name: string;
  price: string;
  fit: string;
  featured: boolean;
  groups: [string, string[]][];
}

export const PACKAGES: Package[] = [
  {
    id: "basic",
    name: "Basic",
    price: "35k",
    fit: "Best for startups & small businesses",
    featured: false,
    groups: [
      ["Posting schedule", ["Alternate-day posting"]],
      ["Content creation", ["10 static posts (designed)", "2 reels (animated / edited)", "Facebook cover design"]],
      ["Ad support", ["Ads management (up to 3 ads)"]],
      ["Content planning", ["Monthly content planner", "Hashtag research & optimization"]],
      ["Account management", ["Facebook", "Instagram"]],
      ["Bonus platform", ["One extra platform included (TikTok / X / LinkedIn / Pinterest / YouTube, etc.)"]],
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: "60k",
    fit: "Ideal for growing brands",
    featured: true,
    groups: [
      ["Posting schedule", ["5 posts per week"]],
      ["Content creation", ["12 static posts (designed)", "6 reels (animated / edited)", "Facebook & Instagram cover designs"]],
      ["Ad support", ["Ad creatives", "Ads management (up to 5 ads)"]],
      ["Content planning", ["Monthly content planner", "Hashtag research & optimization", "Basic competitor analysis"]],
      ["Account management", ["Facebook", "Instagram"]],
      ["Bonus platform", ["One extra platform included (TikTok / X / LinkedIn / Pinterest / YouTube, etc.)"]],
      ["Reporting", ["Monthly performance report"]],
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "100k",
    fit: "For brands that want market dominance",
    featured: false,
    groups: [
      ["Posting schedule", ["Daily posting (5–6 days / week)"]],
      ["Content creation", ["16 static posts (designed)", "10 reels (animated / edited)", "Cover designs for all platforms", "Branded post & reel templates"]],
      ["Ad support", ["Ad creatives + copies", "Ads management (up to 8 ads)", "Campaign optimization & monitoring"]],
      ["Content planning", ["Monthly content planner", "Advanced hashtag strategy", "Competitor & trend analysis", "Content strategy consultation"]],
      ["Account management", ["Facebook", "Instagram"]],
      ["Bonus platform", ["Two extra platforms included (TikTok / X / LinkedIn / Pinterest / YouTube, etc.)"]],
      ["Reporting", ["Detailed monthly performance report", "Priority support"]],
    ],
  },
];

/** Options offered in the contact form's "package" select. */
export const PACKAGE_OPTIONS = [
  { value: "unsure", label: "Not sure yet — recommend one" },
  { value: "basic", label: "Basic — Rs. 35k / month" },
  { value: "standard", label: "Standard — Rs. 60k / month" },
  { value: "premium", label: "Premium — Rs. 100k / month" },
  { value: "design", label: "Graphic design only" },
] as const;

export const SERVICES = [
  {
    id: "social-media-management",
    icon: "users",
    art: "posts",
    title: "Social media management",
    short: "Day-to-day management of your Facebook and Instagram accounts, plus a bonus platform of your choice — TikTok, X, LinkedIn, Pinterest or YouTube.",
    shortPoints: ["Alternate-day to daily posting", "Account setup & optimization", "Bonus platform included"],
    long: "We run your accounts day to day: setup and optimization, a posting schedule that matches your package, community replies, and a bonus platform beyond Facebook and Instagram.",
    longPoints: ["Facebook & Instagram account management", "Alternate-day, 5×/week or daily posting", "One or two bonus platforms (TikTok, X, LinkedIn, Pinterest, YouTube)", "Profile and cover optimization"],
    included: "All packages",
  },
  {
    id: "content-creation",
    icon: "image",
    art: "reels",
    title: "Content creation",
    short: "Static posts designed to your brand, reels that are animated or edited, and cover designs that make your profiles look finished.",
    shortPoints: ["10–16 static posts / month", "2–10 reels / month", "Covers & branded templates"],
    long: "Static posts designed to your brand and reels that are animated or edited — the volume scales with your package, the quality doesn't.",
    longPoints: ["10, 12 or 16 designed static posts per month", "2, 6 or 10 animated / edited reels per month", "Facebook & Instagram cover designs", "Branded post & reel templates on Premium"],
    included: "All packages",
  },
  {
    id: "ads-management",
    icon: "megaphone",
    art: "ads",
    title: "Ads management",
    short: "Ad creatives and copies, campaign setup, and ongoing optimization and monitoring — with the ad budget agreed separately and transparently.",
    shortPoints: ["Up to 8 managed ads", "Creatives + copy", "Campaign optimization"],
    long: "From creatives and copy to campaign setup, optimization and monitoring. The ad budget itself is agreed separately, so you always know what you're spending on media versus management.",
    longPoints: ["Up to 3, 5 or 8 managed ads per month", "Ad creatives (Standard) and creatives + copies (Premium)", "Campaign optimization & monitoring on Premium", "Ad budget decided separately with you"],
    included: "All packages",
  },
  {
    id: "content-planning",
    icon: "planner",
    art: "planner",
    title: "Content planning",
    short: "A monthly content planner before anything is posted, backed by hashtag research, competitor and trend analysis, and strategy consultation.",
    shortPoints: ["Monthly content planner", "Hashtag research & strategy", "Competitor & trend analysis"],
    long: "A monthly content planner before anything is published — themes, formats, captions and hashtags — built from research rather than guesswork.",
    longPoints: ["Monthly content planner for approval", "Hashtag research & optimization", "Basic competitor analysis (Standard)", "Competitor & trend analysis and strategy consultation (Premium)"],
    included: "All packages",
  },
  {
    id: "graphic-design",
    icon: "palette",
    art: "design",
    title: "Graphic design",
    short: "Brand-led design for social and beyond — post and reel templates, platform covers, and the visual system that keeps everything consistent.",
    shortPoints: ["Post & reel templates", "Cover designs for all platforms", "Brand-consistent visuals"],
    long: "The second thing we're known for. Social kits, covers for every platform, branded templates and brand visuals that make everything you publish look like one brand.",
    longPoints: ["Cover designs for all platforms", "Branded post & reel templates", "Social media kits and brand visuals", "Design-only projects on request"],
    included: "Included in packages · also standalone",
  },
  {
    id: "reporting",
    icon: "chart",
    art: "report",
    title: "Reporting & support",
    short: "A monthly performance report that tells you what worked, what didn't and what we're changing next — with priority support on Premium.",
    shortPoints: ["Monthly performance report", "Detailed insights on Premium", "Priority support"],
    long: "Plain-language monthly reporting on reach, engagement and ad performance, and what we're changing next. Premium clients get a detailed report and priority support.",
    longPoints: ["Monthly performance report (Standard)", "Detailed monthly performance report (Premium)", "Priority support (Premium)", "Recommendations feed into the next planner"],
    included: "Standard & Premium",
  },
] as const;

export const PROCESS = [
  ["Discovery call", "We learn your brand, audience, goals and the platforms that matter — then recommend a package."],
  ["Monthly planner", "You get a content calendar for the month ahead: themes, formats, captions and hashtags, ready to approve."],
  ["Design & production", "Our designers create the static posts, reels and covers to your brand, and prepare ad creatives where included."],
  ["Publish & manage", "We post on schedule, manage your accounts and run the agreed ad campaigns."],
  ["Report & improve", "A monthly performance report shows what worked, and the next planner is built on it."],
] as const;

export const WHY = [
  ["sparkle", "Design-first content", "Every post and reel is designed, not dropped into a template. Your feed should look like one brand, not ten stock packs."],
  ["calendar", "A plan before every post", "Nothing goes out without a monthly content planner. You see the month ahead and approve it."],
  ["wallet", "Clear ad budgets", "Ads management is included in every package; the media budget is decided separately with you, so there are no surprises."],
  ["chart", "Reports you can actually read", "Monthly performance reports in plain language: what moved, what didn't, and what we'll do about it."],
] as const;

// TODO: replace these sample quotes with real client feedback
export const TESTIMONIALS = [
  { quote: "Sample client quote — replace with a real review. Two or three sentences about the results the client saw after working with you.", name: "Client name", role: "Company / role" },
  { quote: "Sample client quote — replace with a real review. Mention the package they chose and how their engagement, leads or sales changed.", name: "Client name", role: "Company / role" },
  { quote: "Sample client quote — replace with a real review. A specific, honest quote is more convincing than a generic one.", name: "Client name", role: "Company / role" },
];

export const FAQS = [
  ["What's included in a social media package?", "Every package includes a posting schedule, designed content (static posts and reels), ads management, a monthly content planner with hashtag research, management of your Facebook and Instagram accounts, and at least one bonus platform. Standard adds a monthly performance report and competitor analysis; Premium adds daily posting, branded templates, advanced strategy, a detailed report and priority support."],
  ["Is the ad budget included in the price?", "No. Ad budget is not included and is decided separately with you. The package price covers the work — creatives, copy, campaign setup, optimization and monitoring — while the media spend is paid to the platform directly, at a level you agree on."],
  ["Which platforms do you manage?", "Facebook and Instagram are managed in every package. Basic and Standard include one extra platform of your choice, and Premium includes two — pick from TikTok, X, LinkedIn, Pinterest, YouTube and others."],
  ["How often will you post?", "Basic posts on alternate days, Standard posts five times a week, and Premium posts daily (five to six days a week). Reels are counted separately from static posts in each package."],
  ["Do you also do graphic design outside of social media?", "Yes. Graphic design is one of the two things we're known for. Alongside social content we design covers for every platform, branded post and reel templates, and brand visuals — get in touch for a custom quote on design-only work."],
  ["How do we get started?", "Book a free consultation. We'll review your current accounts, agree on a package and the platforms to cover, then send your first monthly content planner for approval before anything is posted."],
  ["Will I get reports?", "Standard includes a monthly performance report. Premium includes a detailed monthly report and priority support. On Basic we keep you updated through the monthly planner and your account manager."],
] as const;

export type WorkCategory = "social" | "reels" | "ads" | "design";

// TODO: replace with real projects. Add `image: "/img/work/xyz.jpg"` to show a photo instead of the placeholder art.
export const WORK: { category: WorkCategory; tag: string; title: string; desc: string; image?: string }[] = [
  { category: "social", tag: "Social media", title: "Monthly content — fashion brand", desc: "Static posts + reels, Standard package" },
  { category: "design", tag: "Graphic design", title: "Brand visual system", desc: "Templates, covers and social kit" },
  { category: "reels", tag: "Reels", title: "Product launch reels", desc: "Animated + edited reels series" },
  { category: "ads", tag: "Ads", title: "Lead-generation campaign", desc: "Ad creatives, copies and optimization" },
  { category: "social", tag: "Social media", title: "Restaurant account management", desc: "Daily posting, Premium package" },
  { category: "design", tag: "Graphic design", title: "Cover designs for all platforms", desc: "Facebook, Instagram, LinkedIn, YouTube" },
  { category: "reels", tag: "Reels", title: "Educational reels", desc: "Short-form explainers" },
  { category: "social", tag: "Social media", title: "Startup launch month", desc: "Basic package + TikTok bonus platform" },
  { category: "ads", tag: "Ads", title: "Seasonal sales campaign", desc: "Ads management + performance report" },
];

export const WORK_FILTERS: { value: WorkCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "social", label: "Social media" },
  { value: "reels", label: "Reels" },
  { value: "ads", label: "Ads" },
  { value: "design", label: "Graphic design" },
];
