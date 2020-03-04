export default function(entry) {
	const { title, body } = entry.fields
	return { title, body }
}