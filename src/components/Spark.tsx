type SparkProps = {
  className: string
}

export function Spark({ className }: SparkProps) {
  return (
    <svg className={className} viewBox="0 0 18.03 17.97" aria-hidden="true">
      <path
        fill="currentColor"
        d="M0,8.52c4.51-.06,9.09,5.49,9.14,9.45-.05-3.88,5.01-9.63,8.89-9.68-3.88.05-9.08-4.69-9.13-8.29.05,3.6-4.92,8.47-8.9,8.52Z"
      />
    </svg>
  )
}
