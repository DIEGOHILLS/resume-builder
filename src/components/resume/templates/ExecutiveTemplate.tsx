import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin } from "lucide-react";
import { format } from "date-fns";

interface TemplateProps {
  data: ResumeData;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    return format(new Date(dateString), "MMM yyyy");
  } catch {
    return dateString;
  }
};

export const ExecutiveTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, workExperience, education, skills } = data;

  return (
    <div className="space-y-8 font-playfair">
      {/* Header */}
      <div className="text-center border-b-4 border-amber-600 pb-6">
        <h1 className="text-5xl font-bold text-slate-900 mb-3 tracking-tight">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-2xl text-amber-700 font-normal mb-4 tracking-wide">
          {personalInfo.title || "Professional Title"}
        </p>
        <div className="flex justify-center flex-wrap gap-6 text-sm text-slate-600 font-inter">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-amber-600" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber-600" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-600" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
          <div className="flex justify-center flex-wrap gap-4 text-sm text-amber-700 font-inter mt-3">
            {personalInfo.linkedin && <a href={personalInfo.linkedin} className="hover:underline font-medium">LinkedIn</a>}
            {personalInfo.github && <a href={personalInfo.github} className="hover:underline font-medium">GitHub</a>}
            {personalInfo.portfolio && <a href={personalInfo.portfolio} className="hover:underline font-medium">Portfolio</a>}
          </div>
        )}
      </div>

      {/* Executive Summary */}
      {personalInfo.summary && (
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Executive Summary
          </h2>
          <div className="border-l-4 border-amber-600 pl-6">
            <div className="text-base text-slate-700 leading-relaxed font-inter prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {workExperience.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {workExperience.map((exp, index) => (
              <div key={exp.id} className={index > 0 ? "pt-6 border-t border-slate-200" : ""}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                    <p className="text-lg text-amber-700 font-normal">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600 font-inter font-medium bg-amber-50 px-4 py-2 rounded">
                      {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
                  </div>
                </div>
                {exp.description && (
                  <div className="border-l-2 border-amber-200 pl-6 mt-3">
                    <div className="text-sm text-slate-700 leading-relaxed font-inter prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: exp.description }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-base text-amber-700 font-normal">{edu.institution}</p>
                </div>
                <p className="text-sm text-slate-600 font-inter whitespace-nowrap ml-4">
                  {formatDate(edu.startDate)} — {edu.current ? "Present" : formatDate(edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Core Competencies */}
      {skills.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skills.map((skill) => (
              <div
                key={skill}
                className="border-l-4 border-amber-600 pl-4 py-2 bg-amber-50"
              >
                <span className="text-sm font-inter font-medium text-slate-800">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
