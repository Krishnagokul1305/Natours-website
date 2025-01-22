function InputField({ id, type, placeholder, register, validation, error, icon }) {
  return (
    <div className="mb-4">
      <div className="flex gap-5 px-7 py-3 rounded-full glassy-input text-white">
        <label htmlFor={id}>{icon}</label>
        <input
          id={id}
          type={type}
          className="w-[250px] bg-transparent focus:outline-none placeholder-white"
          placeholder={placeholder}
          {...register(id, validation)}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1 text-start ms-4">{error.message}</p>}
    </div>
  );
}

export default InputField;
