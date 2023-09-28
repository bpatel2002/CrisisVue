import Image from 'next/image'
import styles from './page.module.css'
import React from 'react';
import MassShootingEvent from './components/massShootingEvent';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>



      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
          
        />
      </div>

      <div className={styles.grid}>

        <a
          //href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            {/* <h1>My Next.js App</h1> */}
            <MassShootingEvent
            event="Sandy Hook"
            date="October 12, 2020"
            perpetrator="John Doe"
            location="City XYZ"
            numVictims={10}
            />
          </div>
        </a>

        <a
          //href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          >
          <div>
            {/* <h1>My Next.js App</h1> */}
            <MassShootingEvent
            event="Las Vegas Strip"
            date="October 12, 2020"
            perpetrator="John Doe"
            location="City XYZ"
            numVictims={10}
            />
          </div>
        </a>

        <a
          //href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          >
          <div>
            {/* <h1>My Next.js App</h1> */}
            <MassShootingEvent
            event="Virgnia Tech"
            date="October 12, 2020"
            perpetrator="John Doe"
            location="City XYZ"
            numVictims={10}
            />
          </div>
        </a>

        <a
          //href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          >
          <div>
            {/* <h1>My Next.js App</h1> */}
            <MassShootingEvent
            event="Robb Elementary"
            date="October 12, 2020"
            perpetrator="John Doe"
            location="City XYZ"
            numVictims={10}
            />
          </div>
        </a>
      </div>

      <div className={styles.grid}>
        <a
          //href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          >
          <div>
            {/* <h1>My Next.js App</h1> */}
            <MassShootingEvent
            event="San Bernardino"
            date="October 12, 2020"
            perpetrator="John Doe"
            location="City XYZ"
            numVictims={10}
            />
          </div>
        </a>

        <a
          //href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          >
          <div>
            {/* <h1>My Next.js App</h1> */}
            <MassShootingEvent
            event="Orlando nightclub"
            date="October 12, 2020"
            perpetrator="John Doe"
            location="City XYZ"
            numVictims={10}
            />
          </div>
        </a>

        <a
          //href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          >
          <div>
            {/* <h1>My Next.js App</h1> */}
            <MassShootingEvent
            event="Texas Baptist Church"
            date="October 12, 2020"
            perpetrator="John Doe"
            location="City XYZ"
            numVictims={10}
            />
          </div>
        </a>

        <a
          //href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          >
          <div>
            {/* <h1>My Next.js App</h1> */}
            <MassShootingEvent
            event="El Paso"
            date="October 12, 2020"
            perpetrator="John Doe"
            location="City XYZ"
            numVictims={10}
            />
          </div>
        </a>
      </div>
    </main>
  )
}