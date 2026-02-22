interface TimelineItemProps {
  title: string
  subtitle: string
  period: string
  description?: string
  highlights?: string[]
}

export default function TimelineItem({
  title,
  subtitle,
  period,
  description,
  highlights,
}: TimelineItemProps) {
  const hasHighlights = Array.isArray(highlights) && highlights.length > 0

  return (
    <article className="timeline-item" aria-label={`${title} ${subtitle}`}>
      <header className="timeline-item__header">
        <h3 className="timeline-item__title">{title}</h3>
        <time className="timeline-item__period" dateTime={period}>
          {period}
        </time>
      </header>
      {subtitle ? <p className="timeline-item__subtitle">{subtitle}</p> : null}
      {description ? (
        <p className="timeline-item__description">{description}</p>
      ) : null}
      {hasHighlights ? (
        <>
          <span className="sr-only">Key responsibilities:</span>
          <ul className="timeline-item__highlights" role="list">
            {highlights!.map((item) => (
              <li key={item} className="timeline-item__highlight">
                {item}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </article>
  )
}
