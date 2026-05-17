

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const changelogEntries = [
  {
    date: "March 29, 2026",
    version: "v1.0.1",
    title: "Brand Evolution & UI Enhancements",
    changes: [
      {
        "type": "Rebrand & UX Refresh",
        "description": "Shifted to a sharper identity with the new domain (stocx-labs.vercel.app). Polished the footer with a sleek, modern redesign for a more refined and seamless user experience."
      }
    ]
  },
  {
    date: "March 29, 2026",
    version: "v1.2.0",
    title: "Stability & Connectivity Updates",
    changes: [
      {
        type: "Upgrade",
        description: "Upgraded to the latest framework version, improving overall performance while resolving database instability and eliminating crash issues."
      },
      {
        type: "Fix",
        description: "Resolved hydration warnings and standardized dimensions across the search bar and landing page bento grid for a consistent, stable UI."
      },
      {
        type: "Feature",
        description: "Revamped the navbar component with a modernized UI and improved user experience.",
      },
      {
        type: "Fix",
        description: "Resolved UI issues in the search bar to improve functionality and visual consistency.",
      },
      {
        type: "Fix",
        description: "Fixed Changelog: Resolved content discrepancies and layout alignment issues.",
      },
      {
        type: "Fix",
        description: "Backend Optimization: Fixed and optimized all cron jobs for data fetching.",
      },
      {
        type: "Feature",
        description: "Market Expansion: Added support and features for tracking non-US stocks.",
      }
    ]
  },
  {
    date: "March 05, 2026",
    version: "V1.0 - The Launch Era",
    title: "Focus on Background Automation & Real-time Alerts",
    changes: [
      {
        type: "Market",
        description: "Market Coverage: V1.0 is working currently for US market; other markets are coming soon.",
      },
      {
        type: "Feature",
        description: "Notifications Hub: Added dedicated /notifications route for central alert management and real-time notification bell in navigation bar.",
      },
      {
        type: "Infrastructure",
        description: "Scheduled Tasks: Automated data fetching and monitoring integrated into the core backend.",
      }
    ]
  },
  {
    date: "March 28, 2026",
    version: "v1.0.0",
    title: "Core Features & Infrastructure",
    changes: [
      {
        "type": "Feature",
        "description": "Market Dashboard: Real-time charts displaying stock trends and insights."
      },
      {
        "type": "Feature",
        "description": "Advanced Search: Instant stock and company lookup with trending suggestions."
      },
      {
        "type": "Infrastructure",
        "description": "Secure authentication system with a scalable and reliable data storage architecture."
      }
    ]
  }
]

const ChangelogPage = () => {
    return (
        <section className="bg-background min-h-screen relative overflow-hidden">
            <Navbar />
            
            <Wrapper>
                <AnimationContainer delay={0.1}>
                    <div className="max-w-4xl mx-auto pt-32 pb-16 px-6">
                        <div className="mb-12 text-center">
                            <Badge variant="outline" className="mb-4">Changelog</Badge>
                            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Latest Updates</h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Following the journey of STOCX—building the future of  stock market intelligence.
                            </p>
                        </div>

                        <div className="space-y-12 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-0 sm:left-1/2 top-4 bottom-4 w-px bg-border -translate-x-1/2 hidden sm:block"></div>

                            {changelogEntries.map((entry, entryIdx) => (
                                <div key={entryIdx} className="relative">
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 sm:left-1/2 top-4 size-3 rounded-full bg-primary -translate-x-1/2 ring-4 ring-background z-10 hidden sm:block"></div>
                                    
                                    <div className={entryIdx % 2 === 0 ? "sm:pr-[50%] sm:text-right" : "sm:pl-[50%]"}>
                                        <div className={entryIdx % 2 === 0 ? "sm:mr-10" : "sm:ml-10"}>
                                            <div className="flex items-center gap-2 mb-2 sm:justify-normal justify-start">
                                                <span className="text-sm font-mono text-muted-foreground">{entry.date}</span>
                                                <Badge variant="secondary" className="text-[10px] uppercase">{entry.version}</Badge>
                                            </div>
                                            <h2 className="text-2xl font-serif font-medium mb-4">{entry.title}</h2>
                                            
                                            <div className="space-y-4">
                                                {entry.changes.map((change, changeIdx) => (
                                                    <Card key={changeIdx} className="border-none bg-muted/30 dark:bg-zinc-900/50">
                                                        <CardContent className="p-4 text-left">
                                                            <div className="flex items-start gap-3">
                                                                <Badge className="shrink-0 text-[10px] mt-0.5" variant={
                                                                    change.type === 'Feature' ? 'default' : 
                                                                    change.type === 'Fix' ? 'destructive' : 'outline'
                                                                }>
                                                                    {change.type}
                                                                </Badge>
                                                                <p className="text-sm leading-relaxed text-muted-foreground">
                                                                    {change.description}
                                                                </p>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimationContainer>

                <AnimationContainer delay={0.2}>
                    <div className="max-w-4xl mx-auto pb-16 px-6">
                        {/* Meet the Developer */}
                        <section id="meet-the-developer-section" className="space-y-10 scroll-mt-24">
                            <h2 id="meet-the-developer" className="text-2xl font-bold tracking-tight text-foreground">Meet the Developer</h2>
                            <div className="p-8 rounded-2xl bg-muted/30 dark:bg-zinc-900/40 border border-border hover:border-primary transition-all duration-300">
                                <span className="text-muted-foreground block text-sm leading-relaxed">
                                    All rights reserved — created by{" "}
                                    <Link
                                        href="https://www.linkedin.com/in/chunduru-karthikeya-36144b302/"
                                        className="text-primary font-medium hover:underline decoration-primary/30 underline-offset-4"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Chunduru Karthikeya
                                    </Link>
                                </span>
                            </div>
                        </section>
                    </div>
                </AnimationContainer>
            </Wrapper>
        </section>
    )
}

export default ChangelogPage

