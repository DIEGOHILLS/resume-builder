import { useState, useEffect } from "react";
import { ResumeData } from "@/types/resume";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfoForm } from "@/components/resume/PersonalInfoForm";
import { WorkExperienceForm } from "@/components/resume/WorkExperienceForm";
import { EducationForm } from "@/components/resume/EducationForm";
import { SkillsForm } from "@/components/resume/SkillsForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { Download, FileText, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const STORAGE_KEY = "resume-builder-data";

const Index = () => {
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      title: "",
      summary: "",
    },
    workExperience: [],
    education: [],
    skills: [],
    template: "modern",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setResumeData(parsed);
        toast({
          title: "Resume loaded",
          description: "Your previous resume has been restored.",
        });
      } catch (error) {
        console.error("Failed to load resume:", error);
      }
    }
  }, []);

  // Auto-save to localStorage whenever resumeData changes
  useEffect(() => {
    if (resumeData.personalInfo.fullName || resumeData.workExperience.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    }
  }, [resumeData]);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    toast({
      title: "Resume saved",
      description: "Your resume has been saved to browser storage.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
            </div>
            <div className="flex items-center gap-4">
              <Select
                value={resumeData.template}
                onValueChange={(value: "modern" | "classic" | "minimal" | "two-column" | "creative" | "executive") =>
                  setResumeData({ ...resumeData, template: value })
                }
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="two-column">Two Column</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSave} variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handlePrint} variant="accent">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="print:hidden">
            <Card>
              <CardHeader>
                <CardTitle>Build Your Resume</CardTitle>
                <CardDescription>
                  Fill in your information and watch your resume come to life
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="mt-6">
                    <PersonalInfoForm
                      data={resumeData.personalInfo}
                      onChange={(personalInfo) =>
                        setResumeData({ ...resumeData, personalInfo })
                      }
                    />
                  </TabsContent>

                  <TabsContent value="experience" className="mt-6">
                    <WorkExperienceForm
                      data={resumeData.workExperience}
                      onChange={(workExperience) =>
                        setResumeData({ ...resumeData, workExperience })
                      }
                    />
                  </TabsContent>

                  <TabsContent value="education" className="mt-6">
                    <EducationForm
                      data={resumeData.education}
                      onChange={(education) =>
                        setResumeData({ ...resumeData, education })
                      }
                    />
                  </TabsContent>

                  <TabsContent value="skills" className="mt-6">
                    <SkillsForm
                      data={resumeData.skills}
                      onChange={(skills) => setResumeData({ ...resumeData, skills })}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 h-fit">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </main>

      <style>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          #resume-preview {
            box-shadow: none !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
