export default function Footer() {
    return (
      <footer className="bg-red-600 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Checkpoint 3 RWD</p>
          <p>github.com/</p>
        </div>
      </footer>
    )
  }