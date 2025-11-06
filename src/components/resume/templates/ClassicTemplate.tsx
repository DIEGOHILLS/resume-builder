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

export const ClassicTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, workExperience, education, skills } = data;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center border-b pb-4">
        <h1 className="text-3xl font-bold text-foreground mb-1">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          {personalInfo.title || "Professional Title"}
        </p>
        <div className="flex justify-center flex-wrap gap-3 text-sm text-muted-foreground">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {personalInfo.location}
            </div>
          )}
        </div>
        {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
          <div className="flex justify-center flex-wrap gap-3 text-sm text-primary mt-2">
            {personalInfo.linkedin && <a href={personalInfo.linkedin} className="hover:underline">LinkedIn</a>}
            {personalInfo.github && <a href={personalInfo.github} className="hover:underline">GitHub</a>}
            {personalInfo.portfolio && <a href={personalInfo.portfolio} className="hover:underline">Portfolio</a>}
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div>
          <h2 className="text-base font-bold text-foreground mb-2 border-b">
            PROFESSIONAL SUMMARY
          </h2>
          <div className="text-sm text-foreground/80 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-foreground mb-2 border-b">
            WORK EXPERIENCE
          </h2>
          <div className="space-y-3">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-foreground">{exp.position}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground italic mb-1">{exp.company}</p>
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
          <h2 className="text-base font-bold text-foreground mb-2 border-b">
            EDUCATION
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-foreground">{edu.degree} in {edu.field}</h3>
                    <p className="text-sm text-muted-foreground italic">{edu.institution}</p>
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
          <h2 className="text-base font-bold text-foreground mb-2 border-b">
            SKILLS
          </h2>
          <p className="text-sm text-foreground/80">
            {skills.join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
};
