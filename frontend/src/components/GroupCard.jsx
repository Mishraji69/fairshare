const GroupCard = ({ group, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="card hover:bg-gray-750 cursor-pointer transition-all hover:scale-105"
    >
      <h3 className="text-xl font-semibold text-white mb-2">{group.name}</h3>
      <p className="text-gray-400 text-sm">
        Created {new Date(group.created_at).toLocaleDateString()}
      </p>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <span className="text-blue-500 font-semibold">View Details →</span>
      </div>
    </div>
  );
};

export default GroupCard;
