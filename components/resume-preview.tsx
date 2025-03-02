"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Download, Printer, Share2 } from "lucide-react"

interface ResumePreviewProps {
  data: any
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 30
    const rotateY = (centerX - x) / 30

    setRotation({ x: rotateX, y: rotateY })
  }

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-medium text-[#222222]">Resume Preview</h2>

        <div className="flex space-x-3">
          <button className="p-2 text-[#555555] hover:text-[#222222] transition-colors">
            <Printer className="h-5 w-5" />
            <span className="sr-only">Print</span>
          </button>
          <button className="p-2 text-[#555555] hover:text-[#222222] transition-colors">
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </button>
          <button className="px-4 py-2 text-white bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] rounded-md hover:shadow-md transition-all flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative perspective-1000 mb-8"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetRotation}
      >
        <motion.div
          animate={{
            rotateX: rotation.x,
            rotateY: rotation.y,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="p-8 md:p-12">
            {/* Resume Header */}
            <div className="mb-8 border-b border-[#38A3A5]/20 pb-6">
              <h1 className="text-3xl font-bold text-[#222222] mb-2">{data.personal.name || "Your Name"}</h1>
              <p className="text-lg text-[#555555] mb-4">{data.jobInfo.title || "Professional Title"}</p>

              <div className="flex flex-wrap gap-4 text-sm text-[#555555]">
                {data.personal.email && <div>{data.personal.email}</div>}
                {data.personal.phone && <div>{data.personal.phone}</div>}
                {data.personal.location && <div>{data.personal.location}</div>}
              </div>
            </div>

            {/* Summary */}
            {data.personal.summary && (
              <div className="mb-8">
                <h2 className="text-xl font-medium text-[#222222] mb-3">Professional Summary</h2>
                <p className="text-[#555555] leading-relaxed">{data.personal.summary}</p>
              </div>
            )}

            {/* Experience */}
            <div className="mb-8">
              <h2 className="text-xl font-medium text-[#222222] mb-4">Work Experience</h2>

              {data.experiences.map((exp: any, index: number) => (
                <div
                  key={index}
                  className={`mb-6 ${index < data.experiences.length - 1 ? "pb-6 border-b border-[#38A3A5]/10" : ""}`}
                >
                  <div className="flex flex-wrap justify-between mb-2">
                    <h3 className="text-lg font-medium text-[#222222]">{exp.title || "Position Title"}</h3>
                    <span className="text-sm text-[#555555]">{exp.period || "Time Period"}</span>
                  </div>
                  <p className="text-[#38A3A5] mb-3">{exp.company || "Company Name"}</p>

                  {(exp.star.situation || exp.star.task || exp.star.action || exp.star.result) && (
                    <div className="space-y-3 text-[#555555]">
                      {exp.star.situation && (
                        <div>
                          <span className="font-medium text-[#2F80ED]">Situation: </span>
                          {exp.star.situation}
                        </div>
                      )}
                      {exp.star.task && (
                        <div>
                          <span className="font-medium text-[#38A3A5]">Task: </span>
                          {exp.star.task}
                        </div>
                      )}
                      {exp.star.action && (
                        <div>
                          <span className="font-medium text-[#2F80ED]">Action: </span>
                          {exp.star.action}
                        </div>
                      )}
                      {exp.star.result && (
                        <div>
                          <span className="font-medium text-[#38A3A5]">Result: </span>
                          {exp.star.result}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="mb-8">
              <h2 className="text-xl font-medium text-[#222222] mb-4">Education</h2>
              {data.education.map((edu: any, index: number) => (
                <div
                  key={index}
                  className={`mb-4 ${index < data.education.length - 1 ? "pb-4 border-b border-[#38A3A5]/10" : ""}`}
                >
                  <h3 className="text-lg font-medium text-[#222222]">{edu.degree}</h3>
                  <p className="text-[#38A3A5]">{edu.institution}</p>
                  <p className="text-sm text-[#555555]">{edu.period}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xl font-medium text-[#222222] mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-[#F0F7FF] text-[#2F80ED] rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Shadow effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#56CCF2]/10 to-[#2F80ED]/10 blur-xl rounded-xl transform translate-y-4 scale-95"></div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#38A3A5]/10 mb-8">
        <h3 className="text-lg font-medium text-[#222222] mb-4">AI Suggestions</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#4ECDC4]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[#4ECDC4] text-sm">✓</span>
            </div>
            <div>
              <p className="text-[#222222] font-medium">Strong STAR format implementation</p>
              <p className="text-sm text-[#555555]">
                Your experience clearly follows the STAR method, making it easy for recruiters to understand your
                contributions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FFD166]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[#FFD166] text-sm">!</span>
            </div>
            <div>
              <p className="text-[#222222] font-medium">Consider adding more quantifiable results</p>
              <p className="text-sm text-[#555555]">
                Try to include specific metrics in your results section, such as "reduced incident reports by 30%" or
                "managed 200+ daily operations."
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FF6B6B]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[#FF6B6B] text-sm">×</span>
            </div>
            <div>
              <p className="text-[#222222] font-medium">Missing certifications section</p>
              <p className="text-sm text-[#555555]">
                Consider adding a dedicated certifications section to highlight your qualifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

