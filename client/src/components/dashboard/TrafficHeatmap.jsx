import React from "react";

const TrafficHeatmap = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = Array.from({ length: 24 }, (_, i) => {
    const period = i < 12 ? "am" : "pm";
    const hour = i % 12 === 0 ? 12 : i % 12;
    return `${hour}${period}`;
  });

  // Generate mock data: 7 days x 24 hours
  // Value between 0 and 100 representing traffic intensity
  const data = days.map((day) =>
    hours.map((hour) => {
      // Simulate higher traffic during work hours (9am - 5pm)
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
    <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 text-start">
        Traffic
      </h3>

      <div className="flex flex-col">
        {/* Header Row (Hours) */}
        <div className="flex mb-2 ml-12">
          {hours.map((hour, i) => (
            <div key={hour} className="flex-1 text-center min-w-5">
              {/* Show label every 2 hours or periodically */}
              <span className="text-[10px] text-gray-400 font-medium block">
                {/* Only show every 2th or 3rd label to avoid crowding if needed, or just condensed */}
                {i % 2 === 0 ? hour : ""}
              </span>
            </div>
          ))}
        </div>

        {/* Rows (Days) */}
        <div className="flex flex-col gap-1.5">
          {days.map((day, dayIndex) => (
            <div key={day} className="flex items-center gap-1.5">
              {/* Day Label */}
              <div className="w-12 text-xs font-semibold text-gray-500 shrink-0">
                {day}
              </div>

              {/* Data Points */}
              <div className="flex flex-1 gap-1.5">
                {data[dayIndex].map((value, hourIndex) => (
                  <div
                    key={`${day}-${hourIndex}`}
                    className="flex-1 aspect-square min-w-5 max-w-7.5 group relative cursor-default"
                  >
                    <div
                      className={`w-full h-full rounded-sm transition-colors duration-200 ${getColorClass(value)}`}
                    ></div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-20 pointer-events-none">
                      <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg">
                        {value} visitors • {day} {hours[hourIndex]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-end items-center mt-4 gap-2 text-xs text-gray-500 font-medium">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-100"></div>
          <div className="w-3 h-3 rounded-sm bg-orange-100"></div>
          <div className="w-3 h-3 rounded-sm bg-orange-200"></div>
          <div className="w-3 h-3 rounded-sm bg-orange-300"></div>
          <div className="w-3 h-3 rounded-sm bg-orange-400"></div>
          <div className="w-3 h-3 rounded-sm bg-orange-500"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default TrafficHeatmap;
