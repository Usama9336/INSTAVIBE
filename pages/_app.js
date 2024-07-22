import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from 'recoil'
import { AuthProvider } from '../context/AuthContext'


export default function App({ Component, 
  pageProps: { session, ...pageProps },
 }) {
  return <SessionProvider session={session}>
    <RecoilRoot> 
      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
  </RecoilRoot>
  </SessionProvider> 
 
}

