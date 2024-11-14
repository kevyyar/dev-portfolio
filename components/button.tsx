interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="bg-carbon px-10 py-3 text-whisper text-md rounded-xl md:text-lg lg:text-2xl">
      {children}
    </button>
  );
};

export default Button;
