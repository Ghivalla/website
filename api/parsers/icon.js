import parseImage from './image';
import parseLink from './link';

export default function(entry) {
	const image = parseImage(entry.fields.image);
	const link = parseLink(entry.fields.link);
	const title = entry.fields.title;
	return { title, image, link };
}
