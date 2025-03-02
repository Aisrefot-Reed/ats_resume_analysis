"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

interface StarData {
  situation: string
  task: string
  action: string
  result: string
}

interface StarFormProps {
  data: StarData
  onChange: (data: StarData) => void
}

export default function StarForm({ data, onChange }: StarFormProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("situation")
  const [showTips, setShowTips] = useState<Record<string, boolean>>({
    situation: false,
    task: false,
    action: false,
    result: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const toggleTips = (section: string) => {
    setShowTips((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleChange = (section: keyof StarData, value: string) => {
    onChange({
      ...data,
      [section]: value,
    })
  }

  const tips = {
    situation:
      "Describe the context and background. What was the specific situation you faced? Include relevant details about the environment, challenges, and constraints.",
    task: "Explain your responsibility or assignment. What were you specifically tasked with? What goals needed to be achieved?",
    action:
      "Detail the specific actions you took. How did you approach the task? What specific steps did you take? Focus on YOUR contribution, not the team's.",
    result:
      "Share the outcomes of your actions. What was accomplished? Use specific metrics or feedback when possible. What did you learn? How did this impact the organization?",
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-[#222222] mb-2">STAR Method</h3>

      {/* Situation */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#56CCF2]/20 overflow-hidden transition-all duration-300 hover:shadow-sm">
        <button
          onClick={() => toggleSection("situation")}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <div className="flex items-center">
            <span className="text-lg font-medium text-[#2F80ED]">S</span>
            <span className="ml-2 text-lg font-medium text-[#222222]">Situation</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleTips("situation")
              }}
              className="ml-2 text-[#555555] hover:text-[#2F80ED] transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          {expandedSection === "situation" ? (
            <ChevronUp className="h-5 w-5 text-[#555555]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#555555]" />
          )}
        </button>

        <AnimatePresence>
          {showTips.situation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-2 bg-[#F0F7FF] border-t border-[#56CCF2]/20"
            >
              <p className="text-sm text-[#555555]">{tips.situation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {expandedSection === "situation" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4"
            >
              <textarea
                value={data.situation}
                onChange={(e) => handleChange("situation", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all min-h-[120px] resize-y"
                placeholder="Describe the situation you faced..."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Task */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#38A3A5]/20 overflow-hidden transition-all duration-300 hover:shadow-sm">
        <button
          onClick={() => toggleSection("task")}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <div className="flex items-center">
            <span className="text-lg font-medium text-[#38A3A5]">T</span>
            <span className="ml-2 text-lg font-medium text-[#222222]">Task</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleTips("task")
              }}
              className="ml-2 text-[#555555] hover:text-[#38A3A5] transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          {expandedSection === "task" ? (
            <ChevronUp className="h-5 w-5 text-[#555555]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#555555]" />
          )}
        </button>

        <AnimatePresence>
          {showTips.task && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-2 bg-[#F0F7FF] border-t border-[#38A3A5]/20"
            >
              <p className="text-sm text-[#555555]">{tips.task}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {expandedSection === "task" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4"
            >
              <textarea
                value={data.task}
                onChange={(e) => handleChange("task", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all min-h-[120px] resize-y"
                placeholder="Describe the task you were assigned..."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#56CCF2]/20 overflow-hidden transition-all duration-300 hover:shadow-sm">
        <button
          onClick={() => toggleSection("action")}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <div className="flex items-center">
            <span className="text-lg font-medium text-[#2F80ED]">A</span>
            <span className="ml-2 text-lg font-medium text-[#222222]">Action</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleTips("action")
              }}
              className="ml-2 text-[#555555] hover:text-[#2F80ED] transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          {expandedSection === "action" ? (
            <ChevronUp className="h-5 w-5 text-[#555555]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#555555]" />
          )}
        </button>

        <AnimatePresence>
          {showTips.action && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-2 bg-[#F0F7FF] border-t border-[#56CCF2]/20"
            >
              <p className="text-sm text-[#555555]">{tips.action}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {expandedSection === "action" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4"
            >
              <textarea
                value={data.action}
                onChange={(e) => handleChange("action", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all min-h-[120px] resize-y"
                placeholder="Describe the actions you took..."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Result */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#38A3A5]/20 overflow-hidden transition-all duration-300 hover:shadow-sm">
        <button
          onClick={() => toggleSection("result")}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <div className="flex items-center">
            <span className="text-lg font-medium text-[#38A3A5]">R</span>
            <span className="ml-2 text-lg font-medium text-[#222222]">Result</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleTips("result")
              }}
              className="ml-2 text-[#555555] hover:text-[#38A3A5] transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          {expandedSection === "result" ? (
            <ChevronUp className="h-5 w-5 text-[#555555]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#555555]" />
          )}
        </button>

        <AnimatePresence>
          {showTips.result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-2 bg-[#F0F7FF] border-t border-[#38A3A5]/20"
            >
              <p className="text-sm text-[#555555]">{tips.result}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {expandedSection === "result" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4"
            >
              <textarea
                value={data.result}
                onChange={(e) => handleChange("result", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#38A3A5]/20 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 outline-none transition-all min-h-[120px] resize-y"
                placeholder="Describe the results of your actions..."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

