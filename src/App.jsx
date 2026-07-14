import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import ExerciseForm from './components/ExerciseForm'
import OnboardingModal from './components/OnboardingModal'
import Dashboard from './pages/Dashboard'
import Exercises from './pages/Exercises'
import ApiExplorer from './pages/ApiExplorer'
import { useExercises } from './hooks/useExercises'
import { LANGUAGES, TRANSLATIONS, GROUP_DISPLAY, DIFFICULTY_DISPLAY } from './translations'
import { PLANS } from './data/plans'
import styles from './App.module.css'

const SAVED_SETTINGS_KEY = 'gymtracker_settings'

const defaultProfile = {
  height: 170,
  weight: 70,
  age: 25,
  gender: 'male',
  level: 'Intermedio',
}

export default function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [language, setLanguage] = useState('es')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingExercise, setEditingExercise] = useState(null)
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true)
  const [profile, setProfile] = useState(defaultProfile)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(SAVED_SETTINGS_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      setLanguage(parsed.language || 'es')
      setProfile({ ...defaultProfile, ...parsed.profile })
      setIsOnboardingOpen(false)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      SAVED_SETTINGS_KEY,
      JSON.stringify({ language, profile })
    )
  }, [language, profile])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]:
        name === 'height' || name === 'weight' || name === 'age'
          ? Number(value)
          : value,
    }))
  }

  const handleStart = () => {
    setIsOnboardingOpen(false)
    setSettingsOpen(false)
  }

  const handleCloseModal = () => {
    setIsOnboardingOpen(false)
    setSettingsOpen(false)
  }

  const handleOpenSettings = () => {
    setSettingsOpen(true)
  }

  const {
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
  } = useExercises(profile)

  const handleAdd = () => {
    setEditingExercise(null)
    setIsFormOpen(true)
  }

  const handleEdit = (exercise) => {
    setEditingExercise(exercise)
    setIsFormOpen(true)
  }

  const handleSave = (data) => {
    if (editingExercise) {
      updateExercise(editingExercise.id, data)
    } else {
      addExercise(data)
    }
  }

  const t = TRANSLATIONS[language]

  return (
    <div className={styles.app}>
      <Header
        activeView={activeView}
        onViewChange={setActiveView}
        language={language}
        onLanguageChange={setLanguage}
        translations={t}
        languages={LANGUAGES}
        onSettingsOpen={handleOpenSettings}
      />

      <div className={styles.statsContainer}>
        <StatsBar stats={stats} translations={t} />
      </div>

      {storageError && (
        <div
          role="alert"
          style={{
            margin: '0 auto 16px',
            maxWidth: '900px',
            padding: '10px 16px',
            borderRadius: '8px',
            background: 'rgba(255, 90, 31, 0.12)',
            border: '1px solid rgba(255, 90, 31, 0.4)',
            color: '#ff5a1f',
            fontSize: '0.85rem',
          }}
        >
          ⚠️ {t.storageErrorMsg || storageError}
        </div>
      )}

      <main className={styles.main}>
        <div className={styles.content}>
          {activeView === 'dashboard' && (
            <Dashboard
              stats={stats}
              exercises={exercises}
              onViewChange={setActiveView}
              translations={t}
              language={language}
              groupDisplay={GROUP_DISPLAY[language]}
              profile={profile}
              plans={PLANS}
            />
          )}
          {activeView === 'exercises' && (
            <Exercises
              filteredExercises={filteredExercises}
              stats={stats}
              filterGroup={filterGroup}
              setFilterGroup={setFilterGroup}
              filterDifficulty={filterDifficulty}
              setFilterDifficulty={setFilterDifficulty}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={deleteExercise}
              onToggle={toggleCompleted}
              totalExercises={exercises.length}
              translations={t}
              language={language}
              groupDisplay={GROUP_DISPLAY[language]}
              difficultyDisplay={DIFFICULTY_DISPLAY[language]}
            />
          )}
          {activeView === 'explorer' && <ApiExplorer translations={t} language={language} />}
        </div>
      </main>

      <OnboardingModal
        isOpen={isOnboardingOpen || settingsOpen}
        isSettings={settingsOpen}
        onClose={handleCloseModal}
        language={language}
        onLanguageChange={setLanguage}
        profile={profile}
        onProfileChange={handleProfileChange}
        onStart={handleStart}
        translations={t}
      />

      <ExerciseForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        editingExercise={editingExercise}
        translations={t}
        groupDisplay={GROUP_DISPLAY[language]}
        difficultyDisplay={DIFFICULTY_DISPLAY[language]}
      />
    </div>
  )
}
