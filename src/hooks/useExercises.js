import { useState, useMemo, useEffect, useRef } from 'react'
import { initialExercises } from '../data/exercises'

const STORAGE_KEY = 'gymtracker_exercises'

// Lee el estado guardado en localStorage. Si no existe, está corrupto,
// o localStorage no está disponible (modo privado, cuota excedida, etc.)
// se recurre a los datos iniciales sin romper la aplicación.
function loadStoredExercises() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return initialExercises
    }

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return initialExercises
    }

    return parsed
  } catch (err) {
    console.error(
      'No se pudo leer el estado guardado, se usan datos iniciales:',
      err
    )

    return initialExercises
  }
}

function getNextId(exercises) {
  return exercises.reduce((max, ex) => Math.max(max, Number(ex.id) || 0), 0) + 1
}

export function useExercises(profile) {
  const [exercises, setExercises] = useState(loadStoredExercises)
  const [filterGroup, setFilterGroup] = useState('Todos')
  const [filterDifficulty, setFilterDifficulty] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [storageError, setStorageError] = useState(null)
  const nextIdRef = useRef(getNextId(loadStoredExercises()))

  // Persistencia: cada cambio en los ejercicios se guarda en localStorage.
  // Si falla (cuota excedida, navegador restringido, etc.) se informa
  // mediante storageError en lugar de romper la app.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises))
      if (storageError) setStorageError(null)
    } catch (err) {
      console.error('Error al guardar los ejercicios en localStorage:', err)
      setStorageError('No se pudieron guardar los cambios de forma local.')
    }
  }, [exercises])

  const adaptedExercises = useMemo(() => {
    if (!profile) return exercises
    const levelOrder = { Principiante: 0, Intermedio: 1, Avanzado: 2 }
    const maxLevel = levelOrder[profile.level] ?? 1
    return exercises.filter((ex) => {
      const exerciseLevel = levelOrder[ex.difficulty] ?? 1
      return exerciseLevel <= maxLevel
    })
  }, [exercises, profile])

  const filteredExercises = useMemo(() => {
    return adaptedExercises.filter((ex) => {
      const matchGroup = filterGroup === 'Todos' || ex.muscleGroup === filterGroup
      const matchDiff =
        filterDifficulty === 'Todos' || ex.difficulty === filterDifficulty
      const matchSearch = ex.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      return matchGroup && matchDiff && matchSearch
    })
  }, [adaptedExercises, filterGroup, filterDifficulty, searchQuery])

  const stats = useMemo(() => {
    const total = adaptedExercises.length
    const completed = adaptedExercises.filter((e) => e.completed).length
    const totalSets = adaptedExercises.reduce((acc, e) => acc + e.sets, 0)
    const totalWeight = adaptedExercises.reduce(
      (acc, e) => acc + e.weight * e.sets * e.reps,
      0
    )
    return { total, completed, totalSets, totalWeight }
  }, [adaptedExercises])

  const addExercise = (data) => {
    const newExercise = {
      ...data,
      id: nextIdRef.current++,
      completed: false,
    }
    setExercises((prev) => [newExercise, ...prev])
  }

  const updateExercise = (id, data) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, ...data } : ex))
    )
  }

  const deleteExercise = (id) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id))
  }

  const toggleCompleted = (id) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === id ? { ...ex, completed: !ex.completed } : ex
      )
    )
  }

  return {
    exercises,
    filteredExercises,
    stats,
    storageError,
    filterGroup,
    setFilterGroup,
    filterDifficulty,
    setFilterDifficulty,
    searchQuery,
    setSearchQuery,
    addExercise,
    updateExercise,
    deleteExercise,
    toggleCompleted,
  }
}
