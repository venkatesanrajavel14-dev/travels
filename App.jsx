import { useState } from 'react'
import './App.css'

const cars = [
  {
    name: 'Toyota Innova',
    description: '7-seater MPV · family & outstation trips',
    price: 4500,
    category: 'mpv outstation',
    tag: 'FAMILY FAVOURITE',
    image: '/fleet/innova-gun143.jpg',
    alt: 'White Pearl Crystal Shine Toyota Innova GUN143 FL 2.8 V, photographed on 18 January 2026',
    details: ['✦ 7-seater comfort', '◷ Great for long trips'],
    imageCredit: {
      author: 'Ethan Llamas',
      source:
        'https://commons.wikimedia.org/wiki/File:Toyota_Innova_GUN143_FL_2.8_V_White_Pearl_Crystal_Shine_01.jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
  },
  {
    name: 'Force Urbania',
    description: 'Passenger minibus · group tours & events',
    price: 12000,
    category: 'group outstation',
    tag: 'GROUP TRAVEL',
    image: '/fleet/group-tour-van.jpg',
    alt: 'Representative white passenger minibus; exact vehicle model is not verified',
    details: ['✦ Spacious group seating', '◷ Ideal for tours'],
    imageCredit: {
      author: 'Yazid N',
      source:
        'https://www.pexels.com/photo/white-minivan-parked-at-modern-airport-terminal-39075475/',
      license: 'Pexels License',
      licenseUrl: 'https://www.pexels.com/license/',
    },
  },
  {
    name: 'Maruti Suzuki Swift',
    description: '2024 hybrid hatchback · easy city rides',
    price: 2500,
    category: 'hatchback city',
    tag: 'CITY FAVOURITE',
    image: '/fleet/swift-white-2024.jpg?v=2024',
    alt: 'Rear view of a white 2024 Suzuki Swift Hybrid MZ 2WD',
    details: ['✦ Easy to park', '◷ Great for city trips'],
    imageCredit: {
      author: 'Tokumeigakarinoaoshima',
      source:
        'https://commons.wikimedia.org/wiki/File:White_Suzuki_SWIFT_HYBRID_MZ_2WD_(5AA-ZCEDS).jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
  },
  {
    name: 'Maruti Suzuki Dzire',
    description: '2024 sedan · airport & city rides',
    price: 3000,
    category: 'sedan city',
    tag: 'AIRPORT PICK',
    image: '/fleet/dzire-2024.jpg?v=2024',
    alt: 'Black 2024 Suzuki Dzire ZXI+ sedan',
    details: ['✦ Comfortable sedan', '◷ Airport transfers'],
    imageCredit: {
      author: 'Sant1207ug',
      source:
        'https://commons.wikimedia.org/wiki/File:Suzuki_Dzire_2024_ZXI+.jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
  },
  {
    name: 'Toyota Innova Crysta',
    description: 'Premium 7-seater · family & wedding travel',
    price: 5500,
    category: 'mpv wedding outstation',
    tag: 'PREMIUM MPV',
    image: '/fleet/innova-crysta.jpg',
    alt: 'White Toyota Innova Crysta photographed in India',
    details: ['✦ Extra comfort', '◷ Popular for outstation trips'],
    imageCredit: {
      author: 'Premnath Kudva',
      source:
        'https://commons.wikimedia.org/wiki/File:Toyota_Innova_Crysta_2.4_Z_front_right.jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
  },
  {
    name: 'Toyota Innova Hycross',
    description: 'Premium hybrid MPV · family & tours',
    price: 6500,
    category: 'mpv premium outstation',
    tag: 'PREMIUM HYBRID',
    image: '/fleet/innova-hycross.jpg',
    alt: 'Toyota Innova Hycross, sold internationally as the Zenix',
    details: ['✦ Modern 7-seater', '◷ Comfortable touring'],
    imageCredit: {
      author: 'Ethan Llamas',
      source:
        'https://commons.wikimedia.org/wiki/File:2023_Toyota_Zenix_2.0_v.jpg',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
  },
]

const filters = [
  { label: 'All cars', value: 'all' },
  { label: 'MPVs', value: 'mpv' },
  { label: 'Group trips', value: 'group' },
  { label: 'Hatchbacks', value: 'hatchback' },
  { label: 'Sedans', value: 'sedan' },
]

const packages = [
  {
    name: 'Wedding Travel',
    description: 'Arrive in comfort with a dedicated car for your special day.',
    price: 'From ₹6,000',
    link: 'Plan your day',
  },
  {
    name: 'Scenic Tour',
    description:
      'Explore local sights at your own pace with a comfortable car and driver.',
    price: 'From ₹4,500',
    link: 'Make it yours',
    featured: true,
  },
  {
    name: 'Full-Day Rental',
    description: 'Plan a flexible day trip with a car ready when you are.',
    price: 'From ₹3,200',
    link: 'Plan your trip',
  },
]

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

function getToday() {
  const today = new Date()
  const offset = today.getTimezoneOffset()
  return new Date(today.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

function App() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [favorites, setFavorites] = useState(() => new Set())
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState('')
  const [rentalDays, setRentalDays] = useState('1')
  const [confirmation, setConfirmation] = useState('')

  const selectedCarDetails = cars.find((car) => car.name === selectedCar)
  const estimate = selectedCarDetails
    ? currency.format(selectedCarDetails.price * Number(rentalDays))
    : 'Select a car'

  function toggleFavorite(carName) {
    setFavorites((currentFavorites) => {
      const nextFavorites = new Set(currentFavorites)
      if (nextFavorites.has(carName)) {
        nextFavorites.delete(carName)
      } else {
        nextFavorites.add(carName)
      }
      return nextFavorites
    })
  }

  function bookCar(carName) {
    setSelectedCar(carName)
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setConfirmation(
      `Thanks, ${formData.get('name')}! Your demo request for ${selectedCar} (${rentalDays} day(s)) is ready. Estimated total: ${estimate}. No real booking has been sent.`,
    )
  }

  return (
    <>
      <div className="scenic-background" aria-hidden="true" />
      <header className="hero" id="home">
        <nav className="nav wrap" aria-label="Main navigation">
          <a className="logo" href="#home">
            <span>✥</span> KAVIYA TRAVELS
          </a>
          <button
            className="menu"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="links"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            {menuOpen ? '×' : '☰'}
          </button>
          <div className={`links${menuOpen ? ' open' : ''}`} id="links">
            <a href="#fleet" onClick={() => setMenuOpen(false)}>
              The Fleet
            </a>
            <a href="#packages" onClick={() => setMenuOpen(false)}>
              Packages
            </a>
            <a href="#story" onClick={() => setMenuOpen(false)}>
              Our Story
            </a>
            <a
              className="nav-button"
              href="#booking"
              onClick={() => setMenuOpen(false)}
            >
              Book a ride ↗
            </a>
          </div>
        </nav>

        <div className="hero-grid wrap">
          <div className="hero-copy">
            <div className="eyebrow">
              ✦ SOUTH INDIA CAR RENTALS · TOURS ✦
            </div>
            <h1>
              Your journey
              <br />
              <em>starts here.</em>
            </h1>
            <p>
              From city rides to family road trips, travel with cars you know
              and trust. Book a Swift, Dzire, Innova, Crysta, Hycross, or
              Urbania for your next South India journey.
            </p>
            <div className="actions">
              <a className="button dark" href="#fleet">
                Explore the fleet <b>→</b>
              </a>
              <a className="plain-link" href="#story">
                Why travel with us ↗
              </a>
            </div>
            <div className="stats">
              <div>
                <b>6</b>
                <span>Cars in our fleet</span>
              </div>
              <i />
              <div>
                <b>500+</b>
                <span>Happy travellers</span>
              </div>
              <i />
              <div>
                <b>4.9/5</b>
                <span>Guest rating</span>
              </div>
            </div>
          </div>
          <div className="hero-art">
            <div className="sun" />
            <img
              src="/fleet/innova-crysta.jpg"
              alt="Toyota Innova Crysta ready for a South India road trip"
            />
            <div className="art-caption">
              <small>01 / SOUTH INDIA FAVOURITE</small>
              <b>Comfort for every road, from city rides to family trips.</b>
              <small>
                Photo by{' '}
                <a
                  href="https://commons.wikimedia.org/wiki/File:Toyota_Innova_Crysta_2.4_Z_front_right.jpg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Premnath Kudva
                </a>
                {' · '}
                <a
                  href="https://creativecommons.org/licenses/by-sa/4.0/"
                  target="_blank"
                  rel="noreferrer"
                >
                  CC BY-SA 4.0
                </a>
                {' · cropped and resized'}
              </small>
            </div>
            <div className="seal">
              KAVIYA<b>TRAVELS</b>
            </div>
          </div>
        </div>

        <div className="hero-foot wrap">
          <span>✦ CARS FOR EVERY KIND OF TRIP</span>
          <span>MADE FOR MOMENTS THAT MATTER</span>
          <span>✦ YOUR JOURNEY, OUR CARE</span>
        </div>
      </header>

      <main>
        <section className="section wrap" id="story">
          <div className="kicker">TRAVEL THE WAY YOU LIKE</div>
          <div className="intro">
            <h2>
              Your trip.
              <br />
              <em>Your way.</em>
            </h2>
            <p>
              Pick a compact city car, a comfortable family MPV, or a spacious
              van for your group. We have a ride for airport transfers,
              sightseeing, and outstation journeys.
            </p>
          </div>
          <div className="features">
            <article>
              <span>✧</span>
              <div>
                <h3>Comfortable cars</h3>
                <p>Choose a ride that fits your trip.</p>
              </div>
            </article>
            <article>
              <span>◷</span>
              <div>
                <h3>Simple booking</h3>
                <p>Simple choices for stress-free travel.</p>
              </div>
            </article>
            <article>
              <span>♡</span>
              <div>
                <h3>Personal service</h3>
                <p>Helpful support from pickup to drop-off.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="fleet section" id="fleet">
          <div className="wrap">
            <div className="heading">
              <div>
                <div className="kicker">OUR FLEET</div>
                <h2>
                  Find your <em>ride.</em>
                </h2>
              </div>
              <a className="plain-link" href="#booking">
                Book your car ↗
              </a>
            </div>
            <div className="filters" aria-label="Filter cars">
              {filters.map((filter) => (
                <button
                  className={`filter${activeFilter === filter.value ? ' active' : ''}`}
                  type="button"
                  key={filter.value}
                  aria-pressed={activeFilter === filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="cars">
              {cars
                .filter(
                  (car) =>
                    activeFilter === 'all' ||
                    car.category.split(' ').includes(activeFilter),
                )
                .map((car, index) => {
                  const isFavorite = favorites.has(car.name)
                  return (
                    <article className="car" key={car.name}>
                      <div className="car-img">
                        <img
                          src={car.image}
                          alt={car.alt}
                          loading="eager"
                          fetchPriority={index === 0 ? 'high' : 'auto'}
                        />
                        <span className="tag">{car.tag}</span>
                        {car.imageCredit && (
                          <span className="image-credit">
                            Photo{' '}
                            <a
                              href={car.imageCredit.source}
                              target="_blank"
                              rel="noreferrer"
                            >
                              by {car.imageCredit.author}
                            </a>
                            {' · '}
                            <a
                              href={car.imageCredit.licenseUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {car.imageCredit.license}
                            </a>
                            {' · cropped and resized'}
                          </span>
                        )}
                        <button
                          className={`heart${isFavorite ? ' saved' : ''}`}
                          type="button"
                          aria-label={`${isFavorite ? 'Remove' : 'Save'} ${car.name} ${isFavorite ? 'from' : 'to'} favorites`}
                          aria-pressed={isFavorite}
                          onClick={() => toggleFavorite(car.name)}
                        >
                          {isFavorite ? '♥' : '♡'}
                        </button>
                      </div>
                      <div className="car-body">
                        <div className="car-title">
                          <div>
                            <h3>{car.name}</h3>
                            <p>{car.description}</p>
                          </div>
                          <div className="price">
                            {currency.format(car.price)}
                            <small>/ day</small>
                          </div>
                        </div>
                        <div className="meta">
                          {car.details.map((detail) => (
                            <span key={detail}>{detail}</span>
                          ))}
                        </div>
                        <button
                          className="outline book-car"
                          type="button"
                          onClick={() => bookCar(car.name)}
                        >
                          Book this car <b>↗</b>
                        </button>
                      </div>
                    </article>
                  )
                })}
            </div>
          </div>
        </section>

        <section className="section wrap packages" id="packages">
          <div className="kicker">MADE FOR YOUR OCCASION</div>
          <div className="heading">
            <h2>
              Choose your <em>journey.</em>
            </h2>
            <p>Thoughtful packages for life&apos;s most memorable moments.</p>
          </div>
          <div className="package-grid">
            {packages.map((item, index) => (
              <article
                className={item.featured ? 'featured' : ''}
                key={item.name}
              >
                <span className="package-no">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <b>{item.price}</b>
                <a className="plain-link" href="#booking">
                  {item.link} ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="booking-section" id="booking">
          <div className="wrap booking-grid">
            <div>
              <div className="kicker">YOUR NEXT CHAPTER</div>
              <h2>
                Shall we take
                <br />
                <em>the scenic route?</em>
              </h2>
              <p>
                Tell us a little about your plans. We&apos;ll help you find the
                right car for your trip.
              </p>
              <div className="booking-note">
                ✦ Every great journey starts with a first step.
              </div>
            </div>
            <form className="booking-form" onSubmit={handleSubmit}>
              <h3>Request a reservation</h3>
              <p className="form-sub">
                Share your details to estimate your rental.
              </p>
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                placeholder="Full name"
                autoComplete="name"
                required
              />
              <div className="form-row">
                <div>
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="carSelect">Choose your car</label>
                  <select
                    id="carSelect"
                    name="car"
                    value={selectedCar}
                    onChange={(event) => {
                      setSelectedCar(event.target.value)
                      setConfirmation('')
                    }}
                    required
                  >
                    <option value="">Select a car</option>
                    {cars.map((car) => (
                      <option key={car.name} value={car.name}>
                        {car.name} — {currency.format(car.price)}/day
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label htmlFor="date">Preferred date</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={getToday()}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="days">Rental days</label>
                  <select
                    id="days"
                    name="days"
                    value={rentalDays}
                    onChange={(event) => {
                      setRentalDays(event.target.value)
                      setConfirmation('')
                    }}
                  >
                    {[1, 2, 3, 4, 5, 7].map((dayCount) => (
                      <option key={dayCount} value={dayCount}>
                        {dayCount} {dayCount === 1 ? 'day' : 'days'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="estimate">
                <span>Estimated rental total</span>
                <strong>{estimate}</strong>
              </div>
              <button className="button dark submit" type="submit">
                Send booking request <b>↗</b>
              </button>
              <p className="disclaimer">
                Demo project: this form shows a confirmation locally and does
                not send real bookings.
              </p>
              <div id="formMessage" role="status" aria-live="polite">
                {confirmation}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer">
          <a className="logo" href="#home">
            <span>✥</span> KAVIYA TRAVELS
          </a>
          <p>Car rentals &amp; tours, made easy.</p>
          <div>
            <a href="#fleet">Fleet</a>
            <a href="#packages">Packages</a>
            <a href="#booking">Contact</a>
          </div>
          <small>
            © {new Date().getFullYear()} Kaviya Travels. Car rental &amp; tour
            services. Scenic photo:{' '}
            <a
              href="https://commons.wikimedia.org/wiki/File:Munnar_Road_and_Tea_Plantations.jpg"
              target="_blank"
              rel="noreferrer"
            >
              Manukrishnan80
            </a>
            {' · '}
            <a
              href="https://creativecommons.org/licenses/by-sa/3.0/"
              target="_blank"
              rel="noreferrer"
            >
              CC BY-SA 3.0
            </a>
            {' · cropped and resized'}
          </small>
        </div>
      </footer>
    </>
  )
}

export default App
