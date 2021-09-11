import React, { useState, useReducer } from 'react';
import { InputBox } from '../components/Input';
import { LineOutput } from '../components/Input'
import { WaveLoader } from '../components/Loader';
import "../utils/css/components/app.css"

import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"
import { Output } from '../components/output';

const AboutPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const [output, setOutput] = useState<LineOutput[]>()
  const [loading, setLoading] = useState("hidden")

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const updateOutput = (update: LineOutput[]) => {
    setOutput(null);
    setOutput(update);
  }

  const keywords = [`blog`, `gatsby`, `javascript`,
   `react`, `arooz`, `aruuz`, `عروض` , `urdu`, `اردو`, `شاعری`, `تقطیع`, `اصلاح`, `taqti`]
  return (
    <Layout title={siteTitle}>
      <SEO title="App" keywords={keywords} />
      <div className="grid mt-10 w-full justify-center grid-cols-1 lg:grid-cols-2 text-white bg-transprent style-app">
        <div className="flex row-span-2 lg:row-span-1 items-center justify-center flex-col gap-4">
          <InputBox update={updateOutput} setLoading={setLoading}></InputBox>
          <WaveLoader loading={loading}></WaveLoader>
        </div>
        <Output output={output}></Output>
        <div>
        </div>
      </div>
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
    benchAccounting: file(
      relativePath: { eq: "bench-accounting-49909-unsplash.jpg" }
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
