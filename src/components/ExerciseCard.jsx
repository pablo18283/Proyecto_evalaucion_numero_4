import React, { useState } from 'react'
import styles from './ExerciseCard.module.css'

const DIFFICULTY_COLORS = {
  Principiante: '#4dff91',
  Intermedio: '#ffaa4d',
  Avanzado: '#ff4d4d',
}

const MUSCLE_ICONS = {
  Pecho: '💪',
  Espalda: '🏋️',
  Piernas: '🦵',
  Hombros: '🔝',
  Bíceps: '💪',
  Tríceps: '💪',
  Abdomen: '⚡',
  Glúteos: '🍑',
}

export default function ExerciseCard({ exercise, onToggle, onEdit, onDelete, translations }) {
  const [showConfirm, setShowConfirm] = useState(false)

  const diffColor = DIFFICULTY_COLORS[exercise.difficulty] || '#8a8a96'
  const icon = MUSCLE_ICONS[exercise.muscleGroup] || '🏅'

  const handleDelete = () => {
    if (showConfirm) {
      onDelete(exercise.id)
    } else {
      setShowConfirm(true)
      setTimeout(() => setShowConfirm(false), 3000)
    }
  }

  return (
    <div className={`${styles.card} ${exercise.completed ? styles.completed : ''}`}>
      <div className={styles.cardTop}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.meta}>
          <span
            className={styles.difficulty}
            style={{ color: diffColor, borderColor: diffColor + '40', background: diffColor + '15' }}
          >
            {exercise.difficulty}
          </span>
          <span className={styles.muscle}>{exercise.muscleGroup}</span>
        </div>
      </div>

      <h3 className={`${styles.name} ${exercise.completed ? styles.nameDone : ''}`}>
        {exercise.name}
      </h3>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statVal}>{exercise.sets}</span>
          <span className={styles.statLbl}>{translations.seriesLabel}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.statItem}>
          <span className={styles.statVal}>{exercise.reps}</span>
          <span className={styles.statLbl}>{translations.repsLabel}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.statItem}>
          <span className={styles.statVal}>{exercise.weight > 0 ? `${exercise.weight} kg` : translations.bodyweight}</span>
          <span className={styles.statLbl}>{translations.weightLabel}</span>
        </div>
      </div>

      {exercise.notes && (
        <p className={styles.notes}>{exercise.notes}</p>
      )}

      <div className={styles.actions}>
        <button
          className={`${styles.completeBtn} ${exercise.completed ? styles.undoBtn : ''}`}
          onClick={() => onToggle(exercise.id)}
        >
          {exercise.completed ? translations.undoComplete : translations.complete}
        </button>
        <div className={styles.secondaryActions}>
          <button className={styles.editBtn} onClick={() => onEdit(exercise)}>
            {translations.edit}
          </button>
          <button
            className={`${styles.deleteBtn} ${showConfirm ? styles.confirmDelete : ''}`}
            onClick={handleDelete}
          >
            {showConfirm ? translations.confirmDelete : translations.delete}
          </button>
        </div>
      </div>
    </div>
  )
}
