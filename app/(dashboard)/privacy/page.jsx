"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const privacyEntries = [
  {
    date: "Data Collection",
    version: "What we collect",
    title: "1. Information We Collect",
    changes: [
      {
        type: "Tasks",
        description: "Task Management: We securely store your tasks, due dates, and completion statuses to provide a seamless organization experience.",
      },
      {
        type: "Analytics",
        description: "Stats Dashboard: We process your task history locally to generate your personal productivity insights. These analytics are entirely private.",
      },
      {
        type: "Focus",
        description: "Pomodoro Timer: Focus session durations and timer settings are used solely to facilitate your productivity workflows.",
      }
    ]
  },
  {
    date: "Infrastructure",
    version: "Storage & Processing",
    title: "2. Data Processing & Storage",
    changes: [
      {
        type: "Storage",
        description: "Secure Databases: Your task data and productivity metrics are stored securely with high-level encryption and redundancy.",
      },
      {
        type: "Privacy",
        description: "No Third-Party Ads: We strictly never sell your personal data, task contents, or productivity statistics to advertisers.",
      },
      {
        type: "Control",
        description: "Data Ownership: You retain full ownership of your data and can request deletion of your account and all associated tasks at any time.",
      }
    ]
  },
  {
    date: "Protection",
    version: "Security First",
    title: "3. How We Protect Your Data",
    changes: [
      {
        type: "Security",
        description: "Transit Encryption: All data sent between your device and Taskify's servers is encrypted using industry-standard SSL/TLS protocols.",
      },
      {
        type: "Anonymity",
        description: "Telemetry: Any usage data collected to improve performance or squash bugs is strictly anonymized.",
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

const PrivacyPage = () => {
    return (
        <section className="bg-background min-h-screen relative overflow-hidden">
            {/* Note: Navbar is usually in layout, but included here as per user request snippet */}
            {/* If SiteHeader is already visible, this might be redundant, but keeping for fidelity to request */}
            
            <Wrapper>
                <AnimationContainer delay={0.1}>
                    <div className="max-w-4xl mx-auto pt-20 pb-16 px-6">
                        <div className="mb-12 text-center">
                            <Badge variant="outline" className="mb-4 border-slate-200 font-serif">Privacy Policy</Badge>
                            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 text-slate-900 tracking-tight">Your Privacy Matters</h1>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-serif">
                                At Taskify, we are committed to being transparent about how we handle your information and protect your personal data.
                            </p>
                        </div>

                        <div className="space-y-12 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-0 sm:left-1/2 top-4 bottom-4 w-px bg-slate-100 -translate-x-1/2 hidden sm:block"></div>

                            {privacyEntries.map((entry, entryIdx) => (
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

export default PrivacyPage
