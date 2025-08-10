

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
   sm: 'w-48 h-14',
    md: 'w-64 h-20',
    lg: 'w-80 h-24',
    xl: 'w-96 h-28',
    '2xl': 'w-120 h-36',
    '3xl': 'w-144 h-40',
    '4xl': 'w-168 h-48'
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
