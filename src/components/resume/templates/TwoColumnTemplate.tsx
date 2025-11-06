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

export const TwoColumnTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, workExperience, education, skills } = data;

  return (
    <div className="grid grid-cols-[280px_1fr] gap-6 font-inter">
      {/* Left Sidebar */}
      <div className="bg-slate-900 text-white p-6 -m-8 min-h-[297mm]">
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Contact
            </h2>
            <div className="space-y-2 text-sm">
              {personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-slate-400" />
                  <span className="break-words">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-slate-400" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-slate-400" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Links */}
          {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Links
              </h2>
              <div className="space-y-2 text-sm">
                {personalInfo.linkedin && (
                  <div className="break-words">
                    <a href={personalInfo.linkedin} className="text-cyan-400 hover:underline">LinkedIn</a>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="break-words">
                    <a href={personalInfo.github} className="text-cyan-400 hover:underline">GitHub</a>
                  </div>
                )}
                {personalInfo.portfolio && (
                  <div className="break-words">
                    <a href={personalInfo.portfolio} className="text-cyan-400 hover:underline">Portfolio</a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Skills
              </h2>
              <div className="space-y-1.5">
                {skills.map((skill) => (
                  <div key={skill} className="text-sm py-1 border-l-2 border-cyan-400 pl-2">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="text-sm space-y-1">
                    <div className="font-semibold text-cyan-400">{edu.degree}</div>
                    <div className="text-slate-300">{edu.field}</div>
                    <div className="text-slate-400 text-xs">{edu.institution}</div>
                    <div className="text-slate-500 text-xs">
                      {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="space-y-6 py-2">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-xl text-cyan-600 font-medium">
            {personalInfo.title || "Professional Title"}
          </p>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b-2 border-slate-200 pb-1">
              Professional Summary
            </h2>
            <div className="text-sm text-slate-700 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b-2 border-slate-200 pb-1">
              Work Experience
            </h2>
            <div className="space-y-4">
              {workExperience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-sm text-slate-600 whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-cyan-600 font-medium">{exp.company}</p>
                  {exp.description && (
                    <div className="text-sm text-slate-700 leading-relaxed prose prose-sm max-w-none pt-1" dangerouslySetInnerHTML={{ __html: exp.description }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
