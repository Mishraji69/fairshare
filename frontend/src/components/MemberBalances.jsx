const MemberBalances = ({ balances }) => {
  if (!balances || balances.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-400">No members in this group yet</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-white mb-4">Member Balances</h2>
      <div className="space-y-3">
        {balances.map((member) => {
          const balance = parseFloat(member.balance);
          const isPositive = balance > 0;
          const isZero = balance === 0;
          
          return (
            <div key={member.user_id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
              <div>
                <h3 className="text-white font-semibold">{member.name}</h3>
                <p className="text-gray-400 text-sm">
                  Paid: ${parseFloat(member.total_paid).toFixed(2)} | 
                  Owed: ${parseFloat(member.total_owed).toFixed(2)}
                </p>
              </div>
              
              <div className="text-right">
                {isZero ? (
                  <p className="text-gray-400 font-semibold">Settled Up</p>
                ) : isPositive ? (
                  <div>
                    <p className="text-green-500 font-bold text-xl">
                      +${balance.toFixed(2)}
                    </p>
                    <p className="text-green-400 text-sm">Gets back</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-red-500 font-bold text-xl">
                      -${Math.abs(balance).toFixed(2)}
                    </p>
                    <p className="text-red-400 text-sm">Owes</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-blue-900 bg-opacity-30 rounded-lg">
        <p className="text-blue-300 text-sm">
          💡 <strong>Green</strong> = Gets money back | <strong className="text-red-400">Red</strong> = Owes money
        </p>
      </div>
    </div>
  );
};

export default MemberBalances;
