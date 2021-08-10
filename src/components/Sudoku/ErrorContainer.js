const ErrorContainer = (props) => {
  const renderErrors = (errors) => {
    return errors.map(
      (error, i) => 
        <h3 key={i}>{error}</h3>
    )
  }
  return (
    <div id="errorContainer">
      {renderErrors(props.errors)}
    </div>
  )
}

ErrorContainer.defaultProps = {
  errors: []
}

export default ErrorContainer

