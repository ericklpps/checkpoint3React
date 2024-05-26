//Página inicial
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <br/>
      <h1 className="text-8xl font-bold mb-8 text-center">Checkpoint 3 RWD</h1>
      <br/>
      <p className="text-4xl mb-4 text-center">Seja bem vindo ao blog</p>
      <p className="text-3xl mb-8 text-center">Vá para <Link href="/posts" legacyBehavior><a>manipulação posts</a></Link> para utilizar as funções do site!</p>
      <br/>
    </>
  );
}
