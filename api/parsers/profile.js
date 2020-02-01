import parseImage from './image';
import parseLink from './link';
import parseIcon from './icon';

export default function(entry) {
	const profilePicture = parseImage(entry.fields.profilePicture);
	const cta = parseLink(entry.fields.cta);
	const socialMedia = entry.fields.socialMedia.map(media => parseIcon(media));
	const background = parseImage(entry.fields.background);
	const { name, surename, jobPosition } = entry.fields;
	return {
		name,
		surename,
		jobPosition,
		profilePicture,
		cta,
		socialMedia,
		background
	};
}