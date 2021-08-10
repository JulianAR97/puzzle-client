import React from 'react'
import ReactMarkdown from 'react-markdown'
import './About.css'
import './About.md'

const About = (props) => {
  return (
    <div id="about">
      <ReactMarkdown>
        {props.content}
      </ReactMarkdown>
    </div>
  )
}

About.defaultProps = {
  content: "This is about page"
}

export default About