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

export const ModernTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, workExperience, education, skills } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b-2 border-primary pb-4">
        <h1 className="text-4xl font-bold text-foreground mb-1">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-xl text-primary font-medium mb-3">
          {personalInfo.title || "Professional Title"}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {personalInfo.location}
            </div>
          )}
        </div>
        {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
          <div className="flex flex-wrap gap-3 text-sm text-primary mt-2">
            {personalInfo.linkedin && <a href={personalInfo.linkedin} className="hover:underline">LinkedIn</a>}
            {personalInfo.github && <a href={personalInfo.github} className="hover:underline">GitHub</a>}
            {personalInfo.portfolio && <a href={personalInfo.portfolio} className="hover:underline">Portfolio</a>}
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2 uppercase tracking-wide">
            Professional Summary
          </h2>
          <div className="text-sm text-foreground/80 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3 uppercase tracking-wide">
            Work Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-foreground">{exp.position}</h3>
                    <p className="text-sm text-primary font-medium">{exp.company}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
                {exp.description && (
                  <div className="text-sm text-foreground/80 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: exp.description }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-foreground">{edu.degree} in {edu.field}</h3>
                    <p className="text-sm text-primary font-medium">{edu.institution}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2 uppercase tracking-wide">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
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
