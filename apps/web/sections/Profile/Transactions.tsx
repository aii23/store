export function Transactions() {
  const transactions = [
    {
      id: '054a0fdf-df84-4880-82c0-1ce0760abf81',
      status: 'success',
      date: '15th Sept, 12:00',
    },
    {
      id: '054a0fdf-df84-4880-82c0-1ce0760abf81',
      status: 'pending',
      date: '15th Sept, 12:00',
    },
    {
      id: '054a0fdf-df84-4880-82c0-1ce0760abf81',
      status: 'failed',
      date: '15th Sept, 12:00',
    },
  ];

  return (
    <div className="w-full pt-[1.5625vw] font-plexsans">
      <div className="grid grid-cols-3 gap-4 text-sm text-[#f9f8f4] mb-2 px-4 font-plexsans">
        <div>Transaction hash</div>
        <div className="text-center">Transaction status</div>
        <div className="text-right">Date and Time</div>
      </div>
      <div className="h-px w-full bg-[#373737] mb-3"></div>
      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-4 px-[0.7813vw] py-[0.5208vw] bg-[#212121] rounded-xl text-sm text-[#f9f8f4]"
          >
            <div className="truncate flex items-center">{transaction.id}</div>
            <div className="flex justify-center">
              {transaction.status === 'success' && (
                <span className="bg-[#00b708] text-[#212121] px-4 py-1 rounded-[0.2604vw] text-center">
                  Success
                </span>
              )}
              {transaction.status === 'pending' && (
                <span className="bg-[#ffcc00] text-[#212121] px-4 py-1 rounded-[0.2604vw] text-center">
                  Pending
                </span>
              )}
              {transaction.status === 'failed' && (
                <span className="bg-[#dc0c07] text-white px-4 py-1 rounded-[0.2604vw] text-center">
                  Failed
                </span>
              )}
            </div>
            <div className="text-right flex items-center justify-end">{transaction.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
