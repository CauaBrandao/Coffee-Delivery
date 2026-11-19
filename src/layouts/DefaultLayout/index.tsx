import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import styles from './DefaultLayout.module.css'

export function DefaultLayout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
