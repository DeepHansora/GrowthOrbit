function InputField({ label, name, type = "text", value, onChange, placeholder, autoComplete }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-slate-950/55 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/70 focus:bg-slate-950/75 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12),0_0_30px_rgba(124,58,237,0.16)]"
      />
    </label>
  );
}

export default InputField;

