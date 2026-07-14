import React from 'react'
import { MUSCLE_GROUPS, DIFFICULTY_LEVELS } from '../data/exercises'
import styles from './FilterBar.module.css'

export default function FilterBar({
  filterGroup,
  setFilterGroup,
  filterDifficulty,
  setFilterDifficulty,
  searchQuery,
  setSearchQuery,
  onAddClick,
  total,
  filtered,
  translations,
  groupDisplay,
  difficultyDisplay,
}) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder={translations.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className={styles.clearBtn} onClick={() => setSearchQuery('')}>
            ✕
          </button>
        )}
      </div>

      <select
        className={styles.select}
        value={filterGroup}
        onChange={(e) => setFilterGroup(e.target.value)}
      >
        {MUSCLE_GROUPS.map((g) => (
          <option key={g} value={g}>{groupDisplay[g] || g}</option>
        ))}
      </select>

      <select
        className={styles.select}
        value={filterDifficulty}
        onChange={(e) => setFilterDifficulty(e.target.value)}
      >
        <option value="Todos">{translations.allLevels}</option>
        {DIFFICULTY_LEVELS.map((d) => (
          <option key={d} value={d}>{difficultyDisplay[d] || d}</option>
        ))}
      </select>

      <span className={styles.count}>
        {filtered} de {total}
      </span>

      <button className={styles.addBtn} onClick={onAddClick}>
        {translations.addExercise}
      </button>
    </div>
  )
}
