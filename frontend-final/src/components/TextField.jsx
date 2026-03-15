const TextField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  min,
  placeholder,
}) => {
  const hasError = errors[id]?.message;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="label">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`input ${hasError ? "input-error" : ""}`}
        {...register(id, {
          required: { value: required, message },
          minLength: min
            ? { value: min, message: "Minimum 6 characters required" }
            : null,
          pattern:
            type === "email"
              ? {
                  value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                  message: "Invalid email address",
                }
              : type === "url"
              ? {
                  value:
                    /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                  message: "Please enter a valid URL",
                }
              : null,
        })}
      />

      {hasError && (
        <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-0.5">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};

export default TextField;
