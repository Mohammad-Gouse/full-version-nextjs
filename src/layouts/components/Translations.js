// ** Third Party Import
import { useTranslation } from 'react-i18next'

const Translations = ({ text }) => {
  // ** Hook
  const { t } = useTranslation()

  return <><div style={{fontSize:"12px"}}>{`${t(text)}`} </div></>
}

export default Translations
