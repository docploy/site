import { CheckCircleIcon } from '@heroicons/react/solid';

function CodeSnippet() {
  return (
    <div className="bg-gray-800 flex flex-col gap-4 p-8 relative rounded">
      <div className="absolute right-4 top-4">
        <CheckCircleIcon className="h-12 w-12 text-green-500 bg-green-100 rounded-full" />
      </div>
      <div className="bg-slate-600 h-4 w-40" />
      <div className="bg-slate-400 h-4 ml-8 w-60" />
      <div className="bg-slate-400 h-4 ml-8 w-80" />
      <div className="bg-slate-400 h-4 ml-8 w-80" />
      <div className="bg-slate-600 h-4 w-20" />
    </div>
  );
}

export default CodeSnippet;
