export default function SelectInput({
  label,
  name,
  id,
  options,
  placeholder = "Select an option",
  value = "",
  onChange,
  className = "",
}) {
  const isPlaceholder = value === "";

  return (
    <div className="selectInput flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-50 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          className={`appearance-none w-full bg-white dark:bg-transparent dark:text-gray-50 border border-gray-300 py-3 px-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out
            ${
              isPlaceholder
                ? "text-gray-300 dark:text-gray-500"
                : "text-gray-700"
            } ${className}`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option
              className="text-gray-600 dark:bg-gray-900 dark:text-gray-300"
              key={opt.value}
              value={opt.value}
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
