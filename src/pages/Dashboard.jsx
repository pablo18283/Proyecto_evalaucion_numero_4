import React from 'react'
import styles from './Dashboard.module.css'

const TIPS = [
  'Descansa al menos 48 horas entre entrenamientos del mismo grupo muscular.',
  'La hidratación adecuada mejora el rendimiento hasta un 20%.',
  'El sueño es cuando tus músculos realmente crecen.',
  'La progresión de carga es la clave del avance continuo.',
  'Calentar 5-10 minutos reduce el riesgo de lesiones.',
]

export default function Dashboard({ stats, exercises, onViewChange, translations, groupDisplay, language, profile, plans }) {
  const todayTip = TIPS[new Date().getDay() % TIPS.length]
  const recentCompleted = exercises.filter(e => e.completed).slice(0, 3)
  const pending = exercises.filter(e => !e.completed).slice(0, 3)

  const muscleGroups = [...new Set(exercises.map(e => e.muscleGroup))]
  const groupStats = muscleGroups.map((g) => ({
    name: g,
    total: exercises.filter((e) => e.muscleGroup === g).length,
    done: exercises.filter((e) => e.muscleGroup === g && e.completed).length,
  }))

  const locale = translations.locale || (language === 'en' ? 'en-US' : 'es-CL')
  const selectedPlan = plans?.[profile?.level] || plans?.Intermedio || []
  const levelLabel =
    profile?.level === 'Principiante'
      ? translations.beginner
      : profile?.level === 'Avanzado'
      ? translations.advanced
      : translations.intermediate

  const welcomePrefix = translations.welcomePrefix

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcome}>
        <div>
          <h1 className={styles.welcomeTitle}>
            {welcomePrefix} <span className={styles.accent}>GymTracker</span>
          </h1>
          <p className={styles.welcomeSub}>
            {new Date().toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <div className={styles.tip}>
          <span className={styles.tipLabel}>💡 {translations.tipOfDay}</span>
          <p className={styles.tipText}>{todayTip}</p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{translations.pending}</h2>
          {pending.length === 0 ? (
            <div className={styles.empty}>
              <span>🎉</span>
              <p>{translations.allCompleted}</p>
            </div>
          ) : (
            <ul className={styles.quickList}>
              {pending.map(ex => (
                <li key={ex.id} className={styles.quickItem}>
                  <span className={styles.quickName}>{ex.name}</span>
                  <span className={styles.quickMeta}>{ex.sets}×{ex.reps} — {ex.muscleGroup}</span>
                </li>
              ))}
            </ul>
          )}
          <button className={styles.linkBtn} onClick={() => onViewChange('exercises')}>
            {translations.showAll}
          </button>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{translations.completed}</h2>
          {recentCompleted.length === 0 ? (
            <div className={styles.empty}>
              <span>🏋️</span>
              <p>{translations.noCompleted}</p>
            </div>
          ) : (
            <ul className={styles.quickList}>
              {recentCompleted.map(ex => (
                <li key={ex.id} className={`${styles.quickItem} ${styles.done}`}>
                  <span className={styles.quickName}>✓ {ex.name}</span>
                  <span className={styles.quickMeta}>{ex.muscleGroup}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{translations.byMuscleGroup}</h2>
          <ul className={styles.groupList}>
            {groupStats.map((g) => (
              <li key={g.name} className={styles.groupItem}>
                <div className={styles.groupHeader}>
                  <span className={styles.groupName}>{groupDisplay[g.name] || g.name}</span>
                  <span className={styles.groupCount}>{g.done}/{g.total}</span>
                </div>
                <div className={styles.miniBar}>
                  <div
                    className={styles.miniBarFill}
                    style={{ width: g.total > 0 ? `${(g.done / g.total) * 100}%` : '0%' }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <div className={styles.planHeader}>
            <h2 className={styles.sectionTitle}>{translations.weeklyPlan}</h2>
            <span className={styles.planLevel}>{levelLabel}</span>
          </div>
          <div className={styles.planGrid}>
            {selectedPlan.map((item) => (
              <div key={item.day} className={styles.planCard}>
                <span className={styles.planDay}>{translations[item.day]}</span>
                <p className={styles.planFocus}>{translations[item.focusKey]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
