import { useState, useMemo } from 'react'
import { Coffee, Package, ShoppingCart, Timer, MagnifyingGlass, X, Heart, Sparkle } from '@phosphor-icons/react'
import { CoffeeCard } from '@/components/CoffeeCard'
import { coffees } from '@/data/coffees'
import { useCart } from '@/contexts/CartContext'
import styles from './Home.module.css'

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'Tradicional', label: 'Tradicionais' },
  { id: 'Com Leite', label: 'Com Leite' },
  { id: 'Especial', label: 'Especiais' },
  { id: 'Gelado', label: 'Gelados' },
  { id: 'Alcoólico', label: 'Alcoólicos' },
  { id: 'favorites', label: 'Favoritos ❤️' },
]

export function Home() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { favorites } = useCart()

  const filteredCoffees = useMemo(() => {
    return coffees.filter(coffee => {
      // Category filter
      if (selectedCategory === 'favorites') {
        if (!favorites.includes(coffee.id)) return false
      } else if (selectedCategory !== 'all') {
        if (!coffee.tags.includes(selectedCategory)) return false
      }

      // Search filter
      if (search.trim()) {
        const query = search.toLowerCase()
        const matchName = coffee.name.toLowerCase().includes(query)
        const matchDesc = coffee.description.toLowerCase().includes(query)
        const matchTags = coffee.tags.some(t => t.toLowerCase().includes(query))
        return matchName || matchDesc || matchTags
      }

      return true
    })
  }, [search, selectedCategory, favorites])

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
      <section className={styles.catalog} id="catalog">
        <div className={styles.catalogHeader}>
          <div>
            <h2 className={styles.catalogTitle}>Nossos cafés</h2>
            <span className={styles.catalogCount}>
              {filteredCoffees.length} {filteredCoffees.length === 1 ? 'café encontrado' : 'cafés encontrados'}
            </span>
          </div>

          {/* Search bar */}
          <div className={styles.searchBar}>
            <MagnifyingGlass size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Pesquisar por nome ou sabor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            {search && (
              <button
                type="button"
                className={styles.clearSearchBtn}
                onClick={() => setSearch('')}
                aria-label="Limpar busca"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className={styles.filterChips}>
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id
            const count = cat.id === 'all'
              ? coffees.length
              : cat.id === 'favorites'
              ? favorites.length
              : coffees.filter(c => c.tags.includes(cat.id)).length

            return (
              <button
                key={cat.id}
                type="button"
                className={`${styles.chip} ${isSelected ? styles.chipSelected : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.id === 'favorites' ? <Heart size={14} weight="fill" /> : <Sparkle size={13} weight="fill" />}
                <span>{cat.label}</span>
                <span className={styles.chipCount}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* Grid or Empty */}
        {filteredCoffees.length > 0 ? (
          <div className={styles.coffeeGrid}>
            {filteredCoffees.map(coffee => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Coffee size={48} className={styles.emptyCoffeeIcon} />
            <h3>Nenhum café encontrado</h3>
            <p>Não encontramos nenhum café para o filtro "{search || selectedCategory}".</p>
            <button
              type="button"
              className={styles.resetFiltersBtn}
              onClick={() => {
                setSearch('')
                setSelectedCategory('all')
              }}
            >
              Ver todos os cafés
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
