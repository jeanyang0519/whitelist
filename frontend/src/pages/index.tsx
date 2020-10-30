import React from "react"
import { withUrqlClient } from "next-urql"
import { Layout } from "../components/Layout"
import { useMeQuery, usePostsQuery } from "../generated/graphql"
import { createUrqlClient } from "../utils/createUrqlClient"
import { Splash } from "../components/Splash"
import { Show } from "../components/Show"
import { Spinner } from "@chakra-ui/core"

const Index = () => {
  const [{ data, fetching }] = usePostsQuery()
  const [{ data: meData, fetching: meFetching }] = useMeQuery()

  if (!meFetching && !meData?.me) {
      return <Splash/>
  }

  if (!fetching && !data) {
    return <div>Something wrong with your query</div>;
  }
  
  return (
    <Layout>
      {!data && fetching ? (
          <div>Loading <Spinner/></div>
        ) : (
          <Show data={data}/>
        )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
