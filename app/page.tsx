import Link from "next/link"
import { ArrowRight } from "lucide-react"
import HeroSection from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <main className="container mx-auto px-4 py-12 md:py-24">
        <HeroSection />

        <section className="mt-16 md:mt-24 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-[#222222] mb-6">
            Create your ATS resume with the STAR method
          </h2>
          <p className="text-[#555555] text-lg mb-10 leading-relaxed">
            Showcase your experience effectively using the proven Situation, Task, Action, Result methodology that
            hiring managers look for.
          </p>

          <div className="relative inline-block group">
            <Link
              href="/create"
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white rounded-full bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Create Resume <ArrowRight className="ml-2 h-5 w-5" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#56CCF2]/20 to-[#2F80ED]/20 rounded-full blur-md opacity-70 group-hover:opacity-100 animate-pulse transition-all duration-500"></div>
          </div>
        </section>

        <section className="mt-24 md:mt-32 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-[#38A3A5]/10 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-medium text-[#222222] mb-3">Tailored for ATS</h3>
              <p className="text-[#555555] leading-relaxed">
                Specifically designed to pass Applicant Tracking Systems with field-specific terminology and competency
                frameworks.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-[#38A3A5]/10 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-medium text-[#222222] mb-3">STAR Methodology</h3>
              <p className="text-[#555555] leading-relaxed">
                Structure your experience using the proven Situation, Task, Action, Result format that highlights your
                achievements.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-[#38A3A5]/10 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-medium text-[#222222] mb-3">AI-Powered Suggestions</h3>
              <p className="text-[#555555] leading-relaxed">
                Get intelligent recommendations to improve your resume content as you type, tailored to job
                requirements.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-[#38A3A5]/10 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-medium text-[#222222] mb-3">Modern Design</h3>
              <p className="text-[#555555] leading-relaxed">
                Stand out with a clean, professional resume design that reflects your attention to detail and
                professionalism.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

