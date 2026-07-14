import React from 'react'

// Manejo general de errores a nivel de aplicación: si un componente
// falla al renderizar (bug, dato inesperado, etc.) esto evita que toda
// la SPA se caiga en blanco y le muestra al usuario una salida clara.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Error no controlado capturado por ErrorBoundary:', error, info)
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      const t = this.props.translations || {}
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '32px',
            textAlign: 'center',
            fontFamily: 'sans-serif',
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>⚠️</span>
          <h1 style={{ fontSize: '1.25rem', margin: 0 }}>
            {t.genericErrorTitle || 'Ha ocurrido un error inesperado'}
          </h1>
          <p style={{ color: '#888', maxWidth: '420px', margin: 0 }}>
            {t.genericErrorDesc || 'Algo salió mal al mostrar esta sección. Puedes recargar la página para continuar.'}
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: '#ff5a1f',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {t.reloadApp || 'Recargar aplicación'}
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
