import './About.css'
const About = (props) => {
  return (
    <div id="about">
      {props.content}
    </div>
  )
}

About.defaultProps = {
  content: "This is about page"
}

export default About