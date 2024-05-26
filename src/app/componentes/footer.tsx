//componente footer com as informações

export default function Footer() {
    return (
      <footer className="bg-red-600 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Checkpoint 3 RWD</p>
          <p>Erick Lopes Silva RM - 553927</p>
          <p>https://github.com/ericklpps/checkpoint3React</p>
        </div>
      </footer>
    )
  }