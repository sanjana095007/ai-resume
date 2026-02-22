import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaGlobe,
  FaUser,
  FaHandshake,
  FaCog,
  FaTools,
  FaUserGraduate,
  FaPuzzlePiece,
  FaLanguage,
  FaSuitcase,
  FaCode,
  FaDownload,
  FaAward,
  FaInfoCircle,
  FaTimes,
  FaExternalLinkAlt,
  FaPaperPlane,
  FaExclamationTriangle,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
  FaSyncAlt,
} from 'react-icons/fa'

const icons = {
  github: FaGithub,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  email: FaEnvelope,
  globe: FaGlobe,
  user: FaUser,
  handshake: FaHandshake,
  cog: FaCog,
  tools: FaTools,
  graduate: FaUserGraduate,
  puzzle: FaPuzzlePiece,
  language: FaLanguage,
  suitcase: FaSuitcase,
  code: FaCode,
  download: FaDownload,
  award: FaAward,
  info: FaInfoCircle,
  close: FaTimes,
  external: FaExternalLinkAlt,
  send: FaPaperPlane,
  alert: FaExclamationTriangle,
  check: FaCheck,
  'chevron-left': FaChevronLeft,
  'chevron-right': FaChevronRight,
  'arrow-right': FaArrowRight,
  refresh: FaSyncAlt,
}

export type IconName = keyof typeof icons

interface IconProps {
  name: IconName
  className?: string
  size?: number
  'aria-label'?: string
}

export default function Icon({
  name,
  className,
  size,
  'aria-label': ariaLabel,
}: IconProps) {
  const IconComponent = icons[name]
  return (
    <IconComponent
      className={className}
      size={size}
      aria-label={ariaLabel || name}
    />
  )
}
