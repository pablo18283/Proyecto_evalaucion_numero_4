import React from 'react'
import ExerciseCard from '../components/ExerciseCard'
import FilterBar from '../components/FilterBar'
import styles from './Exercises.module.css'

export default function Exercises({
  filteredExercises,
  stats,
  filterGroup,
  setFilterGroup,
  filterDifficulty,
  setFilterDifficulty,
  searchQuery,
  setSearchQuery,
  onAdd,
  onEdit,
  onDelete,
  onToggle,
  totalExercises,
  translations,
  groupDisplay,
  difficultyDisplay,
}) {
  return (
    <div className={styles.page}>
      <FilterBar
        filterGroup={filterGroup}
        setFilterGroup={setFilterGroup}
        filterDifficulty={filterDifficulty}
        setFilterDifficulty={setFilterDifficulty}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddClick={onAdd}
        total={totalExercises}
        filtered={filteredExercises.length}
        translations={translations}
        groupDisplay={groupDisplay}
        difficultyDisplay={difficultyDisplay}
      />

      {filteredExercises.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🏋️</span>
          <h3>{translations.noResultsTitle}</h3>
          <p>{translations.noResultsDesc}</p>
          <button className={styles.addEmptyBtn} onClick={onAdd}>
            {translations.addEmptyBtn}
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              translations={translations}
            />
          ))}
        </div>
      )}
    </div>
  )
}
