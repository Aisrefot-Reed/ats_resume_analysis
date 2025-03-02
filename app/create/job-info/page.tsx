"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, HelpCircle, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function JobInfoPage() {
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [description, setDescription] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      // Autosave logic here
      console.log("Autosaving...")
    }, 30000)

    return () => clearInterval(timer)
  }, [])

  const handleSave = () => {
    setIsSaving(true)
    // Save logic here
    setTimeout(() => setIsSaving(false), 1000)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto"
      descriptionRef.current.style.height = descriptionRef.current.scrollHeight + "px"
    }
  }

  const handleNext = () => {
    // Save the job info (you might want to use a more robust state management solution in a real app)
    localStorage.setItem("jobInfo", JSON.stringify({ jobTitle, company, description }))
    // Navigate to the resume creation page
    router.push("/create")
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white/85 backdrop-blur-md rounded-2xl shadow-lg border border-[#56CCF2]/30 overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] bg-clip-text text-transparent">
              Job Vacancy Information
            </h1>
            <div className="relative">
              <HelpCircle
                className="text-[#2F80ED] cursor-help"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 w-64 p-2 mt-2 text-sm text-white bg-[#2F80ED] rounded-md shadow-lg"
                  >
                    This data will be used to analyze how well your resume matches the job requirements
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all"
                placeholder="e.g., Senior Product Manager"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all"
                placeholder="e.g., Tech Innovations Inc."
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                ref={descriptionRef}
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all min-h-[150px] resize-none"
                placeholder="Describe the main responsibilities and requirements for the candidate..."
              />
              <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                <span>{description.length} / 500 characters</span>
                <button className="text-[#2F80ED] hover:underline">
                  <Upload className="inline-block w-4 h-4 mr-1" />
                  Upload from file
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Link href="/create" className="flex items-center text-[#555555] hover:text-[#222222] transition-colors">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                className={`px-6 py-2 rounded-lg bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] text-white font-medium transition-all ${
                  isSaving ? "opacity-75 cursor-not-allowed" : "hover:shadow-md"
                }`}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-2 rounded-lg bg-[#38A3A5] text-white font-medium hover:bg-[#2F80ED] transition-colors"
              >
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-[#56CCF2] to-[#2F80ED]" style={{ width: "33%" }}></div>
      </motion.div>
    </div>
  )
}

