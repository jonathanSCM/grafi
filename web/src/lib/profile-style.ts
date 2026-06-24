export interface StyleInput {
  theme: 'LIGHT' | 'DARK';
  backgroundType: 'THEME' | 'SOLID' | 'GRADIENT';
  backgroundColor?: string | null;
  backgroundTo?: string | null;
  buttonColor?: string | null;
  buttonTextColor?: string | null;
  textColor?: string | null;
}

const THEME_DEFAULTS = {
  LIGHT: {
    background: '#FFFFFF',
    text: '#111111',
    buttonBg: '#FFFFFF',
    buttonBorder: '#E5E5E5',
    buttonText: '#111111',
  },
  DARK: {
    background: '#0A0A0A',
    text: '#FFFFFF',
    buttonBg: '#111111',
    buttonBorder: '#2A2A2A',
    buttonText: '#FFFFFF',
  },
} as const;

export interface ResolvedProfileStyle {
  backgroundStyle: React.CSSProperties;
  textColor: string;
  buttonBackground: string;
  buttonBorder: string;
  buttonTextColor: string;
}

export function resolveProfileStyle(profile: StyleInput): ResolvedProfileStyle {
  const defaults = THEME_DEFAULTS[profile.theme];

  let backgroundStyle: React.CSSProperties = { backgroundColor: defaults.background };
  if (profile.backgroundType === 'SOLID' && profile.backgroundColor) {
    backgroundStyle = { backgroundColor: profile.backgroundColor };
  } else if (profile.backgroundType === 'GRADIENT' && profile.backgroundColor && profile.backgroundTo) {
    backgroundStyle = {
      backgroundImage: `linear-gradient(160deg, ${profile.backgroundColor}, ${profile.backgroundTo})`,
    };
  }

  return {
    backgroundStyle,
    textColor: profile.textColor || defaults.text,
    buttonBackground: profile.buttonColor || defaults.buttonBg,
    buttonBorder: profile.buttonColor ? 'transparent' : defaults.buttonBorder,
    buttonTextColor: profile.buttonTextColor || defaults.buttonText,
  };
}
