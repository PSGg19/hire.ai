"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Loader2,
  ArrowRight,
  FileCheck,
  Zap,
  BrainCog,
  Sparkles,
  Target,
  Award,
} from "lucide-react";
import axios from "axios";
import { ResumeAnalysisResponse } from "@/type";
import { utils_service } from "@/context/AppContext";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ResumeAnalyzer = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResumeAnalysisResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cvAnimationData, setCvAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/animations/job-cv.json")
      .then((r) => r.json())
      .then((d) => setCvAnimationData(d))
      .catch(() => { });
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const analyzeResume = async () => {
    if (!file) {
      toast.error("Please upload a resume");
      return;
    }
    setLoading(true);
    try {
      const base64 = await convertToBase64(file);
      const { data } = await axios.post(
        `${utils_service}/api/utils/resume-analyser`,
        { pdfBase64: base64 }
      );
      setResponse(data);
      toast.success("Resume analyzed successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setFile(null);
    setResponse(null);
    setOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20";
    if (score >= 60) return "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20";
    return "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20";
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20";
    if (priority === "medium") return "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20";
    return "bg-blue-50 dark:bg-blue-500/10 text-[#3b82f6] border-blue-200 dark:border-blue-500/20";
  };

  return (
    <>
      {/* ═══ For Job Seekers ═══ */}
      <section className="relative overflow-hidden glow-top">
        <div className="absolute inset-0 grid-pattern opacity-30 dark:opacity-15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-up">
            <div className="badge mb-6">
              <BrainCog size={14} className="text-[#3b82f6]" />
              For Job Seekers
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">
              Resume not getting responses?
              <br />
              <span className="text-[#3b82f6]">Fix it with AI.</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get your resume analyzed by AI, find defects, fix them,
              and start getting interviews.
            </p>
          </div>

          {/* Main Card: Steps + Lottie */}
          <div className="premium-card p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Steps */}
              <div className="flex-1 space-y-7 order-2 lg:order-1">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    Three steps to a better resume.
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Upload your resume. Our AI finds every issue. You fix them and get hired.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { num: "01", icon: Sparkles, title: "Upload & Analyze", desc: "Drop your PDF — our AI scans every section for ATS compatibility" },
                    { num: "02", icon: Target, title: "Find Defects", desc: "See missing keywords, formatting issues, and weak points clearly" },
                    { num: "03", icon: Zap, title: "Fix & Get Hired", desc: "Apply recommendations and watch your interview rate skyrocket" },
                  ].map(({ num, icon: Icon, title, desc }) => (
                    <div key={num} className="feature-card group cursor-default">
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <span className="text-[10px] font-mono text-muted-foreground">{num}</span>
                        <div className="icon-box">
                          <Icon size={16} className="text-[#3b82f6]" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lottie */}
              <div className="flex-shrink-0 w-64 h-64 lg:w-96 lg:h-96 animate-float order-1 lg:order-2">
                {cvAnimationData ? (
                  <Lottie animationData={cvAnimationData} loop autoplay style={{ width: "100%", height: "100%" }} />
                ) : (
                  <div className="w-full h-full rounded-2xl bg-secondary flex items-center justify-center">
                    <FileText size={64} className="text-muted-foreground/30" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-14">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="h-12 px-8 text-sm gap-2 group rounded-lg">
                  <FileText size={16} />
                  Analyze My Resume
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                {!response ? (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl flex items-center gap-2">
                        <FileText className="text-[#3b82f6]" />
                        Upload Your Resume
                      </DialogTitle>
                      <DialogDescription>
                        Upload your resume in PDF format for instant ATS analysis
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-ring transition-colors bg-secondary/50 group"
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="icon-box h-16 w-16 rounded-xl group-hover:scale-105 transition-transform">
                            <Upload size={28} className="text-muted-foreground group-hover:text-[#3b82f6] transition-colors" />
                          </div>
                          <div>
                            <p className="font-medium mb-1">
                              {file ? file.name : "Click to upload your resume"}
                            </p>
                            <p className="text-sm text-muted-foreground">PDF format, max 5MB</p>
                          </div>
                          {file && (
                            <div className="flex items-center gap-2 text-emerald-500">
                              <CheckCircle2 size={16} />
                              <span className="text-sm">Ready to analyze</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileSelect} className="hidden" />

                      <Button onClick={analyzeResume} disabled={loading || !file} className="w-full h-11 gap-2">
                        {loading ? (
                          <><Loader2 size={16} className="animate-spin" /> Analyzing...</>
                        ) : (
                          <><Zap size={16} /> Analyze Resume</>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl flex items-center gap-2">
                        <FileCheck className="text-[#3b82f6]" />
                        Resume Analysis
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      {/* Score */}
                      <div className={`p-6 rounded-xl border ${getScoreBg(response.atsScore)}`}>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-2">ATS Score</p>
                          <div className={`text-6xl font-black ${getScoreColor(response.atsScore)}`}>
                            {response.atsScore}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">out of 100</p>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="p-4 rounded-xl bg-secondary border border-border">
                        <p className="text-sm leading-relaxed text-muted-foreground">{response.summary}</p>
                      </div>

                      {/* Breakdown */}
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp size={16} className="text-[#3b82f6]" /> Score Breakdown
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {Object.entries(response.scoreBreakdown).map(([key, value]) => (
                            <div key={key} className="p-4 rounded-xl border border-border hover:border-ring transition-colors">
                              <div className="flex items-center justify-between mb-1.5">
                                <p className="font-medium capitalize text-sm">{key}</p>
                                <span className={`text-sm font-bold ${getScoreColor(value.score)}`}>{value.score}%</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{value.feedback}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Strengths */}
                      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/15">
                        <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                          <CheckCircle2 size={16} className="text-emerald-500" /> Strengths
                        </h3>
                        <ul className="space-y-1.5">
                          {response.strengths.map((s, i) => (
                            <li key={i} className="text-sm flex items-start gap-2 text-muted-foreground">
                              <span className="text-emerald-500 mt-0.5">✓</span> {s}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Suggestions */}
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <AlertTriangle size={16} className="text-yellow-500" /> Improvements
                        </h3>
                        <div className="space-y-3">
                          {response.suggestions.map((sug, i) => (
                            <div key={i} className="p-4 rounded-xl border border-border">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <h4 className="font-medium text-sm">{sug.category}</h4>
                                <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(sug.priority)}`}>
                                  {sug.priority}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mb-1"><span className="text-foreground/70">Issue: </span>{sug.issue}</p>
                              <p className="text-xs text-muted-foreground"><span className="text-foreground/70">Fix: </span>{sug.recommendation}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button onClick={resetDialog} variant="outline" className="w-full">
                        Analyze Another Resume
                      </Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>

          {/* Feature strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {[
              { icon: BrainCog, title: "AI-Powered", desc: "Deep analysis of every section" },
              { icon: Zap, title: "Instant Results", desc: "Feedback in under 30 seconds" },
              { icon: Award, title: "ATS-Ready", desc: "Optimized for 200+ ATS systems" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="feature-card group cursor-default">
                <div className="icon-box">
                  <Icon size={16} className="text-[#3b82f6]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="divider" />
      </section>
    </>
  );
};

export default ResumeAnalyzer;
