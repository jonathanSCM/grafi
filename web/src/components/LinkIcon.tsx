import { Phone, Mail, Globe, Briefcase, CalendarDays, Contact, Link2 } from 'lucide-react';
import type { LinkType } from '@/lib/types';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.149.297-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.347-.05-.496-.099-.149-.595-1.43-.816-1.957-.214-.519-.43-.45-.595-.458-.16-.008-.347-.01-.546-.01-.198 0-.521.075-.794.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.073.149.198 2.04 3.103 4.943 4.224 2.902 1.12 2.902.747 3.423.7.52-.05 1.687-.689 1.93-1.357.24-.668.24-1.24.165-1.358-.073-.116-.272-.198-.57-.347z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.967.575 3.798 1.566 5.339L2 22l4.873-1.652a9.86 9.86 0 0 0 5.167 1.452h.004c5.46 0 9.91-4.45 9.91-9.91C21.954 6.43 17.5 2 12.04 2zm0 18.16h-.003a8.215 8.215 0 0 1-4.19-1.146l-.301-.179-3.116 1.056 1.066-3.034-.196-.312a8.2 8.2 0 0 1-1.27-4.385c0-4.535 3.69-8.224 8.225-8.224 2.197 0 4.262.856 5.815 2.41a8.166 8.166 0 0 1 2.41 5.819c0 4.535-3.69 8.224-8.225 8.224z" />
    </svg>
  );
}

const ICONS: Record<LinkType, React.ComponentType<{ className?: string }>> = {
  WHATSAPP: WhatsAppIcon,
  CALL: Phone,
  EMAIL: Mail,
  WEBSITE: Globe,
  PROJECTS: Briefcase,
  SCHEDULE_MEETING: CalendarDays,
  SAVE_CONTACT: Contact,
  CUSTOM: Link2,
};

export default function LinkIcon({ type, className }: { type: LinkType; className?: string }) {
  const Icon = ICONS[type] ?? Link2;
  return <Icon className={className} />;
}
