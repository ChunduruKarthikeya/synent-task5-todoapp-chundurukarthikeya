"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const termsEntries = [
  {
    date: "Agreement",
    version: "Acceptance",
    title: "1. Acceptance of Terms",
    changes: [
      {
        type: "Consent",
        description: "Local App Terms: By accessing or using Taskify, you agree to be bound by these Terms of Service. This is a local-first web application designed for personal use.",
      },
      {
        type: "Eligibility",
        description: "Minimum Age: You must be at least 13 years old to utilize the local browser storage features and productivity tools of Taskify.",
      },
      {
        type: "Modifications",
        description: "App Updates: We may update the application code to introduce new features. Your local browser storage will remain intact and will automatically migrate during code updates.",
      }
    ]
  },
  {
    date: "Accounts & Data",
    version: "Ownership & Control",
    title: "2. Data Control & Ownership",
    changes: [
      {
        type: "Local Control",
        description: "Offline Control: You are in complete control of your tasks. All task lists, focus history, and priorities are kept in your browser's local storage (localStorage).",
      },
      {
        type: "Ownership",
        description: "Absolute Ownership: You own your tasks, schedules, and priorities. Because we run without a centralized database, we do not have access to, nor do we backup, your information.",
      },
      {
        type: "No Backups",
        description: "Data Responsibility: You are responsible for safeguarding your tasks. Clearing your browser's cache or website data will remove your lists, as we have no database backup to restore them from.",
      }
    ]
  },
  {
    date: "Service Availability",
    version: "Local Running",
    title: "3. Service Availability & Pricing",
    changes: [
      {
        type: "Offline Usage",
        description: "Offline Availability: Once served, Taskify is designed to work fully offline in your browser. Uptime is dependent on your device's browser availability.",
      },
      {
        type: "Local Metrics",
        description: "Productivity Analytics: All statistics and timer tracking metrics are calculated directly on your device, ensuring maximum confidentiality.",
      },
      {
        type: "Pricing",
        description: "Free of Charge: Taskify is offered fully free of charge. Because we run without server hosting overheads for your data, there are no hidden subscription tiers or fees.",
      }
    ]
  },
  {
    date: "Limitations",
    version: "Legal Boundaries",
    title: "4. Liability & Termination",
    changes: [
      {
        type: "Termination",
        description: "Data Clearing: You can terminate your use of Taskify at any moment simply by clearing your browser's site data or local storage.",
      },
      {
        type: "As-Is Warranty",
        description: "Provided 'As-Is': Taskify is provided on an 'as-is' and 'as-available' basis without warranties. We are not liable for any lost productivity or task data loss.",
      }
    ]
  }
]

// Simple inline Wrapper component
const Wrapper = ({ children, className = "" }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
)

// Simple inline AnimationContainer component
const AnimationContainer = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
)

const TermsPage = () => {
    return (
        <section className="bg-background min-h-screen relative overflow-hidden">
            <Wrapper>
                <AnimationContainer delay={0.1}>
                    <div className="max-w-4xl mx-auto pt-20 pb-16 px-6">
                        <div className="mb-12 text-center">
                            <Badge variant="outline" className="mb-4 border-slate-200 font-serif">Terms of Service</Badge>
                            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 text-slate-900 tracking-tight">Terms of Service</h1>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-serif">
                                Please review the terms, rights, and responsibilities associated with using Taskify's local-first task management application.
                            </p>
                        </div>

                        <div className="space-y-12 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-0 sm:left-1/2 top-4 bottom-4 w-[2px] bg-slate-200 -translate-x-1/2 hidden sm:block"></div>

                            {termsEntries.map((entry, entryIdx) => (
                                <div key={entryIdx} className="relative">
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 sm:left-1/2 top-4 size-3 rounded-full bg-slate-900 -translate-x-1/2 ring-4 ring-white z-10 hidden sm:block"></div>
                                    
                                    <div className={entryIdx % 2 === 0 ? "sm:pr-[50%] sm:text-right" : "sm:pl-[50%]"}>
                                        <div className={entryIdx % 2 === 0 ? "sm:mr-10" : "sm:ml-10"}>
                                            <div className={`flex items-center gap-2 mb-2 ${entryIdx % 2 === 0 ? "sm:justify-end" : "sm:justify-start"} justify-start`}>
                                                <span className="text-sm font-mono text-slate-400">{entry.date}</span>
                                                <Badge variant="secondary" className="text-[10px] uppercase bg-slate-100 text-slate-600 border-none font-serif">{entry.version}</Badge>
                                            </div>
                                            <h2 className="text-2xl font-serif font-medium mb-4 text-slate-900">{entry.title}</h2>
                                            
                                            <div className="space-y-4">
                                                {entry.changes.map((change, changeIdx) => (
                                                    <Card key={changeIdx} className="border-none shadow-lg bg-white/70 backdrop-blur-xl rounded-[2rem] overflow-hidden">
                                                        <CardContent className="p-5 text-left">
                                                            <div className="flex items-start gap-3">
                                                                <Badge className="shrink-0 text-[11px] mt-0.5 bg-slate-100 border-none text-slate-700 font-serif shadow-sm" variant="secondary">
                                                                    {change.type}
                                                                </Badge>
                                                                <p className="text-sm leading-relaxed text-slate-600 font-serif">
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
            </Wrapper>
        </section>
    )
}

export default TermsPage
