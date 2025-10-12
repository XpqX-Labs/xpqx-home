
export const getAsciiBanner = (): string[] => {
  return [
    '__BANNER_IMAGE__',
    'by ilham alfath',
    '',
    ''
  ];
};

export const getMobileBanner = (): string[] => {
  return [
    '__BANNER_IMAGE__',
    'by ilham alfath',
    '',
    ''
  ];
};

export const generateWelcomeBanner = (): string[] => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const bannerLines = isMobile ? getMobileBanner() : getAsciiBanner();
  
  return [
    ...bannerLines,
    'Type "help" for available commands.',
    ''
  ];
};
