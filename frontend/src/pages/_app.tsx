import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange, QueryInput, Cache } from '@urql/exchange-graphcache'
import theme from '../theme'
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql'
import { betterUpdateQuery } from '../utils/betterUpdateQuery'

function MyApp({ Component, pageProps }: any) {
  return (
    
      <ThemeProvider theme={theme}>
          <CSSReset />
          <Component {...pageProps} />
      </ThemeProvider>
    
  )
}

export default MyApp
