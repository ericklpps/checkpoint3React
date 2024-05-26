//componente header com os links de navegação
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-red-600 text-white py-4">
      <nav className="container mx-auto flex justify-between">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:underline">
              Início
            </Link>
          </li>
          <li>
            <Link href="/posts" className="hover:underline">
              Manipulação Posts
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
