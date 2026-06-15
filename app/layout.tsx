{/*
                                 ,---.
                                /    |
                               /     |
                              /      |
                             /       |
                        ___,'        |
                      <  -'          :
                       \`-.__..--'\`\`-,_\_
                          |o/ <o>\` :,.)_\`>
                          :/ \`     ||/)
                          (_.).__,-\` |\\
                          /( \`.\`\`   \`| :
                          \\'`-.)  \`  ; ;
                          | \`       /-<
                          |     \`  /   \`.
          ,-_-..____     /|  \`    :__..-'\\
         /,'-.__\\\\  \`\`-./ :\`      ;       \\
         \`\\ \`\\  \`\\\\  \\ :  (   \`  /  ,   \`. \\
           \\\` \\   \\\\   |  | \`   :  :     .\\ \\
            \\ \`\\_  ))  :  ;     |  |      ): :
           (\`-.-'\\ ||  |\\ \\   \` ;  ;       | |
            \\-_   \`;;._   ( \`  /  /_       | |
             \`-.-.// ,'\`-._\\__/_,'         ; |
                \\:: :     /     \`     ,   /  |
                 || |    (        ,' /   /   |
                 ||                ,'   / SSt|

███╗░░░███╗██████╗░░░░░██╗░░░░░░░██╗███████╗██████╗░██████╗░
████╗░████║██╔══██╗░░░░██║░░██╗░░██║╚════██║██╔══██╗██╔══██╗
██╔████╔██║██████╔╝░░░░╚██╗████╗██╔╝░░███╔═╝██████╔╝██║░░██║
██║╚██╔╝██║██╔══██╗░░░░░████╔═████║░██╔══╝░░██╔══██╗██║░░██║
██║░╚═╝░██║██║░░██║██╗░░╚██╔╝░╚██╔╝░███████╗██║░░██║██████╔╝
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░░╚═╝░░░╚═╝░░╚══════╝╚═╝░░╚═╝╚═════╝░

*/}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '[MR.CXDEV]',
  description: 'Smart Contract Dev, Web3 Engineer, AI Tools Builder',
  icons: {
    icon: '/images/avatar.png',
    apple: '/images/avatar.png',
  },
  openGraph: {
    title: '[MR.CXDEV]',
    description: 'Smart Contract Dev, Web3 Engineer, AI Tools Builder',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MR.CXDEV - Smart Contract & Web3 Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '[MR.CXDEV]',
    description: 'Smart Contract Dev, Web3 Engineer, AI Tools Builder',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </body>
    </html>
  )
}
