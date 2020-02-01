import parseImage from './image';
import parseLink from './link';

export default function(entry) {
	const langs = entry.fields.langs.map(img => parseImage(img));
	const navigation = entry.fields.navigation.map(link => parseLink(link));
	const title = entry.fields.title;
	return { title, langs, navigation };
}