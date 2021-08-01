let friendLists = (req, res) => {
	const friends = [
		{
			name: "Cat: Russian Blue",
		},
		{
			name: "Cat: Maine Coon",
		},
		{
			name: "Cat: Balinese",
		},
	];
	return res.status(200).json(friends);
}
module.exports = {
	friendLists: friendLists,
};