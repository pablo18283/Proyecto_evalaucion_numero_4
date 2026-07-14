import React from 'react'
import styles from './OnboardingModal.module.css'

export default function OnboardingModal({ isOpen, onClose, language, onLanguageChange, profile, onProfileChange, onStart, translations, isSettings }) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{isSettings ? translations.settingsTitle : translations.selectLanguage}</h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{translations.selectLanguage}</label>
          <select
            className={styles.input}
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{translations.height}</label>
          <input
            className={styles.input}
            type="number"
            min="120"
            max="230"
            name="height"
            value={profile.height}
            onChange={onProfileChange}
          />
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{translations.weight}</label>
          <input
            className={styles.input}
            type="number"
            min="40"
            max="180"
            name="weight"
            value={profile.weight}
            onChange={onProfileChange}
          />
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{translations.age}</label>
          <input
            className={styles.input}
            type="number"
            min="14"
            max="100"
            name="age"
            value={profile.age}
            onChange={onProfileChange}
          />
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{translations.gender}</label>
          <select
            className={styles.input}
            name="gender"
            value={profile.gender}
            onChange={onProfileChange}
          >
            <option value="male">{translations.male}</option>
            <option value="female">{translations.female}</option>
            <option value="other">{translations.other}</option>
          </select>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{translations.level}</label>
          <select
            className={styles.input}
            name="level"
            value={profile.level}
            onChange={onProfileChange}
          >
            <option value="Principiante">{translations.beginner}</option>
            <option value="Intermedio">{translations.intermediate}</option>
            <option value="Avanzado">{translations.advanced}</option>
          </select>
        </div>

        <button className={styles.startBtn} onClick={onStart}>
          {isSettings ? translations.save : translations.start}
        </button>
      </div>
    </div>
  )
}
