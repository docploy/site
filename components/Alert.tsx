import { useAlert } from 'contexts/alert';

type Alert = {
  color: string;
  message: string;
};

const COLOR_CLASSES = {
  green: 'bg-green-400 text-green-800',
};

function Alert() {
  const { message, color = '' } = useAlert();
  let colorClasses = '';
  if (color && COLOR_CLASSES[color]) {
    colorClasses = COLOR_CLASSES[color];
  }

  return colorClasses && message ? (
    <div
      className={`w-100 font-bold p-4 mb-4 text-center text-sm ${colorClasses}`}
    >
      {message}
    </div>
  ) : null;
}

export default Alert;
