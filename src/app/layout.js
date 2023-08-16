// import './globals.css'
// import { Inter } from 'next/font/google'
// import { authUserProvider } from '/firebase/Auth'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//       <authUserProvider>
//         {children}
//       </authUserProvider>
//         </body>
//     </html>
//   )
// }


import './globals.css'
import { Inter } from 'next/font/google'
import { authUserProvider } from '/firebase/Auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add your head elements here */}
      </head>
      <body className={inter.className}>
        <authUserProvider>
          {children}
        </authUserProvider>
      </body>
    </html>
  )
}
