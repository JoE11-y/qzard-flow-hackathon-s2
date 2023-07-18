import 'survey-core/defaultV2.min.css';
import "@/styles/updatesurveyv2.css";
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
