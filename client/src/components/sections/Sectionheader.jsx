const Sectionheader = () => {
  return (
    <div className="flex flex-row items-start justify-between max-w-5xl mx-auto px-4">
      <div className="mb-4">
        <span className="text-orange-500 font-medium text-sm mb-3 block tracking-wide">
          How It Works
        </span>
        <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
          Your Trusted <br />
          <span className="text-orange-600">Analytics Partner & Growth</span>
        </h2>
        <p className="text-lg md:text-md text-gray-600 mt-4 max-w-3xl leading-relaxed">
          We help you monitor, analyze, and improve your digital presence with
          reliable metrics and transparent data flow.
        </p>
      </div>
    </div>
  );
}

export default Sectionheader