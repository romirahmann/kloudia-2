/* eslint-disable no-unused-vars */
export function Input({
  name,
  onChange,
  value,
  type = "text",
  placeholder = "",
}) {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={`${placeholder} ...`}
        className="dark:text-gray-50 px-2 py-3 border w-full bg-transparent rounded-xl text-sm md:text-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary border-gray-300 placeholder:lg:text-sm placeholder:text-xs"
      />
    </>
  );
}
