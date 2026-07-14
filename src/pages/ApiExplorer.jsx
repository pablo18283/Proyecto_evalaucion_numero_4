import React, { useState } from 'react'
import styles from './ApiExplorer.module.css'
import { BODY_PART_LABELS } from '../translations'

const BODY_PARTS = ['back', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist']

// wger.de expone una API REST pública y gratuita (sin API key) para
// consultar ejercicios: https://wger.de/api/v2/exercise/search/
const WGER_SEARCH_URL = 'https://wger.de/api/v2/exercise/search/'
const FETCH_TIMEOUT_MS = 8000

export default function ApiExplorer({ translations, language }) {
  const [bodyPart, setBodyPart] = useState('chest')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  const fetchExercises = async () => {
    setLoading(true)
    setError(null)
    setSearched(true)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      const url = `${WGER_SEARCH_URL}?term=${encodeURIComponent(bodyPart)}&language=english&format=json`
      const res = await fetch(url, { signal: controller.signal })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const data = await res.json()
      const suggestions = Array.isArray(data?.suggestions) ? data.suggestions : []

      if (suggestions.length === 0) {
        // La API respondió correctamente pero sin coincidencias: usamos
        // datos de ejemplo para que la sección nunca quede vacía.
        setResults(getMockData(bodyPart))
      } else {
        const mapped = suggestions.slice(0, 6).map((s) => ({
          name: s.value || s.data?.name || bodyPart,
          bodyPart,
          target: s.data?.category || '—',
          equipment: '—',
          gifUrl: null,
        }))
        setResults(mapped)
      }
    } catch (err) {
      // Cubre: timeout (AbortError), red caída, CORS, respuesta no-OK, JSON inválido, etc.
      // La app nunca se rompe: siempre queda datos de demostración para el usuario.
      console.error('Error consultando la API externa (wger.de):', err)
      setError(translations.errorApi)
      setResults(getMockData(bodyPart))
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  const bodyLabels = BODY_PART_LABELS[language] || BODY_PART_LABELS.es

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <h2 className={styles.title}>{translations.apiTitle}</h2>
        <p className={styles.desc}>
          {translations.apiDesc}
        </p>
        <div className={styles.badge}>
          <span>🌐</span> {translations.apiBadge}
        </div>
      </div>

      <div className={styles.controls}>
        <label className={styles.label}>{translations.bodyPartLabel}</label>
        <div className={styles.row}>
          <select
            className={styles.select}
            value={bodyPart}
            onChange={(e) => setBodyPart(e.target.value)}
          >
            {BODY_PARTS.map((b) => (
              <option key={b} value={b}>
                {bodyLabels[b] || b}
              </option>
            ))}
          </select>
          <button className={styles.fetchBtn} onClick={fetchExercises} disabled={loading}>
            {loading ? translations.loading : translations.searchApiBtn}
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.errorBox}>
          <span>⚠️</span> {translations.errorApi}
        </div>
      )}

      {!searched && !loading && (
        <div className={styles.placeholder}>
          <span>🔌</span>
          <p>{translations.apiPlaceholder}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className={styles.results}>
          {results.map((ex, i) => (
            <div key={i} className={styles.apiCard}>
              {ex.gifUrl ? (
                <img src={ex.gifUrl} alt={ex.name} className={styles.gif} />
              ) : (
                <div className={styles.gifPlaceholder}>🏋️</div>
              )}
              <div className={styles.cardBody}>
                <h3 className={styles.exName}>{ex.name}</h3>
                <div className={styles.tags}>
                  <span className={styles.tag}>{bodyLabels[ex.bodyPart] || ex.bodyPart}</span>
                  <span className={styles.tag}>{ex.target}</span>
                  <span className={styles.tag}>{ex.equipment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function getMockData(bodyPart) {
  const mock = {
    chest: [
      { name: 'barbell bench press', bodyPart: 'chest', target: 'pectorals', equipment: 'barbell', gifUrl: null },
      { name: 'push-up', bodyPart: 'chest', target: 'pectorals', equipment: 'body weight', gifUrl: null },
      { name: 'incline dumbbell press', bodyPart: 'chest', target: 'pectorals', equipment: 'dumbbell', gifUrl: null },
    ],
    back: [
      { name: 'pull-up', bodyPart: 'back', target: 'lats', equipment: 'body weight', gifUrl: null },
      { name: 'bent over row', bodyPart: 'back', target: 'upper back', equipment: 'barbell', gifUrl: null },
      { name: 'lat pulldown', bodyPart: 'back', target: 'lats', equipment: 'cable', gifUrl: null },
    ],
  }
  return mock[bodyPart] || [
    { name: `${bodyPart} exercise 1`, bodyPart, target: 'general', equipment: 'body weight', gifUrl: null },
    { name: `${bodyPart} exercise 2`, bodyPart, target: 'general', equipment: 'dumbbell', gifUrl: null },
  ]
}
