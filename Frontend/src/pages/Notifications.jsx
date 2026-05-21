import MainLayout from "../layouts/MainLayout";

const notifications = [

  {

    title:
      "Dataset Uploaded",

    message:
      "Supermarket dataset uploaded successfully."
  },

  {

    title:
      "Forecast Generated",

    message:
      "AI forecast generated using Prophet model."
  },

  {

    title:
      "Revenue Forecast Ready",

    message:
      "Revenue forecasting completed successfully."
  }
];

const Notifications = () => {

  return (

    <MainLayout>

      <div className="min-h-screen relative overflow-hidden p-8">


        {/* Background */}

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-300"></div>

        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>



        {/* Content */}

        <div className="relative z-10">


          {/* Header */}

          <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/30">

            <h1 className="text-5xl font-bold text-slate-800">

              Notifications

            </h1>

            <p className="text-slate-700 mt-4 text-lg">

              Recent forecasting and system alerts.

            </p>

          </div>



          {/* Notification Cards */}

          <div className="mt-10 space-y-6">

            {

              notifications.map(

                (item, index) => (

                  <div

                    key={index}

                    className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30"
                  >

                    <h2 className="text-2xl font-bold text-slate-800 mb-3">

                      {item.title}

                    </h2>

                    <p className="text-slate-700 text-lg">

                      {item.message}

                    </p>

                  </div>
                )
              )
            }

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default Notifications;