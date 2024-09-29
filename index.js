const { default: consola } = require("consola");
const { app } = require("./server");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    consola.start(`💯 => Server is running on port ${PORT}`);
});