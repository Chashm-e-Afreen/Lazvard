import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO title="About" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h2 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-">
            هوا راست گردد نه گرم و نه سرد <br></br>
            زمین سبزه و آبها لاژورد
          </h2>
          <h3>فردوسی طوسی</h3>

          <figure className="kg-card kg-image-card kg-width-wide">
            <Img
              fluid={data.lapis.childImageSharp.fluid}
              className="kg-image"
            />
            <figcaption>Lapis Lazuli (Läžavard).</figcaption>
          </figure>
          <h3 id="dynamic-styles">About</h3>
          <p>Words elude me so I might not be able to tell effectively convey what this is all about
            but I will try my best.
          </p>
          <p>I recently contemplated rewriting my metrical scansion engine for Urdu in Typescript as part of the second version
            of my web application. 
            <h4>
              <strong>
                <strong>Objectives</strong>
              </strong>
            </h4>
            <ul>
              <li>Pure Typescript implementation to remove the need for a backend.</li>
              <li>Experiment with newer UI/UX techniques.</li>
              <li>Make a Single Page Application for a more fluid experience.</li>
            </ul>
          </p>
          <h4>
              <strong>
                <strong>Result</strong>
              </strong>
            </h4>
            <ul>
              <li>The engine turned out fine. Slower than my C++ implementation but still reasonably fast.</li>
              <li>Clean codebase that relies heavily on functional programming techniques.</li>
              <li>Installable Progressive Web App that works offline on all platforms.</li>
              <li>Fluid UI with Gatsby and React.</li>
            </ul>
            
            <p>Eventually I decided to embed the app into a somewhat multipurpose website.
            </p>

            <h3>―― Muhammad Rehan Qureshi</h3>
        </div>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    lapis: file(
      relativePath: { eq: "lapis.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
