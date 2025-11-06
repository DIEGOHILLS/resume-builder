import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";
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

export const CreativeTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, workExperience, education, skills } = data;

  return (
    <div className="space-y-6 font-space">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 -m-8 mb-0 rounded-b-3xl">
        <h1 className="text-5xl font-bold mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-2xl font-light opacity-90 mb-4">
          {personalInfo.title || "Professional Title"}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
              <Mail className="h-4 w-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
              <Phone className="h-4 w-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
          <div className="flex flex-wrap gap-3 text-sm mt-3">
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} className="bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30">LinkedIn</a>
            )}
            {personalInfo.github && (
              <a href={personalInfo.github} className="bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30">GitHub</a>
            )}
            {personalInfo.portfolio && (
              <a href={personalInfo.portfolio} className="bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30">Portfolio</a>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
          <div className="text-sm text-slate-800 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-purple-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Work Experience
            </h2>
          </div>
          <div className="space-y-5 pl-7 border-l-4 border-purple-200">
            {workExperience.map((exp) => (
              <div key={exp.id} className="pl-6 relative">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-purple-600"></div>
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-slate-900">{exp.position}</h3>
                    <span className="text-sm text-slate-600 bg-purple-100 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-base text-purple-600 font-semibold">{exp.company}</p>
                  {exp.description && (
                    <div className="text-sm text-slate-700 leading-relaxed prose prose-sm max-w-none pt-1" dangerouslySetInnerHTML={{ __html: exp.description }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-pink-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Education
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
            {education.map((edu) => (
              <div key={edu.id} className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-200">
                <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                <p className="text-sm text-pink-600 font-medium">{edu.field}</p>
                <p className="text-sm text-slate-600 mt-1">{edu.institution}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Skills
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 pl-7">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-lg font-medium shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
