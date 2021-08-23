import React from 'react';
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import "./i18n"

function App() {
  const {t} = useTranslation();

  return (
    <div>
      <LanguageSwitcher/>
      {t("Witam")}
    </div>
  );
}

export default App;
