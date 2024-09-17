// ** Third Party Import
import { useTranslation } from 'react-i18next'

const Translations = ({ text }) => {
  // ** Hook
  const { t } = useTranslation()

  return <><span style={{fontSize:"12px"}}>{`${t(text)}`} </span></>
}

export default Translations
