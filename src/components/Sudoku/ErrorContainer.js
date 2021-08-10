const ErrorContainer = (props) => {
  const renderErrors = (errors) => {
    return errors.map(
      (error, i) => 
        <p key={i}>{error}</p>
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

