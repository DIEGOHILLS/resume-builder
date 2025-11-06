import { ResumeData } from "@/types/resume";
import { ModernTemplate } from "./templates/ModernTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { TwoColumnTemplate } from "./templates/TwoColumnTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
    'two-column': TwoColumnTemplate,
    creative: CreativeTemplate,
    executive: ExecutiveTemplate,
  };

  const TemplateComponent = templates[data.template];

  return (
    <div className="bg-card rounded-lg shadow-lg p-8 min-h-[297mm]" id="resume-preview">
      <TemplateComponent data={data} />
    </div>
  );
};
