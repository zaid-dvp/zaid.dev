import { TextScramble } from "@/components/ui/text-scramble";

type SectionLabelProps = {
  label: string;
};

export function SectionLabel({ label }: SectionLabelProps) {
  return <TextScramble text={label} className="text-xs text-neutral-400" />;
}
