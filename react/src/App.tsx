import { Link } from 'react-router-dom';

export default function App() {
  return (
    <main className="flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-pink-500 h-screen">
      <h1 className="text-2xl text-white text-center">Hello world!</h1>
      <section className="m-5 flex gap-2 text-white">
        <Link className="p-3 bg-green-500 rounded-lg" to={'usual-form'}>
          Usual Uncontrolled Form Page
        </Link>
        <Link className="p-3 bg-cyan-400 rounded-lg" to={'hook-form'}>
          React Hook Form Page
        </Link>
      </section>
    </main>
  );
}
