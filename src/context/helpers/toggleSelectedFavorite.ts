import { State } from '../types';

export const toggleSelectedFavorite = (
	favorites: State['selectedFavorite'],
	favoriteId: string
): State['selectedFavorite'] => {
	const selectedFavoriteSet = new Set(favorites);
	if (selectedFavoriteSet.has(favoriteId)) {
		selectedFavoriteSet.delete(favoriteId);
	} else {
		selectedFavoriteSet.add(favoriteId);
	}
	return [...selectedFavoriteSet];
};
