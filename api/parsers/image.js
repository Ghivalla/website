export default function(entry) {
	if (!entry || !entry.fields || !entry.fields.file || !entry.fields.title)
		return null
	const src = entry.fields.file.url
	const alt = entry.fields.title
	const desc = entry.fields.description
	return { src, alt, desc }
}