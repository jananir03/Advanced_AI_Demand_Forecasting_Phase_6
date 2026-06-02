import {

  Navigate

} from "react-router-dom";


const RoleGuard = ({

  children,

  allowedRoles

}) => {

  const role = localStorage.getItem(
    "role"
  );

  // -----------------------------------
  // ACCESS CHECK
  // -----------------------------------

  if (

    !allowedRoles.includes(
      role
    )

  ) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="bg-white p-10 rounded-2xl shadow-xl text-center">

          <h1 className="text-4xl font-bold text-red-500 mb-4">

            Access Denied

          </h1>

          <p className="text-gray-600 text-lg">

            You do not have permission to access this page.

          </p>

        </div>

      </div>
    );
  }

  return children;
};

export default RoleGuard;