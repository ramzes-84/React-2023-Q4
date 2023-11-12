import { useRouteError } from 'react-router-dom';
import { Navigation } from './navigation';

export function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <Navigation />
      <div className="flex flex-col max-w-xs mx-auto">
        <p className="text-lg text-center">
          There is an error in application:
          <i>{(error as Error).message}</i>
        </p>
        <p className="text-lg text-center">Please go to Main to fix it.</p>
        <img src="/error.svg" alt="error" />
      </div>
    </>
  );
}
