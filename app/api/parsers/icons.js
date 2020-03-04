import parseIcon from './icon';

export default function(entry) {
	const icons = entry.fields.icons.map(icon => parseIcon(icon))
	const title = entry.fields.title;
	return { title, icons };
}
