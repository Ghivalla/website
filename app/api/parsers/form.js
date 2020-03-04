export default function(entry) {
	const {
		nameLabel,
		emailLabel,
		messageLabel,
		buttonLabel
	} = entry.fields
	return { nameLabel, emailLabel, messageLabel, buttonLabel }
}