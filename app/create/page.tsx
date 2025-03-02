"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import StarForm from "@/components/star-form"
import ResumePreview from "@/components/resume-preview"

export default function CreateResumePage() {
  const [activeSection, setActiveSection] = useState("personal")
  const [completedSections, setCompletedSections] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [resumeData, setResumeData] = useState({
    jobInfo: {
      title: "",
      company: "",
      description: "",
    },
    personal: {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experiences: [
      {
        title: "",
        company: "",
        period: "",
        star: {
          situation: "",
          task: "",
          action: "",
          result: "",
        },
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        period: "",
      },
    ],
    skills: [],
  })

  useEffect(() => {
    // Load job info from localStorage
    const savedJobInfo = localStorage.getItem("jobInfo")
    if (savedJobInfo) {
      const parsedJobInfo = JSON.parse(savedJobInfo)
      setResumeData((prevData) => ({
        ...prevData,
        jobInfo: {
          title: parsedJobInfo.jobTitle,
          company: parsedJobInfo.company,
          description: parsedJobInfo.description,
        },
      }))
    }
  }, [])

  const sectionRefs = {
    personal: useRef<HTMLDivElement>(null),
    experiences: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    preview: useRef<HTMLDivElement>(null),
  }

  const scrollToSection = (section: string) => {
    setActiveSection(section)
    sectionRefs[section as keyof typeof sectionRefs]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const updateResumeData = (section: string, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))

    if (!completedSections.includes(section)) {
      setCompletedSections((prev) => [...prev, section])
    }
  }

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          title: "",
          company: "",
          period: "",
          star: {
            situation: "",
            task: "",
            action: "",
            result: "",
          },
        },
      ],
    }))
  }

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          institution: "",
          period: "",
        },
      ],
    }))
  }

  const removeEducation = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const addSkill = () => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }))
  }

  const updateSkill = (index: number, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
    }))
  }

  const removeSkill = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#38A3A5]/10 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center text-[#555555] hover:text-[#222222] transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link
              href="/create/job-info"
              className={`px-3 py-2 rounded-md transition-colors ${
                activeSection === "job-info" ? "text-[#2F80ED] bg-[#2F80ED]/5" : "text-[#555555] hover:text-[#222222]"
              }`}
            >
              Job Info
            </Link>
            <button
              onClick={() => scrollToSection("personal")}
              className={`px-3 py-2 rounded-md transition-colors ${
                activeSection === "personal" ? "text-[#2F80ED] bg-[#2F80ED]/5" : "text-[#555555] hover:text-[#222222]"
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => scrollToSection("experiences")}
              className={`px-3 py-2 rounded-md transition-colors ${
                activeSection === "experiences"
                  ? "text-[#2F80ED] bg-[#2F80ED]/5"
                  : "text-[#555555] hover:text-[#222222]"
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("education")}
              className={`px-3 py-2 rounded-md transition-colors ${
                activeSection === "education" ? "text-[#2F80ED] bg-[#2F80ED]/5" : "text-[#555555] hover:text-[#222222]"
              }`}
            >
              Education
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className={`px-3 py-2 rounded-md transition-colors ${
                activeSection === "skills" ? "text-[#2F80ED] bg-[#2F80ED]/5" : "text-[#555555] hover:text-[#222222]"
              }`}
            >
              Skills
            </button>
          </nav>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 text-[#2F80ED] border border-[#2F80ED]/30 rounded-md hover:bg-[#2F80ED]/5 transition-colors"
            >
              {showPreview ? "Edit" : "Preview"}
            </button>
            <button className="px-4 py-2 text-white bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] rounded-md hover:shadow-md transition-all">
              <Download className="h-5 w-5" />
              <span className="sr-only">Download</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showPreview ? (
          <ResumePreview data={resumeData} />
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-[#38A3A5]/10 hover:shadow-md transition-all">
              <h2 className="text-2xl font-medium text-[#222222] mb-2">Job Information</h2>
              <p className="text-[#555555] mb-4">Details about the job you're applying for:</p>
              <div className="space-y-2">
                <p>
                  <strong>Job Title:</strong> {resumeData.jobInfo.title}
                </p>
                <p>
                  <strong>Company:</strong> {resumeData.jobInfo.company}
                </p>
                <p>
                  <strong>Description:</strong> {resumeData.jobInfo.description}
                </p>
              </div>
              <Link
                href="/create/job-info"
                className="mt-4 inline-block px-4 py-2 text-[#2F80ED] border border-[#2F80ED]/30 rounded-md hover:bg-[#2F80ED]/5 transition-colors"
              >
                Edit Job Info
              </Link>
            </div>

            {/* Personal Information Section */}
            <div ref={sectionRefs.personal} className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#38A3A5]/10"
              >
                <h2 className="text-2xl font-medium text-[#222222] mb-6">Personal Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[#555555] mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={resumeData.personal.name}
                      onChange={(e) => updateResumeData("personal", { ...resumeData.personal, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[#555555] mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={resumeData.personal.email}
                      onChange={(e) => updateResumeData("personal", { ...resumeData.personal, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all"
                      placeholder="john.smith@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-[#555555] mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={resumeData.personal.phone}
                      onChange={(e) => updateResumeData("personal", { ...resumeData.personal, phone: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-[#555555] mb-2">
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={resumeData.personal.location}
                      onChange={(e) =>
                        updateResumeData("personal", { ...resumeData.personal, location: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all"
                      placeholder="New York, NY"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="summary" className="block text-[#555555] mb-2">
                    Professional Summary
                  </label>
                  <textarea
                    id="summary"
                    value={resumeData.personal.summary}
                    onChange={(e) => updateResumeData("personal", { ...resumeData.personal, summary: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all min-h-[120px] resize-y"
                    placeholder="Experienced professional with 8+ years in..."
                  />
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => scrollToSection("experiences")}
                    className="flex items-center px-6 py-3 text-white bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] rounded-lg hover:shadow-md transition-all"
                  >
                    Next <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Work Experience Section */}
            <div ref={sectionRefs.experiences} className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: activeSection === "experiences" ? 1 : 0.7, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#38A3A5]/10"
              >
                <h2 className="text-2xl font-medium text-[#222222] mb-6">Work Experience</h2>

                {resumeData.experiences.map((exp, index) => (
                  <div key={index} className="mb-8 last:mb-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor={`title-${index}`} className="block text-[#555555] mb-2">
                          Job Title
                        </label>
                        <input
                          id={`title-${index}`}
                          type="text"
                          value={exp.title}
                          onChange={(e) => {
                            const newExperiences = [...resumeData.experiences]
                            newExperiences[index].title = e.target.value
                            updateResumeData("experiences", newExperiences)
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all"
                          placeholder="Software Engineer"
                        />
                      </div>

                      <div>
                        <label htmlFor={`company-${index}`} className="block text-[#555555] mb-2">
                          Company
                        </label>
                        <input
                          id={`company-${index}`}
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const newExperiences = [...resumeData.experiences]
                            newExperiences[index].company = e.target.value
                            updateResumeData("experiences", newExperiences)
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all"
                          placeholder="Tech Company Inc."
                        />
                      </div>

                      <div>
                        <label htmlFor={`period-${index}`} className="block text-[#555555] mb-2">
                          Time Period
                        </label>
                        <input
                          id={`period-${index}`}
                          type="text"
                          value={exp.period}
                          onChange={(e) => {
                            const newExperiences = [...resumeData.experiences]
                            newExperiences[index].period = e.target.value
                            updateResumeData("experiences", newExperiences)
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all"
                          placeholder="Jan 2018 - Present"
                        />
                      </div>
                    </div>

                    <StarForm
                      data={exp.star}
                      onChange={(starData) => {
                        const newExperiences = [...resumeData.experiences]
                        newExperiences[index].star = starData
                        updateResumeData("experiences", newExperiences)
                      }}
                    />

                    {index < resumeData.experiences.length - 1 && (
                      <div className="border-b border-[#38A3A5]/10 my-8"></div>
                    )}
                  </div>
                ))}

                <div className="mt-6">
                  <button
                    onClick={addExperience}
                    className="px-4 py-2 text-[#2F80ED] border border-[#2F80ED]/30 rounded-md hover:bg-[#2F80ED]/5 transition-colors"
                  >
                    + Add Another Experience
                  </button>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => scrollToSection("personal")}
                    className="flex items-center px-6 py-3 text-[#555555] hover:text-[#222222] transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" /> Back
                  </button>

                  <button
                    onClick={() => scrollToSection("education")}
                    className="flex items-center px-6 py-3 text-white bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] rounded-lg hover:shadow-md transition-all"
                  >
                    Next <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Education Section */}
            <div ref={sectionRefs.education} className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: activeSection === "education" ? 1 : 0.7, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#38A3A5]/10"
              >
                <h2 className="text-2xl font-medium text-[#222222] mb-6">Education</h2>

                {resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`degree-${index}`} className="block text-[#555555] mb-2">
                          Degree
                        </label>
                        <input
                          id={`degree-${index}`}
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEducation = [...resumeData.education]
                            newEducation[index].degree = e.target.value
                            updateResumeData("education", newEducation)
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all"
                          placeholder="Bachelor of Science"
                        />
                      </div>
                      <div>
                        <label htmlFor={`institution-${index}`} className="block text-[#555555] mb-2">
                          Institution
                        </label>
                        <input
                          id={`institution-${index}`}
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const newEducation = [...resumeData.education]
                            newEducation[index].institution = e.target.value
                            updateResumeData("education", newEducation)
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all"
                          placeholder="University Name"
                        />
                      </div>
                      <div>
                        <label htmlFor={`edu-period-${index}`} className="block text-[#555555] mb-2">
                          Time Period
                        </label>
                        <input
                          id={`edu-period-${index}`}
                          type="text"
                          value={edu.period}
                          onChange={(e) => {
                            const newEducation = [...resumeData.education]
                            newEducation[index].period = e.target.value
                            updateResumeData("education", newEducation)
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all"
                          placeholder="2016 - 2020"
                        />
                      </div>
                    </div>
                    {index > 0 && (
                      <button
                        onClick={() => removeEducation(index)}
                        className="mt-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  onClick={addEducation}
                  className="mt-4 px-4 py-2 text-[#2F80ED] border border-[#2F80ED]/30 rounded-md hover:bg-[#2F80ED]/5 transition-colors flex items-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Education
                </button>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => scrollToSection("experiences")}
                    className="flex items-center px-6 py-3 text-[#555555] hover:text-[#222222] transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" /> Back
                  </button>

                  <button
                    onClick={() => scrollToSection("skills")}
                    className="flex items-center px-6 py-3 text-white bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] rounded-lg hover:shadow-md transition-all"
                  >
                    Next <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Skills Section */}
            <div ref={sectionRefs.skills} className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: activeSection === "skills" ? 1 : 0.7, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#38A3A5]/10"
              >
                <h2 className="text-2xl font-medium text-[#222222] mb-6">Skills</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center bg-[#F0F7FF] rounded-full px-3 py-1">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => updateSkill(index, e.target.value)}
                        className="bg-transparent border-none focus:outline-none text-[#2F80ED]"
                      />
                      <button
                        onClick={() => removeSkill(index)}
                        className="ml-2 text-[#2F80ED] hover:text-[#2F80ED]/70 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addSkill}
                  className="px-4 py-2 text-[#2F80ED] border border-[#2F80ED]/30 rounded-md hover:bg-[#2F80ED]/5 transition-colors flex items-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Skill
                </button>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => scrollToSection("education")}
                    className="flex items-center px-6 py-3 text-[#555555] hover:text-[#222222] transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" /> Back
                  </button>

                  <button
                    onClick={() => setShowPreview(true)}
                    className="flex items-center px-6 py-3 text-white bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] rounded-lg hover:shadow-md transition-all"
                  >
                    Preview Resume <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

