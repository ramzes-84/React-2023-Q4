import { Navigation } from './navigation';
import { SingleView } from './single-view';

export const SplitView = () => {
  return (
    <div className="flex flex-row">
      <section className="max-w-[50%]">
        <Navigation />
      </section>
      <section className="max-w-[50%]">
        <SingleView />
      </section>
    </div>
  );
};
