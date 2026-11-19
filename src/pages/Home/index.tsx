import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import { CoffeeCard } from '@/components/CoffeeCard'
import { coffees } from '@/data/coffees'
import styles from './Home.module.css'

export function Home() {
  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div>
            <h1 className={styles.heroTitle}>
              Encontre o café perfeito<br />para qualquer hora do dia
            </h1>
            <p className={styles.heroSubtitle}>
              Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora
            </p>

            <ul className={styles.perks}>
              <li className={styles.perk}>
                <span className={`${styles.perkIcon} ${styles.yellow}`}>
                  <ShoppingCart size={16} weight="fill" />
                </span>
                Compra simples e segura
              </li>
              <li className={styles.perk}>
                <span className={`${styles.perkIcon} ${styles.dark}`}>
                  <Package size={16} weight="fill" />
                </span>
                Embalagem mantém o café intacto
              </li>
              <li className={styles.perk}>
                <span className={`${styles.perkIcon} ${styles.yellowDark}`}>
                  <Timer size={16} weight="fill" />
                </span>
                Entrega rápida e rastreada
              </li>
              <li className={styles.perk}>
                <span className={`${styles.perkIcon} ${styles.purple}`}>
                  <Coffee size={16} weight="fill" />
                </span>
                O café chega fresquinho até você
              </li>
            </ul>
          </div>

          <img src={`${import.meta.env.BASE_URL}hero-coffee.svg`} alt="Copo de café" className={styles.heroImage} />
        </div>
      </section>

      {/* Catalog */}
      <section className={styles.catalog}>
        <h2 className={styles.catalogTitle}>Nossos cafés</h2>
        <div className={styles.coffeeGrid}>
          {coffees.map(coffee => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </section>
    </div>
  )
}
