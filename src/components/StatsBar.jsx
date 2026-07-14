import React from 'react'
import styles from './StatsBar.module.css'

export default function StatsBar({ stats, translations }) {
  const progress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  return (
    <div className={styles.statsBar}>
      <div className={styles.stat}>
        <span className={styles.statValue}>{stats.total}</span>
        <span className={styles.statLabel}>{translations.totalExercises}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statValue}>{stats.completed}</span>
        <span className={styles.statLabel}>{translations.completedToday}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statValue}>{stats.totalSets}</span>
        <span className={styles.statLabel}>{translations.totalSets}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statValue}>{stats.totalWeight.toLocaleString()} kg</span>
        <span className={styles.statLabel}>{translations.totalWeight}</span>
      </div>

      <div className={styles.progressWrap}>
        <div className={styles.progressHeader}>
          <span className={styles.statLabel}>{translations.progressToday}</span>
          <span className={styles.progressPct}>{progress}%</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
