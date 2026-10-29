type LogoProps = {
  size?: "sm" | "md" | "lg";
  symbolOnly?: boolean;
  tone?: "ink" | "ivory";
  className?: string;
};

const SIZES: Record<NonNullable<LogoProps["size"]>, { box: number; text: string }> = {
  sm: { box: 26, text: "text-[1.15rem]" },
  md: { box: 38, text: "text-[1.5rem]" },
  lg: { box: 60, text: "text-[2.4rem]" },
};

export default function Logo({
  size = "md",
  symbolOnly = false,
  tone = "ink",
  className = "",
}: LogoProps) {
  const { box, text } = SIZES[size];
  const word = tone === "ivory" ? "text-rk-ivory" : "text-rk-graphite";

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={box}
        height={box}
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <polygon
          points="40,10 64,40 40,70 16,40"
          fill="var(--color-rk-terracotta)"
        />
        <polygon
          points="40,22 54,40 40,58 26,40"
          fill="none"
          stroke="var(--color-rk-paper)"
          strokeWidth="2.5"
        />
      </svg>

      {!symbolOnly && (
        <span
          className={`font-display ${word} ${text} leading-none tracking-[-0.02em]`}
        >
          RINOKU
        </span>
      )}
    </div>
  );
}
