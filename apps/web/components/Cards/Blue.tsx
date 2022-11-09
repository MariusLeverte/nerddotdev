interface BlueProps {
  children: React.ReactNode;
}
export const Blue = ({ children }: BlueProps) => {
  return (
    <div className=" bg-slate-900 rounded-xl p-4 lg:p-6 text-white">
      {children}
    </div>
  );
};
