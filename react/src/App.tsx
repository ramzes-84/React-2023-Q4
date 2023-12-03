import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from './store/store';
import { FormDataParser } from './components/form-data-parser';

export default function App() {
  const usualFormData = useSelector(
    (state: RootState) => state.usualFormData.dataObj
  );
  const reactHookFormData = useSelector(
    (state: RootState) => state.reactHookFormData.dataRHF
  );

  return (
    <main className="flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-pink-500 h-screen">
      <h1 className="text-2xl text-white text-center">Hello world!</h1>
      <section className="m-5 flex gap-2 text-white">
        <div className="flex flex-col gap-2">
          <Link className="p-3 bg-green-500 rounded-lg" to={'usual-form'}>
            Usual Uncontrolled Form Page
          </Link>
          {usualFormData && <FormDataParser obj={usualFormData} />}
        </div>
        <div className="flex flex-col gap-2">
          <Link className="p-3 bg-cyan-400 rounded-lg" to={'hook-form'}>
            React Hook Form Page
          </Link>
          {reactHookFormData && <FormDataParser obj={reactHookFormData} />}
        </div>
      </section>
    </main>
  );
}
