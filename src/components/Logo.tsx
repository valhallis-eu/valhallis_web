

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  className?: string;
  onClick?: () => void;
}

function Logo({ variant = 'default', size = 'md', className = '', onClick }: LogoProps) {
  // Use PNG logo if available, otherwise fall back to SVG
  const logoFile = variant === 'white' 
    ? '/assets/VA_LOGO_3.png' 
    : '/assets/VA_LOGO_3.png';
  
  const sizeClasses = {
    sm: 'w-32 h-10',
    md: 'w-40 h-12',
    lg: 'w-48 h-14',
    xl: 'w-64 h-20',
    '2xl': 'w-80 h-24',
    '3xl': 'w-96 h-28',
    '4xl': 'w-112 h-32'
  };

  return (
    <div 
      className={`flex items-center ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <img 
        src={logoFile} 
        alt="VALHALLIS ADVISORS" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export default Logo; 