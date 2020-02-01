import parseArticle from './parsers/article';
import parseNavbar from './parsers/navbar';
import parseProfile from './parsers/profile';
import parseIcons from './parsers/icons';
import parseForm from './parsers/form';

export default locale => {
	const parse = (func, e) => func(e, locale);
	return {
		navbar: {
			parse: e => parse(parseNavbar, e)
		},
		article: {
			parse: e => parse(parseArticle, e)
		},
		profile: {
			parse: e => parse(parseProfile, e)
		},
		icons: {
			parse: e => parse(parseIcons, e)
		},
		form: {
			parse: e => parse(parseForm, e)
		}
	}
}