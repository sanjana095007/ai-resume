interface BadgeListProps {
  items: string[]
}

export default function BadgeList({ items }: BadgeListProps) {
  if (!items.length) {
    return null
  }

  return (
    <ul className="badge-list">
      {items.map((item) => (
        <li key={item} className="badge-list__item">
          {item}
        </li>
      ))}
    </ul>
  )
}
