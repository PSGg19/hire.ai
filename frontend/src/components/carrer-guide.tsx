"use client";
import { CareerGuideResponse } from "@/type";
import axios from "axios";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle,
  Clock,
  Filter,
  Lightbulb,
  Loader2,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { utils_service } from "@/context/AppContext";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const CarrerGuide = () => {
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<CareerGuideResponse | null>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/animations/searching-for-profile.json")
      .then((r) => r.json())
      .then((d) => setAnimationData(d))
      .catch(() => { });
  }, []);

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addSkill();
  };

  const getCarrerGuidance = async () => {
    if (skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${utils_service}/api/utils/career`, { skills });
      setResponse(data);
      toast.success("Career guidance generated");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setSkills([]);
    setCurrentSkill("");
    setResponse(null);
    setOpen(false);
  };

  return (
    <>
      {/* ═══ Career Guidance ═══ */}
      <section className="relative glow-top overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 dark:opacity-15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center mb-14 animate-fade-up">
            <div className="badge mb-6">
              <Sparkles size={14} className="text-[#3b82f6]" />
              Career Guidance
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">
              Discover your career path.
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
              Get personalized job recommendations and learning roadmaps
              based on your skills — powered by AI.
            </p>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="h-12 px-8 text-sm gap-2 group rounded-lg">
                  <Sparkles size={16} />
                  Get Career Guidance
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                {!response ? (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl flex items-center gap-2">
                        <Sparkles className="text-[#3b82f6]" />
                        Tell us about your skills
                      </DialogTitle>
                      <DialogDescription>
                        Add your technical skills to receive personalized career recommendations
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="skill">Add Skills</Label>
                        <div className="flex gap-2">
                          <Input
                            id="skill"
                            placeholder="e.g., React, Node.js, Python..."
                            value={currentSkill}
                            onChange={(e) => setCurrentSkill(e.target.value)}
                            className="h-11"
                            onKeyPress={handleKeyPress}
                          />
                          <Button onClick={addSkill}>Add</Button>
                        </div>
                      </div>

                      {skills.length > 0 && (
                        <div className="space-y-2">
                          <Label>Your Skills ({skills.length})</Label>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((s) => (
                              <div key={s} className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-secondary border border-border">
                                <span className="text-sm font-medium">{s}</span>
                                <button onClick={() => removeSkill(s)} className="h-5 w-5 rounded-full bg-destructive text-white flex items-center justify-center">
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button onClick={getCarrerGuidance} disabled={loading || skills.length === 0} className="w-full h-11 gap-2">
                        {loading ? (
                          <><Loader2 size={16} className="animate-spin" /> Analyzing...</>
                        ) : (
                          <><Sparkles size={16} /> Generate Career Guidance</>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl flex items-center gap-2">
                        <Target className="text-[#3b82f6]" />
                        Your Personalized Career Guide
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      <div className="p-4 rounded-xl bg-secondary border border-border">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="text-[#3b82f6] mt-1 shrink-0" size={18} />
                          <div>
                            <h3 className="font-semibold mb-2">Career Summary</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">{response.summary}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Briefcase size={18} className="text-[#3b82f6]" /> Recommended Career Paths
                        </h3>
                        <div className="space-y-3">
                          {response.jobOptions.map((job, i) => (
                            <div key={i} className="p-4 rounded-xl border border-border hover:border-ring transition-colors">
                              <h4 className="font-semibold mb-2">{job.title}</h4>
                              <div className="space-y-1.5 text-sm text-muted-foreground">
                                <p><span className="font-medium text-foreground/70">Responsibilities: </span>{job.responsibilities}</p>
                                <p><span className="font-medium text-foreground/70">Why: </span>{job.why}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp size={18} className="text-[#3b82f6]" /> Skills to Learn
                        </h3>
                        <div className="space-y-3">
                          {response.skillsToLearn.map((cat, i) => (
                            <div key={i} className="space-y-2">
                              <h4 className="text-sm font-semibold text-[#3b82f6]">{cat.category}</h4>
                              {cat.skills.map((skill, si) => (
                                <div key={si} className="p-3 rounded-xl bg-secondary border border-border text-sm">
                                  <p className="font-medium mb-1">{skill.title}</p>
                                  <p className="text-xs text-muted-foreground">Why: {skill.why}</p>
                                  <p className="text-xs text-muted-foreground">How: {skill.how}</p>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-secondary border border-border">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <BookOpen size={18} className="text-[#3b82f6]" />
                          {response?.learningApproach?.title}
                        </h3>
                        <ul className="space-y-1.5">
                          {response?.learningApproach?.points?.map((point, i) => (
                            <li key={i} className="text-sm flex items-start gap-2 text-muted-foreground">
                              <span className="text-[#3b82f6] mt-0.5">•</span>
                              <span dangerouslySetInnerHTML={{ __html: point }} />
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button onClick={resetDialog} variant="outline" className="w-full">
                        Start New Analysis
                      </Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="divider" />
      </section>

      {/* ═══ For Companies ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-25 dark:opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-up">
            <div className="badge mb-6">
              <Building2 size={14} className="text-[#3b82f6]" />
              For Companies
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">
              Choose the right candidate.
              <br />
              <span className="text-[#3b82f6]">In less time.</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AI-powered candidate matching, smart filtering, and ATS score analysis.
              Hiring has never been this efficient.
            </p>
          </div>

          {/* Main Card: Lottie + Features */}
          <div className="premium-card p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Lottie */}
              <div className="flex-shrink-0 w-64 h-64 lg:w-80 lg:h-80 animate-float-slow">
                {animationData ? (
                  <Lottie animationData={animationData} loop autoplay style={{ width: "100%", height: "100%" }} />
                ) : (
                  <div className="w-full h-full rounded-2xl bg-secondary flex items-center justify-center">
                    <Building2 size={64} className="text-muted-foreground/30" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-7">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    AI-powered matching that works.
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our AI scans thousands of profiles in seconds — ranking, filtering,
                    and shortlisting top talent. Your team only sees the best fits.
                  </p>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: Filter, title: "Smart Filtering", desc: "Filter by skills, experience, culture fit" },
                    { icon: Target, title: "AI Match Score", desc: "Percentage match for every candidate" },
                    { icon: Clock, title: "80% Faster", desc: "Reduce time-to-hire dramatically" },
                    { icon: CheckCircle, title: "ATS Integration", desc: "Works with your existing ATS" },
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

                {/* Stats */}
                <div className="flex gap-8 pt-2">
                  {[
                    { value: "80%", label: "Faster hiring" },
                    { value: "95%", label: "Match accuracy" },
                    { value: "3x", label: "More applicants" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-2xl font-bold">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider" />
      </section>
    </>
  );
};

export default CarrerGuide;
