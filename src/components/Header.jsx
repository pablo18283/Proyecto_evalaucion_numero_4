import React from 'react'
import styles from './Header.module.css'

export default function Header({ activeView, onViewChange, language, onLanguageChange, translations, languages, onSettingsOpen }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>⚡</span>
          <div>
            <span className={styles.brandName}>GymTracker</span>
            <span className={styles.brandSub}>FitLife</span>
          </div>
        </div>

        <nav className={styles.nav}>
          <button
            className={`${styles.navBtn} ${activeView === 'dashboard' ? styles.active : ''}`}
            onClick={() => onViewChange('dashboard')}
          >
            {translations.dashboard}
          </button>
          <button
            className={`${styles.navBtn} ${activeView === 'exercises' ? styles.active : ''}`}
            onClick={() => onViewChange('exercises')}
          >
            {translations.exercises}
          </button>
          <button
            className={`${styles.navBtn} ${activeView === 'explorer' ? styles.active : ''}`}
            onClick={() => onViewChange('explorer')}
          >
            {translations.explorer}
          </button>
        </nav>

        <div className={styles.controlsRight}>
          <button className={styles.settingsBtn} onClick={onSettingsOpen}>
            ⚙ {translations.settings}
          </button>
          <div className={styles.languageWrap}>
            <label htmlFor="language-select" className={styles.languageLabel}>
              {translations.selectLanguage}
            </label>
            <select
              id="language-select"
              className={styles.languageSelect}
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}
