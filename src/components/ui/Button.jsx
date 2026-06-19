export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition duration-300 text-sm";
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-soft",
    secondary: "bg-brand-50 text-brand-700 hover:bg-brand-100",
    outline: "border-2 border-brand-600 text-brand-700 hover:bg-brand-600 hover:text-white",
    dark: "bg-gray-900 text-white hover:bg-black shadow-soft",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
