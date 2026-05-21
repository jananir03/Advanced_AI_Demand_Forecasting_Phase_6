const DashboardCard = ({

  title,

  value,

  color

}) => {

  return (

    <div className={`

      bg-white

      rounded-3xl

      shadow-lg

      p-6

      border-l-8

      ${color}

      hover:scale-105

      transition

      duration-300

    `}>

      <h3 className="text-gray-500 text-lg">

        {title}

      </h3>

      <p className="text-4xl font-bold mt-4 text-gray-800">

        {value}

      </p>

    </div>
  );
};

export default DashboardCard;