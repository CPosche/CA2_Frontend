const GenBtn = ({ callback, generations, gen }) => {
  return (
    <button
      className="btn btn-gen"
      onClick={() => callback(generations.results[gen].url)}
    >
      Gen.{gen + 1}
    </button>
  );
};

export default GenBtn;
