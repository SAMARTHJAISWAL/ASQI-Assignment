import * as React from "react"

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => {
  const baseStyles = "relative w-full rounded-lg border p-4"
  const styles = variant === "destructive" 
    ? `${baseStyles} border-destructive bg-destructive/10 text-destructive`
    : `${baseStyles} bg-background text-foreground`

  return (
    <div
      ref={ref}
      role="alert"
      className={styles}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="text-sm [&_p]:leading-relaxed"
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription }