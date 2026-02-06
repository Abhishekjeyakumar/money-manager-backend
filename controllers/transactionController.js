import Transaction from "../models/Transaction.js";

// ADD TRANSACTION
export const addTransaction = async (req, res) => {
  try {
    const tx = await Transaction.create(req.body);
    res.status(201).json(tx);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL TRANSACTIONS
export const getTransactions = async (req, res) => {
  try {
    const txs = await Transaction.find().sort({ createdAt: -1 });
    res.json(txs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TRANSACTION (12-HOUR RULE)
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Transaction ID missing" });
    }

    const tx = await Transaction.findById(id);

    if (!tx) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const hoursDiff =
      (Date.now() - new Date(tx.createdAt)) / (1000 * 60 * 60);

    if (hoursDiff > 12) {
      return res
        .status(403)
        .json({ message: "Edit restricted after 12 hours" });
    }

    const updatedTx = await Transaction.findByIdAndUpdate(
      id,
      {
        type: req.body.type,
        amount: req.body.amount,
        description: req.body.description,
        category: req.body.category,
        division: req.body.division,
      },
      { new: true }
    );

    res.json(updatedTx);
  } catch (error) {
    console.error("UPDATE ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
  console.log("UPDATE ID:", req.params.id);
console.log("UPDATE BODY:", req.body);

};


// import Transaction from "../models/Transaction.js";

// export const addTransaction = async (req, res) => {
//   const tx = await Transaction.create(req.body);
//   res.status(201).json(tx);
// };

// export const getTransactions = async (req, res) => {
//   const txs = await Transaction.find().sort({ createdAt: -1 });
//   res.json(txs);
// };

// export const updateTransaction = async (req, res) => {
//   const tx = await Transaction.findById(req.params.id);

//   if (!tx) return res.status(404).json({ message: "Not found" });

//   const hours =
//     (Date.now() - new Date(tx.createdAt)) / (1000 * 60 * 60);

//   if (hours > 12)
//     return res.status(403).json({ message: "Edit restricted after 12 hours" });

//   const updated = await Transaction.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );

//   res.json(updated);
// };
