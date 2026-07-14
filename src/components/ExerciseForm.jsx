import React, { useState, useEffect } from 'react'
import { MUSCLE_GROUPS, DIFFICULTY_LEVELS } from '../data/exercises'
import styles from './ExerciseForm.module.css'

const emptyForm = {
  name: '',
  muscleGroup: 'Pecho',
  sets: 3,
  reps: 10,
  weight: 0,
  difficulty: 'Principiante',
  notes: '',
}

export default function ExerciseForm({ isOpen, onClose, onSave, editingExercise, translations, groupDisplay, difficultyDisplay }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingExercise) {
      setForm(editingExercise)
    } else {
      setForm(emptyForm)
    }
    setErrors({})
  }, [editingExercise, isOpen])

  const validate = () => {
    const t = translations || {}
    const newErrors = {}
    const trimmedName = form.name.trim()

    if (!trimmedName) {
      newErrors.name = t.errorName || 'El nombre es obligatorio'
    } else if (trimmedName.length < 3) {
      newErrors.name = t.errorNameShort || 'El nombre debe tener al menos 3 caracteres'
    } else if (trimmedName.length > 40) {
      newErrors.name = t.errorNameLong || 'El nombre no puede superar los 40 caracteres'
    }

    if (form.sets === '' || isNaN(form.sets) || form.sets < 1 || form.sets > 20) {
      newErrors.sets = t.errorSets || 'Entre 1 y 20 series'
    }

    if (form.reps === '' || isNaN(form.reps) || form.reps < 1 || form.reps > 100) {
      newErrors.reps = t.errorReps || 'Entre 1 y 100 reps'
    }

    if (form.weight === '' || isNaN(form.weight) || form.weight < 0) {
      newErrors.weight = t.errorWeight || 'El peso no puede ser negativo'
    } else if (form.weight > 500) {
      newErrors.weight = t.errorWeightMax || 'El peso ingresado supera el límite permitido (500 kg)'
    }

    if (form.notes && form.notes.length > 200) {
      newErrors.notes = t.errorNotes || 'Las notas no pueden superar los 200 caracteres'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSave({ ...form, name: form.name.trim(), notes: form.notes.trim() })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>
            {editingExercise ? translations.editExercise : translations.newExercise}
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label}>{translations.exerciseName}</label>
            <input
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              name="name"
              type="text"
              placeholder={translations.exercisePlaceholder}
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>{translations.muscleGroup}</label>
              <select className={styles.select} name="muscleGroup" value={form.muscleGroup} onChange={handleChange}>
                {MUSCLE_GROUPS.filter(g => g !== 'Todos').map((g) => (
                  <option key={g} value={g}>{groupDisplay[g] || g}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{translations.difficulty}</label>
              <select className={styles.select} name="difficulty" value={form.difficulty} onChange={handleChange}>
                {DIFFICULTY_LEVELS.map((d) => (
                  <option key={d} value={d}>{difficultyDisplay[d] || d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>{translations.sets}</label>
              <input
                className={`${styles.input} ${errors.sets ? styles.inputError : ''}`}
                name="sets"
                type="number"
                min="1"
                max="20"
                value={form.sets}
                onChange={handleChange}
              />
              {errors.sets && <span className={styles.error}>{errors.sets}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{translations.reps}</label>
              <input
                className={`${styles.input} ${errors.reps ? styles.inputError : ''}`}
                name="reps"
                type="number"
                min="1"
                max="100"
                value={form.reps}
                onChange={handleChange}
              />
              {errors.reps && <span className={styles.error}>{errors.reps}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{translations.weight}</label>
              <input
                className={`${styles.input} ${errors.weight ? styles.inputError : ''}`}
                name="weight"
                type="number"
                min="0"
                step="2.5"
                value={form.weight}
                onChange={handleChange}
              />
              {errors.weight && <span className={styles.error}>{errors.weight}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{translations.notes}</label>
            <textarea
              className={`${styles.textarea} ${errors.notes ? styles.inputError : ''}`}
              name="notes"
              placeholder={translations.notesPlaceholder}
              value={form.notes}
              onChange={handleChange}
              rows={3}
              maxLength={200}
            />
            {errors.notes && <span className={styles.error}>{errors.notes}</span>}
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>{translations.cancel}</button>
          <button className={styles.saveBtn} onClick={handleSubmit}>
            {editingExercise ? translations.saveChanges : translations.addExerciseBtn}
          </button>
        </div>
      </div>
    </div>
  )
}
