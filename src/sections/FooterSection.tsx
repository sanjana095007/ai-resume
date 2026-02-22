interface FooterSectionProps {
  className?: string
}

export default function FooterSection({ className }: FooterSectionProps) {
  const classes = ['resume-section', 'footer-section', className]
    .filter(Boolean)
    .join(' ')

  return (
    <footer id="footer" className={classes} aria-label="Footer">
      <div className="footer-section__inner">
        <p className="footer-section__text">
          &copy; 2025 V Chaitanya Chowdari. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
