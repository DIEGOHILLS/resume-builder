import { ResumeData } from "@/types/resume";
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

export const MinimalTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, workExperience, education, skills } = data;

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-light text-foreground tracking-tight">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-xl text-muted-foreground">
          {personalInfo.title || "Professional Title"}
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground pt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
          <div className="flex gap-4 text-sm text-primary pt-1">
            {personalInfo.linkedin && <a href={personalInfo.linkedin} className="hover:underline">LinkedIn</a>}
            {personalInfo.github && <a href={personalInfo.github} className="hover:underline">GitHub</a>}
            {personalInfo.portfolio && <a href={personalInfo.portfolio} className="hover:underline">Portfolio</a>}
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="space-y-2">
          <div className="text-sm text-foreground/80 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Experience
          </h2>
          <div className="space-y-6">
            {workExperience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-medium text-foreground">{exp.position}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                {exp.description && (
                  <div className="text-sm text-foreground/70 leading-relaxed prose prose-sm max-w-none pt-1" dangerouslySetInnerHTML={{ __html: exp.description }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-medium text-foreground">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(edu.startDate)} — {edu.current ? "Present" : formatDate(edu.endDate)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{edu.institution} • {edu.field}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Skills
          </h2>
          <p className="text-sm text-foreground/70">
            {skills.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};
