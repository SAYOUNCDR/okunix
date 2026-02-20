const TrafficHeatmap = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = Array.from({ length: 24 }, (_, i) => {
    const period = i < 12 ? "am" : "pm";
    const hour = i % 12 === 0 ? 12 : i % 12;
    return `${hour}${period}`;
  });

  const data = days.map((day) =>
    hours.map((hour) => {
      const hourIndex = parseInt(hour);
      const isWorkHour =
        (hour.includes("am") && [9, 10, 11].includes(hourIndex)) ||
        (hour.includes("pm") && [12, 1, 2, 3, 4, 5].includes(hourIndex));
      const baseTraffic = isWorkHour
        ? Math.random() * 80 + 20
        : Math.random() * 30;
      return Math.floor(baseTraffic);
    }),
  );

  const getColorClass = (value) => {
    if (value === 0) return "bg-gray-100";
    if (value < 20) return "bg-orange-100";
    if (value < 40) return "bg-orange-200";
    if (value < 60) return "bg-orange-300";
    if (value < 80) return "bg-orange-400";
    return "bg-orange-500";
  };

  return (
    <div className="mt-8 bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 text-start">
        Traffic
      </h3>

      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <div className="min-w-200 sm:min-w-0">
          <div className="flex mb-3 ml-12">
            {hours.map((hour, i) => (
              <div key={hour} className="flex-1 text-center">
                <span className="text-[10px] text-gray-400 font-semibold block uppercase tracking-tighter">
                  {i % 2 === 0 ? hour : ""}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            {days.map((day, dayIndex) => (
              <div key={day} className="flex items-center gap-2">
                <div className="w-10 text-[11px] font-bold text-gray-400 shrink-0 uppercase tracking-wider">
                  {day}
                </div>

                <div className="flex flex-1 gap-1 sm:gap-1.5">
                  {data[dayIndex].map((value, hourIndex) => (
                    <div
                      key={`${day}-${hourIndex}`}
                      className="flex-1 aspect-square group relative cursor-pointer"
                    >
                      <div
                        className={`w-full h-full rounded-sm transition-all duration-300 hover:scale-110 hover:z-10 ${getColorClass(
                          value,
                        )}`}
                      ></div>

                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
                        <div className="bg-gray-900 text-white text-[10px] sm:text-xs rounded-md py-1.5 px-3 whitespace-nowrap shadow-xl border border-white/10">
                          <span className="font-bold">{value}</span> visitors •{" "}
                          {day} {hours[hourIndex]}
                        </div>
                        <div className="w-2 h-2 bg-gray-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center mt-6 gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-500 font-medium">
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs bg-gray-100"></div>
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs bg-orange-100"></div>
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs bg-orange-200"></div>
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs bg-orange-300"></div>
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs bg-orange-400"></div>
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs bg-orange-500"></div>
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default TrafficHeatmap;
