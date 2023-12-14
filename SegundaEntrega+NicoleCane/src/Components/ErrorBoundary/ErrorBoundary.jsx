import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Renderiza un componente indicando que hubo un error
      return <div>Hubo un error en la aplicación.</div>;
    }
    // Si no hay error, renderiza normalmente
    return this.props.children;
  }
}

export default ErrorBoundary;