export default function Card({
  title,
  link,
  size = "default",
}: {
  title: string;
  link: string;
  size?: "default" | "small";
}) {
  const padding = size === "small" ? "p-3" : "p-8";
  const iconWrap = size === "small" ? "w-9 h-9" : "w-16 h-16";
  const iconSize = size === "small" ? "w-4 h-4" : "w-8 h-8";
  const titleSize = size === "small" ? "text-m" : "text-xl";
  const readSize = size === "small" ? "text-sm" : "";
  const isSmall = size === "small";
  return (
    <a
      href={link}
      className={`relative block rounded-xl ${padding} shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center group overflow-hidden ${
        isSmall
          ? "bg-orange-700 hover:bg-white border border-orange-700"
          : "bg-white border border-gray-200"
      }`}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isSmall
            ? "bg-linear-to-br from-orange-50 to-transparent opacity-0"
            : "bg-linear-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100"
        }`}
      ></div>
      <div className="relative z-10">
        <div
          className={`${iconWrap} mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isSmall
              ? "bg-white group-hover:bg-orange-600"
              : "bg-orange-100 group-hover:bg-orange-600"
          }`}
        >
          <svg
            className={`${iconSize} transition-colors duration-300 ${
              isSmall
                ? "text-orange-600 group-hover:text-white"
                : "text-orange-600 group-hover:text-white"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <h2
          className={`${titleSize} font-bold ${size === "small" ? "mb-2" : "mb-3"} transition-colors duration-300 ${
            isSmall
              ? "text-white group-hover:text-orange-900"
              : "text-gray-900 group-hover:text-orange-700"
          }`}
        >
          {title}
        </h2>
        {size !== "small" && (
          <span
            className={`text-orange-600 font-semibold group-hover:underline ${readSize}`}
          >
            Read more »
          </span>
        )}
      </div>
    </a>
  );
}
