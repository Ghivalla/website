export default function(entry) {
	if (!entry || !entry.fields) return null
	const { title, href } = entry.fields
	return { title, href }
}