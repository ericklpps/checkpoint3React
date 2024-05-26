import "./globals.css";
import Header from "@/app/componentes/header";
import Footer from "@/app/componentes/footer";
import { ReactNode } from "react";

interface RootLayoutProps{
  children:ReactNode
}


export const metdata ={
  title: 'checkpoint 3 rwd',
  description : 'terceiro checkpoint utilizando next'

}

export default function RootLayout({children}:RootLayoutProps){
  return(
    <html lang="pt-BR">
      <body className='flex flex-col min-h-screen'>
        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}