// ** Third Party Import
import { useTranslation } from 'react-i18next'
import FontDetails from 'src/components/Fonts/FontDetails'

const Translations = ({ text }) => {
  // ** Hook
  const { t } = useTranslation()

  return (
    <>
      <span style={{ fontSize: FontDetails.typographySize }}>{`${t(text)}`} </span>
    </>
  )
}

export default Translations
