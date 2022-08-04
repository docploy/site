import { CheckIcon } from '@heroicons/react/solid';

export type PlanData = {
  name: string;
  price?: string;
  description: string;
  features: string[];
  cta: string;
  onClick: () => void;
  isDisabled?: boolean;
};

function Plan(props: PlanData) {
  const { name, price, description, features, cta, onClick, isDisabled } =
    props;
  return (
    <div
      className={`flex flex-col py-12 px-8 rounded-md border-gray-200 border-2 h-[540px] justify-between ${
        isDisabled ? 'opacity-30' : ''
      }`}
    >
      <div>
        <h3 className="font-bold mb-4 text-center text-2xl">{name}</h3>
        <p className="font-bold mb-8 text-gray-500">{description}</p>
        <ul className="mb-4">
          {features.map((feature, i) => {
            return (
              <li key={i} className="flex items-start mb-4">
                <span className="mr-1">
                  <CheckIcon className="w-4 h-4 text-green-500" />
                </span>
                <span className="text-gray-600 text-sm leading-normal">
                  {feature}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <div className="mb-8 text-center">
          {price ? (
            <div>
              <span className="font-bold text-3xl">${price}</span>
              <span className="font-bold text-xl">/month</span>
            </div>
          ) : (
            <div>
              <span className="font-bold text-2xl">Custom price</span>
            </div>
          )}
        </div>
        <div className="text-center">
          <button
            onClick={onClick}
            className="bg-neutral-800 cursor-pointer font-bold p-4 rounded-md text-white"
          >
            {cta}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Plan;
