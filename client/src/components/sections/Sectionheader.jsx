const Sectionheader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-10 max-w-5xl mx-auto">
      <div className="max-w-2xl">
        <span className="text-orange-500 font-medium text-sm mb-3 block tracking-wide">
          How It Works
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
          Your Trusted <br />
          <span className="text-orange-600">Analytics Partner</span>
        </h2>
      </div>
      <div className="max-w-md text-gray-500 text-lg leading-relaxed mb-2">
        We help you monitor, analyze, and improve your digital presence with
        reliable metrics and transparent data flow.
      </div>
    </div>
  );
}

export default Sectionheader