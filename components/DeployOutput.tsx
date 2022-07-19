import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';

import { CheckCircleIcon } from '@heroicons/react/solid';

function DeployOutput() {
  return (
    <div className="bg-gray-800 p-4 pb-8 rounded">
      <div className="flex items-center gap-2 text-white bg-slate-700 mb-4 px-2 py-2 rounded align-bottom">
        <ChevronDownIcon className="h-4 w-4" />
        <CheckCircleIcon className="h-4 w-4" />
        <span>Publish docs</span>
      </div>
      <div className="flex flex-col font-mono gap-2 leading-relaxed ml-6 text-xs text-white">
        <p className="flex flex-row gap-2 items-top">
          <span className="pr-2 text-gray-400">1</span>
          <span className="flex flex-row gap-1 items-top">
            <ChevronRightIcon className="h-4 w-4" />
            <span>Run docploy/docploy-action</span>
          </span>
        </p>
        <p className="flex flex-row gap-2 items-top">
          <span className="pr-2 text-gray-400">2</span>
          <span>
            Waiting for docs to be deployed to:{' '}
            <span className="text-blue-400 underline">
              https://myuser.github.io/repo/e6c2d5b
            </span>
          </span>
        </p>
        <p className="flex flex-row gap-2 items-top">
          <span className="pr-2 text-gray-400">3</span>
          <span>
            Waiting for docs to be deployed to:{' '}
            <span className="text-blue-400 underline">
              https://myuser.github.io/repo/e6c2d5b
            </span>
          </span>
        </p>
        <p className="flex flex-row gap-2 items-top">
          <span className="pr-2 text-gray-400">4</span>
          <span>
            Waiting for docs to be deployed to:{' '}
            <span className="text-blue-400 underline">
              https://myuser.github.io/repo/e6c2d5b
            </span>
          </span>
        </p>
        <p className="flex flex-row gap-2 items-top">
          <span className="pr-2 text-gray-400">5</span>
          <span>
            🎉 We successfully deployed the docs to:{' '}
            <span className="text-blue-400 underline">
              https://myuser.github.io/repo/e6c2d5b
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}

export default DeployOutput;
