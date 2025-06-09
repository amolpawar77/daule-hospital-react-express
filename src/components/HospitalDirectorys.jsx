const hospitals = [
  { name: "City Hospital", location: "Downtown", contact: "123-456-7890" },
  { name: "Green Valley Clinic", location: "Uptown", contact: "987-654-3210" },
  { name: "Sunrise Medical", location: "East Side", contact: "555-123-4567" },
  { name: "Wellness Care", location: "West End", contact: "444-987-6543" },
];

export default function HospitalDirectorys() {
  return (
    <div className="p-2 sm:p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-pink-600">Hospital Directory</h2>
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-pink-500 text-white">
            <tr>
              <th className="p-2 sm:p-4 text-left text-sm sm:text-base">Hospital Name</th>
              <th className="p-2 sm:p-4 text-left text-sm sm:text-base hidden sm:table-cell">Location</th>
              <th className="p-2 sm:p-4 text-left text-sm sm:text-base">Contact</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.length > 0 ? (
              hospitals.map((hospital, index) => (
                <tr key={index} className="border-b cursor-pointer hover:bg-gray-100">
                  <td className="p-2 sm:p-4 text-sm sm:text-base">
                    {hospital.name}
                    <div className="sm:hidden text-gray-600 text-xs mt-1">
                      {hospital.location}
                    </div>
                  </td>
                  <td className="p-2 sm:p-4 text-sm sm:text-base hidden sm:table-cell">{hospital.location}</td>
                  <td className="p-2 sm:p-4 text-sm sm:text-base">{hospital.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-2 sm:p-4 text-center text-gray-500 text-sm sm:text-base">
                  No hospitals found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}